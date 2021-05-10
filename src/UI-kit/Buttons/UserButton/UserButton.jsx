import React from "react";
import {IconButton, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

export const UserButton = ({onClick, name, ...props}) => {
  return (
    <>
      <IconButton
        onClick={onClick}
        color="inherit"
        className="user-icon-btn"
        {
          ...props
        }
      >
        <Typography>{name}</Typography>
        <AccountCircle className="user-icon"/>
      </IconButton>
    </>
  );
};
