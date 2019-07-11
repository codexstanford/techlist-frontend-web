import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditCompany from '../../../../components/company.edit';

export function EditCompanyControl({ company, ...props }) {
  const [isEditing, toggleEditing] = React.useState(false);
  return (
    <>
      <IconButton onClick={() => toggleEditing(!isEditing)}>
        <EditIcon />
      </IconButton>
      <EditCompany
        company={company}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
      />
    </>
  );
}
