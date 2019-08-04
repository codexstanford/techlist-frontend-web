import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Router, navigate } from '@reach/router';
import Login from './routes/auth/login';
import Create from './routes/auth/createwiz';
import Profile from './routes/profile/';
import Layout from '../../components/layout';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles } from './config/styles';

import { useUser } from '../../store/user-context';
import { UseModal } from '../../store/useModal';

function App(props) {
  const { login, data, logout, register, getUser } = useUser();

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
          user={data.user}
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
