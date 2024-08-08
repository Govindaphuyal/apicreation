import React, { useContext, useEffect,useRef } from "react";
import CloseIcon from "../../images/CloseIcon.svg";
import Plus from "../../images/Plus.png";
import $ from "jquery";
import UserContext from "../context/userState/UserContext";

const RemoveUser = ({ setRemovePop, removePop }) => {

  const {
    formValues,
    setFormValues,
    formErrors,
    setFormErrors,
    addSubmit,
    setAddSubmit,
             
    initialValue,
    isUploaded,
    setIsUploaded,
    typeFile,
    setTypeFile,
    image,
    setImage,
    allow,
    setAllow,
    verified,
    setVerified,
    userData,
    userList,
    setUserList,
    userId
  } = useContext(UserContext);

  useEffect(() => {
    if (removePop) {
      $(".addRemovePopBg").fadeIn(500);
      $(".addRemovePop").slideDown(500);
    }
  }, [removePop]);

  const closePopUp = (e) => {
    $(".addRemovePopBg").fadeOut(500);
    $(".addRemovePop").slideUp(500);
    setFormErrors({});
    setRemovePop(false);
    setAddSubmit(false);
    setFormValues(initialValue);
    

  };

  


  const handleDelete =() => {
    console.log(userList)
    const updatedUserList = userList.filter((u) => u.TestimonialID !== userId);
     setUserList(updatedUserList);
      
      
      closePopUp(); 
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && addSubmit) {
       // removeData(formValues);
      setAddSubmit(true);
    }
  }, [formErrors, addSubmit, formValues]);
  return (
    <>
      <div className="popup-bg addRemovePopBg">
      <div className="popup addRemovePop">
        <div className="popup-head">
          <div className="popUpTitle">Delete</div>
          <div className="popUpClose">
            <img
              className="popUpCloseIcon"
              src={CloseIcon}
              alt="CloseIcon"
              onClick={closePopUp}
            />
          </div>
        </div>

        <div className="popup-body p-1 addPopBody">
          <div className="form__wrapper">
            
            
            <div className="row">
              <h1>Are you sure you want to delete?</h1>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <div className="row mt-1 mb-1">
            <div>
              <button
                type="button"
                className="btn btn-sm me-2"
                style={{ background: '#4681c3', color: 'white' }}
                onClick={handleDelete}
              >
                OK
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger me-3"
                style={{ color: 'white' }}
                onClick={closePopUp}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RemoveUser;
