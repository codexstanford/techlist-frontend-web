import gql from 'graphql-tag';

export const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompanyMutation(
    $where: PersonOrganizationAffiliationWhereUniqueInput!
  ) {
    deletePersonOrganizationAffiliation(where: $where) {
      __typename
      id
    }
  }
`;
