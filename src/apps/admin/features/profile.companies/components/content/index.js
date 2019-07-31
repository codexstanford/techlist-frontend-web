import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() => ({
  listItem: {
    minWidth: '300px',
  },
}));

export function CompanyContent({ company, ...props }) {
  const classes = useStyles();
  return (
    <>
      <ListItem
        className={classes.listItem}
        component={() => (
          <div>
            {renderPrimaryContent({ company })}
            {renderSecondaryContent({ company })}
          </div>
        )}
      />
    </>
  );
}
