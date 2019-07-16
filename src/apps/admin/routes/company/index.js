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
import CreateCompanyNew from '../../features/company.create';
import Clear from '@material-ui/icons/Clear';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateCompanyScreen({
  classes,
  user,
  navigate,
  open,
  onCancel,
  ...rest
}) {
  return (
    <Dialog
      open={open !== undefined && open}
      TransitionComponent={Transition}
      fullWidth={true}
      onBackdropClick={() => onCancel(!open)}
      PaperComponent={PaperComponent}
    >
      <StyledDialogContent>
        <CreateCompanyNew
          classes={classes}
          user={user}
          handleClose={() => onCancel(!open)}
        />
        <MobileExit onClick={() => onCancel(!open)} />
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  max-height: calc(100vh - 96px);
  @media (max-width: 480px) {
    position: relative;
    padding: 10px;
    max-height: 100vh;
  }
  @media (min-width: 1000px) {
    width: 800px;
  }
  @media (min-width: 1200px) {
    width: 1000px;
  }
  @media (min-width: 1600px) {
    width: 1400px;
  }
`;

const MobileExit = styled(Clear)`
  display: none;
  @media (max-width: 480px) {
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
  max-width: 100vh;
  max-height: 90vh;
  @media (max-width: 480px) {
    min-width: 100vw;
    min-height: 100vh;
    border-radius: 0;
  }
`;

export default CreateCompanyScreen;
