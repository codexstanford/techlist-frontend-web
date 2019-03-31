import React from 'react';
import Admin from '../apps/admin';

export class App extends React.Component {
  render() {
    return <Admin {...this.props} />;
  }
}

export default App;
