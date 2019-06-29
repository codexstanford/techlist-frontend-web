import React from 'react';
import Downshift from 'downshift';

import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { useMutation } from 'react-apollo-hooks';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Container, SectionWrapper } from '../../../../atoms';
import { AvatarWithPicker } from '../../../../molecules';
import AddressField from './location';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiTextField from '@material-ui/core/TextField';

import { CREATE_COMPANY_MUTATION } from './company.graphql';

const defaultCreateCompanyMetadata = {
  isDraft: true,
  isPublic: false,
  isUnverified: false,
  isApproved: false,
  isPendingReview: false,
};

function CompanySubmitButton({}) {
  const createCompany = useMutation(CREATE_COMPANY_MUTATION);
}

export default function CreateCompanyScreen({
  classes,
  user,
  navigate,
  ...rest
}) {
  const createCompany = useMutation(CREATE_COMPANY_MUTATION);

  if (!user) {
    navigate('/app/login', {
      redirect: '/app/company/',
    });
  }

  const handleCreateCompany = async ({ name }, { setSubmitting }) => {
    console.log('got called');
    try {
      const result = await createCompany({
        variables: {
          data: {
            name,
            contact: {
              create: {},
            },
            metadata: {
              create: defaultCreateCompanyMetadata,
            },
          },
        },
      });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(rest);
  return (
    <Container className={classes.main}>
      <Paper className={classes.paper}>
        <CreateCompanyForm
          handleSubmit={handleCreateCompany}
          classes={classes}
        />
      </Paper>
    </Container>
  );
}

function CreateCompanyForm({ classes, handleSubmit, ...rest }) {
  return (
    <Formik onSubmit={handleSubmit} initialValues={{}}>
      {({ isSubmitting, values, setFieldValue, isValid, errors, touched }) => {
        const { name } = values;

        return (
          <>
            <FormHeader companyName={name} />
            <Form className={classes.form}>
              <CodeXTextField
                name="name"
                type="text"
                errors={errors}
                touched={touched}
                label="Company Name"
              />

              <CodeXTextField
                type="text"
                name="description"
                multiline
                margin="normal"
                errors={errors}
                touched={touched}
                label="Company Description"
              />
              <AddressField classes={classes} />

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
          </>
        );
      }}
    </Formik>
  );
}

function CodeXTextField({
  name,
  type = 'text',
  label,
  component = TextField,
  errors,
  touched,
  ...rest
}) {
  const fieldErrors = errors[name];
  const isTouched = touched[name];
  return (
    <div>
      <Field
        name={name}
        type={type}
        label={label || name}
        component={component}
        fullWidth
        InputLabelProps={{}}
        {...rest}
      />
      {fieldErrors && isTouched ? <div>{fieldErrors}</div> : null}
    </div>
  );
}

function FormHeader({ companyName = 'Company' }) {
  return (
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
  );
}
