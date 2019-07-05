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
  ...rest
}) {
  if (!user) {
    navigate('/app/login', {
      redirect: '/app/company/',
    });
  }

  return (
    <Container className={classes.main}>
      <Dialog open={true} TransitionComponent={Transition} fullWidth={true}>
        <DialogContent>
          <CreateCompanyNew classes={classes} user={user} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
