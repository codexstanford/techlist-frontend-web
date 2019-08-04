import React from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditAffiliation from '../../../../components/affiliation.edit';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(0.5),
  },
}));

export function EditAffiliationControl({ affiliation, ...props }) {
  const [isEditing, toggleEditing] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      <IconButton
        size="small"
        // color="primary"
        onClick={() => toggleEditing(!isEditing)}
        className={classes.icon}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <EditAffiliation
        affiliation={affiliation}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
      />
    </>
  );
}
