import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Controller from './controller';
import Typography from '@material-ui/core/Typography';
import Media from 'react-media';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { GET_PERSON_AFFILIATIONS_QUERY } from './graphql';
import { useQuery } from 'react-apollo-hooks';
import { CreateCompanyModalContext } from '../../../../store/modal-context';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    maxWidth: 600,
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      maxWidth: '100vw',
    },
  },
  card: {
    width: '100%',
  },
}));

export default function ProfileAffiliations({ person, style, ...props }) {
  const classes = useStyles();
  const { open } = useContext(CreateCompanyModalContext);

  const { loading, error, data, refetch } = useQuery(
    GET_PERSON_AFFILIATIONS_QUERY,
    {
      variables: {
        where: {
          person: {
            id: person.id,
          },
        },
        orderBy: 'fromDate_DESC',
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [open]);

  if (loading) {
    return null;
  }

  const { personOrganizationAffiliations: affiliations } = data;

  const newAffiliations = [];

  affiliations.map(affiliation => {
    if (affiliation.organization !== null) {
      newAffiliations.push(affiliation);
    }
  });
  console.log('DATA', data);

  console.log('newAffiliations', newAffiliations);

  const [first, second, ...rest] = newAffiliations;

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardContent>
          <div>
            <Media query={{ minWidth: 600 }}>
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
            {affiliations && (
              <Controller
                affiliations={newAffiliations}
                first={first}
                second={second}
                rest={rest}
                refetch={refetch}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
