import React, { useContext, useState,useMemo } from "react";
import UserContext from "../context/userState/UserContext";
import NavbarContext from "../context/navbar-context";
import { AiOutlineEdit, AiOutlineEye,AiOutlinePlus ,AiOutlineDelete,AiOutlineBackward,AiOutlineLogout } from "react-icons/ai";
import DataTable from "react-data-table-component";
import Spinner from "../loading/spinner";
import RemoveUser  from "./RemoveUser.js";
import EditUser from "./EditUser";
import AddUser from "./AddUser.js";
import ViewUser from "./ViewUser";
import { showImgPreview } from "../hooks/ImagePreview";
import Toast from "../../Toast";
const User = () => {
  const {
    initialValue,

    submit,
    setSubmit,
    userList,
    userBuddle,
    setUserList,
    loading,
    setLoading,
    userLst,

    originalList,
    setOriginalList,
    handleView,
    perID,
    setPerId,
    editPop,
    setEditPop,
    addPop,
    setAddPop,
    viewPop,
    setViewPop,
    viewList,
    setViewList,
    handleEdit,
    handleAdd,
    handleRemove,
    setRemovePop,
    removePop,
    navigate,
    logout,
    handleLogout
  } = useContext(UserContext);
  const [imgPrv, setImgPrv] = useState(false);
  const [imagePre, setImagePre] = useState("");
  const { customStylesForImage } = useContext(NavbarContext);
  const [popUp, setPopUp] = useState(false);
  const[rowPrev,setRowprev]=useState([])
  
    
  
  const filteredUserList = useMemo(() => {
    const userArray = Object.values(userList); 
    return userArray.filter(row =>
      row.FullName && row.Position && row.Email
    );
  }, [userList]);

  const columns = [
    {
      name: "S.N.",
      grow: 0,
      center: true,
      width: "70px",
      cell: (row, index) => row.TestimonialID,
    },
    {
      name: "Image",
      center: true,
      width: "70px",
      selector: (row) => {
        setRowprev(row);
        return (
          <>
            <div className="staffContentLogo">
              <div className="staffImg">
                <img
                  src={row.UserImage}
                  alt=""
                  onClick={() => {
                    setImagePre(row.UserImage);
                    setImgPrv(true);
                  }}
                />
              </div>
            </div>
          </>
        );
      }
    
    },
    {
      name: "FullName",
      // center: true,
      // grow: 0,
      // minWidth: "200px",
      selector: (row) => row.FullName,
    },
    {
      name: "Position",
      // center: true,
      // grow: 0,
      // minWidth: "200px",
      selector: (row) => row.Position,
    },
    {
      name: "Company",
      center: true,
      minWidth: "150px",
      selector: (row) => row.ComName,
    },

    {
      name: "Email",
      center: true,
      minWidth: "150px",
      selector: (row) => row.Email,
    },

    {
      name: "Action",
      center: true,
      width: "200px",
      selector: (row) => {
        return (
          <>
            <div className="ln-verition d-flex">
              <button
                type="button"
                className="btn btn-sm downloadspan mx-1"
                onClick={() => handleView(row)}
                uk-tooltip="View"
              >
                <AiOutlineEye />
              </button>{" "}
              <button
                type="button"
                className="btn btn-sm editspan mx-1"
                onClick={() => handleEdit(row)}
                uk-tooltip="Edit"
              >
                <AiOutlineEdit />
              </button>{" "}

              <button
                type="button"
                className="btn btn-sm editspan mx-1"
                onClick={() => handleRemove(row.TestimonialID)}
                uk-tooltip="delete"
              >
                <AiOutlineDelete />
              </button>{" "}
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="uk-container">
    <button type="button"
                className="btn btn-sm editspan mx-1"
                onClick={() => handleAdd(rowPrev)}
                uk-tooltip="Add"><AiOutlinePlus/></button>{" "}
    
    <button type="button"
                className="btn btn-sm editspan mx-1"
                onClick={handleLogout}
                uk-tooltip="Logout"><AiOutlineLogout /></button>{" "}
      <Toast />
      {loading ? (
        <Spinner />
      ) : (
        
        <DataTable
          columns={columns}
          data={filteredUserList}
          customStyles={customStylesForImage}
          pagination
          paginationRowsPerPageOptions={[10, 20, 50, 100]} // Customizable options
          fixedHeader
          fixedHeaderScrollHeight="350px"
          highlightOnHover
          pointerOnHover
          responsive
          dense
          striped
          subHeader
          
        />
        
      )}
               
      <EditUser setEditPop={setEditPop} editPop={editPop} />
      <ViewUser viewList={viewList} viewPop={viewPop} setViewPop={setViewPop} />
       <AddUser setAddPop={setAddPop} addPop={addPop}/> 
       <RemoveUser setRemovePop={setRemovePop} removePop={removePop}/>
      {imgPrv &&
        showImgPreview({
          img: imagePre,
          setTrigger: setImgPrv,
        })}
    </div>
  );
};

export default User;
