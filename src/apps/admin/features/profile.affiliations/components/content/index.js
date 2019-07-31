import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';
import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  listItem: {
    minWidth: '300px',
  },
}));

export function AffiliationContent({ affiliation, ...props }) {
  const classes = useStyles();
  return (
    <ListItem
      className={classes.listItem}
      component={() => (
        <div>
          {renderPrimaryContent({ affiliation })}
          {renderSecondaryContent({ affiliation })}
        </div>
      )}
    />
  );
}
