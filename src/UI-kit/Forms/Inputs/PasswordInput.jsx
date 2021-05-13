import React, {forwardRef} from "react";
import {TextField} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

export const PasswordInput = forwardRef((props, ref) => {
  return (
    <TextField
      label="Пароль"
      type="password"
      variant={"outlined"}
      fullWidth
      size={"medium"}
      margin={"normal"}
      {...ref}
      {...props}
      InputProps={{
        endAdornment: <VpnKeyIcon fontSize={"large"} color={"disabled"}/>,
      }}
    />
  );
});
