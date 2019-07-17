import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Provider } from './createContext';
import { configureApolloClient } from './apollo';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { ThemeProvider } from '@material-ui/styles';

let theme = createMuiTheme({
  typography: {
    htmlFontSize: 14,

    fontFamily: [
      'Source Sans Pro',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: { main: '#b1040e' },
    secondary: { main: '#04b1a8' },
    link: {
      main: '#006CB8',
    },
  },
  colors: {
    primary: '#b1040e',
    link: '#006CB8',
    hover: '#00548f',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Source Sans Pro'],
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export const client = configureApolloClient();

class AppProvider extends Component {
  state = {
    open: false,
    showModal: () => this.setState({ open: true }),
    hideModal: () => this.setState({ open: false }),
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    return (
      <AuthProvider client={client}>
        <UserProvider>
          <Provider value={this.state}>
            <ApolloProvider client={client}>
              <ApolloHooksProvider client={client}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {this.props.children}
                </ThemeProvider>
              </ApolloHooksProvider>
            </ApolloProvider>
          </Provider>
        </UserProvider>
      </AuthProvider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
