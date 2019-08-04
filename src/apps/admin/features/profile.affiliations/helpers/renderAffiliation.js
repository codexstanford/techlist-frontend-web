import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Divider from '@material-ui/core/Divider';

import AffiliationControls from '../components/controls';
import { AffiliationAvatar, AffiliationContent } from '../components';

const useStyles = makeStyles({
  divider: {
    color: 'black',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

export function renderAffiliation({ affiliation, hasDivider = true }) {
  const classes = useStyles();
  return (
    <div key={affiliation.id} className={classes.wrapper}>
      <AffiliationAvatar affiliation={affiliation} />
      <AffiliationContent affiliation={affiliation} />
      <AffiliationControls affiliation={affiliation} />

      {hasDivider && (
        <Divider className={classes.divider} variant="fullWidth" />
      )}
    </div>
  );
}
