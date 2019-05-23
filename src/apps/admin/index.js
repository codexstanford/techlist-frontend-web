import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Router, navigate } from '@reach/router';
import Login from './routes/auth/login';
import Create from './routes/auth/createwiz';
import Profile from './routes/profile/';
import Layout from '../../components/layout';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles } from './config/styles';

import { useUser, UserProvider } from '../../store/user-context';

function App(props) {
  const { login, data, logout, register } = useUser();

  console.log('ADMIN INDEX USER:', data);
  console.log('ADMIN INDEX PROPS:', props);
  return (
    <Layout
      {...props}
      classes={{}}
      title="CodeX LegalTech Index"
      shouldShowSecondaryHeader={false}
      fullScreen={true}
    >
      <Router>
        <Login path="/app/login/" classes={props.classes} login={login} />
        <PrivateRoute
          path="/app/profile/"
          component={Profile}
          logout={logout}
          {...props}
        />

        <Create
          path="/app/create/"
          classes={props.classes}
          logout={logout}
          register={register}
        />
      </Router>
    </Layout>
  );
}

function AppWithStuff({ children, ...props }) {
  return <App {...props} />;
}

export default withStyles(styles)(AppWithStuff);
