import React from 'react';
//import 'navbar.less'
import '../../styles/style.bundle.css'
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../../redux-toolkit/features/userSlice";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();


    return (
        <div className="navbar app-container container-fluid d-flex align-items-stretch justify-content-between p-4">
            <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                <div className="logo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z" fill="currentColor"></path>
                    <path d="M10.4 3.60001L12 6H21C21.6 6 22 6.4 22 7V19C22 19.6 21.6 20 21 20H3C2.4 20 2 19.6 2 19V4C2 3.4 2.4 3 3 3H9.2C9.7 3 10.2 3.20001 10.4 3.60001ZM16 12H13V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12H8C7.4 12 7 12.4 7 13C7 13.6 7.4 14 8 14H11V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V14H16C16.6 14 17 13.6 17 13C17 12.4 16.6 12 16 12Z" fill="currentColor"></path>
                    <path opacity="0.3" d="M11 14H8C7.4 14 7 13.6 7 13C7 12.4 7.4 12 8 12H11V14ZM16 12H13V14H16C16.6 14 17 13.6 17 13C17 12.4 16.6 12 16 12Z" fill="currentColor"></path>
                </svg></div>
                <div className="header">Files Cloud Store</div>

                <div className="app-navbar flex-shrink-0">
                    {!isAuth && <div className="menu-title-login"><NavLink to="/login">Login</NavLink></div>}
                    {!isAuth && <div className="menu-title-register ms-lg-3"><NavLink to="/registration">Register</NavLink></div>}

                    {isAuth && <div className="menu-title-register ms-lg-3"
                        onClick={() => dispatch(setLogout())}
                    >
                        Logout
                    </div>}

                </div>

            </div>
        </div>
    );
};

export default Navbar;
