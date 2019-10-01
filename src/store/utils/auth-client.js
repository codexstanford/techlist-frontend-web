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
  if (isBrowser) {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    return Auth.signOut();
  }
  return Promise.resolve();
}

async function getToken() {
  if (window) {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().jwtToken || null;
      return Promise.resolve()
        .then(() => {
          window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
        })
        .then(() => {
          return window.localStorage.getItem(LOCAL_STORAGE_KEY);
        });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  return null;
}

async function getUser(client) {
  const token = await getToken();

  if (!token) {
    client.resetStore();
    return Promise.resolve(null);
  }
  if (client !== undefined) {
    const { data } = await client
      .query({ query: GET_USER_QUERY })
      .catch(err => {
        logout();
        console.log(err);
        return Promise.reject(err);
      });

    return data;
  }
}

function register({ email, password, phone: phone_number, username }) {
  if (isBrowser) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number,
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
