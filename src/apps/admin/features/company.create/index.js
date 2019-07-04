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

export function CreateCompany({ handleCompanyCreate, classes, ...props }) {
  const mutation = useMutation(CREATE_COMPANY_MUTATION);
  const createCompany = handleCreateCompany(mutation);
  const { data, loading, error } = useQuery(GET_COMPANY_TARGET_MARKETS);
  const [image, setImage] = React.useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
  );

  return (
    <Formik onSubmit={createCompany} initialValues={getInitialValues()}>
      {({ values, setFieldValue, isValid, isSubmitting, ...rest }) => {
        console.log('new company create', values);
        return (
          <>
            <CodeXFormHeader text={`Create Company Profile`} />
            <Preview values={values} />
            <CodeXExpansionPanel title="Basics">
              <Basics
                classes={classes}
                targetMarkets={data}
                values={values}
                {...rest}
              />
            </CodeXExpansionPanel>
            <CodeXExpansionPanel title="Logo">
              <Logo
                classes={classes}
                targetMarkets={data}
                values={values}
                setFieldValue={setFieldValue}
                setImage={setImage}
                {...rest}
              />
            </CodeXExpansionPanel>
            <CodeXExpansionPanel title="Location">
              <Location
                classes={classes}
                targetMarkets={data}
                values={values}
                {...rest}
              />
            </CodeXExpansionPanel>
            <CodeXExpansionPanel title="Links">
              <Links
                classes={classes}
                targetMarkets={data}
                values={values}
                {...rest}
              />
            </CodeXExpansionPanel>
            <CodeXExpansionPanel title="Categories">
              <Categories
                classes={classes}
                targetMarkets={data}
                setFieldValue={setFieldValue}
                values={values}
                {...rest}
              />
            </CodeXExpansionPanel>
            <SectionWrapper>
              <Button
                type="submit"
                disabled={!isValid}
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
          </>
        );
      }}
    </Formik>
  );
}

export default CreateCompany;
