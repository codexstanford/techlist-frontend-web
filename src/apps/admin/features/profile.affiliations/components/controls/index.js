import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditAffiliation from '../../../../components/affiliation.edit';
import { makeStyles } from '@material-ui/styles';

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
    </div>
  );
}

export default AfilliationControls;

function EditAffiliationControl({ affiliation, ...props }) {
  const [isEditing, toggleEditing] = React.useState(false);
  return (
    <>
      <IconButton onClick={() => toggleEditing(!isEditing)}>
        <EditIcon />
      </IconButton>
      <EditAffiliation
        affiliation={affiliation}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
      />
    </>
  );
}
