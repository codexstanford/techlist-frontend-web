import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Provider } from './createContext';
import { configureApolloClient } from './apollo';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

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
              <ApolloHooksProvider client={client} />
              {this.props.children}
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
