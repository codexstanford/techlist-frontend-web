import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  console.log(classes);

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        fullwidth: true,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}
