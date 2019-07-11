import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Formik, Field, Form } from 'formik';
import { CREATE_COMPANY_MUTATION, GET_COMPANY_TARGET_MARKETS } from './graphql';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  CodeXExpansionPanel,
  CodeXFormHeader,
  handleCreateCompany,
  getInitialValues,
  checkCanFormSubmit,
  checkForSectionErrors,
  ValidationSchema,
} from '../../features/company.create/helpers';
import {
  Basics,
  Logo,
  Location,
  Links,
  Categories,
} from '../../features/company.create/components/';
import Preview from './components/preview';
import FormErrorMessage from './components/formErrorMessage';

import { Container, SectionWrapper } from '../../../../atoms';

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

        return (
          <>
            <Form>
              <CodeXFormHeader text={`Create Company Profile`} />
              <Preview values={values} />
              <FormErrorMessage touched={touched} errors={errors} />

              <CodeXExpansionPanel
                title="Basics"
                error={checkForSectionErrors(touched, errors, [
                  'name',
                  'description',
                  'yearFounded',
                  'targetMarkets',
                ])}
              >
                <Basics {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel
                title="Logo"
                error={checkForSectionErrors(touched, errors, ['logo'])}
                style={{ maxHeight: 308 }}
              >
                <Logo {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Location">
                <Location
                  {...getProps}
                  errors={checkForSectionErrors(touched, errors, ['location'])}
                />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Links">
                <Links
                  {...getProps}
                  errors={checkForSectionErrors(touched, errors, [
                    'website',
                    'address',
                  ])}
                />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Categories">
                <Categories
                  {...getProps}
                  errors={checkForSectionErrors(touched, errors, [
                    'categories',
                  ])}
                />
              </CodeXExpansionPanel>
              <SectionWrapper>
                <Button
                  type="submit"
                  disabled={checkCanFormSubmit(touched, errors)}
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

export default CreateCompany;
