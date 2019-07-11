import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from '../../../../../../atoms/confirm';

export function DeleteCompanyControl({ company, ...props }) {
  const [isDeleting, toggleDelete] = React.useState(false);
  return (
    <>
      <IconButton onClick={() => toggleDelete(!isDeleting)}>
        <DeleteIcon />
      </IconButton>
      <DeleteCompany
        company={company}
        isDeleting={isDeleting}
        toggleDelete={toggleDelete}
      />
    </>
  );
}

function DeleteCompany({ isDeleting, toggleDelete, company, ...props }) {
  const deleteCompany = () =>
    console.log(
      'Company to delete',
      `{ id: ${company.id}, name: ${company.name[0].payload} }`
    );

  return (
    <Confirm
      open={isDeleting}
      onConfirm={deleteCompany}
      onClose={() => toggleDelete(false)}
    >
      Test
    </Confirm>
  );
}
