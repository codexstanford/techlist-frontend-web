import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import CreateAccount from './create';
import CreateProfile from './profile';

import {
  GET_CURRENT_USER_QUERY,
  UPDATE_CURRENT_USER_MUTATION,
} from '../../../../graphql';

function SignUpWizard({ initialStep = 0, classes, ...rest }) {
  const [activeStep, setStep] = useState(initialStep);

  return (
    <Container>
      <Paper className={classes.paper}>
        <Query query={GET_CURRENT_USER_QUERY} skip={activeStep === 0}>
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }
            if (error) {
              console.log(error);
            }

            return (
              <div>
                {getStepContent({
                  step: activeStep,
                  props: { activeStep, setStep, classes, hoist: data },
                })}
              </div>
            );
          }}
        </Query>
        <Divider className={classes.divider} />

        <Typography component="p" variant="subtitle1" align="center">
          Already have an account?{' '}
          <Link component="a" onClick={() => navigate('/app/login/')}>
            Sign in!
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignUpWizard;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function getStepContent({ step, props, hoist }) {
  switch (step) {
    case 0:
      return <CreateAccount activeStep={step} {...props} />;
    case 1:
      return (
        <Query query={GET_CURRENT_USER_QUERY}>
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }
            if (error) {
              console.log('Error Case 1', error);
              return null;
            }
            return (
              <Mutation mutation={UPDATE_CURRENT_USER_MUTATION}>
                {mutation => {
                  return (
                    <CreateProfile
                      createProfile={mutation}
                      user={data || hoist}
                      {...props}
                      hoist={hoist}
                    />
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      );

    default:
      return 'Unknown step';
  }
}
