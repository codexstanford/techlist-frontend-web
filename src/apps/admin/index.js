import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';
import { Router, navigate } from '@reach/router';
import Login from './routes/auth/login';
import Create from './routes/auth/createwiz';
import Profile from './routes/profile/';
import Layout from '../../components/layout';
import withStyles from '@material-ui/core/styles/withStyles';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { styles } from './config/styles';
import { setUser } from '../../services/auth';

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
      console.log('in hub,', data);
      setUser(data);
      this.setState({ user: data });
    } else if (event === 'signOut') {
      navigate('/');
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
      <Layout
        {...this.props}
        classes={{}}
        user={user}
        title="Gatsby Starter Blog"
        shouldShowSecondaryHeader={false}
        fullScreen={true}
      >
        <Router>
          <Login path="/app/login/" classes={this.props.classes} user={user} />
          <PrivateRoute path="/app/profile/" component={Profile} user={user} />
          <Create path="/app/create/" classes={this.props.classes} />
        </Router>
      </Layout>
    );
  }
}

export default withStyles(styles)(App);
