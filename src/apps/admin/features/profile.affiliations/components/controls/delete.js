import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from 'react-apollo-hooks';
import { makeStyles } from '@material-ui/styles';

import Confirm from '../../../../../../atoms/confirm';

import { DELETE_AFFILIATION_MUTATION } from '../../graphql';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(0.5),
  },
}));
export function DeleteAffiliationControl({ affiliation, refetch, ...props }) {
  const [isDeleting, toggleDelete] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <IconButton
        size="small"
        onClick={() => toggleDelete(!isDeleting)}
        className={classes.icon}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <DeleteAffiliation
        affiliation={affiliation}
        isDeleting={isDeleting}
        toggleDelete={toggleDelete}
        refetch={refetch}
      />
    </>
  );
}

function DeleteAffiliation({
  isDeleting,
  toggleDelete,
  affiliation,
  refetch,
  ...props
}) {
  const deleteAffiliation = useMutation(DELETE_AFFILIATION_MUTATION, {
    variables: {
      where: { id: affiliation.id },
    },
  });

  if (isDeleting === false) {
    return null;
  }
  return (
    <Confirm
      open={isDeleting}
      onConfirm={() => {
        deleteAffiliation();
        refetch();
      }}
      onCancel={() => null}
    >
      Test
    </Confirm>
  );
}
