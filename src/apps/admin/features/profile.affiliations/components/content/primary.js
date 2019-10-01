import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import { navigate } from 'gatsby';
import slugify from 'slugify';

const useStyles = makeStyles(theme => ({
  companyName: {
    fontWeight: 500,
  },
}));

function renderAffiliationPrimaryContent({ affiliation }) {
  const classes = useStyles();
  return (
    <Link
      onClick={() =>
        navigate(
          `/companies/${slugify(affiliation.organization.name[0].payload)}`
        )
      }
      target="_blank"
    >
      <Typography variant="subtitle2" className={classes.companyName}>
        {affiliation.organization.name[0].payload}
      </Typography>
    </Link>
  );
}

export default renderAffiliationPrimaryContent;
