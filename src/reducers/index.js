import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userconReducer from "./userconReducer";
import chatlistReducer from "./chatlistReducer";
import gamelistReducer from "./gamelistReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  usercon: userconReducer,
  chatlist: chatlistReducer,
  gamelist: gamelistReducer,
});
