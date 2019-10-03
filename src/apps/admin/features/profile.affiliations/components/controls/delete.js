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
export function DeleteAffiliationControl({ affiliation, ...props }) {
  const [isDeleting, toggleDelete] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    return () => {
      return null;
    };
  });

  return (
    <>
      <IconButton
        size="small"
        // color="primary"
        onClick={() => toggleDelete(!isDeleting)}
        className={classes.icon}
      >
        <DeleteIcon fontSize="small" />
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

  if (isDeleting === false) {
    return null;
  }
  return (
    <Confirm
      open={isDeleting}
      onConfirm={() => {
        deleteAffiliation();
      }}
      onCancel={() => null}
    >
      Test
    </Confirm>
  );
}
