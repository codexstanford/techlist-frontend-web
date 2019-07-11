import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import CompanyControls from '../components/controls';
import { CompanyAvatar, CompanyContent } from '../components';

const useStyles = makeStyles({
  divider: {
    color: 'black',
  },
});

export function renderCompany({ company, hasDivider = true }) {
  const classes = useStyles();
  return (
    <>
      <ListItem>
        <CompanyAvatar company={company} />
        <CompanyContent company={company} />
        <CompanyControls company={company} />
      </ListItem>
      {hasDivider && (
        <Divider className={classes.divider} variant="fullWidth" />
      )}
    </>
  );
}
