import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {userSlice} from "./userSlice";

const initialState = {
    files: [],
    currentDir: null,
    modalDisplay: false,
    //dirStack: ['652fe669110ed35eea8097b3']
    dirStack: []
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

//action uploadFile
export const uploadFile = createAsyncThunk(
    'file/uploadFile',
    async (file, dirId) => {
        try {

            const formData = new FormData();
            formData.append('file', file);

            if (dirId) {
                formData.append('parent', dirId);
            }

            const {data} = await axios.post('http://localhost:5000/api/files/upload', formData,{
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                    onUploadProgress: progressEvent => {

                        //@TODO fix upload 500 error problem with frontend
                        //get file size for counting progress upload
                        /*const totalLength = progressEvent.lengthComputable
                            ? progressEvent.total : progressEvent.target.getResponseHeader('content-length')
                            || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                        console.log('total', totalLength);
                        if (totalLength) {
                            let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            console.log(progress)
                        }*/
                    }
                });

            console.log('data create file: ', data);


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
        },
        addFolderToStack: (state, action) => {
            console.log('addFolderToStack', action)
            state.dirStack.push(action.payload.currentDirId);
        },
        removeFolderFromStack: (state, action) => {
            // console.log('addFolderToStack', action)
            state.dirStack = state.dirStack.filter((dirID) => dirID !== action.payload.currentDirId);
        }

    },
    //for async
    extraReducers: {
        //getFiles
        [getFiles.pending] : (state) => {
            console.log('getFiles action pending: ', state);
        },

        [getFiles.fulfilled]: (state, action) => {
           // console.log('getFiles action fulfilled: ', action);
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
export const {showHideFileModal, setCurrentDir, addFolderToStack, removeFolderFromStack} = fileSlice.actions;