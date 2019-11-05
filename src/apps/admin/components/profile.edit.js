import React from 'react';
import { Formik } from 'formik';
import CodeXTextField from './codex.textinput';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';

import Confirm from '../../../atoms/confirm';
import { UPDATE_PERSON, GET_CURRENT_USER_QUERY } from '../../../graphql';

function EditProfile({ open, handleClose, classes, ...props }) {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_QUERY);
  const updatePerson = useMutation(UPDATE_PERSON);

  const { me } = data;

  if (loading) {
    return null;
  }

  if (error) {
    console.log(error);
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, avatar, handle } = values;

    await setSubmitting(true);
    try {
      setSubmitting(true);
      const result = await updatePerson({
        variables: {
          where: {
            id: me.person.id,
          },
          data: {
            // handle,
            name: {
              update: {
                where: {
                  id: me.person.name[0].id,
                },
                data: {
                  firstName,
                  lastName,
                },
              },
            },
            avatar: {
              update: {
                where: {
                  id: me.person.avatar[0].id,
                },
                data: {
                  payload: avatar,
                  fromDate: new Date(),
                },
              },
            },
          },
        },
      });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
    await setSubmitting(false);
  };

  const { avatar } = me.person;

  return (
    <Formik
      initialValues={{
        avatar: avatar && avatar.length > 0 ? avatar[0].payload : '',
        firstName: me.person.name[0].firstName,
        lastName: me.person.name[0].lastName,
        handle: me.handle,
      }}
      onSubmit={handleSubmit}
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
          <Confirm
            confirmText="Save"
            cancelText="Cancel"
            onCancel={() => {}}
            onClose={handleClose}
            onConfirm={submitForm}
            open={open}
            title={<TitleContainer>Edit your Profile</TitleContainer>}
          >
            <Container>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <StyledInput
                  onChange={e => {
                    e.stopPropagation();
                    e.preventDefault();

                    const fileReader = new FileReader();
                    fileReader.onloadend = e => {
                      const content = fileReader.result;
                      setFieldValue('avatar', content);
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
                          style: {
                            maxWidth: '100%',
                            maxHeight: '100%',
                          },
                        }}
                      />
                    </label>
                  </Fab>
                </label>
              </div>
              <CodeXTextField
                type="text"
                name={`firstName`}
                errors={errors}
                touched={touched}
                value={values.firstName}
                label="First Name"
                style={{
                  flexGrow: 2,
                }}
              />
              <CodeXTextField
                type="text"
                name={`lastName`}
                errors={errors}
                touched={touched}
                value={values.lastName}
                label="Last Name"
                multiline={true}
                style={{
                  flexGrow: 2,
                }}
              />
              <CodeXTextField
                type="text"
                name={`handle`}
                errors={errors}
                touched={touched}
                value={values.handle}
                label="username"
                multiline={true}
                style={{
                  flexGrow: 2,
                }}
              />
            </Container>
          </Confirm>
        );
      }}
    </Formik>
  );
}

export default EditProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20rem;

  @media (max-width: 480px) {
    min-width: 10rem;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
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
