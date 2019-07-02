import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { getUser, getToken } from './utils/auth-client';

const clientCache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
});

/* tslint:no-shadow off */

const httpLink = process.browser
  ? createPersistedQueryLink().concat(
      new BatchHttpLink({
        //uri: 'https://apollo.k8s.law.kitchen',
        uri: 'http://localhost:4000',
        fetch: fetch,
      })
    )
  : createPersistedQueryLink().concat(
      new BatchHttpLink({
        //uri: 'https://apollo.k8s.law.kitchen',
        uri: 'http://localhost:4000',
        fetch: fetch,
      })
    );

const asyncAuthLink = setContext(
  (_, { headers }) =>
    new Promise((success, fail) => {
      const user = getUser()
        .then(user => {
          console.log('USER IN SET CONTEXT', user);
          const token = getToken();
          console.log('token', token);
          success({
            headers: {
              ...headers,
              authorization: `Bearer ${token}`,
            },
          });
        })
        .catch(err => {
          fail(err);
        });
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

export function configureApolloClient() {
  return new ApolloClient({
    link: ApolloLink.from([apolloLogger, asyncAuthLink, errorLink, httpLink]),
    cache: clientCache,
    connectToDevTools: true,
    ssrMode: true,
  });
}
