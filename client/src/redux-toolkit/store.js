import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import fileSlice from "./features/fileSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        file: fileSlice,
    },
});