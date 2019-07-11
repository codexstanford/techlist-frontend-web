import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditCompany from '../../../../components/company.edit';
import { makeStyles } from '@material-ui/styles';

import { EditCompanyControl } from './edit';
import { DeleteCompanyControl } from './delete';

const useStyles = makeStyles(theme => ({
  listItem: {
    alignSelf: 'flex-start',
  },
}));

export function AfilliationControls({ company, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.listItem}>
      <EditCompanyControl company={company} />
      <DeleteCompanyControl company={company} />
    </div>
  );
}

export default AfilliationControls;
