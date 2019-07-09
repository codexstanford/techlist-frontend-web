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
  value,
  onBlur,
  ...rest
}) {
  // const fieldErrors = errors[name];
  // const isTouched = touched[name];
  return (
    <>
      <Field
        name={name}
        type={type}
        label={label || name}
        component={component}
        fullWidth={false}
        InputLabelProps={{}}
        value={value}
        onBlur={onBlur}
        {...rest}
      />
      {/* {fieldErrors && isTouched ? <div>{fieldErrors}</div> : null} */}
    </>
  );
}
