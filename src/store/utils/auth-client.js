import Amplify, { Auth } from 'aws-amplify';
import { GraphQLClient } from 'graphql-request';
import { LOCAL_STORAGE_KEY, GET_USER_QUERY } from './const';

Amplify.configure({
  Auth: {
    region: 'us-west-2',
    userPoolId: 'us-west-2_uzyDC8Snl',
    userPoolWebClientId: '181177ggq1ot45s6t791vposkr',
  },
});

const isBrowser = typeof window !== `undefined`;

function handleUserResponse({ signInUserSession, ...user }) {
  const { accessToken, idToken, refreshToken } = signInUserSession;
  const { jwtToken: token } = idToken;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
  return user;
}

function login({ username, password }) {
  return Auth.signIn(username, password).then(data => {
    return handleUserResponse(data);
  });
}

function logout() {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  return Auth.signOut();
}

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

async function getUser() {
  const token = getToken();
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
  return Auth.signUp({
    username,
    password,
    attributes: {
      email,
      phone_number: `+1${phone_number}`,
    },
  });
}

function confirm({ username, code }) {
  return Auth.confirmSignUp(username, code, {});
}

export { login, logout, getToken, register, getUser, confirm };
