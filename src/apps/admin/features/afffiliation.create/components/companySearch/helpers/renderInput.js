import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export function renderInput(inputProps) {
  const { InputProps, classes, ref, error, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        error: error,
        inputRef: ref,
        fullwidth: 'true',
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
