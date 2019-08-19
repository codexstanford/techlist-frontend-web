import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from '../../../../../../atoms/confirm';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_COMPANY_MUTATION } from '../../graphql';

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
  const deleteCompany = useMutation(DELETE_COMPANY_MUTATION);

  // console.log('deleteCompany', deleteCompany);

  return (
    <Confirm
      open={isDeleting}
      onConfirm={() =>
        deleteCompany({ variables: { where: { id: company.id } } })
      }
      onClose={() => toggleDelete(false)}
      onCancel={() => {}}
    >
      Test
    </Confirm>
  );
}
