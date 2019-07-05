import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditAffiliation from '../../../../components/affiliation.edit';

export function EditAffiliationControl({ affiliation, ...props }) {
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
