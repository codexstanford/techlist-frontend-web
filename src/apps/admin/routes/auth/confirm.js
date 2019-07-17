import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Auth from '@aws-amplify/auth';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleResendRequest = () => {
    console.log('RESENDING CODE');
    Auth.resendSignUp(this.props.data.email)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Formik
        onSubmit={this.props.handleConfirm}
        initialValues={{
          username: this.props.data.email,
          code: '',
          password: this.props.data.password,
        }}
      >
        {({
          submitForm,
          isSubmitting,
          values,
          setFieldValue,
          isValid,
          setSubmitting,
        }) => {
          return (
            <Dialog
              open={this.props.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {'Confirm Phone Number'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  We just sent a confirmation code to {this.props.data.phone}
                </DialogContentText>
                <div>
                  <Field
                    name="code"
                    fullWidth
                    type="text"
                    label="Enter code"
                    component={TextField}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={async () => {
                    setSubmitting(true);
                    const result = await this.handleResendRequest();
                    console.log(result);
                    setSubmitting(false);
                  }}
                  color="primary"
                >
                  Resend
                </Button>

                <Button onClick={submitForm} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Formik>
    );
  }
}

export default AlertDialogSlide;
