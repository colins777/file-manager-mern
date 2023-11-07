import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

//Slice - частина Redux toolkit яка відповідає за ініціалізацію state in store  і за всі ф-ї, які звязані зі стейтом

const initialState = {
    currentUser: {},
    isAuth: false
};


//loginUser - this is an action
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/auth/login',
                {email, password})

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.id);
            }

            console.log('loginUser Data', data);

            return data;
        } catch (e) {
            alert(e.response.data.message);
        }
    }
);

//check if user authorized
export const auth = createAsyncThunk(
    'user/auth',
    async () => {
        try {
            //we don't need parameters cause we make authorization using only token
            const {data} = await axios.get('http://localhost:5000/api/auth/auth',
                {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});

            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user_id', data.id);
            }

            console.log('loginUser Data', data);

            return data;
        } catch (e) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            alert(e.response.data.message);
        }
    }
);

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    //object that will change the state
    reducers: {
       setLogout: (state, action) => {
           localStorage.removeItem('token');

           state.currentUser = {};
           state.isAuth = false;
       }
    },
    //for async
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            console.log('action fulfilled', action);

            //action is getting from backend response
            if (action.payload) {
                state.isAuth = true;
                state.currentUser = action;
            } else {
                state.isAuth = false;
                state.currentUser = null;
            }

        },

        [loginUser.rejected] : (state, action) => {
           // state.status = action.payload.message
            state.isLoading = false;

            console.log('action rejected', action);
        },

        [auth.fulfilled] : (state, action) => {
            console.log('auth fulfilled', action);
            state.isAuth = true;
        },
        [auth.rejected] : (state, action) => {
            console.log('auth rejected', action);
            state.isAuth = false;
        },
    }
});

export const {setLogout} = userSlice.actions;
export default userSlice.reducer;