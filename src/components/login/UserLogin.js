import { useContext,useEffect } from "react";
import { toast } from 'react-toastify';
import {Slider} from './slide.js'
import React from "react";
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
//import image from "./3d-web-developer-working-on-project-illustration-png (1).webp"
import "./userLogin.css"
import UserContext from "../context/userState/UserContext.js";

const UserLogin = () => {
  const { formValues,setFormValues, userName, setUserName, password, setPassword,isAuthenticated,setIsAuthenticated ,navigate,Login} =
    useContext(UserContext);
    
    
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/user'); 
      }
    }, [isAuthenticated, navigate, setUserName, setPassword]);

  const handleUserChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    setFormValues((prev) => ({ ...prev, userName: e.target.value }));
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    setFormValues((prev) => ({ ...prev, password: e.target.value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const reqBody={
        userName:userName,
        password:password,
        Source: "D",
        Device: "A",
        NotToken: "eee"
      }
      const response=await fetch("https://testing.esnep.com/happyhomes/api/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Signature: "p0m76",
        },
        body: JSON.stringify(reqBody)
      })
      const out=await response.json();
      
      if(out.StatusCode===200){
        setIsAuthenticated(true);
        toast.success("Login successfull Redirecting...");
       // navigate('/user');
        Login() 
      }else {
        toast.error("Login failed. Please check your username and password.");
        console.error("Login failed:", out.Message);
        setPassword("");
        setUserName("")
      }
    }catch(err){
            console.log(err)
    }
  };
  return (
    <>
      <div className="Login-screen">
        <div className="login-form">
        <Box
        component="section"
       height={500}
       width={1500}
      display="flex"
     justifyContent="center"
      alignItems="center"
      sx={{ p: 2 }}> 
          <div className="left-part" > 
               <Slider/>
          </div>
          <div className="right-part">
            <h3>Login</h3>
            <div className="input-group">
              <label htmlFor="userName">
                UserName
                <sup style={{ color: "red" }}>*</sup>
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                className="form-control"
                value={userName}
                onChange={handleUserChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Password
                      <sup style={{ color: "red" }}>*</sup>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="submit-section mt-3">
              <Button variant="contained" size="lg" onClick={handleSubmit}>
                Login
              </Button>{" "}
            </div>
          </div>
          </Box>
        </div>
      </div>
    </>
  );
};
export default UserLogin;
