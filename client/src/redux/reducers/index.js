import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import taskReducer from "./TaskReducer";
import FreelancerReducer from "./FreelancerReducer";
import clientReducer from "./clientReducer";
import ChatReducer from "./chatReducer";

const rootReducer = combineReducers({
  LoginReducer,
  taskReducer,
  FreelancerReducer,
  clientReducer,
  ChatReducer,
});

export default rootReducer;
