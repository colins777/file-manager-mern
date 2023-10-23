import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {userSlice} from "./userSlice";

const initialState = {
    files: [],
    currentDir: null,
    modalDisplay: false
};

//actions async
//setFiles
//action getFiles
export const getFiles = createAsyncThunk(
    'file/getFiles',
    async ({currentDirId, userId}) => {
        try {
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

//action createDir
export const createFolder = createAsyncThunk(
    'file/createFolder',
    async ({dirId, name}) => {

        console.log('data create file dirId: ', dirId);
        console.log('data create file name: ', name);

        try {
            //
            const {data} = await axios.post('http://localhost:5000/api/files', {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            console.log('data create file: ', data)


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
        showHideFileModal: (state, action) => {
            state.modalDisplay = action.payload
        },
        setCurrentDir: (state, action) => {
            state.currentDir = action.payload.currentDirId
        }
    },
    //for async
    extraReducers: {
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

        //async action createDir
        [createFolder.pending] : (state) => {
            console.log('createFolder action pending: ', state);
        },

        [createFolder.fulfilled]: (state, action) => {
            console.log('createFolder fulfilled action',action )
            if (action.payload) {
                state.files.push(action.payload);
                state.modalDisplay = false;

            }
        },

        [createFolder.rejected] : (state, action) => {
            console.log('createDir action rejected: ', action.error.message);
        },
    }
});

export default fileSlice.reducer;
//export not async action
export const {showHideFileModal, setCurrentDir} = fileSlice.actions;