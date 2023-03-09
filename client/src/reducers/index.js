import { combineReducers } from "redux";
import auth from "./auth";
import customers from "./customer";

export default combineReducers({ auth, customers });
