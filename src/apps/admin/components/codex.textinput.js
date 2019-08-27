import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function CodeXTextField({
  name,
  type = 'text',
  label,
  component = TextField,
  errors,
  touched,
  InputLabelProps,
  ...rest
}) {
  return (
    <>
      <Field
        name={name}
        type={type}
        label={label || name}
        component={component}
        fullWidth={false}
        InputLabelProps={InputLabelProps}
        {...rest}
      />
      {/* {fieldErrors && isTouched ? <div>{fieldErrors}</div> : null} */}
    </>
  );
}
