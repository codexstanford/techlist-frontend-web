import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const elevation = [
  'box-shadow: inset 0 7px 9px -7px rgba(0,0,0, 0.7)',
  'box-shadow: 0 1px 3px rgba(0,0,0, 0.12), 0 1px 2px rgba(0,0,0, 0.24)',
  'box-shadow: 0 3px 6px rgba(0,0,0, 0.16), 0 3px 6px rgba(0,0,0, 0.23)',
];

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  leftButton: PropTypes.node,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  password: PropTypes.bool,
  rightButton: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

InputField.defaultProps = {
  leftButton: undefined,
  password: false,
  rightButton: undefined,
  type: 'text',
};

export default InputField;

/* eslint no-console: off */

function InputField({ leftButton, rightButton, onChange, ...props }) {
  return (
    <InputWrapper width={props.width} height={props.height}>
      {leftButton && <InputButtonWrapper left>{leftButton}</InputButtonWrapper>}
      <Input left={leftButton} onChange={onChange} {...props} />
      {rightButton && (
        <InputButtonWrapper left={false}>{rightButton}</InputButtonWrapper>
      )}
    </InputWrapper>
  );
}

/* eslint react/prop-types: off */
/* eslint no-magic-numbers: off */

const InputWrapper = styled.div.attrs(props => ({
  height: props.height || 60,
}))`
  max-width: 50vw;
  display: flex;
  height: 50px;
  width: 100%;
  position: relative;
`;

const InputButtonWrapper = styled.div.attrs(props => ({
  height: props.height || 60,
  inputWidth: props.width - 0.2 * props.height || 600 - 12,
}))`
  width: ${props => props.height * 0.5}px;
  height: ${props => props.height * 0.5}px;
  position: absolute;
  top: ${props => props.height * 0.15}px;
  left: ${({ left, inputWidth }) => (left ? '5px' : `${inputWidth * 0.925}px`)};
  z-index: 10;
`;

const Input = styled.input.attrs(props => ({
  height: props.height || 60,
  readOnly: props.readOnly,
  width: props.width || 600,
}))`
  max-width: ${props => props.width}px;
  min-height: ${props => props.height * 0.75}px;
  width: 100%;
  cursor: text;
  outline: none;
  overflow: hidden;
  font-size: 1rem;
  border: none;
  border: solid 1px #ccc;
  border-radius: 10px;

  padding-left: 19px;

  &:focus {
    outline: none !important;
    border: 1px solid #f4f4f4;
    ${elevation[1]};
  }
`;
