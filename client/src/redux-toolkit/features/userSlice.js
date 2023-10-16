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
                localStorage.setItem('token', data.token)
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
            //we don't need parameters cause we authorize using only token
            const {data} = await axios.get('http://localhost:5000/api/auth/auth',
                {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});

            if (data.token) {
                localStorage.setItem('token', data.token)
            }

            console.log('loginUser Data', data);

            return data;
        } catch (e) {
            localStorage.removeItem('token');
            alert(e.response.data.message);
        }
    }
);

/*
export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
           // dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
*/

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
        [loginUser.pending] : (state) => {
            state.isAuth = false;

            console.log('action pending', state);
        },

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

        //
        [auth.pending] : (state) => {
            console.log('auth pending', state);
        },
        [auth.fulfilled] : (state) => {
            console.log('auth fulfilled', state);
            state.isAuth = true;
        },
        [auth.rejected] : (state) => {
            console.log('auth rejected', state);
            state.isAuth = false;
        },
    }
});

export const {setLogout} = userSlice.actions;
export default userSlice.reducer;