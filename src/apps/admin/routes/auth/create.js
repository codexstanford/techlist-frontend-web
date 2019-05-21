import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { validateCreateAccountForm } from '../../helpers';
import { steps } from '../../../../helpers/enums';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmPhone from './confirm';
import { Auth } from 'aws-amplify';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import { navigate } from '@reach/router';
import { setUser, isLoggedIn } from '../../../../services/auth';

function CreateAccount({ classes, ...props }) {
  const [shouldShowConfirm, setShowConfirm] = useState(false);
  const [cognitoData, setCognitoData] = useState({});

  const { setStep, activeStep: step } = props;

  // STEP 2 OF WORKFLOW
  const handleSubmitRequest = (
    values,
    { setSubmitting, setErrors, setFieldError }
  ) => {
    setSubmitting(true);
    const { email, password, phone: phone_number } = values;
    const username = email;
    try {
      Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: `+1${phone_number}`,
        },
      })
        .then(data => {
          console.log(data);
          setSubmitting(false);
          setCognitoData({ ...data, username });
          setShowConfirm(true);
        })
        .catch(err => {
          console.log(err);
          if (err.code === 'UsernameExistsException') {
            setFieldError(
              'email',
              'An account with the given email already exists.'
            );
          }
          if (err.code === 'InvalidPasswordException') {
            setFieldError(
              'password',
              'Passwords must contain 8 characters, a number, symbol, and uppercase letter'
            );
          }
          setSubmitting(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmRequest = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { username, code, password } = values;
    try {
      const result = await Auth.confirmSignUp(username, code, {}).catch(err =>
        console.log(err)
      );
      if (result === 'SUCCESS') {
        const user = await Auth.signIn(username, password).catch(err =>
          console.log(err)
        );
        console.log(user);
        setSubmitting(false);
        setShowConfirm(false);
        setStep(steps.PROFILE);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitRequest}
      initialValues={{ email: '', phone: '', password: '', confirm: '' }}
      validate={validateCreateAccountForm}
    >
      {({ submitForm, isSubmitting, values, setFieldValue, isValid }) => {
        return (
          <Container className={classes.main}>
            <HeaderWrapper>
              <Typography
                variant="h5"
                color="primary"
                style={{
                  fontWeight: '700',
                  letterSpacing: '-.5px',
                  textDecoration: 'none',
                }}
              >
                Create CodeX Account
              </Typography>
            </HeaderWrapper>

            <Form className={classes.form}>
              <div>
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="phone"
                  type="phone"
                  label="Phone"
                  fullWidth
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  component={TextField}
                />
              </div>
              <div>
                <Field
                  name="confirm"
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  component={TextField}
                />
              </div>
              <ButtonWrapper>
                <Button
                  type="submit"
                  disabled={!isValid}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Account
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </ButtonWrapper>
              {shouldShowConfirm && (
                <ConfirmPhone
                  open={shouldShowConfirm}
                  toggle={setShowConfirm}
                  data={values}
                  handleConfirm={handleConfirmRequest}
                />
              )}
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

export default CreateAccount;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
`;
