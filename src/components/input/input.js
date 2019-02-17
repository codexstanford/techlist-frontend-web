import React from 'react';
import PropTypes from 'prop-types';
import Field from './field';
import Label from './label';
import styled from 'styled-components';

TextInput.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  labelModifiers: PropTypes.array,
  onChange: PropTypes.func,
  width: PropTypes.number,
};

function TextInput({ label, id, onChange, width, labelModifiers, ...props }) {
  return (
    <StyledInputWrapper>
      {label && (
        <Label
          id={`label-${id}`}
          htmlFor={id}
          modifiers={labelModifiers}
          {...props}
        >
          {label}
        </Label>
      )}
      <Field onInput={onChange} id={id} width={width} {...props} />
    </StyledInputWrapper>
  );
}

export default TextInput;

const StyledInputWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  position: relative;
  font-weight: 700;
  width: 100%;
  &:focus + label {
    font-weight: 900;
  }
`;
