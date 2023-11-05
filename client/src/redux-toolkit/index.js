import {combineReducers} from "redux";
import userSlice from "./features/userSlice";
import fileSlice from "./features/fileSlice";
import uploadWindowSlice from './features/uploadWindowSlice'
import helpersSlice from "./features/helpersSlice";

const rootReducer = combineReducers({
    userSlice,
    fileSlice,
    uploadWindowSlice,
    helpersSlice,
});


//
export default rootReducer;