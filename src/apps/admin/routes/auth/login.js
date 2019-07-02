import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link as GatsbyLink } from 'gatsby';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { validateSignInForm } from '../../helpers';
import { isLoggedIn } from '../../../../services/auth';
import { Container, SectionWrapper } from '../../../../atoms';

function Login({ classes, user, locaiton, ...props }) {
  if (isLoggedIn()) {
    const { from } = location.state || { from: { pathname: '/app/profile' } };
    navigate(from.pathname);
  }

  return (
    <Formik
      onSubmit={handleLoginRequest}
      initialValues={{ email: '', password: '' }}
      validate={validateSignInForm}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Container className={classes.main}>
            <Paper className={classes.paper}>
              <SectionWrapper style={{ alignItems: 'center' }}>
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
              </SectionWrapper>

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
                <SectionWrapper>
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
                </SectionWrapper>
              </Form>
              <Typography component="p" variant="subtitle1" align="center">
                Don't have an account?{' '}
                <Link component={GatsbyLink} to="/app/create/">
                  Sign up today!
                </Link>
              </Typography>
            </Paper>
          </Container>
        );
      }}
    </Formik>
  );
}

export default Login;

export async function handleLoginRequest(values, { setSubmitting }) {
  setSubmitting(true);
  const { email, password } = values;
  const username = email;
  try {
    const user = await Auth.signIn(username, password).catch(err =>
      console.log(err)
    );
    setSubmitting(false);
  } catch (error) {
    console.log(error);
    setSubmitting(false);
  }
}
