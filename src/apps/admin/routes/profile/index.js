import React, { useState } from 'react';
import UserProfile from './profile';
import CreateProfile from '../../../admin/routes/auth/profile';
import { Mutation } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';

import {
  UPDATE_CURRENT_USER_MUTATION,
  GET_CURRENT_USER_QUERY,
} from '../../../../graphql';

export const UserProfileWithGraphQL = props => {
  const [show, toggleShow] = useState(false);

  const { data, loading, error } = useQuery(GET_CURRENT_USER_QUERY);
  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }

  console.log('LOADING RESOURCES', data);

  const { me } = data;

  const { person, id } = me;

  if (person.metadata.isDraft === true) {
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
    return <UserProfile data={me} me={me} {...props} />;
  }
  return null;
};

export default UserProfileWithGraphQL;
