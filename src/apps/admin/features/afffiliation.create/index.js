import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Formik, Field, Form } from 'formik';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StaticQuery, graphql } from 'gatsby';

import {
  CodeXFormHeader,
  handleCreateAffiliation,
  getInitialValues,
  checkCanFormSubmit,
  ValidationSchema,
  getCurrentErrors,
  checkForSectionErrors,
} from './helpers';

import { CREATE_AFFILIATION_MUTATION } from './graphql';
import { SectionWrapper } from '../../../../atoms';
import CompanySearch from './components/companySearch';

export function CreateAffiliation({
  handleClose,
  classes,
  allSitePages,
  ...props
}) {
  // const mutation = useMutation(CREATE_AFFILIATION_MUTATION);
  // const createAffiliation = handleCreateAffiliation({
  //   mutation,
  //   user: props.user,
  //   handleClose,
  // });

  return (
    <Formik
      onSubmit={() => console.log('submitting Affiliation')}
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
        setValues,
        ...rest
      }) => {
        return (
          <>
            <Form style={{ width: '100%', alignSelf: 'center' }}>
              <CodeXFormHeader text={`Create Affiliation`} />

              <CompanySearch
                placeholder="Search…"
                suggestions={allSitePages ? allSitePages.edges : []}
                classes={classes}
                handleBlur={handleBlur}
                setValues={setValues}
                errors={errors}
                touched={touched}
              />
              <SectionWrapper>
                <Button
                  type="submit"
                  disabled={checkCanFormSubmit(touched, errors)}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Affiliation
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

export default props => (
  <StaticQuery
    query={graphql`
      query CompaniesSearchQuery {
        allSitePage {
          edges {
            node {
              path
              context {
                id
                name
                slug
                url
                twitter
                description
                data
              }
            }
          }
        }
      }
    `}
    render={data => <CreateAffiliation allSitePages={data} {...props} />}
  />
);
