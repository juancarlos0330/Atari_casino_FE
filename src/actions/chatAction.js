import axios from "axios";
import { CHAT_LIST, GET_CHAT_LIST } from "./types";

// Get every messages
export const getMsgs = () => (dispatch) => {
  axios
    .get("/api/chat/getdata")
    .then((res) => {
      dispatch({
        type: GET_CHAT_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Save each message
export const saveMsg = (data) => (dispatch) => {
  axios
    .post("/api/chat/save", data)
    .then((res) => {
      dispatch({
        type: CHAT_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
