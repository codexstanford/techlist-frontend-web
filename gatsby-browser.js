import React from 'react';
import AppProvider from 'store/provider';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';
import Auth from '@aws-amplify/auth';
import { setUser } from './src/services/auth';

// React Context in Browser
// eslint-disable-next-line react/prop-types

export const onRouteUpdate = async (state, page, pages) => {
  // console.log('actually called');
  // const user = await Auth.currentAuthenticatedUser().catch(err => {
  //   console.log('ERROR IN ON ROUTE UPDATE', err);
  //   // window.localStorage.setItem('gatsbyUser', null);
  // });
  // console.log('user in onrouteupdate,', user);
  // if (user) {
  //   const userInfo = {
  //     ...user.attributes,
  //     username: user.username,
  //   };
  //   console.log('never called');
  //   setUser(userInfo);
  // }
};

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

// Page Transitions
