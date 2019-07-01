import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { steps } from '../../../../helpers/enums';
import { TextField, Select } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MenuItem } from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { schema } from './index';
import { navigate } from '@reach/router';

const opts = [
  { value: 'Attorney', label: 'Attorney' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Product Desginer', label: 'Product Desginer' },
];

const linkOptions = [
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Other', label: 'Other' },
];

function CreateProfile({ classes, ...props }) {
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );

  console.log('PROPS ON PROFILE', props);
  const { id: userId } = props.user;

  const handleSubmitRequest = async (
    values,
    { setSubmitting, setErrors, setFieldError }
  ) => {
    setSubmitting(true);
    const { firstName, lastName, avatar, title, handle } = values;
    try {
      const profile = await props
        .createProfile({
          update: (cache, { data: { updatePartyAccount } }) => {
            // console.log('UPDATE USER IN COMPANY', updatePartyAccount);
          },
          variables: {
            where: {
              id: userId,
            },
            data: {
              person: {
                update: {
                  metadata: {
                    update: {
                      isDraft: false,
                    },
                  },
                  avatar: {
                    create: {
                      payload: avatar,
                      fromDate: new Date(),
                    },
                  },
                  name: {
                    create: {
                      firstName,
                      lastName,
                      fromDate: new Date(),
                    },
                  },
                },
              },
            },
          },
        })
        .then(data => {
          console.log('DATA IN PROMISE', data);
          setSubmitting(false);
          // props.user.person.profile = profile;
          navigate('/app/profile/index.js');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitRequest}
      initialValues={{
        firstName: '',
        lastName: '',
        title: '',
        location: '',
        handle: '',
        avatar: image,
        links: [],
        skills: [],
      }}
      validationSchema={schema}
    >
      {({
        submitForm,
        isSubmitting,
        values,
        setFieldValue,
        isValid,
        errors,
        touched,
      }) => {
        return (
          <Container className={classes.main}>
            <HeaderWrapper>
              <Typography
                variant="h5"
                color="primary"
                style={{
                  fontWeight: '700',
                  letterSpacing: '-.5px',
                  textDecoration: 'none',
                }}
              >
                Create CodeX Profile
              </Typography>
            </HeaderWrapper>
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
                <div>
                  <Field
                    name="firstName"
                    type="text"
                    label="First Name"
                    fullWidth
                    component={TextField}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                </div>

                <div>
                  <Field
                    name="lastName"
                    type="text"
                    label="Last Name"
                    fullWidth
                    component={TextField}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="handle"
                    type="text"
                    label="Username"
                    fullWidth
                    component={TextField}
                  />
                  {errors.handle && touched.handle ? (
                    <div>{errors.handle}</div>
                  ) : null}
                </div>
                <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                  <Divider variant="middle" />
                </div>

                <div>
                  <FieldArray
                    name="links"
                    render={arrayHelpers => {
                      return (
                        <div>
                          {values.links && values.links.length > 0 ? (
                            values.links.map((link, index) => {
                              return (
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div
                                    key={index}
                                    style={{
                                      display: 'flex',
                                      flex: 1,
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Field
                                      select
                                      component={props => (
                                        <TextField {...props} />
                                      )}
                                      label="Link"
                                      name={`links.${index}.type`}
                                    >
                                      {linkOptions.map(opt => {
                                        return (
                                          <MenuItem
                                            key={opt.value}
                                            value={opt.value}
                                          >
                                            {opt.label}
                                          </MenuItem>
                                        );
                                      })}
                                    </Field>
                                    <Field
                                      name={`links.${index}.url`}
                                      label="Url"
                                      component={TextField}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                    }}
                                  >
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.insert(index, {
                                          type: '',
                                          url: '',
                                          isPublic: true,
                                        })
                                      }
                                    >
                                      <AddIcon />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <React.Fragment />
                          )}
                        </div>
                      );
                    }}
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
                    Create Profile!
                  </Button>
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </ButtonWrapper>
              </div>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

export default CreateProfile;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
`;

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
