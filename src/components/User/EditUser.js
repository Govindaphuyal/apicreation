import React, { useContext, useEffect } from "react";
import CloseIcon from "../../images/CloseIcon.svg";
import Plus from "../../images/Plus.png";
import $ from "jquery";
import UserContext from "../context/userState/UserContext";

const EditUser = ({ setEditPop, editPop }) => {
  const {
    formValues,
    setFormValues,
    formErrors,
    setFormErrors,
    editSubmit,
    setEditSubmit,
    editData,
    
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
  } = useContext(UserContext);

  useEffect(() => {
    if (editPop) {
      $(".editUserPopBg").fadeIn(500);
      $(".editUserPop").slideDown(500);
    }
  }, [editPop]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleAllowChange = (e) => {
    setAllow(!allow);
  };
  const handleVerifyChange = (e) => {
    setVerified(!verified);
  };

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const closePopUp = (e) => {
    setEditPop(false);
    $(".editUserPopBg").fadeOut(500);
    $(".editUserPop").slideUp(500);
    setFormErrors({});
    setEditSubmit(false);
    setFormValues(initialValue);
    setIsUploaded(false);
    setImage("");
    setAllow(false);
    setVerified(false);
  };

  const validate = (values) => {
    const errors = {};
    // const numv = /^[0-9]+$/i;
    // const digits = /^\d{10}$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fullName) {
      errors.fullName = "Required";
    }
    if (!values.comName) {
      errors.comName = "Required";
    }
    if (!values.comment) {
      errors.comment = "Required";
    }
    if (!values.position) {
      errors.position = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setEditSubmit(true);
      editData(formValues);
      setEditSubmit(false);
      closePopUp();
    }
    
    // setEditSubmit({
    //   fullName:e.target.FullName,
    //   email:e.target.Email,
    //   comment:e.target.Comment,
    //   comName:e.target.ComName,
    //   position:e.target.Position
      
      
    // })
    //console.log(formValues);
   
    setIsUploaded(e.target.UserImage);
   setImage(e.target.UserImage)
    // if (Object.keys(errors).length === 0) {
    //   setEditSubmit(true);
    //   editData(formValues);
    //   setEditSubmit(false);
    //   closePopUp();
    // }
  //   console.log(formValues)
    
  //  setEditSubmit({
  //   FullName:formValues.fullName,
  //   Email:formValues.email,
  //   Comment:formValues.comment,
  //   ComName:formValues.comName,
  //   Position:formValues.position,
  //   UserImage:formValues.userImage

  // })
  // editData(formValues.fullName);
  //     setEditSubmit(false);

  
  

  

    
    
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && editSubmit) {
      editData(formValues);
      setEditSubmit(true);
    }
  }, [formErrors]);
  return (
    <>
      <div className="popup-bg editUserPopBg">
        <div className="popup editUserPop">
          <div className="popup-head">
            <div className="popUpTitle">Edit</div>
            <div className="popUpClose">
              <img
                className="popUpCloseIcon"
                src={CloseIcon}
                alt="CloseIcon"
                onClick={closePopUp}
              />
            </div>
          </div>

          <div className="popup-body p-3 editPopBody">

            <div className="form__wrapper">
              <div className="row  ">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      FullName
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="fullname"
                      type="text"
                      name="fullName"
                      className="form-control"
                      onChange={handleChange}
                      value={formValues.fullName}
                    />
                    {formErrors.fullName&& (
                      <p className="errormsg">{formErrors.fullName}</p>
                    )}
                  </div>
                </div>
                
                
              </div>

              <div className="row  ">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control "
                      onChange={handleChange}
                      value={formValues.email}
                    />
                    {formErrors.email && (
                      <p className="errormsg">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="comName">
                      Company
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="comName"
                      type="text"
                      name="comName"
                      className="form-control "
                      onChange={handleChange}
                      value={formValues.comName}
                    />
                    {formErrors.comName && (
                      <p className="errormsg">{formErrors.comName}</p>
                    )}
                  </div>
                </div>
                
              </div>
              <div className="row  ">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="district">
                      Comment
                      <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <input
                      id="commentt"
                      type="text"
                      name="comment"
                      className="form-control "
                      onChange={handleChange}
                      value={formValues.comment}
                    />
                    {formErrors.comment && (
                      <p className="errormsg">{formErrors.comment}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 wrapper">
                  <div className="form-group">
                    <label htmlFor="posiNum">Position</label>
                    <input
                      id="position"
                      type="text"
                      name="position"
                      className="form-control "
                      onChange={handleChange}
                      value={formValues.position}
                    />
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="form-group wrapper ">
                  <div
                    className="form-label"
                    htmlFor="text"
                    style={{ fontSize: "12px", textAlign: "left" }}
                  >
                    Upload Image
                  </div>

                  <div className="BoxUpload">
                    <div className="image-upload">
                      {!isUploaded ? (
                        <>
                          <label htmlFor="upload-input">
                            <img
                              src={Plus}
                              draggable={"false"}
                              alt="placeholder"
                              style={{
                                width: 90,
                                height: 100,
                                paddingTop: "10px",
                              }}
                            />
                          </label>

                          <input
                            id="upload-input"
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                            onChange={handleImageChange}
                            name="image"
                          />
                        </>
                      ) : (
                        <div className="ImagePreview">
                          <img
                            className="close-icon"
                            src={CloseIcon}
                            alt="CloseIcon"
                            onClick={() => {
                              setIsUploaded(false);
                              setImage(null);
                            }}
                          />

                          <img
                            id="uploaded-image"
                            src={image}
                            draggable={false}
                            alt="uploaded-img"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <div className="popup-footer">
            <div className="row  mt-1 mb-1">
              <div>
                <button
                  type="button"
                  className="btn btn-sm me-2"
                  style={{ background: "#4681c3", color: "white" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger me-3"
                  style={{ color: "white" }}
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

export default EditUser;
