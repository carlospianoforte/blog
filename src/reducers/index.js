import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import publicacionesReducer from "./publicacionesReducer";

export default combineReducers({
    usersReducer,
    publicacionesReducer
});