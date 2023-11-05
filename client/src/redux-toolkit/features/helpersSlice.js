import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loader: false,
};


export const helpersSlice = createSlice ({
    name: 'helpers',
    initialState,
    //object that will change the state
    reducers: {
        setLoader: (state, action) => {
            state.loader = action.payload;

            console.log('setLoader:', action.payload)
        },

    },

    //for async
    extraReducers: {}
});

export default helpersSlice.reducer;
export const {setLoader} = helpersSlice.actions;