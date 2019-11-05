import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from 'react-apollo-hooks';
import { withTheme } from '@material-ui/styles';

import Confirm from '../../../../../../atoms/confirm';

import {
  DELETE_AFFILIATION_MUTATION,
  GET_PERSON_AFFILIATIONS_QUERY,
} from '../../graphql';

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
    const { affiliation, person, theme } = this.props;
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
          person={person}
        />
      </>
    );
  }
}

function DeleteAffiliation({ isDeleting, affiliation, person, ...props }) {
  const deleteAffiliation = useMutation(DELETE_AFFILIATION_MUTATION, {
    variables: {
      where: { id: affiliation.id },
    },
    update(client) {
      if (client.data.data.ROOT_QUERY.personOrganizationAffiliations) {
        try {
          const {
            personOrganizationAffiliations: affiliations,
          } = client.readQuery({
            query: GET_PERSON_AFFILIATIONS_QUERY,

            variables: {
              where: { id: person.id },
              orderBy: 'fromDate_DESC',
            },
          });

          const updatedData = affiliations.filter(
            item => item.id !== affiliation.id
          );

          client.writeQuery({
            query: GET_PERSON_AFFILIATIONS_QUERY,
            data: {
              personOrganizationAffiliations: updatedData,
            },
          });
        } catch (error) {
          console.log(
            `ERROR during cache update for DELETE_AFFILIATION_MUTATION in profile.affiliations/components/controls/delete.js ${error}`
          );
          return error;
        }
      }
    },
  });

  if (isDeleting === false) {
    return null;
  }
  return (
    <Confirm
      open={isDeleting}
      onConfirm={deleteAffiliation}
      onCancel={() => null}
    >
      Test
    </Confirm>
  );
}

export default withTheme(DeleteAffiliationControl);
