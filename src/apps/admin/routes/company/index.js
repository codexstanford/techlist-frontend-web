import React, { useState } from 'react';
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
import Avatar from '@material-ui/core/Avatar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import styled from 'styled-components';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const handleCreateCompany = async (
    { name, description, location, locationjson },
    { setSubmitting }
  ) => {
    console.log('got called');
    console.log('locationjson', locationjson);
    const { formatted_address, geometry, place_id } = locationjson;
    try {
      const result = await createCompany({
        variables: {
          data: {
            name: {
              create: {
                payload: name,
                fromDate: new Date(),
              },
            },
            description,
            location: {
              create: {
                formatted_address,
                geometry,
                placeId: place_id,
              },
            },
            affiliation: {
              create: {
                fromDate: new Date(),
                person: {
                  connect: {
                    id: user.person.id,
                  },
                },
              },
            },
            metadata: {
              create: defaultCreateCompanyMetadata,
            },
          },
        },
      });
      setSubmitting(false);
      navigate('/app/profile/');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(rest);
  return (
    <Container className={classes.main}>
      <Dialog open={true} TransitionComponent={Transition} fullWidth={true}>
        <DialogContent>
          <CreateCompanyForm
            handleSubmit={handleCreateCompany}
            classes={classes}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

function CreateCompanyForm({ classes, handleSubmit, ...rest }) {
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );
  return (
    <Formik onSubmit={handleSubmit} initialValues={{}}>
      {({
        isSubmitting,
        values,
        setFieldValue,
        setValues,
        isValid,
        errors,
        touched,
      }) => {
        const { name } = values;

        return (
          <>
            <FormHeader companyName={name} />
            <Form className={classes.form}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <StyledInput
                    onChange={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log(e.target.files);

                      const fileReader = new FileReader();
                      fileReader.onloadend = e => {
                        const content = fileReader.result;
                        setFieldValue('avatar', content);
                        setImage(content);
                      };
                      if (e.target.files.length > 0) {
                        fileReader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="avatar">
                    <Fab
                      style={{
                        margin: 10,
                        width: 120,
                        height: 120,
                      }}
                    >
                      <label htmlFor="avatar">
                        <Avatar
                          style={{ width: 120, height: 120 }}
                          src={values.avatar}
                          imgProps={{
                            style: { maxWidth: '100%', maxHeight: '100%' },
                          }}
                        />
                      </label>
                    </Fab>
                  </label>
                </div>
              </div>

              <CodeXTextField
                name="name"
                type="text"
                errors={errors}
                touched={touched}
                label="Company Name"
                fullWidth={true}
              />

              <CodeXTextField
                type="text"
                name="description"
                multiline={true}
                margin="normal"
                errors={errors}
                touched={touched}
                label="Company Description"
              />
              <AddressField
                classes={classes}
                setFieldValue={setFieldValue}
                setValues={setValues}
              />

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
        fullWidth={true}
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

const StyledInput = styled.input.attrs({
  type: 'file',
  id: 'avatar',
  accept: 'image/*',
})`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
