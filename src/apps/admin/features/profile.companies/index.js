import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Controller from './controller';
import Typography from '@material-ui/core/Typography';
import Media from 'react-media';
import { GET_USER_ADMIN_COMPANIES } from './graphql';
import { useQuery } from 'react-apollo-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'white',
  },
}));

export default function ProfileCompanies({ user, ...props }) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_USER_ADMIN_COMPANIES, {
    variables: {
      where: { id: user.id },
      orderBy: 'fromDate_DESC',
    },
  });
  if (loading) {
    return null;
  }

  const { partyAccount } = data;
  return (
    <div>
      <div>
        <Media query={{ minWidth: 480 }}>
          {matches =>
            matches ? (
              <Typography variant="h6" component="h6" color="primary">
                Companies{' '}
              </Typography>
            ) : (
              <Typography variant="h6" component="h6" color="primary">
                Companies{' '}
              </Typography>
            )
          }
        </Media>
      </div>
      {partyAccount !== null && (
        <div>
          <div className={classes.root}>
            <Controller companies={partyAccount.admin} />
          </div>
        </div>
      )}
    </div>
  );
}
