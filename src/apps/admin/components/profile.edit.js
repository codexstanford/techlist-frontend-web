import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { Mutation } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import Clear from '@material-ui/icons/Clear';
import styled from 'styled-components';

import CreateProfile from '../routes/auth/profile';
import {
  UPDATE_CURRENT_USER_MUTATION,
  GET_CURRENT_USER_QUERY,
} from '../../../graphql';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const EditProfile = ({ open, handleClose, classes, ...props }) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_QUERY);
  const { me } = data;

  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <Dialog
      open={open !== undefined && open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      onBackdropClick={handleClose}
      style={{ padding: 0, overflow: 'auto' }}
      PaperComponent={PaperComponent}
      PaperProps={{ handleClose: handleClose }}
    >
      <DialogContent>
        <Mutation mutation={UPDATE_CURRENT_USER_MUTATION}>
          {mutation => {
            return (
              <CreateProfile
                createProfile={mutation}
                user={me}
                editMode={true}
                classes={classes}
                handleClose={handleClose}
                {...props}
              />
            );
          }}
        </Mutation>
      </DialogContent>
    </Dialog>
  );
};

const PaperComponent = ({ children, handleClose, ...props }) => {
  return (
    <StyledPaper>
      {children}
      <MobileExit onClick={handleClose} />
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  position: relative;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  @media (min-width: 480px) {
    max-width: 500px;
    max-height: 70vh;
    overflow: auto;
  }
`;

const MobileExit = styled(Clear)`
  display: none;
  @media (max-width: 750px) {
    display: block;
    position: absolute;
    top: 5px;
    right: 5px;
    font-weight: 500;
    font-size: 27px;
    color: #b1040e; // no theme in place
  }
`;

export default EditProfile;
