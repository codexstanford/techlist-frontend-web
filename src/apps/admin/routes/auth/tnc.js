import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { Query } from 'react-apollo';
import { Formik, Field, Form } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Container, SectionWrapper } from '../../../../atoms';
import { GET_COMPANY_QUERY } from '../../../../graphql';

export function TermsAndConditions({ classes, theme, ...props }) {
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );
  const { id: userId } = props.user.me;
  const { id: personId } = props.user.me.person;
  const { setStep, activeStep: step } = props;

  console.log('PROPS ON TNC', props);

  const handleSubmitRequest = async (
    values,
    { setSubmitting, setErrors, setFieldError }
  ) => {
    try {
      setSubmitting(true);
      const result = await props.updateCompany({
        variables: {
          where: { id: props.user.me.person.affiliations[0].company.id },
          data: {
            metadata: {
              update: {
                isPendingReview: true,
              },
            },
          },
        },
      });

      setSubmitting(false);
      navigate('/app/profile', { personId, userId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.main}>
      <SectionWrapper style={{ alignItems: 'center' }}>
        {' '}
        <Typography
          variant="h5"
          color="primary"
          style={{
            fontWeight: '700',
            letterSpacing: '-.5px',
            textDecoration: 'none',
            marginBottom: 20,
          }}
        >
          Welcome {props.user.me.person.profile.firstName}!
        </Typography>
        <Typography component="p" variant="subtitle1">
          Only one more step to go! Confirm that we've got the right information
          for you below, agree to our terms and conditions, and submit your
          entries for review.
        </Typography>
      </SectionWrapper>
      <Container>
        <Card className={classes.card}>
          <Avatar
            style={{ width: 100, height: 100, margin: 10 }}
            src={data.me.person.profile.avatar}
            imgProps={{
              style: { maxWidth: '100%', maxHeight: '100%' },
            }}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {props.user.me.person.profile.firstName}{' '}
                {props.user.me.person.profile.lastName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.user.me.person.affiliations.map(aff => {
                  return `${aff.role} @ ${aff.company.name}`;
                })}
              </Typography>
            </CardContent>
            <div className={classes.controls} />
          </div>
        </Card>
      </Container>
      <Container>
        <Query
          query={GET_COMPANY_QUERY}
          variables={{
            where: { id: props.user.me.person.affiliations[0].company.id },
          }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }
            if (error) {
              console.log(error);
              return null;
            }
            const { company } = data;

            return (
              <Card className={classes.card} style={{ marginTop: 20 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    className={classes.cover}
                    image={company.logo}
                    title="Live from space album cover"
                  />
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {company.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {company.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <div className={classes.details} />
              </Card>
            );
          }}
        </Query>
        <Container style={{ marginTop: 20 }}>
          <Typography component="p" variant="subtitle1">
            If you're all set, we're all set. Submit your entry and we'll get to
            work reviewing it.
          </Typography>
          <Formik
            initialValues={{
              terms: false,
            }}
            onSubmit={handleSubmitRequest}
          >
            {({ isSubmitting, values, setFieldValue }) => {
              return (
                <Form className={classes.form}>
                  <FormGroup row>
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
                      label="I agree to the terms of service."
                    />
                  </FormGroup>
                  <SectionWrapper>
                    <Button
                      type="submit"
                      disabled={!values.terms}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Submit for Review
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </SectionWrapper>
                </Form>
              );
            }}
          </Formik>
        </Container>
      </Container>
    </Container>
  );
}

export default TermsAndConditions;
