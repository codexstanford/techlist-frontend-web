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
import { StylesProvider } from '@material-ui/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateCompanyScreen({
  classes,
  user,
  navigate,
  open,
  onCancel,
  ...rest
}) {
  return (
    <StylesProvider injectFirst>
      <Dialog
        open={open !== undefined && open}
        TransitionComponent={Transition}
        fullWidth={true}
        onBackdropClick={() => onCancel(!open)}
        PaperComponent={PaperComponent}
      >
        <StyledDialogContent>
          <CreateCompanyNew classes={classes} user={user} />
        </StyledDialogContent>
      </Dialog>
    </StylesProvider>
  );
}

const StyledDialogContent = styled(DialogContent)`
  max-height: calc(100vh - 96px);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const PaperComponent = ({ children, ...props }) => {
  return (
    <StylesProvider injectFirst>
      <StyledPaper>{children}</StyledPaper>
    </StylesProvider>
  );
};

const StyledPaper = styled(Paper)`
  max-width: 530px;
  max-height: calc(100vh - 96px);
  @media (max-width: 480px) {
    max-width: 95%;
    max-height: calc(100vh - 96px);
  }
`;
