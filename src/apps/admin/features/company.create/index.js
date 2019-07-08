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
import * as Yup from 'yup';

function useProps({ data, ...props }) {
  return {
    targetMarkets: data,
    ...props,
  };
}

export function CreateCompany({ handleCompanyCreate, classes, ...props }) {
  const mutation = useMutation(CREATE_COMPANY_MUTATION);
  const createCompany = handleCreateCompany({
    mutation,
    user: props.user,
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
      {({ values, isValid, isSubmitting, ...rest }) => {
        const getProps = useProps({
          data,
          classes,
          setImage,
          values,
          ...rest,
        });
        return (
          <>
            <Form>
              <CodeXFormHeader text={`Create Company Profile`} />
              <Preview values={values} />
              <CodeXExpansionPanel title="Basics">
                <Basics {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Logo">
                <Logo {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Location">
                <Location {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Links">
                <Links {...getProps} />
              </CodeXExpansionPanel>
              <CodeXExpansionPanel title="Categories">
                <Categories {...getProps} />
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
    .min(150, 'Description must be at least 150 characters.')
    .required('Required'),
  yearFounded: Yup.date()
    .required('Required')
    .max(yesterday, 'Date founded must be before today.'),
});

export default CreateCompany;
