import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import UserProfile from './profile';
import CreateProfile from '../../../admin/routes/auth/profile';
import { Mutation } from 'react-apollo';
// import { useUser } from '../../../../store/user-context';
import { useQuery } from 'react-apollo-hooks';

import {
  UPDATE_CURRENT_USER_MUTATION,
  GET_CURRENT_USER_QUERY,
} from '../../../../graphql';

export const UserProfileWithGraphQL = props => {
  // const { data } = useUser();
  // console.log('DATA IN USER PROFILE CONTROLLER:', data);
  // const { person } = data.user;
  // console.log('PERSON IN PROFILE CONTROLLER', person);

  const { data, loading, error } = useQuery(GET_CURRENT_USER_QUERY);
  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }

  const { me } = data;
  const { person, id } = me;

  if (person.metadata.isDraft === true) {
    // console.log('***CREATE PROFILE***');
    return (
      <Mutation mutation={UPDATE_CURRENT_USER_MUTATION}>
        {mutation => {
          return (
            <CreateProfile createProfile={mutation} user={person} {...props} />
          );
        }}
      </Mutation>
    );
  } else if (person.metadata.isDraft === false) {
    // console.log('***USER PROFILE***');
    return <UserProfile data={me} me={me} {...props} />;
  }
};

export default withStyles(styles)(UserProfileWithGraphQL);
