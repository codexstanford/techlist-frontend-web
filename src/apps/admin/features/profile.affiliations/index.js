import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Controller from './controller';
import Typography from '@material-ui/core/Typography';
import Media from 'react-media';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'white',
  },
}));

export default function ProfileAffiliations({ affiliations, ...props }) {
  const classes = useStyles();
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
