import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from '../../../../../../atoms/confirm';
import { useMutation } from 'react-apollo-hooks';
import {
  DELETE_COMPANY_MUTATION,
  GET_USER_ADMIN_COMPANIES,
  GET_PERSON_AFFILIATIONS_QUERY,
} from '../../graphql';

export class DeleteCompanyControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDeleting: false };
  }

  toggleDelete = value => {
    this.setState({ isDeleting: value });
  };

  render() {
    const { company, user, ...props } = this.props;
    return (
      <>
        <IconButton onClick={() => this.toggleDelete(!this.state.isDeleting)}>
          <DeleteIcon />
        </IconButton>
        <DeleteCompany
          company={company}
          isDeleting={this.state.isDeleting}
          toggleDelete={this.toggleDelete}
          user={user}
        />
      </>
    );
  }
}

function DeleteCompany({ isDeleting, toggleDelete, company, user, ...props }) {
  const deleteCompany = useMutation(DELETE_COMPANY_MUTATION, {
    variables: { where: { id: company.id } },
    refetchQueries: [
      {
        query: GET_PERSON_AFFILIATIONS_QUERY,
        variables: {
          where: {
            person: {
              id: user.person.id,
            },
          },
          orderBy: 'fromDate_DESC',
        },
      },
    ],
    update(client) {
      try {
        const { partyAccount } = client.readQuery({
          query: GET_USER_ADMIN_COMPANIES,

          variables: {
            where: { id: user.id },
            orderBy: 'fromDate_DESC',
          },
        });

        const updatedData = partyAccount.admin.filter(
          item => item.id !== company.id
        );

        client.writeQuery({
          query: GET_USER_ADMIN_COMPANIES,
          data: {
            partyAccount: {
              id: user.id,
              admin: updatedData,
              __typename: partyAccount['__typename'],
            },
          },
        });
      } catch (error) {
        console.log(
          `ERROR during cache update for DELETE_COMPANY_MUTATION in profile.companies/components/controls/delete.js ${error}`
        );
        return error;
      }
    },
  });

  return (
    <Confirm
      open={isDeleting}
      onConfirm={() => {
        deleteCompany();
      }}
      onClose={() => toggleDelete(false)}
      onCancel={() => {}}
    >
      Test
    </Confirm>
  );
}
