import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import CreateAccount from './create';
import CreateProfile from './profile';
import CreateCompany from './company';
import TermsAndConditions from './tnc';
import {
  GET_CURRENT_USER_QUERY,
  UPDATE_CURRENT_USER_MUTATION,
  UPDATE_COMPANY_MUTATION,
  CREATE_USER_MUTATION,
} from '../../../../graphql';

function SignUpWizard({ initialStep = 0, classes, ...rest }) {
  const [activeStep, setStep] = useState(initialStep);
  const steps = getSteps();

  return (
    <Container>
      <Paper className={classes.paper}>
        <div>
          {getStepContent({
            step: activeStep,
            props: { activeStep, setStep, classes },
          })}
        </div>

        <Divider className={classes.divider} />
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};

            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Typography component="p" variant="subtitle1" align="center">
          Already have an account?{' '}
          <Link component={GatsbyLink} to="/app/login/">
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

function getSteps() {
  return [
    'Create an account',
    'Create profile',
    'Add company details',
    'Agree to T&C',
  ];
}

function getStepContent({ step, props }) {
  console.log('STEP', step);
  console.log('PROPS', props);
  switch (step) {
    case 0:
      return (
        <Mutation mutation={CREATE_USER_MUTATION}>
          {mutation => {
            return <CreateAccount createAccount={mutation} {...props} />;
          }}
        </Mutation>
      );
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
            console.log('PROPS Case 1', props);
            console.log('DATA Case 1', data);
            return (
              <Mutation mutation={UPDATE_CURRENT_USER_MUTATION}>
                {mutation => {
                  return (
                    <CreateProfile
                      createProfile={mutation}
                      user={data}
                      {...props}
                    />
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      );
    case 2:
      return (
        <Query query={GET_CURRENT_USER_QUERY}>
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }
            if (error) {
              console.log('Error Case 2', error);
              return null;
            }
            console.log('PROPS Case 2', props);
            console.log('DATA Case 2', data);
            return (
              <Mutation mutation={UPDATE_CURRENT_USER_MUTATION}>
                {mutation => {
                  return (
                    <CreateCompany
                      createCompany={mutation}
                      user={data}
                      {...props}
                    />
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      );
    case 3:
      return (
        <Query query={GET_CURRENT_USER_QUERY}>
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }
            return (
              <Mutation mutation={UPDATE_COMPANY_MUTATION}>
                {mutation => {
                  return (
                    <TermsAndConditions
                      updateCompany={mutation}
                      user={data}
                      {...props}
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
