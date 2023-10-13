import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//import axios from '../../utils/axios';

//Slice - частина Redux toolkit яка відповідає за ініціалізацію state in store  і за всі ф-ї, які звязані зі стейтом

const initialState = {
    currentUser: {},
    isAuth: false
};


export const userSlice = createSlice ({
    name: 'user',
    initialState,
    //object that will change the state
    reducers: {
        //for logout button
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null
        }
    },
    //for async
    extraReducers: {

    }
});

export default userSlice.reducer;