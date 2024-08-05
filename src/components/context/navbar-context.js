import React, { useState } from "react";
import { defaultThemes } from "react-data-table-component";

const NavbarContext = React.createContext();

export const NavbarContextProvider = (props) => {
  const appURL = process.env.REACT_APP_URL;

  // css for table
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "10px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: defaultThemes.default.divider.default,
      },
    },
    cells: {
      style: {
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: defaultThemes.default.divider.default,
      },
    },
    rows: {
      style: {
        minHeight: "60px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f2f0f0",
        borderBottomColor: "#FFFFFF",
        outline: "1px solid #FFFFFF",
        fontWeight: "650",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      },
    },
  };

  const customStylesForImage = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "10px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: defaultThemes.default.divider.default,
      },
    },
    cells: {
      style: {
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: defaultThemes.default.divider.default,
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "#f2f0f0",
        borderBottomColor: "#FFFFFF",
        outline: "1px solid #FFFFFF",
        fontWeight: "650",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      },
    },
  };

  //customstyles end
  return (
    <NavbarContext.Provider
      value={{
        appURL,
        customStyles,
        customStylesForImage,
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
