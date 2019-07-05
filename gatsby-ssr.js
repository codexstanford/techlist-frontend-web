import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import AppProvider from 'store/provider';
// import wrapPageElementWithTransition from 'helpers/wrapPageElement';
// import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from './src/store/auth-context';
import { UserProvider } from './src/store/user-context';
// import { ApolloProvider } from 'react-apollo';
// import { configureApolloClient } from './src/store/apollo';

// const client = configureApolloClient();

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  // React Context in SSR/build
  const ConnectedBody = () => <AppProvider>{bodyComponent}</AppProvider>;
  replaceBodyHTMLString(renderToString(bodyComponent));

  // Add styled-components in SSR/build
  const sheet = new ServerStyleSheet();
  const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />));
  const styleElement = sheet.getStyleElement();
  setHeadComponents(styleElement);
};

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <UserProvider>{element}</UserProvider>
    </AuthProvider>
  );
};
