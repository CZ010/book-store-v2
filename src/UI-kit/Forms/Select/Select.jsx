import React, {forwardRef} from "react";
import {FormControl, FormHelperText, InputLabel, Select} from "@material-ui/core";

export const SelectList = forwardRef(({
                                        children, label, error, helperText
                                      },
                                      ref) => {
  return (
    <FormControl variant="outlined" fullWidth size="small" margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...ref}
        label={label}
        defaultValue={""}

      >
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
});

