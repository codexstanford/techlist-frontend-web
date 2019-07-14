import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Router, navigate } from '@reach/router';
import Login from './routes/auth/login';
import Create from './routes/auth/createwiz';
import Profile from './routes/profile/';
import CreateCompanyScreen from './routes/company';
import Layout from '../../components/layout';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles } from './config/styles';

import { useUser, UserProvider } from '../../store/user-context';

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
        <CreateCompanyScreen
          path="/app/company/"
          classes={props.classes}
          user={data.user}
        />
      </Router>
    </Layout>
  );
}

function AppWithStuff({ children, ...props }) {
  return <App {...props} />;
}

export default withStyles(styles)(AppWithStuff);
