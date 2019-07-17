import React from 'react';
import AppProvider from 'store/provider';

export const registerServiceWorker = () => true;

export const onRouteUpdate = ({ location, prevLocation }) => {
  // console.log('new pathname', location.pathname);
  // console.log('old pathname', prevLocation ? prevLocation.pathname : null);
  // Track pageview with google analytics
};

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

// Page Transitions
export const onPreRouteUpdate = ({ location, prevLocation }) => {
  // console.log('Gatsby started to change location to', location.pathname);
  // console.log(
  //   'Gatsby started to change location from',
  //   prevLocation ? prevLocation.pathname : null
  // );
};
