import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    files: []
};
//action addUploadFile
/*export const removeUploadFile = createAsyncThunk(
    'uploadWindow/removeUploadFile',
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
);*/

export const uploadWindowSlice = createSlice ({
    name: 'uploadWindow',
    initialState,
    //object that will change the state
    reducers: {
        showUploader: (state, action) => {
            state.isVisible = true;

            console.log('uploadWindow showUploader:', action)
        },
        hideUploader: (state, action) => {
            state.isVisible = false;
            state.files = [];
        },
        addFilesToProgress: (state, action) => {

            state.files.push(action.payload);

        },
        changeProgressUploadFile: (state, action) => {

            state.files = state.files.map(file => file.id === action.payload.id
               // ? file.progress = action.payload.progress
                ? {...file, progress: action.payload.progress}

                : {...file}
            );
           // console.log('REDUCER uploadWindow addUploadFile:', action)
        },
    },
    //for async
    extraReducers: {

    }
});

export default uploadWindowSlice.reducer;
export const {showUploader, hideUploader, changeProgressUploadFile, addFilesToProgress} = uploadWindowSlice.actions;