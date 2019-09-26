import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  companyName: {
    fontWeight: 500,
  },
}));

function renderAffiliationPrimaryContent({ affiliation }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle2" className={classes.companyName}>
        {affiliation.organization &&
          affiliation.organization.name &&
          affiliation.organization.name[0].payload}
      </Typography>
    </>
  );
}

export default renderAffiliationPrimaryContent;
