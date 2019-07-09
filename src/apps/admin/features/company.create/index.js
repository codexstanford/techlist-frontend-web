import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        values,
        isValid,
        isSubmitting,
        handleBlur,
        errors,
        touched,
        validateField,
        ...rest
      }) => {
        const getProps = useProps({
          data,
          classes,
          setImage,
          validateField,
          handleBlur,
          values,
          ...rest,
        });
        const canSubmit = () => {
          if (Object.keys(touched).length < 1) {
            return true;
          }

          if (!isValid) {
            console.log('Disabled form Valid');
            return true;
          }

          return false;
        };

        console.log('!isValid', !isValid);
        console.log('TOUCHED', touched);
        console.log('ERRORS', errors);

        return (
          <>
            <Form>
              <CodeXFormHeader text={`Create Company Profile`} />
              <Preview values={values} />
              <ErrorMessage name="name" />
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
  name: Yup.string()
    .required('Required')
    .min(1, 'Name is required.'),
  description: Yup.string()
    .required('Required')
    .min(1, 'Description must be at least 150 characters.'),
  yearFounded: Yup.date()
    .required('Required')
    .max(yesterday, 'Date founded must be before today.'),
});

export default CreateCompany;
