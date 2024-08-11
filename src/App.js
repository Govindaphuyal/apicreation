import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import UserState from "./components/context/userState/UserState";
import './App.css';
import Login from './components/login/UserLogin.js';
import PrivateRoute from "./components/PrivateRoute.js";

const App = () => {
  return (
    <>
      <UserState>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />  
            </PrivateRoute>
          }
          />
        </Routes>
      </UserState>
    </>
  );
};

export default App;
