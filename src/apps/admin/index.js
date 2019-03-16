import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Router } from '@reach/router';
import Login from './routes/auth/login';
import Create from './routes/auth/create';
import Profile from './routes/profile';
import Layout from '../../components/layout';
import withStyles from '@material-ui/core/styles/withStyles';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { styles } from './config/styles';

Amplify.configure({
  Auth: {
    // identityPoolId: 'us-west-2:0de73b6e-0624-4f46-9e56-14e51ecf282a',
    region: 'us-west-2',
    userPoolId: 'us-west-2_uzyDC8Snl',
    userPoolWebClientId: '181177ggq1ot45s6t791vposkr',
  },
});

export class App extends React.Component {
  constructor(props) {
    super(props);
    Hub.listen('auth', this, 'MyListener');
    this.state = { user: null };
  }

  onHubCapsule(capsule) {
    const { channel, payload } = capsule;
    if (channel === 'auth') {
      this.onAuthEvent(payload);
    }
  }

  onAuthEvent(payload) {
    const { event, data } = payload;
    if (event === 'signIn') {
      this.setState({ user: data });
    }
  }

  async componentDidMount() {
    await Auth.currentAuthenticatedUser()
      .then(data => {
        console.log(data);
        this.setState(prev => ({ ...prev, user: data }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { user } = this.state;
    return (
      <Layout {...this.props} user={user} title="Gatsby Starter Blog">
        <Router>
          <Login path="/app/login" classes={this.props.classes} user={user} />
          <PrivateRoute path="/app/profile" component={Profile} user={user} />
          <Create path="/app/create" classes={this.props.classes} />
        </Router>
      </Layout>
    );
  }
}

export default withStyles(styles)(App);
