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

export function CompanyContent({ company, ...props }) {
  const classes = useStyles();
  return (
    <>
      <ListItemText
        className={classes.listItem}
        primary={renderPrimaryContent({ company })}
        secondary={renderSecondaryContent({ company })}
      />
    </>
  );
}
