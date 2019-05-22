import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import UserProfile from './profile';
import { useUser } from '../../../../store/user-context';

export const UserProfileWithGraphQL = props => {
  const { data } = useUser();
  console.log('DATA IN USER PROFILE CONTROLLER:', data);
  const { person } = data.user;
  console.log('PERSON IN PROFILE CONTROLLER', person);

  return <UserProfile data={data} {...props} />;
};

export default withStyles(styles)(UserProfileWithGraphQL);
