import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useUser } from '../store/user-context';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const {
    data: { user },
  } = useUser();
  // console.log('USER IN PRIVATE ROUTE', user);
  if (!user) {
    navigate('/app/login/', {
      state: {
        from: location,
        ...rest,
      },
    });
  }

  return <Component location={location} user={user} classes={rest.classes} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
