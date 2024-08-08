import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import UserContext from "./UserContext";
import NavbarContext from "../navbar-context";
import { Fetchdata } from "../../hooks/getData";
import $ from "jquery";

export default function UserState(props) {
  const { appURL } = useContext(NavbarContext);
  const navigate = useNavigate();
  const initialValue = {
    testimonialID: "",
    fullName: "",
    position: "",
    email: "",
    userImage: "",
    comName: "",
    comment: "",
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [editSubmit, setEditSubmit] = useState(false);
  const [addSubmit, setAddSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const [image, setImage] = useState("");
  const [allow, setAllow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [originalList, setOriginalList] = useState(null);
  const [userList, setUserList] = useState([]);
  const [editPop, setEditPop] = useState(false);
  const [addPop, setAddPop] = useState(false);
  const [removePop, setRemovePop] = useState(false);
  const [viewPop, setViewPop] = useState(false);
  const [viewList, setViewList] = useState(false);
const [userId,setUserId]=useState("");
const [userName,setUserName]=useState("");
const [password,setPassword]=useState("");
const [isAuthenticated,setIsAuthenticated]=useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    userBuddle();
    userLst();
    
  }, []);
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };
  const userLst = () => {
    const params = 
      {
        UserID: "-1",
        Flag: "S",
        IsAllow: "-1",
        IsVerified: "-1",
        UserType: "O",
        AuthCode: "r1d3r",
        FetchURL: `${appURL}admin/testimonial`,
        Type: "POST",
      }
      
    

    Fetchdata(params).then((resp) => {
      console.log(resp)
      if (resp.StatusCode === 200) {
        const postResult = resp.Values ? resp.Values : "";
        setUserList(postResult);
        setOriginalList(postResult);
      } else {
        setUserList([]);
        setOriginalList([]);
      }
      setLoading(false);
    });

    
  };
  const userBuddle = () => {
    const par = 
      {
        UserID: "2",
        Flag: "I",
        IsAllow: "-1",
        IsVerified: "-1",
        UserType: "O",
        AuthCode: "r1d3r",
        FetchURL: `${appURL}admin/testimonial`,
        Type: "POST",
      }

    Fetchdata(par).then((resp) => {
      if (resp.StatusCode === 200) {
        const postValue = resp.Values ? resp.Values : "";
        setUserList(postValue);
        setOriginalList(postValue);
      } else {
        setUserList([]);
        setOriginalList([]);
      }
      setLoading(false);
    });

    
  };
  

  const handleEdit = (data) => {
    setFormValues({
      fullName: data.FullName,
      email: data.Email,
      comment: data.Comment,
      comName: data.ComName,
      position: data.Position,
      userImage: data.UserImage,
    });

    setIsUploaded(data.UserImage);
    setImage(data.UserImage);
    setViewList({
      fullName: data.FullName,
      email: data.Email,
      comName: data.ComName,
      position: data.Position,
    });

    setEditPop(true);
  
  };

  const handleView = (data) => {
    setViewPop(true);
  };

  const handleAdd = () => {
    // setFormErrors({});
    
    setAddSubmit(false);
    setFormValues(initialValue);
    //setIsUploaded(false);
    //setImage("");
    setAllow(false);
    setVerified(false);
    // console.log(e.FullName)
    // setFormValues(e);
    setAddPop(true);
    // setViewList({
    //   fullName: e.FullName,
    //   email: e.Email,
    //   comName: e.ComName,
    //   position: e.Position,
    // });
    //setIsUploaded(true);
    setFormErrors({});
    setAddSubmit(false);
    setFormValues(initialValue);
    //setIsUploaded(data.UserImage);
    setImage(true);
    setAllow(false);
    setVerified(false);
  };
  const handleRemove=(id)=>{
    setRemovePop(true)
    setUserId(id)
      // const updatedUserList = userList.filter((u) => u.TestimonialID !== id);
      // setUserList(updatedUserList);
    
    
    
    //window.location.reload()
    
  }

  const editData = () => {
    const dataForm = {
        UserID: "1",
        Flag: "U",
        TestimonialID: "1",
        FullName: formValues.fullName,
        Position: formValues.position,
        Email: formValues.email,
        UserImage: image ? image.split(",")[1] : "",
        ComName: formValues.comName,
        Comment: formValues.comment,
        AuthCode: "r1d3r",
        FetchURL: `${appURL}admin/testimonial`,
        Type: "POST",
      }
    

    Fetchdata(dataForm).then((res) => {
    
      if (res.StatusCode === 200) {
        setEditPop(false);
        setFormValues(initialValue);
        setAllow(false);
        setVerified(false);
        setIsUploaded(false);
        setImage("");
        userLst();
        $(".editUserPopBg").fadeOut(500);
        $(".editUserPop").slideUp(500);
        toast.success(res.Message, {
          style: {
            color: "green",
            fontSize: "13px",
          },
          theme: "light",
        });
      } else {
        toast.error("Error: " + res.Message, {
          style: {
            color: "red",
            fontSize: "13px",
          },
          theme: "light",
        });
      }
    });

  }
  const addData = () => {
    
    const add = {
        UserID: "2",
        Flag: "I",
        FullName: formValues.fullName,
        Position: formValues.position,
        Email: formValues.email,
        UserImage: image ? image.split(",")[1] : "",
        ComName: formValues.comName,
        Comment: formValues.comment,
        AuthCode: "r1d3r",
        FetchURL: `${appURL}admin/testimonial`,
        Type: "POST",
      }

    Fetchdata(add).then((resp) => {
      console.log(resp)
      if (resp.StatusCode === 200) {
        setAddPop(false);
        setFormValues(formValues);
        setAllow(false);
        setVerified(false);
        setIsUploaded(false);
        setImage("");
        userLst();
        $(".addUserPopBg").fadeOut(500);
        $(".addUserPop").slideUp(500);
        toast.success(resp.Message, {
          style: {
            color: "green",
            fontSize: "13px",
          },
          theme: "light",
        });
      } else {
        toast.error("Error: " + resp.Message, {
          style: {
            color: "red",
            fontSize: "13px",
          },
          theme: "light",
        });
      }
    });

  }
  

  return (
    <UserContext.Provider
      value={{
        formValues,
        setFormValues,
        initialValue,
        formErrors,
        setFormErrors,
        submit,
        setSubmit,
        userList,
        userBuddle,
        setUserList,
        loading,
        setLoading,
        userLst,
        editSubmit,
        addSubmit,
        setAddSubmit,
        setEditSubmit,
        originalList,
        setOriginalList,
        handleView,
        handleAdd,
        editPop,
        setEditPop,
        addPop,
        setAddPop,
        viewPop,
        setViewPop,
        viewList,
        setViewList,
        handleEdit,
        editData,
        isUploaded,
        setIsUploaded,
        setUserList,
        typeFile,
        setTypeFile,
        image,
        setImage,
        allow,
        setAllow,
        verified,
        setVerified,
        addData,
        handleRemove,
        removePop,
        setRemovePop,
        setUserId,
        userId,
        userName,
        setUserName,
        password,
        setPassword,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        navigate
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
