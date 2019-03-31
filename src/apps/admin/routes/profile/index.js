import React from 'react';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';
import { GET_PERSON_QUERY } from '../../../../graphql';
import UserProfile from './profile';

export const UserProfileWithGraphQL = props => {
  return (
    <Query
      query={GET_PERSON_QUERY}
      variables={{
        where: {
          id:
            props.data && props.data.personId
              ? props.data.personId
              : props.user.me.person.id,
        },
      }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return null;
        }
        if (error) {
          return (
            <Typography color="textSecondary" gutterBottom>
              {JSON.stringify(error)}
            </Typography>
          );
        }
        console.log('DATA', data);
        return <UserProfile data={data} {...props} />;
      }}
    </Query>
  );
};

export default withStyles(styles)(UserProfileWithGraphQL);
