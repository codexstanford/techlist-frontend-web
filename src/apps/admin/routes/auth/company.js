import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { steps } from '../../../../helpers/enums';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Container, SectionWrapper } from '../../../../atoms';
import { AvatarWithPicker } from '../../../../molecules';
import { opts, linkOptions } from './mocks';
import { handleCompanySubmitRequest } from './helpers';

export function CreateCompany({ classes, ...props }) {
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );
  const { id: userId } = props.user.me;
  const { id: personId } = props.user.me.person;
  const { setStep, activeStep: step, createCompany } = props;

  if (
    props.user.me.person.affiliations &&
    props.user.me.person.affiliations.length > 0
  ) {
    setStep(steps.COMPANY);
  }
  debugger;
  const timeStamp = Date.now().toString();

  return (
    <Formik
      onSubmit={handleCompanySubmitRequest({
        userId,
        personId,
        createCompany,
        setStep,
      })}
      initialValues={{
        name: '',
        dateFounded: timeStamp,
        description: '',
        twitter: '',
        crunchbase: '',
        angellist: '',
        logo: image,
        location: {},
        emailSales: '',
        emailSupport: '',
        dateStarted: timeStamp,
        role: '',
      }}
    >
      {({ isSubmitting, values, setFieldValue, isValid, errors, touched }) => {
        const companyName =
          values.name && values.name.length > 3 ? values.name : 'Company';
        return (
          <Container className={classes.main}>
            <SectionWrapper style={{ alignItems: 'center' }}>
              <Typography
                variant="h5"
                color="primary"
                style={{
                  fontWeight: '700',
                  letterSpacing: '-.5px',
                  textDecoration: 'none',
                }}
              >
                Create {companyName} Profile
              </Typography>
            </SectionWrapper>
            <Form className={classes.form}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <AvatarWithPicker
                    setFieldValue={setFieldValue}
                    setImage={setImage}
                    image={image}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    type="text"
                    label="Company Name"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    component={TextField}
                  />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="description"
                    multiline
                    margin="normal"
                    label="Company Description"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    component={TextField}
                  />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="dateFounded"
                    type="date"
                    label="Date Founded"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    component={TextField}
                  />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                </div>

                <div>
                  <Field
                    margin="normal"
                    name="role"
                    type="text"
                    label={
                      values.name.length > 4
                        ? `Your role at ${values.name}`
                        : 'Your role'
                    }
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    component={TextField}
                  />
                  {errors.role && touched.role ? (
                    <div>{errors.role}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="dateStarted"
                    margin="normal"
                    type="date"
                    label={
                      values.name.length > 0
                        ? `Date you started at ${values.name}`
                        : 'Date started'
                    }
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    component={TextField}
                  />
                  {errors.role && touched.role ? (
                    <div>{errors.role}</div>
                  ) : null}
                </div>
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
                  Create Company Profile
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </SectionWrapper>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

export default CreateCompany;
