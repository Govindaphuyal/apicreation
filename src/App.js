import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import UserState from "./components/context/userState/UserState";
import './App.css'

const App = () => {
  return (
    <>
      <UserState>
        <Routes>
          <Route path="/" element={<User />} />
        </Routes>
      </UserState>
    </>
  );
};

export default App;
