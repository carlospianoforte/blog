import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import publicacionesReducer from "./publicacionesReducer";
import tareasReducer from "./tareasReducer";

export default combineReducers({
    usersReducer,
    publicacionesReducer,
    tareasReducer,
});