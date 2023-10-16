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
                {
                    email,
                    password
                }
            )

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            console.log('loginUser Data', data);

            return data;


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
       /* setLoginUser: (state, action) => {
            state.user.email = action.email
        }*/
    },
    //for async
    extraReducers: {
        [loginUser.pending] : (state) => {
            state.isAuth = false;

            console.log('action pending', state);
        },

        [loginUser.fulfilled]: (state, action) => {
            console.log('action fulfilled', action);

            //action is getting from backend response
            if (action.payload) {
                state.isAuth = true;
                state.currentUser.email = action.payload.email;
                state.currentUser.token = action.payload.token;
            } else {
                state.isAuth = false;
            }

        },

        [loginUser.rejected] : (state, action) => {
           // state.status = action.payload.message
            state.isLoading = false;

            console.log('action rejected', action);
        },
    }
});

export default userSlice.reducer;