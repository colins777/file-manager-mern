import {combineReducers} from "redux";
import userSlice from "./features/userSlice";
import fileSlice from "./features/fileSlice";
import uploadWindowSlice from './features/uploadWindowSlice'

const rootReducer = combineReducers({
    userSlice,
    fileSlice,
    uploadWindowSlice
});


//
export default rootReducer;