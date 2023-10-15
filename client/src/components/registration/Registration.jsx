import React, {useState} from 'react';

import './registration.scss';
import Input from "../../utils/Input";
import {registration} from "../../actions/user";

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="registration-form">
           <h2>Register</h2>
            <div className="input-wrap">
                <Input value={email} setValue={setEmail} type="email" placeholder="Email"/>
                <Input value={password} setValue={setPassword} type="password" placeholder="Password"/>
                <button className="button btn btn-primary"
                    onClick={() => {
                        registration(email, password)
                    }}
                >
                    Register
                </button>
            </div>

        </div>
    );
};

export default Registration;
