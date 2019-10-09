import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Controller from './controller';
import Typography from '@material-ui/core/Typography';
import Media from 'react-media';
import { GET_USER_ADMIN_COMPANIES } from './graphql';
import { useQuery } from 'react-apollo-hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CreateCompanyModalContext } from '../../../../store/modal-context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  card: {
    width: '100%',
    minWidth: `300px`,
  },
  wrapper: {
    width: '100%',
    maxWidth: 600,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      maxWidth: '100vw',
    },
  },
}));

export default function ProfileCompanies({ user, ...props }) {
  const classes = useStyles();
  const { open } = useContext(CreateCompanyModalContext);

  const { loading, error, data, refetch } = useQuery(GET_USER_ADMIN_COMPANIES, {
    variables: {
      where: { id: user.id },
      orderBy: 'fromDate_DESC',
    },
  });

  useEffect(() => {
    console.log('gotta refetch', open);
    refetch();
  }, [open]);

  if (loading) {
    return null;
  }

  const { partyAccount } = data;
  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardContent>
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
            {partyAccount &&
              partyAccount.admin &&
              partyAccount.admin.length > 0 && (
                <div>
                  <div className={classes.root}>
                    <Controller companies={partyAccount.admin} />
                  </div>
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
