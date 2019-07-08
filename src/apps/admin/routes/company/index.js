import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import styled from 'styled-components';
import { Container, SectionWrapper } from '../../../../atoms';
import CreateCompanyNew from '../../features/company.create';

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
    <Dialog
      open={open !== undefined && open}
      TransitionComponent={Transition}
      fullWidth={true}
      onBackdropClick={() => onCancel(!open)}
    >
      <DialogContent>
        <CreateCompanyNew classes={classes} user={user} />
      </DialogContent>
    </Dialog>
  );
}
