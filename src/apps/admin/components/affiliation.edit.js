import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import CodeXTextField from './codex.textinput';
import styled from 'styled-components';
import { useMutation } from 'react-apollo-hooks';
import { UPDATE_PERSON_AFFILIATION } from '../../../graphql/mutations';
import { StaticQuery, graphql } from 'gatsby';

import Confirm from '../../../atoms/confirm';

function EditAffiliation({
  affiliation,
  isEditing,
  toggleEditing,
  data,
  ...props
}) {
  const updateAffiliation = useMutation(UPDATE_PERSON_AFFILIATION);
  const { organizations } = data.allTechList;

  const [organizationValuePairs, setOrganizationValuePairs] = React.useState();

  React.useEffect(() => {
    const conformedOrgs = organizations.map(org => ({
      value: org.id,
      label: org.name && org.name[0].payload,
    }));
    setOrganizationValuePairs(conformedOrgs);
  }, [organizations]);

  async function handleSubmit(
    { fromDate, throughDate, role, description, title },
    { setSubmitting }
  ) {
    try {
      setSubmitting(true);
      const result = await updateAffiliation({
        variables: {
          where: {
            id: affiliation.id,
          },
          data: {
            fromDate,
            throughDate,
            role,
            description,
            title,
          },
        },
      });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      return error;
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
        fromDate: affiliation.fromDate.split('T')[0],
        id: affiliation.id || '',
        description: affiliation.description || '',
        throughDate:
          affiliation.throughDate !== null
            ? affiliation.throughDate.split('T')[0]
            : '',
        role: affiliation.role || '',
        title: affiliation.title || '',
        organization: affiliation.organization
          ? conformOrganizationData(affiliation.organization)
          : '',
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
            onClose={toggleEditing}
            onCancel={() => {}}
            onConfirm={submitForm}
            open={isEditing}
            title={`Edit your affiliation with ${affiliation.organization.name[0].payload}`}
          >
            <Container>
              <div style={{ display: 'flex' }}>
                {' '}
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
                  InputLabelProps={{ shrink: true }}
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

export default props => (
  <StaticQuery
    query={graphql`
      query EditAffiliationOrgQuery {
        allTechList {
          organizations {
            id
            name {
              payload
            }
          }
        }
      }
    `}
    render={data => <EditAffiliation data={data} {...props} />}
  />
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
