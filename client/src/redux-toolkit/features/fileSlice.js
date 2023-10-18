import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {loginUser} from "./userSlice";

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

//action getFiles
export const getFiles = createAsyncThunk(
    'file/files',
    async ({currentDirId, userId}) => {

        console.log('dirID slice', currentDirId);
        console.log('userId slice', userId);

      //  dirID = '652ede5513ffaf4a79d8b813';

        try {
            //
            const {data} = await axios.get(`http://localhost:5000/api/files?user=${userId}&${currentDirId ? 'parent=' + currentDirId : ''}`,{
          //  const {data} = await axios.get(`http://localhost:5000/api/files?${dirID ? 'parent=' + dirID : ''}`,{
                //check user using token from localstorage
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            //if response contain files
            if (data) {
                console.log('getFiles response', data);
            } else {
                console.log('No files');
            }


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

        //getFiles
        [getFiles.pending] : (state) => {
            console.log('getFiles action pending: ', state);
        },

        [getFiles.fulfilled]: (state, action) => {
            console.log('getFiles action fulfilled: ', action);
            state.files = action.payload;

        },

        [getFiles.rejected] : (state, action) => {
            console.log('getFiles action rejected: ', action.error.message);
        },
    }
});

export default fileSlice.reducer;