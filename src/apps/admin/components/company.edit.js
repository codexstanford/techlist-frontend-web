import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import CodeXTextField from './codex.textinput';
import styled from 'styled-components';
import Confirm from '../../../atoms/confirm';

function EditCompany({ company, isEditing, toggleEditing, data, ...props }) {
  async function handleSubmit({ role, description, title }, { setSubmitting }) {
    try {
      setSubmitting(true);
      console.log('submitted');
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={{
        id: company.id,
        description: company.description,
        name: company.name[0].payload,
        dateFounded: company.yearFounded && company.yearFounded.slice(0, 10),
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, submitForm }) => {
        return (
          <Confirm
            confirmText="Save"
            cancelText="Cancel"
            onCancel={() => {}}
            onClose={() => toggleEditing(false)}
            onConfirm={submitForm}
            open={isEditing}
            title={`Edit your company ${company.name[0].payload}`}
          >
            <Container>
              <CodeXTextField
                type="text"
                name={`name`}
                errors={errors}
                touched={touched}
                value={values.name}
                label="Name"
                style={{
                  flexGrow: 2,
                }}
              />
              <CodeXTextField
                name="dateFounded"
                margin="normal"
                type="date"
                errors={errors}
                touched={touched}
                label="Date Founded"
                fullWidth={false}
                InputLabelProps={{ shrink: true }}
              />
              <CodeXTextField
                type="text"
                name={`description`}
                errors={errors}
                touched={touched}
                value={values.description}
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

// EditCompany.propTypes = {
//   company: PropTypes.shape({
//     id: PropTypes.string,
//     role: PropTypes.PropTypes.string,
//     title: PropTypes.PropTypes.string,
//   }),
// };

export default EditCompany;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
