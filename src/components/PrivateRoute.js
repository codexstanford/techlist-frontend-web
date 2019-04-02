import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { isLoggedIn } from '../services/auth';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER_QUERY } from '../graphql';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login/`) {
    navigate(`/app/login/`, {
      state: {
        from: location,
      },
    });
    return null;
  }

  return (
    <Query query={GET_CURRENT_USER_QUERY}>
      {({ data, loading, error }) => {
        if (loading) {
          return null;
        }
        return (
          <Component location={location} user={data} classes={rest.classes} />
        );
      }}
    </Query>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
