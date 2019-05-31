import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link as GatsbyLink } from 'gatsby';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';
import { useAuth } from '../../../../store/auth-context';
import useCallbackStatus from '../../../../store/utils/useCallbackStatus';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { validateSignInForm } from '../../helpers';

import { useUser } from '../../../../store/user-context';

import { Container, SectionWrapper } from '../../../../atoms';

function Login({ classes, location, ...props }) {
  const { data } = useUser();
  const { isPending, isRejected, error, run } = useCallbackStatus();
  const { login } = useAuth();
  const { user } = data;

  if (user && user.person && user.person.profile === null) {
    navigate('/app/profile/');
  } else if (user && user.person && user.person.profile !== null) {
    navigate('/app/profile/', { state: { data } });
  } else {
    // navigate('/app/profile'); 
  }

  function handleLoginSubmit(values, { setSubmitting }) {
    const { email: username, password } = values;

    console.log('USER IN LOGIN FUNCTION', user);

    setSubmitting(true);
    run(login({ username, password }));
    setSubmitting(false);
  }

  return (
    <Formik
      onSubmit={handleLoginSubmit}
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
