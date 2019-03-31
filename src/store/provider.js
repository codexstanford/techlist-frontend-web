import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Provider } from './createContext';
import { configureApolloClient } from './apollo';

const client = configureApolloClient();

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
      <Provider value={this.state}>
        <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
      </Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
