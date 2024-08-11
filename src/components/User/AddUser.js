import React, { useContext, useEffect,useRef } from "react";
import CloseIcon from "../../images/CloseIcon.svg";
import Plus from "../../images/Plus.png";
import $ from "jquery";
import UserContext from "../context/userState/UserContext";

const AddUser = ({ setAddPop, addPop }) => {
  const fileInputRef = useRef(null);

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
    addData
    
  } = useContext(UserContext);

  useEffect(() => {
    if (addPop) {
      $(".addUserPopBg").fadeIn(500);
      $(".addUserPop").slideDown(500);
    }
  }, [addPop]);

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormValues({ ...formValues, [name]: value });
  };



  function handleAddImageChange(e) {
    e.preventDefault()
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                setImage(e.target.result);
                setIsUploaded(true);
                
        setFormValues((prevValues) => ({
          ...prevValues,
          image: reader.result
        }));
  reader.readAsDataURL(file);
  }
}
  }
  const closePopUp = (e) => {
    $(".addUserPopBg").fadeOut(500);
    $(".addUserPop").slideUp(500);
    setFormErrors({});
    setAddPop(false);
    setAddSubmit(false);
    setFormValues(initialValue);
    setIsUploaded(false);
    setImage("");

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

  const handleSubmit =(e) => {
    // setFormErrors(validate(formValues));
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const filteredFormValues = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => value !== null && value !== "")
      );
      //setAddSubmit(false);
      addData(filteredFormValues);
      setAddSubmit(true);
      
      
      closePopUp();
      
    }
    
    
    
    
    //console.log(formValues);
   
    setIsUploaded(true);
     setImage("")
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
    if (Object.keys(formErrors).length === 0 && addSubmit) {
      addData(formValues);
      setAddSubmit(true);
    }
  }, [formErrors, addSubmit, formValues, addData]);
  return (
    <>
      <div className="popup-bg addUserPopBg">
      <div className="popup addUserPop">
        <div className="popup-head">
          <div className="popUpTitle">Add</div>
          <div className="popUpClose">
            <img
              className="popUpCloseIcon"
              src={CloseIcon}
              alt="CloseIcon"
              onClick={closePopUp}
            />
          </div>
        </div>

        <div className="popup-body p-3 addPopBody">
          <div className="form__wrapper">
            <div className="row">
              <div className="col-md-4 wrapper">
                <div className="form-group">
                  <label htmlFor="fullName">
                    FullName
                    <sup style={{ color: 'red' }}>*</sup>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.fullName}
                  />
                  {formErrors.fullName && (
                    <p className="errormsg">{formErrors.fullName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 wrapper">
                <div className="form-group">
                  <label htmlFor="email">
                    Email
                    <sup style={{ color: 'red' }}>*</sup>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
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
                    <sup style={{ color: 'red' }}>*</sup>
                  </label>
                  <input
                    id="comName"
                    type="text"
                    name="comName"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.comName}
                  />
                  {formErrors.comName && (
                    <p className="errormsg">{formErrors.comName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 wrapper">
                <div className="form-group">
                  <label htmlFor="comment">
                    Comment
                    <sup style={{ color: 'red' }}>*</sup>
                  </label>
                  <input
                    id="comment"
                    type="text"
                    name="comment"
                    className="form-control"
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
                  <label htmlFor="position">Position</label>
                  <input
                    id="position"
                    type="text"
                    name="position"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.position}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group wrapper">
                <div
                  className="form-label"
                  htmlFor="text"
                  style={{ fontSize: '12px', textAlign: 'left' }}
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
                            draggable="false"
                            alt="placeholder"
                            style={{
                              width: 90,
                              height: 100,
                              paddingTop: '10px',
                            }}
                          />
                        </label>
                        
                        <input
                          id="upload-input"
                          type="file"
                          accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                          onChange={handleAddImageChange}
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
          <div className="row mt-1 mb-1">
            <div>
              <button
                type="button"
                className="btn btn-sm me-2"
                style={{ background: '#4681c3', color: 'white' }}
                onClick={handleSubmit}
              >
                Submit
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

export default AddUser;
