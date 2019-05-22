import React from 'react';
import { useAsync } from 'react-async';
import * as authClient from './utils/auth-client';
import { bootstrapAppData } from './utils/bootstrap';
import FullPageSpinner from '../atoms/spinner';
import { LOCAL_STORAGE_KEY } from './utils/const';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const {
    data = { user: null, listItems: [] },
    error,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({
    promiseFn: bootstrapAppData,
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <FullPageSpinner />;
    }
    if (isRejected) {
      return (
        <div css={{ color: 'red' }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }
  const login = form => authClient.login(form).then(reload);
  const register = form => authClient.register(form).then(reload);
  const logout = () => authClient.logout().then(reload);
  const confirm = form => authClient.confirm(form).then(reload);
  console.log('PROPS IN AUTHPROVIDER', props);
  return (
    <AuthContext.Provider
      value={{ data, login, logout, register, confirm }}
      {...props}
    />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  console.log('AUTH CONTEXT:', context);
  return context;
}
export { AuthProvider, useAuth };
