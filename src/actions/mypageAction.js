import axios from "axios";
import { SET_CURRENT_GAMELIST } from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { setCurrentUser } from "./authAction";

// Save the balance
export const saveBalance = (saveData) => (dispatch) => {
  axios
    .post("/api/games/savebalance", saveData)
    .then((res) => {
      // Save to sessionStorage
      const { token } = res.data;
      // Set token to ls
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Upload Game item
export const uploadDataSave = (formData) => (dispatch) => {
  axios
    .post("/api/games/uploadfile", formData)
    .then((res) => {
      NotificationManager.success("Upload success!", "", 3000);
      dispatch({
        type: SET_CURRENT_GAMELIST,
        payload: res.data.gamelist,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete Game Item
export const delGameItem = (deldata) => (dispatch) => {
  axios.post("/api/games/delitem", deldata).then((res) => {
    NotificationManager.success("Game deleted!", "", 3000);
    dispatch({
      type: SET_CURRENT_GAMELIST,
      payload: res.data.gamelist,
    });
  });
};

// Save deposit amount
export const saveDepositAmount = (depData) => (dispatch) => {
  axios.post("/api/users/savedepositamount", depData).then((res) => {
    const { token } = res.data;
    // Set token to ls
    sessionStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));

    NotificationManager.success("Amount is deposited", "", 3000);
  });
};
