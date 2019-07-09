import React from 'react';
import CodeXTextField from '../../../components/codex.textinput';
import CompanyTargetMarketSelect from './select';
import { Field } from 'formik';

export function Basics({
  errors,
  touched,
  classes,
  targetMarkets,
  validateField,
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
      <CodeXTextField
        name="name"
        type="text"
        errors={errors}
        touched={touched}
        label="Name"
        fullWidth={true}
        onBlur={event => {
          console.log('field validated');
          validateField('name');
          console.log('field validated');
          handleBlur(event);
        }}
      />
      <CodeXTextField
        type="text"
        name="description"
        multiline={true}
        margin="normal"
        errors={errors}
        touched={touched}
        label="Description"
      />
      <div style={{ display: 'flex' }}>
        <CodeXTextField
          name="yearFounded"
          margin="normal"
          type="date"
          errors={errors}
          touched={touched}
          label="Date Founded"
          fullWidth={false}
        />
        <div>
          <Field
            name="targetMarkets"
            component={CompanyTargetMarketSelect}
            classes={classes}
            options={
              targetMarkets &&
              targetMarkets.organizationTargetMarkets &&
              targetMarkets.organizationTargetMarkets.length > 0
                ? targetMarkets.organizationTargetMarkets.map(t => ({
                    type: t.id,
                    niceName: t.payload,
                  }))
                : []
            }
            label="Target Markets"
            styles={{
              paddingRight: '1rem',
              minWidth: '150px',
              marginTop: '15px',
              marginLeft: '2rem',
            }}
          />
        </div>
      </div>
    </div>
  );
}
