import React, {useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Registration from '../authorization/Registration'
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {auth} from "../../redux-toolkit/features/userSlice";

import './app.scss'
import Login from "../authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import Drive from "../drive/Drive";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        //if(isAuth) {
          //  dispatch(auth({login: 'colins', password: 123456}));
        dispatch(auth());
      //  }
    }, []);

  return (
      <BrowserRouter>
          <div className="app">
            <Navbar/>
              {!isAuth ?
                  //@TODO need redirect to Drive after login
                  <Routes>
                      <Route path="/registration" element={<Registration/>}/>
                      <Route path="/login" element={<Login/>}/>
                      {/*<Navigate replace to="/login" />*/}
                  </Routes>
                  :
                  <Routes>
                      <Route path="/" element={<Drive/>}/>
                  </Routes>
              }
          </div>
      </BrowserRouter>
  );
}

export default App;
