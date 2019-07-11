import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getDisplayedErrorMessage } from '../../../features/company.create/helpers';
import styled from 'styled-components';

const FormErrorMessage = ({ touched, errors }) => {
  if (getDisplayedErrorMessage(touched, errors) !== null) {
    return (
      <ErrorMessageContainer>
        <FormHelperText error={true}>
          Error in {getDisplayedErrorMessage(touched, errors).section} section.
        </FormHelperText>
        <FormHelperText error={true}>
          {getDisplayedErrorMessage(touched, errors).message}
        </FormHelperText>
      </ErrorMessageContainer>
    );
  } else {
    return null;
  }
};

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export default FormErrorMessage;
