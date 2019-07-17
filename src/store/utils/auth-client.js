import { GraphQLClient } from 'graphql-request';
import { LOCAL_STORAGE_KEY, GET_USER_QUERY } from './const';

import fetch from 'node-fetch';
global.fetch = global.fetch || fetch;

import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';

const isBrowser = typeof window !== `undefined`;

isBrowser &&
  Amplify.configure({
    Auth: {
      region: 'us-west-2',
      userPoolId: 'us-west-2_uzyDC8Snl',
      userPoolWebClientId: '181177ggq1ot45s6t791vposkr',
    },
  });

function handleUserResponse({ signInUserSession, ...user }) {
  const { accessToken, idToken, refreshToken } = signInUserSession;
  const { jwtToken: token } = idToken;

  isBrowser && window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
  return user;
}

function login({ username, password }) {
  if (isBrowser) {
    return Auth.signIn(username, password).then(data => {
      return handleUserResponse(data);
    });
  }
}

function logout() {
  isBrowser && window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  if (isBrowser) {
    return Auth.signOut();
  }
}

async function getToken() {
  if (window) {
    const session = await Auth.currentSession().catch(err => {
      console.log(err);
      logout();
    });
    return session.getIdToken().jwtToken || null;
    // return window.localStorage.getItem(LOCAL_STORAGE_KEY);
  }
  return null;
}

async function getUser() {
  const token = await getToken();

  if (!token) {
    return Promise.resolve(null);
  }

  const client = new GraphQLClient(process.env.GATSBY_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await client.request(GET_USER_QUERY).catch(err => {
    logout();
    return Promise.reject(err);
  });
  return result;
}

function register({ email, password, phone: phone_number, username }) {
  if (isBrowser) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: `+1${phone_number}`,
      },
    });
  }
}

function confirm({ username, code }) {
  if (isBrowser) {
    return Auth.confirmSignUp(username, code, {});
  }
}

export { login, logout, getToken, register, getUser, confirm };
