import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import { navigate } from 'gatsby';
import styled from 'styled-components';

const Profile = () => (
  <>
    <Typography variant="headline" color="primary">
      Coming Soon!
    </Typography>
    <Button
      color="primary"
      onClick={() => {
        Auth.signOut().then(data => {
          navigate('/');
        });
      }}
    >
      Logout
    </Button>
  </>
);

export default Profile;
