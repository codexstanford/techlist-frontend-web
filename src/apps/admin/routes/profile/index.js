import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import UserProfile from './profile';
import CreateProfile from '../../../admin/routes/auth/profile';
import { Mutation, Query } from 'react-apollo';
import { useUser } from '../../../../store/user-context';

import { UPDATE_CURRENT_USER_MUTATION } from '../../../../graphql';

export const UserProfileWithGraphQL = props => {
  const { data } = useUser();
  console.log('DATA IN USER PROFILE CONTROLLER:', data);
  const { person } = data.user;
  console.log('PERSON IN PROFILE CONTROLLER', person);

  // if (person.profile === null) {
  //   console.log('***CREATE PROFILE***');
  //   return <CreateProfile createProfile={mutation} user={person} {...props} />;
  // } else {
  //   console.log('***USER PROFILE***');
  //   return <UserProfile data={data} {...props} />;
  // }

  if (person.profile === null) {
    <Mutation mutation={UPDATE_CURRENT_USER_MUTATION}>
      {mutation => {
        return (
          <CreateProfile
            createProfile={mutation}
            user={data || hoist}
            {...props}
            hoist={hoist}
          />
        );
      }}
    </Mutation>;
  } else {
    console.log('***USER PROFILE***');
    return <UserProfile data={data} {...props} />;
  }
};

export default withStyles(styles)(UserProfileWithGraphQL);
