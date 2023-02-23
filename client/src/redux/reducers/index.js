import { combineReducers } from "redux";
import messageListReducer from "./messageListReducer";
import serversReducer from "./serversReducer";
import userReducer from "./userReducer";
import getUserIdReducer from "./getUserIdReducer";
import currentServerReducer from "./currentServerReducer";
const reducers = combineReducers({
    messageListReducer,
    serversReducer,
    userReducer,
    getUserIdReducer,
    currentServerReducer
})


export default reducers