import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { formatDateString } from '../../helpers';
const useStyles = makeStyles(theme => ({
  subtitle1: {
    fontSize: '12px',
  },
}));

function renderAffiliationSecondaryContent({ affiliation }) {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="subtitle1"
        className={classes.subtitle1}
      >{`${affiliation.title}`}</Typography>
      <Typography
        variant="subtitle1"
        className={classes.subtitle1}
      >{`${formatDateString(affiliation.fromDate)} to ${formatDateString(
        affiliation.throughDate
      )} `}</Typography>
    </>
  );
}

export default renderAffiliationSecondaryContent;
