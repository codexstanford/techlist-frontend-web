import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from 'react-apollo-hooks';
import { withTheme } from '@material-ui/styles';

import Confirm from '../../../../../../atoms/confirm';

import { DELETE_AFFILIATION_MUTATION } from '../../graphql';

class DeleteAffiliationControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
    };
  }

  toggleDelete = () => {
    this.setState(prevState => ({ isDeleting: !prevState.isDeleting }));
  };

  render() {
    const { affiliation, refetch, theme } = this.props;
    const { isDeleting } = this.state;
    return (
      <>
        <IconButton
          size="small"
          onClick={this.toggleDelete}
          style={{ margin: theme.spacing(0.5) }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <DeleteAffiliation
          affiliation={affiliation}
          isDeleting={isDeleting}
          toggleDelete={this.toggleDelete}
          refetch={refetch}
        />
      </>
    );
  }
}

function DeleteAffiliation({ isDeleting, affiliation, refetch, ...props }) {
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

export default withTheme(DeleteAffiliationControl);
