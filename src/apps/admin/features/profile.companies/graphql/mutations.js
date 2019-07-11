import gql from 'graphql-tag';

export const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompanyMutation(
    $where: PersonOrganizationCompanyWhereUniqueInput!
  ) {
    deletePersonOrganizationCompany(where: $where) {
      __typename
      id
    }
  }
`;
