import React from "react";
import Navbar from "../navbar/Navbar";
import Registration from './../registration/Registration'
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";

import './app.scss'

function App() {
  return (
      <BrowserRouter>
          <div className="app">
            <Navbar/>
              <Routes>
                  <Route path="/registration" element={<Registration/>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
