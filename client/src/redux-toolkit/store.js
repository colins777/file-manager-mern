import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import fileSlice from "./features/fileSlice";
import uploadWindowSlice from "./features/uploadWindowSlice"
import helpersSlice from "./features/helpersSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        file: fileSlice,
        uploadWindow: uploadWindowSlice,
        helpers: helpersSlice
    },
});