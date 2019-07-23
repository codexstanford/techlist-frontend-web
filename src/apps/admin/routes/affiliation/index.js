import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import styled from 'styled-components';
import { Container, SectionWrapper } from '../../../../atoms';
import CreateAffiliation from '../../features/afffiliation.create';
import Clear from '@material-ui/icons/Clear';
import { useUser } from '../../../../store/user-context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateAffiliationScreen({
  classes,
  navigate,
  open,
  onCancel,
  initialCompany,
  ...rest
}) {
  const { data } = useUser();
  const { user } = data;

  return (
    <Dialog
      open={open !== undefined && open}
      TransitionComponent={Transition}
      fullWidth={true}
      onBackdropClick={() => onCancel(!open)}
      PaperComponent={PaperComponent}
      style={{ padding: 0, overflow: 'auto' }}
    >
      <StyledDialogContent>
        <CreateAffiliation
          classes={classes}
          user={user}
          handleClose={() => onCancel(!open)}
          initialCompany={initialCompany}
        />
        <MobileExit onClick={() => onCancel(!open)} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  position: relative;

  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px;

  @media (min-width: 750px) {
    max-width: 900px;
    padding: 3rem 3rem;
  }
`;

const MobileExit = styled(Clear)`
  display: none;
  @media (max-width: 750px) {
    display: block;
    position: absolute;
    top: 10px;
    right: 8px;
    font-weight: 500;
    font-size: 27px;
    color: #b1040e; // no theme in place
  }
`;

const PaperComponent = ({ children, ...props }) => {
  return <StyledPaper>{children}</StyledPaper>;
};

const StyledPaper = styled(Paper)`
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  @media (min-width: 750px) {
    max-width: 800px;
    max-height: 90vh;
    overflow: auto;
  }
`;

export default CreateAffiliationScreen;
