import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Formik, Field, Form } from 'formik';
import { CREATE_COMPANY_MUTATION, GET_COMPANY_TARGET_MARKETS } from './graphql';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  CodeXExpansionPanel,
  CodeXFormHeader,
  handleCreateCompany,
  getInitialValues,
} from '../../features/company.create/helpers';
import {
  Basics,
  Logo,
  Location,
  Links,
  Categories,
} from '../../features/company.create/components/';
import Preview from './components/preview';
import { Container, SectionWrapper } from '../../../../atoms';
import * as Yup from 'yup';
import styled from 'styled-components';
import { ConsoleLogger } from '@aws-amplify/core';

function useProps({ data, ...props }) {
  return {
    targetMarkets: data,
    ...props,
  };
}

export function CreateCompany({
  handleCompanyCreate,
  handleClose,
  classes,
  ...props
}) {
  const mutation = useMutation(CREATE_COMPANY_MUTATION);
  const createCompany = handleCreateCompany({
    mutation,
    user: props.user,
    handleClose,
  });

  const { data, loading, error } = useQuery(GET_COMPANY_TARGET_MARKETS);
  const [image, setImage] = React.useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );

  return (
    <Formik
      onSubmit={createCompany}
      initialValues={getInitialValues()}
      validationSchema={ValidationSchema}
    >
      {({
        values,
        isSubmitting,
        handleBlur,
        errors,
        touched,
        validateField,
        handleChange,
        setFieldError,
        ...rest
      }) => {
        const getProps = useProps({
          data,
          classes,
          setImage,
          values,
          handleBlur,
          ...rest,
        });

        const intersection = Object.keys(touched).filter(element =>
          Object.keys(errors).includes(element)
        );

        const canSubmit = () => {
          if (Object.keys(touched).length < 1) {
            return true;
          }

          if (intersection.length > 0) {
            return true;
          }

          return false;
        };

        const getDisplayedErrorMessage = () => {
          let error = { section: null, message: null };

          switch (intersection[0]) {
            case 'name':
              error = { section: 'Basics', message: errors.name };
              break;
            case 'description':
              error = { section: 'Basics', message: errors.description };
              break;
            case 'yearFounded':
              error = { section: 'Basics', message: errors.yearFounded };
              break;
            default:
              error = null;
          }
          return error;
        };

        return (
          <>
            <Form>
              <CodeXFormHeader text={`Create Company Profile`} />
              <Preview values={values} />
              {getDisplayedErrorMessage() !== null && (
                <ErrorMessageContainer>
                  <FormHelperText error={true}>
                    Error in {getDisplayedErrorMessage().section} section.
                  </FormHelperText>
                  <FormHelperText error={true}>
                    {getDisplayedErrorMessage().message}
                  </FormHelperText>
                </ErrorMessageContainer>
              )}

              <CodeXExpansionPanel
                title="Basics"
                error={
                  (errors.name && touched.name) ||
                  (errors.description && touched.description) ||
                  (errors.yearFounded && touched.yearFounded)
                    ? true
                    : false
                }
              >
                <Basics {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel
                title="Logo"
                error={errors.logo && touched.logo ? true : false}
                style={{ maxHeight: 308 }}
              >
                <Logo {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Location">
                <Location
                  {...getProps}
                  errors={errors.location && touched.location ? true : false}
                />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Links">
                <Links
                  {...getProps}
                  errors={
                    (errors.website && touched.website) ||
                    (errors.addresss && touched.address)
                      ? true
                      : false
                  }
                />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Categories">
                <Categories
                  {...getProps}
                  errors={
                    errors.categories && touched.categories ? true : false
                  }
                />
              </CodeXExpansionPanel>
              <SectionWrapper>
                <Button
                  type="submit"
                  disabled={canSubmit()}
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

const currentDate = new Date();
const yesterday = new Date(
  currentDate.setDate(currentDate.getDate() - 1)
).toISOString();

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  description: Yup.string()
    .required('Description is required.')
    .min(150, 'Description must be at least 150 characters.'),
  yearFounded: Yup.date()
    .required('Date founded is required.')
    .max(yesterday, 'Date founded must be before today.'),
});

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export default CreateCompany;
