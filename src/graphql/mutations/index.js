import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany(
    $where: CompanyWhereUniqueInput!
    $data: CompanyUpdateInput!
  ) {
    updateCompany(where: $where, data: $data) {
      id
      name
      yearFounded
      description
    }
  }
`;

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson($input: PersonCreateInput!) {
    createPerson(input: $input) {
      id
    }
  }
`;

export const UPDATE_CURRENT_USER_MUTATION = gql`
  mutation UpdateCurrentUser(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    updateUser(where: $where, data: $data) {
      id
    }
  }
`;
