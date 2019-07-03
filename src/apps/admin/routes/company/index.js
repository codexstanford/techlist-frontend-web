import React, { useState } from 'react';
import Downshift from 'downshift';
import Divider from '@material-ui/core/Divider';

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
import { useQuery } from 'react-apollo-hooks';
import { GET_COMPANY_TARGET_MARKETS } from '../../../../graphql/queries';

import CompanyLinksInput from '../../components/companylinks';
import CompanyTargetMarketSelect from '../../components/companylinks.select';

import { CompanyLocationMap } from '../../../../templates/company/locationmap';

import CompanyCategorySelect from '../../components/companycats';

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
  const { data: targetMarkets, loading, error } = useQuery(
    GET_COMPANY_TARGET_MARKETS
  );

  if (!user) {
    navigate('/app/login', {
      redirect: '/app/company/',
    });
  }

  const handleCreateCompany = async (
    {
      name,
      description,
      location,
      locationjson,
      links,
      targetMarkets,
      categories,
    },
    { setSubmitting }
  ) => {
    const { formatted_address, geometry, place_id } = locationjson;

    try {
      const result = await createCompany({
        variables: {
          data: {
            categories: {
              connect: categories.map(cat => ({ id: cat.value })),
            },
            name: {
              create: {
                payload: name,
                fromDate: new Date(),
              },
            },
            targetMarkets: {
              connect: {
                id: targetMarkets,
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
            links: {
              create: links.map(link => {
                return {
                  fromDate: new Date(),
                  payload: link.payload,
                  type: link.type,
                };
              }),
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

  return (
    <Container className={classes.main}>
      <Dialog open={true} TransitionComponent={Transition} fullWidth={true}>
        <DialogContent>
          <CreateCompanyForm
            handleSubmit={handleCreateCompany}
            classes={classes}
            targetMarkets={targetMarkets}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

function CreateCompanyForm({ classes, handleSubmit, targetMarkets, ...rest }) {
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        yearFounded: new Date().toISOString().split('T')[0],
        locationjson: {},
        targetMarkets: '',
        links: [
          { type: 'UrlWebsite', payload: '' },
          { type: 'UrlTwitter', payload: '' },
          { type: 'UrlCrunchbase', payload: '' },
        ],
      }}
    >
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
            <Typography
              variant="h6"
              color="primary"
              style={{
                fontWeight: '800',
                marginTop: '1rem',
                letterSpacing: '-.5px',
                textDecoration: 'none',
              }}
            >
              Logo
            </Typography>
            <Form className={classes.form}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                        width: 400,
                        height: 300,
                        borderRadius: '5px',
                      }}
                    >
                      <label htmlFor="avatar">
                        <Avatar
                          style={{
                            width: 400,
                            height: 300,
                            borderRadius: '5px',
                          }}
                          src={values.avatar}
                          imgProps={{
                            style: {
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: 400,
                              height: 300,
                            },
                          }}
                        />
                      </label>
                    </Fab>
                  </label>
                </div>
              </div>

              <Typography
                variant="h6"
                color="primary"
                style={{
                  fontWeight: '800',
                  marginTop: '1rem',
                  letterSpacing: '-.5px',
                  textDecoration: 'none',
                }}
              >
                Basics
              </Typography>

              <CodeXTextField
                name="name"
                type="text"
                errors={errors}
                touched={touched}
                label="Name"
                fullWidth={true}
              />

              <CodeXTextField
                type="text"
                name="description"
                multiline={true}
                margin="normal"
                errors={errors}
                touched={touched}
                label="Description"
              />
              <div style={{ display: 'flex' }}>
                <CodeXTextField
                  name="yearFounded"
                  margin="normal"
                  type="date"
                  errors={errors}
                  touched={touched}
                  label="Date Founded"
                  fullWidth={false}
                />
                <div>
                  <Field
                    name="targetMarkets"
                    component={CompanyTargetMarketSelect}
                    classes={classes}
                    options={
                      targetMarkets &&
                      targetMarkets.organizationTargetMarkets &&
                      targetMarkets.organizationTargetMarkets.length > 0
                        ? targetMarkets.organizationTargetMarkets.map(t => ({
                            type: t.id,
                            niceName: t.payload,
                          }))
                        : []
                    }
                    label="Target Markets"
                    styles={{
                      paddingRight: '1rem',
                      minWidth: '150px',
                      marginTop: '15px',
                      marginLeft: '2rem',
                    }}
                  />
                </div>
              </div>
              <div>
                <AddressField
                  classes={classes}
                  setFieldValue={setFieldValue}
                  setValues={setValues}
                />
                {values.locationjson && values.locationjson.geometry ? (
                  <CompanyLocationMap
                    geometry={values.locationjson.geometry}
                    location={values.locationjson}
                  />
                ) : null}
              </div>

              <Typography
                variant="h6"
                color="primary"
                style={{
                  fontWeight: '800',
                  marginTop: '1rem',
                  letterSpacing: '-.5px',
                  textDecoration: 'none',
                }}
              >
                Company Links
              </Typography>

              <CompanyLinksInput
                classes={classes}
                setFieldValue={setFieldValue}
                setValues={setValues}
                errors={errors}
                touched={touched}
                values={values}
              />

              <Typography
                variant="h6"
                color="primary"
                style={{
                  fontWeight: '800',
                  marginTop: '1rem',
                  letterSpacing: '-.5px',
                  textDecoration: 'none',
                }}
              >
                Categories
              </Typography>

              <CompanyCategorySelect
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
  fullWidth = true,
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
        fullWidth={fullWidth}
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
