import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import CompanyLinksSelect from '../select';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import CodeXTextField from '../../../../components/codex.textinput';

function CompanyLinksInput(props) {
  const { values, errors, touched, classes } = props;

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
                  initalItem={values.links[index]}
                  styles={{
                    paddingRight: '1rem',
                    minWidth: '250px',
                    marginTop: 0,
                  }}
                />
                <AddressAndButtonsContainer>
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
                  <ButtonsContainer>
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
                  </ButtonsContainer>
                </AddressAndButtonsContainer>
              </Container>
            ))
          ) : (
            <button type="button" onClick={() => arrayHelpers.push('')}>
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
  flex-grow: 1;
  margin-top: 1rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AddressAndButtonsContainer = styled.div`
  display: flex;
  flex-grow: 2;
  @media (max-width: 480px) {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

export default CompanyLinksInput;
