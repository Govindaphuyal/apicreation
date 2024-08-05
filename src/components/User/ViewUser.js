import React, { useContext, useEffect } from "react";
import CloseIcon from "../../images/CloseIcon.svg";
import $ from "jquery";

const ViewUser = ({ viewList, viewPop, setViewPop }) => {
  const closePopUp = (e) => {
    setViewPop(false);
    $(".viewUserPop").slideUp(500);
    $(".viewUserPopBg").fadeOut(500);
  };

  const data = [
    {
      title: "FullName",
      body:viewList.fullName 
        
    },
    {
      title: "Position",
      body:viewList.position 
        
    },
    {
      title: "Company",
      body:viewList.comName 
        
    },

    {
      title: "Email",
      body: viewList.email
    }
  ]
    

  useEffect(() => {
    if (viewPop) {
      $(".viewUserPopBg").fadeIn(500);
      $(".viewUserPop").slideDown(500);
    }
  }, [viewPop]);
  return (
    <>
      <div className="popup-bg viewUserPopBg">
        <div className="popup viewUserPop">
          <div className="popup-head">
            <div className="popUpTitle">View</div>
            <div className="popUpClose">
              <img
                className="popUpCloseIcon"
                src={CloseIcon}
                alt="CloseIcon"
                onClick={closePopUp}
              />
            </div>
          </div>

          <div className="popup-body p-3">
            <div className="">
              <table className="table">
                <tbody>
                  {data.map((props) => {
                    const{title,body}=props
                    return (
                      <>
                        <tr key="id">
                          <td
                            className="fw-bold"
                            style={{ width: "max-content" }}
                          >
                            {title}
                          </td>
                          <td
                            style={{
                              borderLeft: "1px solid rgb(225, 226, 227)",
                            }}
                          >
                            {body}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="popup-footer">
            <div className="row  mt-1 mb-1">
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-danger me-3"
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

export default ViewUser;
