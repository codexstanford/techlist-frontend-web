import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import AffiliationControls from '../components/controls';
import { AffiliationAvatar, AffiliationContent } from '../components';

const useStyles = makeStyles({
  divider: {
    color: 'black',
  },
});

export function renderAffiliation({ affiliation, hasDivider = true }) {
  const classes = useStyles();
  return (
    <>
      <ListItem>
        <AffiliationAvatar affiliation={affiliation} />
        <AffiliationContent affiliation={affiliation} />
        <AffiliationControls affiliation={affiliation} />
      </ListItem>
      {hasDivider && (
        <Divider className={classes.divider} variant="fullWidth" />
      )}
    </>
  );
}
