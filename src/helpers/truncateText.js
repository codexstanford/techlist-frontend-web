import React, { useState } from 'react';
import callAll from './callAll';
import styled from 'styled-components';

const truncateText = (str, length = null, ending = null) => {
  const [show, toggleShow] = useState(false);
  let spacingToRemove = 3;
  const defaultEnding = {
    truncated: (
      <DefaultButton show={show} onClick={() => toggleShow(!show)}>
        ...
      </DefaultButton>
    ),
    expanded: (
      <DefaultButton show={show} onClick={() => toggleShow(!show)}>
        see less
      </DefaultButton>
    ),
  };

  if (length == null) {
    length = 150;
  }

  if (ending !== null) {
    const { truncated, expanded } = ending;

    let finalTruncated = truncated;
    let finalExpanded = expanded;

    if (truncated && expanded) {
      switch (typeof finalTruncated) {
        case 'string':
          spacingToRemove = finalTruncated.length;
          finalTruncated = (
            <DefaultButton show={show} onClick={() => toggleShow(!show)}>
              {finalTruncated}
            </DefaultButton>
          );
          break;
        case 'object':
          spacingToRemove = finalTruncated.props.children.length;
          finalTruncated = React.cloneElement(finalTruncated, {
            onClick: finalTruncated.props.onClick
              ? callAll(finalTruncated.props.onClick(), () => toggleShow(!show))
              : () => toggleShow(!show),
            style: {
              ...finalTruncated.props.style,
              display: 'inline-block',
              cursor: 'pointer',
            },
          });
          break;
      }

      switch (typeof expanded) {
        case 'string':
          finalExpanded = (
            <DefaultButton show={show} onClick={() => toggleShow(!show)}>
              {finalExpanded}
            </DefaultButton>
          );
          break;
        case 'object':
          finalExpanded = React.cloneElement(finalExpanded, {
            onClick: finalExpanded.props.onClick
              ? callAll(finalExpanded.props.onClick(), () => toggleShow(!show))
              : () => toggleShow(!show),
            style: {
              ...finalExpanded.props.style,
              display: 'inline-block',
              cursor: 'pointer',
            },
          });
          break;
      }

      ending = { truncated: finalTruncated, expanded: finalExpanded };
    } else {
      ending = defaultEnding;
    }
  }

  if (ending === null) {
    ending = defaultEnding;
  }

  if (str.length <= length) {
    return <p>{str.substring(0)}</p>;
  } else if (show) {
    return (
      <>
        {str.substring(0)}
        {ending.expanded}
      </>
    );
  } else if (!show && str.length > length) {
    return (
      <>
        {str.substring(0, length - spacingToRemove).trim()}
        {ending.truncated}
      </>
    );
  }
};

const DefaultButton = styled.button`
  display: inline-block;
  border: none;
  background-color: inherit;
  padding: ${props => (props.show ? ' 0 5px' : 0)};
  font-size: 16px;
  cursor: pointer;
  color: gray;
  outline: none;
`;

export default truncateText;
