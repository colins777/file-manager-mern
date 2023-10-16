import React, {useState} from 'react';

import './authorization.scss';
import Input from "../../utils/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";
import {loginUser} from "../../redux-toolkit/features/userSlice";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        try {
            dispatch(loginUser({email, password}));
        } catch (e) {console.log('Error', e)}
    };

    return (
        <div className="registration-form">
           <h2>Login</h2>
            <div className="input-wrap">
                <Input value={email} setValue={setEmail} type="email" placeholder="Email"/>
                <Input value={password} setValue={setPassword} type="password" placeholder="Password"/>
                <button className="button btn btn-primary"
                        onClick={() => handleLogin()}
                >
                    Login
                </button>
            </div>

        </div>
    );
};

export default Login;
