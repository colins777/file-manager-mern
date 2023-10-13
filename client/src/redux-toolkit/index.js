import {combineReducers} from "redux";
import userSlice from "./features/userSlice";
import fileSlice from "./features/fileSlice";

const rootReducer = combineReducers({
    userSlice,
    fileSlice
});


//
export default rootReducer;