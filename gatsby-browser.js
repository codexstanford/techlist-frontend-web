import React from 'react';
import AppProvider from 'store/provider';
import { AuthProvider } from './src/store/auth-context';
import { UserProvider } from './src/store/user-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { configureApolloClient } from './src/store/apollo';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';

// React Context in Browser
// eslint-disable-next-line react/prop-types

// export const onRouteUpdate = async (state, page, pages) => {
//   console.log('actually called');
//   const user = await Auth.currentAuthenticatedUser().catch(err => {
//     console.log('ERROR IN ON ROUTE UPDATE', err);
//     // window.localStorage.setItem('gatsbyUser', null);
//   });
//   console.log('user in onrouteupdate,', user);
//   if (user) {
//     const userInfo = {
//       ...user.attributes,
//       username: user.username,
//     };
//     console.log('never called');
//     setUser(userInfo);
//   }
// };

const client = configureApolloClient();

export const registerServiceWorker = () => true;

export const onRouteUpdate = ({ location, prevLocation }) => {
  // console.log('new pathname', location.pathname);
  // console.log('old pathname', prevLocation ? prevLocation.pathname : null);
  // Track pageview with google analytics
};

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>{element}</ApolloHooksProvider>
        </ApolloProvider>
      </UserProvider>
    </AuthProvider>
  );
};

// Page Transitions
export const onPreRouteUpdate = ({ location, prevLocation }) => {
  // console.log('Gatsby started to change location to', location.pathname);
  // console.log(
  //   'Gatsby started to change location from',
  //   prevLocation ? prevLocation.pathname : null
  // );
};
