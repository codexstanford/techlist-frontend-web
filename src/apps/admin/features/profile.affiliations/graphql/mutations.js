import gql from 'graphql-tag';

export const DELETE_AFFILIATION_MUTATION = gql`
  mutation DeleteAffiliationMutation(
    $where: PersonOrganizationAffiliationWhereUniqueInput!
  ) {
    deletePersonOrganizationAffiliation(where: $where) {
      __typename
      id
    }
  }
`;
