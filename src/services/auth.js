import Amplify, { Auth, Hub, Storage } from 'aws-amplify';
import Cookies from 'universal-cookie';

import { navigate } from '@reach/router';

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

export const setUser = user =>
  (window.localStorage.gatsbyUser = JSON.stringify(user));

const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    if (!user) {
      return undefined;
    }
    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
  if (window.localStorage.gatsbyUser) {
    let user = JSON.parse(window.localStorage.gatsbyUser);
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = async () => {
  if (!isBrowser) return false;

  const user = await getUser();
  console.log(user);
  if (user === undefined) {
    return false;
  }
  if (user.username) return true;
  return false;
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;
  Auth.signOut();
};
