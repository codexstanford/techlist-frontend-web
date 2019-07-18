import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

const PrivateRoute = ({ component: Component, location, user, ...rest }) => {
  console.log('REST IN PRIVATE ROUTE', rest);
  if (!user) {
    navigate('/app/login/', {
      state: {
        from: location,
        ...rest,
      },
    });
  }

  return <Component location={location} user={user} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
