import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  const { onBlur } = InputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
        onFocus: onBlur, // won't run passsing onBlur have to use onFocus
      }}
      {...other}
    />
  );
}

export default renderInput;
