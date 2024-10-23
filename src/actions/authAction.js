import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { NotificationManager } from "react-notifications";
import store from "../store";
import { user_connections } from "./userconnectAction";

import { GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_GAMELIST } from "./types";
import socketIOClient from "socket.io-client";

const SERVER = require("../config/config").GAMESERVERURI;
const socket = socketIOClient(SERVER);

// Register User
export const registerUser = (signData) => (dispatch) => {
  axios
    .post("/api/users/register", signData)
    .then((res) => {
      // Save to sessionStorage
      const { token, gamelist } = res.data;
      // Set token to ls
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      dispatch({
        type: SET_CURRENT_GAMELIST,
        payload: gamelist,
      });

      socket.emit("user-connected", decoded.id);

      socket.on("user-connect", (usercon) => {
        store.dispatch(user_connections(usercon));
      });

      NotificationManager.success("WELCOME TO CASINO", "", 3000);
    })
    .catch((err) => {
      NotificationManager.error(err.response.data.account, "", 3000);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Login - Get User Token
export const loginUser = (logData) => (dispatch) => {
  axios
    .post("/api/users/login", logData)
    .then((res) => {
      // Save to sessionStorage
      const { token, gamelist } = res.data;
      // Set token to ls
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      dispatch({
        type: SET_CURRENT_GAMELIST,
        payload: gamelist,
      });

      socket.emit("user-connected", decoded.id);

      socket.on("user-connect", (usercon) => {
        store.dispatch(user_connections(usercon));
      });

      NotificationManager.success("WELCOME TO CASINO", "", 3000);
    })
    .catch((err) => {
      if (err.response.data.account) {
        NotificationManager.error(err.response.data.account, "", 3000);
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get user gamelist
export const getUserGamelist = () => (dispatch) => {
  axios
    .post("/api/games/getgamelist")
    .then((res) => {
      dispatch({
        type: SET_CURRENT_GAMELIST,
        payload: res.data.gamelist,
      });
    })
    .catch((err) => console.log(err));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Decode token to get user data
  const decoded = jwt_decode(sessionStorage.getItem("jwtToken"));

  socket.emit("user-disconnected", decoded.id);

  socket.on("user-disconnect", (usercon) => {
    store.dispatch(user_connections(usercon));
  });

  // Remove token from sessionStorage
  sessionStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
