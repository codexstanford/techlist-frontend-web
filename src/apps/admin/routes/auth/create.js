import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { validateCreateAccountForm } from '../../helpers';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmPhone from './confirm';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { navigate } from '@reach/router';

import { SectionWrapper } from '../../../../atoms';

import { useUser } from '../../../../store/user-context';

function CreateAccount({ classes, ...props }) {
  const { data, register, confirm } = useUser();
  const [shouldShowConfirm, setShowConfirm] = useState(false);

  const { setStep, activeStep: step } = props;

  let phoneNumber = '';
  const formatShit = value => {
    var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    phoneNumber = !x[2]
      ? x[1]
      : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

    console.log('phoneNumber', phoneNumber);

    return phoneNumber;
  };

  const handleSubmitRequest = async (
    values,
    { setSubmitting, setErrors, setFieldError }
  ) => {
    console.log('values', values);
    setSubmitting(true);
    const { email, password, phone } = values;
    const username = email;
    try {
      const result = await register({
        email,
        password,
        phone,
        username,
      });

      console.log('REGISTER RESULT:', result);
      setSubmitting(false);
      setShowConfirm(true);
    } catch (error) {
      console.log('****ERROR INSIDE CREATE HERE******', error);
      if (error.code === 'UsernameExistsException') {
        setFieldError(
          'email',
          'An account with the given email already exists.'
        );
      }
      if (error.code === 'InvalidPasswordException') {
        setFieldError(
          'password',
          'Passwords must contain 8 characters, a number, symbol, and uppercase letter'
        );
      }
      setSubmitting(false);
    }
  };

  const handleConfirmRequest = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    setSubmitting(true);
    const { username, code, password } = values;
    try {
      const result = await confirm({ username, code });
      setSubmitting(false);
      setShowConfirm(false);
      navigate('/app/login');
    } catch (err) {
      if (err.code === 'CodeMismatchException') {
        setFieldError('code', err.message);
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitRequest}
      initialValues={{
        terms: false,
        email: '',
        phone: '',
        password: '',
        confirm: '',
      }}
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
                  id="phone"
                  name="phone"
                  type="phone"
                  label="Phone"
                  placeholder="4063489765"
                  fullWidth
                  component={TextField}
                  value={formatShit(values.phone)}
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
              <FormControlLabel
                control={
                  <Field
                    name="terms"
                    label="Company Description"
                    component={props => (
                      <Checkbox
                        onChange={() => {
                          setFieldValue('terms', !values.terms);
                        }}
                        checked={values.terms}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <span>I accept the </span>
                    <StyledATag href="https://www.google.com/search?q=terms+and+conditions&oq=Terms+and+Conditions&aqs=chrome.0.0l6.9044j0j8&sourceid=chrome&ie=UTF-8">
                      Terms of Service
                    </StyledATag>
                  </>
                }
              />
              <ButtonWrapper>
                <Button
                  type="submit"
                  disabled={!(isValid && values.terms)}
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

const StyledATag = styled.a`
  text-decoration: none;
  color: red;
`;
