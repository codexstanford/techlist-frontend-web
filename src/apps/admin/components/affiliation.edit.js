import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import CodeXTextField from './codex.textinput';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { UPDATE_PERSON_AFFILIATION } from '../../../graphql/mutations';
import { StaticQuery, graphql } from 'gatsby';
import { DownshiftMultiple } from '../features/company.create/components/categories/';
import Select from './select';
import Confirm from '../../../atoms/confirm';

function EditAffiliation({ affiliation, data, ...props }) {
  const updateAffiliation = useMutation(UPDATE_PERSON_AFFILIATION);
  const { organizations } = data.allTechList;

  const [organizationValuePairs, setOrganizationValuePairs] = React.useState();

  React.useEffect(() => {
    const conformedOrgs = organizations.map(org => ({
      value: org.id,
      label: org.name[0].payload,
    }));
    setOrganizationValuePairs(conformedOrgs);
  }, [organizations]);

  async function handleSubmit(
    { fromDate, throughDate, role, description, title },
    bag
  ) {
    try {
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
    } catch (error) {
      console.log(error);
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
        id: affiliation.id,
        throughDate:
          affiliation.throughDate !== null
            ? affiliation.throughDate.split('T')[0]
            : null,
        role: affiliation.role,
        title: affiliation.title,
        organization: affiliation.organization
          ? conformOrganizationData(affiliation.organization)
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
        console.log('VALUES IN EDIT AF', values);
        return (
          <Confirm
            confirmText="Save"
            cancelText="Cancel"
            onConfirm={submitForm}
            title={`Edit your affiliation with ${
              affiliation.organization.name[0].payload
            }`}
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
                />
              </div>
              {/* <div>
                <Select
                  name="organization"
                  options={organizationValuePairs}
                  setFieldValue={setFieldValue}
                  label="Company"
                  {...props}
                />
                <DownshiftMultiple
                  options={organizationValuePairs}
                  setFieldValue={setFieldValue}
                  {...props}
                />
              </div> */}

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
    throughDate: PropTypes.oneOfType(['string', 'null']),
    role: PropTypes.oneOfType(['string', 'null']),
    title: PropTypes.oneOfType(['string', 'null']),
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
