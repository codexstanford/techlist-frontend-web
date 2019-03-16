import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

const PrivateRoute = ({ component: Component, location, user, ...rest }) => {
  console.log(user);
  if (user === null && location.pathname !== `/app/login`) {
    navigate(`/app/login/`, {
      state: {
        from: location,
      },
    });
    console.log('returning');
  }

  return <Component {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
