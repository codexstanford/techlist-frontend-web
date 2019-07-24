import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Controller from './controller';
import Typography from '@material-ui/core/Typography';
import Media from 'react-media';
import { GET_PERSON_AFFILIATIONS_QUERY } from './graphql';
import { useQuery } from 'react-apollo-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'white',
  },
}));

export default function ProfileAffiliations({ person, ...props }) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_PERSON_AFFILIATIONS_QUERY, {
    variables: {
      where: {
        person: {
          id: person.id,
        },
      },
      orderBy: 'fromDate_DESC',
    },
  });
  if (loading) {
    return null;
  }

  const { personOrganizationAffiliations: affiliations } = data;

  return (
    <div>
      <div>
        <Media query={{ minWidth: 480 }}>
          {matches =>
            matches ? (
              <Typography variant="h6" component="h6" color="primary">
                Affiliations{' '}
              </Typography>
            ) : (
              <Typography variant="h6" component="h6" color="primary">
                Affiliations{' '}
              </Typography>
            )
          }
        </Media>
      </div>
      <div>
        <div className={classes.root}>
          <Controller affiliations={affiliations} />
        </div>
      </div>
    </div>
  );
}
