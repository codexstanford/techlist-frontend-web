import React from 'react';
import Transition from 'components/transition';

/* eslint react/prop-types: 0 */

const wrapPageElement = ({ element, props }) => {
  return <Transition {...props}>{element}</Transition>;
};

export default wrapPageElement;
