import { combineReducers } from "redux";
import auth from "./auth";
import responseMessage from "./responseMessage";
import customers from "./customer";

export default combineReducers({ auth, customers, responseMessage });
