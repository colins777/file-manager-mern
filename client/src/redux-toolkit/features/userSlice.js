import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

//Slice - частина Redux toolkit яка відповідає за ініціалізацію state in store  і за всі ф-ї, які звязані зі стейтом

const initialState = {
    currentUser: {},
    isAuth: false
};


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({email, password}) => {
        try {
           const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            return response;
        } catch (e) {
            alert(e.response.data.message);
        }
    }
);


export const userSlice = createSlice ({
    name: 'user',
    initialState,
    //object that will change the state
    reducers: {

    },
    //for async
    extraReducers: {
        [loginUser.pending] : (state) => {
            state.isLoading = true;
            state.status = null;
        },

        [loginUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            //message - getting from backend
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        [loginUser.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false;
        },
    }
});

export default userSlice.reducer;