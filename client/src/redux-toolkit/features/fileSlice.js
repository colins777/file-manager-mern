import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {addFilesToProgress, changeProgressUploadFile} from './uploadWindowSlice';

const initialState = {
    files: [],
    currentDir: null,
    modalDisplay: false,
    dirStack: [],
    fileUploaded: false,
};

//action getFiles
export const getFiles = createAsyncThunk(
    'file/getFiles',
    async ({currentDirId, userId, sort}) => {
        try {

            let url = `http://localhost:5000/api/files?user=${userId}`;

            if (currentDirId) {
                url+= `&parent=${currentDirId}`
            }

            if (sort) {
                url+= `&sort=${sort}`
            }

            console.log('URL', url);


//            const {data} = await axios.get(`http://localhost:5000/api/files?user=${userId}&${currentDirId ? 'parent=' + currentDirId : ''}`,{

            const {data} = await axios.get(url,{


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
    //first arg - action payload, second dispatch for dispatch some action, but not recomend use dispatch in slice
    async ({file, dirId}, {dispatch}) => {
        try {

            const formData = new FormData();
            formData.append('file', file);

            if (dirId) {
                formData.append('parent', dirId);
            }

           // let fileUpload = {id: Date.now() , name: file.name, progress: 0}
            const fileId = file.lastModified +  file.name;
            let fileUpload = {id: fileId, name: file.name, progress: 0};

            dispatch(addFilesToProgress(fileUpload));
            console.log('fileUpload progress', fileUpload);

            const {data} = await axios.post('http://localhost:5000/api/files/upload', formData,{
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},

                onUploadProgress: progressEvent => {
                    //https://stackoverflow.com/questions/64684110/how-to-get-onuploadprogress-value-in-an-await-function-from-axios
                    //https://stackoverflow.com/questions/66613260/how-to-dispatch-asyncthunk-inside-another-asyncthunk

                    let percentComplete = progressEvent.loaded / progressEvent.total
                    percentComplete = parseInt(percentComplete * 100);

                   // console.log('file upload progress', percentComplete);
                    //console.log('file upload fileUpload', fileUpload);
                    dispatch(changeProgressUploadFile({id: fileId, progress: percentComplete}))

                }
            });

            return data;
        } catch (e) {
            alert(e.response.data.message);
        }
    }
);

//action downloadFile
export const downloadFile = createAsyncThunk(
    'file/downloadFile',
    async ({file}) => {
        try {
           // const {data} = await axios.get(`http://localhost:5000/api/files/download?id=${file._id}`,{
           await axios.get(`http://localhost:5000/api/files/download?id=${file._id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
               // dataType: 'blob'
                responseType: 'blob'
            }).then((data) => {

             //  console.log('data blob', data);
               //https://prnt.sc/SpSamiXqc79b

                const downloadUrl = window.URL.createObjectURL(data.data);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                link.remove();

               // return data;
            })

           // console.log('data blob', data);

            //get binar file url

        } catch (e) {
           // alert(e.response.data.message);
        }
    }
);

//action deleteFile
export const deleteFile = createAsyncThunk(
    'file/deleteFile',
    async (file) => {
        try {

            console.log('fileID', file._id);
            //console.log('fileID', file._id);

            const {data} = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            });

            return data;
        } catch (e) {
            // alert(e.response.data.message);
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
        },

    },
    //for async
    extraReducers: {
        //getFiles
        [getFiles.fulfilled]: (state, action) => {
           // console.log('getFiles action fulfilled: ', action.payload);
            //action payload is an array with files objects
            state.files = action.payload;
        },

        [getFiles.rejected] : (state, action) => {
           // console.log('getFiles action rejected: ', action.error.message);
        },

        [createFolder.fulfilled]: (state, action) => {
           // console.log('createFolder fulfilled action',action )
            if (action.payload) {
                state.files.push(action.payload);
                state.modalDisplay = false;

            }
        },

        [createFolder.rejected] : (state, action) => {
            console.log('createDir action rejected: ', action.error.message);
        },

        //async action uploadFile
        [uploadFile.fulfilled]: (state, action) => {
            console.log('uploadFile fulfilled action', action.payload)
            state.fileUploaded = true;
          //  state.files = action.payload;
        },

        [uploadFile.rejected] : (state, action) => {
            console.log('createDir action rejected: ', action.error.message);
        },

        //async action downloadFile
        [downloadFile.fulfilled]: (state, action) => {
            console.log('downloadFile fulfilled action',action );

        },

        [downloadFile.rejected] : (state, action) => {
            console.log('downloadFile action rejected: ', action.error.message);
        },

        //async action deleteFile
        //@TODO files deleting not works https://prnt.sc/KL4bVg0qJKP1
        [deleteFile.fulfilled]: (state, action) => {
            console.log('deleteFile fulfilled action', action.payload);

            if (action.payload && action.payload.hasOwnProperty('fileID')) {
                state.files = state.files.filter(file => {
                    return file._id !== action.payload.fileID;
                })
            }
        },

        [deleteFile.rejected] : (state, action) => {
            console.log('deleteFile action rejected: ', action.error.message);
        },

    }
});

export default fileSlice.reducer;
//export not async action
export const {showHideFileModal, setCurrentDir, addFolderToStack, removeFolderFromStack, setFileUploadProgress} = fileSlice.actions;