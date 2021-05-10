import React from "react";
import {Badge, IconButton} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const CartButton = ({onClick, badgeContent}) => {
  return (
    <>
      <IconButton
        onClick={onClick}
        color="inherit"
        className="user-icon-btn"
      >
        <Badge badgeContent={badgeContent} color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>
    </>
  );
};

