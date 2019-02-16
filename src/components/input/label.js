import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

/* eslint no-magic-numbers: off */

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  isFocused: PropTypes.bool,
  labelSpacing: PropTypes.number,
  modifiers: PropTypes.array,
  move: PropTypes.bool,
  style: PropTypes.object
};

export default Label;

function Label({ children, id, style, isFocused, move, ...props }) {
  return (
    <StyledLabelWrap modifiers={props.modifiers}>
      <StyledLabel
        isFocused={isFocused}
        move={move}
        htmlFor={id}
        style={style}
        modifiers={props.modifiers}
        labelSpacing={props.labelSpacing ? props.labelSpacing : null}
      >
        {children}
      </StyledLabel>
    </StyledLabelWrap>
  );
}

const StyledLabel = styled.label.attrs(props => ({}))`
  font-size: 13px;
`;

const LABEL_MODIFIERS = {
  odd: () => `
  background: rgb(243,244,245);
  `
};

const StyledLabelWrap = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
  z-index: 10;
  background: white;
  padding: 0 5px;

  ${applyStyleModifiers(LABEL_MODIFIERS)};
`;
