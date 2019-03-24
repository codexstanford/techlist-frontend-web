import Amplify, { Auth, Hub, Storage } from 'aws-amplify';
import { navigate } from '@reach/router';
Amplify.configure({
  Auth: {
    // identityPoolId: 'us-west-2:0de73b6e-0624-4f46-9e56-14e51ecf282a',
    region: 'us-west-2',
    userPoolId: 'us-west-2_uzyDC8Snl',
    userPoolWebClientId: '181177ggq1ot45s6t791vposkr',
    cookieStorage: {
      domain: '.law.haus',
    },
  },
});

const isBrowser = typeof window !== `undefined`;

export const setUser = user =>
  (window.localStorage.gatsbyUser = JSON.stringify(user));

const getUser = () => {
  if (window.localStorage.gatsbyUser) {
    let user = JSON.parse(window.localStorage.gatsbyUser);
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();
  if (user) return !!user.username;
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;
  setUser({});
  Auth.signOut().then(data => {
    navigate('/');
  });
};
