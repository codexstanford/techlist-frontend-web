import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Provider } from './createContext';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { Auth } from 'aws-amplify';
import { WebSocketLink } from 'apollo-link-ws';
import { getCurrentUser, isLoggedIn } from '../services/auth';

const clientCache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
});

/* tslint:no-shadow off */

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: `ws://a8293f4b6428611e991a6062672a2ea4-1472358435.us-west-2.elb.amazonaws.com/graphql`,
//       options: {
//         reconnect: true,
//         connectionParams: {},
//       },
//     })
//   : null;

const stateLink = withClientState({
  cache: clientCache,
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
});

const httpLink = process.browser
  ? createPersistedQueryLink().concat(
      new BatchHttpLink({
        uri: 'https://apollo.k8s.law.kitchen',
        fetch: fetch,
      })
    )
  : createPersistedQueryLink().concat(
      new BatchHttpLink({
        uri: 'https://apollo.k8s.law.kitchen',
        fetch: fetch,
      })
    );

const asyncAuthLink = setContext(
  (_, { headers }) =>
    new Promise((success, fail) => {
      const user = getCurrentUser();
      console.log(user);
      if (user) {
        success({
          headers: {
            ...headers,
            authorization:
              user &&
              user.signInUserSession &&
              user.signInUserSession.accessToken
                ? `Bearer ${user.signInUserSession.idToken.jwtToken}`
                : '',
          },
        });
      } else {
        success({});
      }
    })
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

function configureApolloClient() {
  return new ApolloClient({
    link: ApolloLink.from([
      apolloLogger,
      asyncAuthLink,
      errorLink,
      stateLink,
      httpLink,
    ]),
    cache: clientCache,
    connectToDevTools: true,
  });
}

const client = configureApolloClient();

class AppProvider extends Component {
  state = {
    open: false,
    showModal: () => this.setState({ open: true }),
    hideModal: () => this.setState({ open: false }),
  };

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
