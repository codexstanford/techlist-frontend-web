import React from 'react';
import CodeXTextField from '../../../components/codex.textinput';
import CompanyTargetMarketSelect from './select';
import { Field } from 'formik';
import styled from 'styled-components';

export function Basics({
  errors,
  touched,
  classes,
  targetMarkets,
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
      <YearAndMarketLayout>
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
          />
        </div>
      </YearAndMarketLayout>
    </div>
  );
}

const YearAndMarketLayout = styled.div`
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
