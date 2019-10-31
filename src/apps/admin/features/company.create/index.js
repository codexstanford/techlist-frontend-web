import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Formik, Field, Form } from 'formik';
import {
  CREATE_COMPANY_MUTATION,
  GET_COMPANY_TARGET_MARKETS,
  GET_USER_ADMIN_COMPANIES,
} from './graphql';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

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
} from '../../features/company.create/components/';
import Categories from '../../features/company.create/components/categories/index.js';
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
  user,
  ...props
}) {
  console.log('props', props);
  const mutation = useMutation(CREATE_COMPANY_MUTATION, {
    update(
      client,
      {
        data: { createOrganization },
      }
    ) {
      try {
        const { partyAccount } = client.readQuery({
          query: GET_USER_ADMIN_COMPANIES,

          variables: {
            where: { id: user.id },
            orderBy: 'fromDate_DESC',
          },
        });

        const updatedData = partyAccount.admin.concat([createOrganization]);

        client.writeQuery({
          query: GET_USER_ADMIN_COMPANIES,
          data: {
            partyAccount: {
              id: user.id,
              admin: updatedData,
              __typename: createOrganization['__typename'],
            },
          },
        });
      } catch (error) {
        console.log(
          `ERROR updating cache for CREATE_COMPANY_MUTATION in company.create/index.js ${error}`
        );
        return error;
      }
    },
  });
  const createCompany = handleCreateCompany({
    mutation,
    user: user,
    handleClose,
  });

  const { data, loading, error } = useQuery(GET_COMPANY_TARGET_MARKETS);
  const [image, setImage] = React.useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );

  console.log('**** TARGET MARKETS', data);

  return (
    <Formik
      onSubmit={createCompany}
      initialValues={getInitialValues()}
      validationSchema={ValidationSchema}
      style={{ width: '100%' }}
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
            <StyledForm>
              <CodeXFormHeader text={`Create Company Profile`} />
              <Preview values={values} touched={touched} />
              <FormErrorMessage touched={touched} errors={errors} />

              <CodeXExpansionPanel
                defaultExpanded={true}
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
            </StyledForm>
          </>
        );
      }}
    </Formik>
  );
}

const StyledForm = styled(Form)`
  width: 100%;
  align-self: center;
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 2rem 0;
  }
`;

export default CreateCompany;
