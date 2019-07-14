import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from 'react-apollo-hooks';
import Confirm from '../../../../../../atoms/confirm';

import { DELETE_AFFILIATION_MUTATION } from '../../graphql';

export function DeleteAffiliationControl({ affiliation, ...props }) {
  const [isDeleting, toggleDelete] = React.useState(false);
  return (
    <>
      <IconButton onClick={() => toggleDelete(!isDeleting)}>
        <DeleteIcon />
      </IconButton>
      <DeleteAffiliation
        affiliation={affiliation}
        isDeleting={isDeleting}
        toggleDelete={toggleDelete}
      />
    </>
  );
}

function DeleteAffiliation({
  isDeleting,
  toggleDelete,
  affiliation,
  ...props
}) {
  const deleteAffiliation = useMutation(DELETE_AFFILIATION_MUTATION, {
    variables: {
      where: { id: affiliation.id },
    },
  });
  return (
    <Confirm
      open={isDeleting}
      onConfirm={deleteAffiliation}
      onClose={() => toggleDelete(false)}
      onCancel={() => {}}
    >
      Test
    </Confirm>
  );
}
