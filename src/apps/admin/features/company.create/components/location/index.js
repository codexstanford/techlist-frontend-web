import React from 'react';
import { Field } from 'formik';
import CodeXTextField from '../../../../components/codex.textinput';
import AddressField from './address';
import { CompanyLocationMap } from '../../../../../../templates/company/locationmap';

export function Location({
  setFieldValue,
  setValues,
  values,
  handleBlur,
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <AddressField
        setFieldValue={setFieldValue}
        setValues={setValues}
        handleBlur={handleBlur}
        {...rest}
      />
      {values.locationjson && values.locationjson.geometry ? (
        <CompanyLocationMap
          geometry={values.locationjson.geometry}
          location={values.locationjson}
        />
      ) : null}
    </div>
  );
}
