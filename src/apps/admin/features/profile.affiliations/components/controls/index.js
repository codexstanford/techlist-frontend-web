import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditAffiliation from '../../../../components/affiliation.edit';
import { makeStyles } from '@material-ui/styles';

import { EditAffiliationControl } from './edit';
import { DeleteAffiliationControl } from './delete';

const useStyles = makeStyles(theme => ({
  listItem: {
    alignSelf: 'flex-start',
  },
}));

export function AfilliationControls({ affiliation, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.listItem}>
      <EditAffiliationControl affiliation={affiliation} />
      <DeleteAffiliationControl affiliation={affiliation} />
    </div>
  );
}

export default AfilliationControls;
