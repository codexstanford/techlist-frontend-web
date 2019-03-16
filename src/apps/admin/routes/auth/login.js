import React from 'react';
import { Formik, Field, Form } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Auth } from 'aws-amplify';
import { validateSignInForm } from '../../helpers';
import { navigate } from 'gatsby';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';

function Login({ classes, user, locaiton, ...props }) {
  const handleLoginRequest = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const { email, password } = values;
    const username = email;
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  if (user) {
    const { from } = location.state || { from: { pathname: '/app/profile' } };
    navigate(from.pathname);
  }

  return (
    <Formik
      onSubmit={handleLoginRequest}
      initialValues={{ email: '', password: '' }}
      validate={validateSignInForm}
    >
      {({ submitForm, isSubmitting, values, isValid }) => {
        return (
          <Container className={classes.main}>
            <HeaderWrapper>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                paragraph={true}
                component="h2"
                variant="body1"
                align="center"
              >
                You must be authenticated to display the requested content.
                Please login below.
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
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
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
                  Login
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </ButtonWrapper>
            </Form>
            <Typography component="p" variant="subtitle1" align="center">
              Don't have an account?{' '}
              <Link component={GatsbyLink} to="/app/create/">
                Sign up today!
              </Link>
            </Typography>
          </Container>
        );
      }}
    </Formik>
  );
}

export default Login;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;
  height: 80vh;
  align-content: center;
  justify-content: center;
`;
