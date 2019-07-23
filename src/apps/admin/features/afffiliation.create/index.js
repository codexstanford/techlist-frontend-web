import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import CodeXTextField from '../../components/codex.textinput';
import styled from 'styled-components';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_AFFILIATION_MUTATION } from './graphql/mutations';
import { StaticQuery, graphql } from 'gatsby';
import Confirm from '../../../../atoms/confirm';

function EditAffiliation({
  affiliation,
  open,
  handleClose,
  data,
  initialCompany,
  user,
  ...props
}) {
  const createAffiliation = useMutation(CREATE_AFFILIATION_MUTATION);

  async function handleSubmit(
    { fromDate, throughDate, role, description, title, organization },
    { setSubmitting }
  ) {
    try {
      setSubmitting(true);
      const result = await createAffiliation({
        variables: {
          data: {
            fromDate,
            throughDate,
            role,
            description,
            title,
            organization: { connect: { id: initialCompany.id } },
            person: { connect: { id: user.person.id } },
          },
        },
      });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  }

  function conformOrganizationData(org) {
    return {
      value: org.id,
      label: org.name[0].payload,
    };
  }

  return (
    <Formik
      initialValues={{
        fromDate: '',
        id: '',
        description: '',
        throughDate: '',
        role: '',
        title: '',
        organization: initialCompany
          ? conformOrganizationData(initialCompany)
          : null,
      }}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        setFieldValue,
        setValues,
        isValid,
        errors,
        touched,
        submitForm,
      }) => {
        return (
          <Confirm
            confirmText="Save"
            cancelText="Cancel"
            onClose={handleClose}
            onCancel={() => {}}
            onConfirm={submitForm}
            open={open}
            title={
              <TitleContainer>
                {`Create an affiliation with ${initialCompany.name[0].payload}`}
              </TitleContainer>
            }
          >
            <Container>
              <div style={{ display: 'flex' }}>
                <CodeXTextField
                  name="fromDate"
                  margin="normal"
                  type="date"
                  errors={errors}
                  touched={touched}
                  label="Date From"
                  fullWidth={false}
                  style={{ paddingHorizontal: '2px', marginRight: '1rem' }}
                />
                <CodeXTextField
                  name="throughDate"
                  margin="normal"
                  type="date"
                  errors={errors}
                  touched={touched}
                  label="Date To"
                  fullWidth={false}
                  style={{ paddingHorizontal: '2px' }}
                />
              </div>

              <CodeXTextField
                type="text"
                name={`title`}
                errors={errors}
                touched={touched}
                value={values.title}
                label="Title"
                style={{
                  flexGrow: 2,
                }}
              />
              <CodeXTextField
                type="text"
                name={`description`}
                errors={errors}
                touched={touched}
                value={values.title}
                label="Description"
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

EditAffiliation.propTypes = {
  affiliation: PropTypes.shape({
    id: PropTypes.string,
    fromDate: PropTypes.string,
    throughDate: PropTypes.string,
    role: PropTypes.PropTypes.string,
    title: PropTypes.PropTypes.string,
    organization: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.arrayOf(
        PropTypes.shape({
          payload: PropTypes.string,
        })
      ),
    }),
  }),
};

export default EditAffiliation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  text-align: center;
`;
