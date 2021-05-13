import React, {forwardRef} from "react";
import {TextField} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";

export const EmailInput = forwardRef((props, ref) => {
  return (
    <TextField
      label="Почта"
      type="email"
      variant={"outlined"}
      fullWidth
      size={"medium"}
      margin={"normal"}
      {...ref}
      {...props}
      InputProps={{
        endAdornment: <EmailIcon fontSize={"large"} color={"disabled"}/>,
      }}
    />
  );
});
