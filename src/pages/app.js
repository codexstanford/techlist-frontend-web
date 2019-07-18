import React from 'react';

import { Router } from '@reach/router';
import Layout from '../components/layout';

import Admin from '../apps/admin';

export function App(props) {
  return <Admin {...props} />;
  return (
    <Layout>
      <Router>
        <Profile path="/app/profile" />
        <Login path="/app/login" />
      </Router>
    </Layout>
  );
}

export default App;

const Profile = () => {
  return <div>Profile</div>;
};

const Login = () => {
  return <div>Login</div>;
};
