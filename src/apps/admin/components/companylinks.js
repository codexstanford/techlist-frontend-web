import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import CompanyLinksSelect from './companylinks.select';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

function CompanyLinksInput(props) {
  const { values, errors, touched, classes } = props;
  console.log('PROPS IN COMPANY LINKS: ', props);

  return (
    <FieldArray
      name="links"
      render={arrayHelpers => (
        <div>
          {values.links && values.links.length > 0 ? (
            values.links.map((friend, index) => (
              <Container key={index}>
                <Field
                  name={`links.${index}.type`}
                  component={CompanyLinksSelect}
                  classes={props.classes}
                  styles={{
                    paddingRight: '1rem',

                    minWidth: '150px',
                  }}
                />
                <CodeXTextField
                  type="text"
                  name={`links.${index}.payload`}
                  errors={errors}
                  touched={touched}
                  value={values.links[index].payload}
                  label="Address"
                  style={{
                    flexGrow: 2,
                  }}
                />
                <Fab
                  style={{ marginRight: '1px' }}
                  size="small"
                  aria-label="Delete"
                  className={classes.fab}
                  onClick={() => arrayHelpers.remove(index)}
                >
                  <DeleteIcon />
                </Fab>
                {values.links.length === index + 1 ? (
                  <Fab
                    onClick={() => arrayHelpers.push('')}
                    size="small"
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                  >
                    <AddIcon />
                  </Fab>
                ) : null}
              </Container>
            ))
          ) : (
            <button type="button" onClick={() => arrayHelpers.push('')}>
              {/* show this when user has removed all friends from the list */}
              Add a friend
            </button>
          )}
        </div>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export default CompanyLinksInput;

function CodeXTextField({
  name,
  type = 'text',
  label,
  component = TextField,
  errors,
  touched,
  value,
  ...rest
}) {
  console.log('REST IN CODEX TEXT FIELD', value);
  const fieldErrors = errors[name];
  const isTouched = touched[name];
  return (
    <>
      <Field
        name={name}
        type={type}
        label={label || name}
        component={component}
        fullWidth={false}
        InputLabelProps={{}}
        value={value}
        {...rest}
      />
      {fieldErrors && isTouched ? <div>{fieldErrors}</div> : null}
    </>
  );
}
