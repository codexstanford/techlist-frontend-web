import React from 'react';
import { useAuth } from './auth-context';

const UserContext = React.createContext(null);

function UserProvider(props) {
  const user = useAuth();

  return <UserContext.Provider value={user} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
