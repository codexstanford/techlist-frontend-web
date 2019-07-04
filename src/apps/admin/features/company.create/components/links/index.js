import React from 'react';
import { Field } from 'formik';
import CompanyLinksInput from './links.input';

export function Links({ setFieldValue, setValues, values, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <CompanyLinksInput
        setFieldValue={setFieldValue}
        setValues={setValues}
        values={values}
        {...rest}
      />
    </div>
  );
}
