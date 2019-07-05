import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';

const useStyles = makeStyles(() => ({
  listItem: {
    minWidth: '300px',
  },
}));

export function AffiliationContent({ affiliation, ...props }) {
  const classes = useStyles();
  return (
    <>
      <ListItemText
        className={classes.listItem}
        primary={renderPrimaryContent({ affiliation })}
        secondary={renderSecondaryContent({ affiliation })}
      />
    </>
  );
}
