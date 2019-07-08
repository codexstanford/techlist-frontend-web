import Amplify, { Auth } from 'aws-amplify';
import { GraphQLClient } from 'graphql-request';
import { LOCAL_STORAGE_KEY, GET_USER_QUERY } from './const';

Amplify.configure({
  Auth: {
    // identityPoolId: 'us-west-2:0de73b6e-0624-4f46-9e56-14e51ecf282a',
    region: 'us-west-2',
    userPoolId: 'us-west-2_uzyDC8Snl',
    userPoolWebClientId: '181177ggq1ot45s6t791vposkr',
    // cookieStorage: {
    //   domain: '.law.haus',
    //   path: '/',
    //   expires: 365,
    //   secure: true,
    // },
  },
});

const isBrowser = typeof window !== `undefined`;

function handleUserResponse({ signInUserSession, ...user }) {
  const { accessToken, idToken, refreshToken } = signInUserSession;
  const { jwtToken: token } = idToken;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
  console.log('USER IN HUR', user);
  return user;
}

function login({ username, password }) {
  return Auth.signIn(username, password).then(data => {
    console.log(data);
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
    console.log('NO TOKEN');
    return Promise.resolve(null);
  }
  const client = new GraphQLClient('http://localhost:4000/', {
    // replace with http://35.239.56.1/apollo on push
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await client.request(GET_USER_QUERY).catch(err => {
    logout();
    return Promise.reject(err);
  });
  console.log('RESULT IN GET USER:', result);
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
