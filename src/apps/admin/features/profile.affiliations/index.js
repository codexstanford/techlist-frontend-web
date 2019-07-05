import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Controller from './controller';
import Typography from '@material-ui/core/Typography';

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
        <Typography variant="h6" component="h6" color="primary">
          Affiliations{' '}
        </Typography>
      </div>
      <div>
        <div className={classes.root}>
          <Controller affiliations={affiliations} />
        </div>
      </div>
    </div>
  );
}
