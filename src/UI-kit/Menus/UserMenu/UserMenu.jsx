import React from "react";
import {Menu, MenuItem} from "@material-ui/core";

export const UserMenu = ({anchorEl, open, onClose, logOut}) => {
  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={onClose}
      >
        <MenuItem>Мой аккаунт</MenuItem>
        <MenuItem onClick={logOut}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

