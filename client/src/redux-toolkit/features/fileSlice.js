import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {loginUser} from "./userSlice";
//import axios from '../../utils/axios';

//Slice - частина Redux toolkit яка відповідає за ініціалізацію state in store  і за всі ф-ї, які звязані зі стейтом

const initialState = {
    files: [],
    currentDir: null,
};

//actions
//setFiles
//setCurrentDir

export const setFiles = createAsyncThunk(
    'file/files',
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/files',
                {email, password});


            return data;
        } catch (e) {
            alert(e.response.data.message);
        }
    }
);

export const setCurrentDir = createAsyncThunk(
    'file/files',
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/files',
                {email, password});


            return data;
        } catch (e) {
            alert(e.response.data.message);
        }
    }
);


export const fileSlice = createSlice ({
    name: 'file',
    initialState,
    //object that will change the state
    reducers: {

    },
    //for async
    extraReducers: {

        [setFiles.pending] : (state) => {
            console.log('action pending', state);
        },

        [setFiles.fulfilled]: (state, action) => {
            console.log('action fulfilled', action);
            state.files = action.payload;

        },

        [setFiles.rejected] : (state, action) => {
            console.log('action rejected', action);
        },

        //setCurrentDir
        [setCurrentDir.pending] : (state) => {
            console.log('action pending', state);
        },

        [setCurrentDir.fulfilled]: (state, action) => {
            console.log('action fulfilled', action);
            state.currentDir = action.payload;

        },

        [setCurrentDir.rejected] : (state, action) => {
            console.log('action rejected', action);
        },
    }
});

export default fileSlice.reducer;