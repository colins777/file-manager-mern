import React from "react";
import Navbar from "../navbar/Navbar";
import Registration from '../authorization/Registration'
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";

import './app.scss'
import Login from "../authorization/Login";

function App() {
  return (
      <BrowserRouter>
          <div className="app">
            <Navbar/>
              <Routes>
                  <Route path="/registration" element={<Registration/>} />
                  <Route path="/login" element={<Login/>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
