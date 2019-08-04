import gql from 'graphql-tag';

export const DELETE_AFFILIATION_MUTATION = gql`
  mutation DeleteAffiliationMutation(
    $where: PersonOrganizationAffiliationWhereUniqueInput!
  ) {
    deletePersonOrganizationAffiliation(where: $where) {
      __typename
      id
      createdAt
      fromDate
      throughDate
      title
      role
      description
      organization {
        __typename
        id
        name {
          __typename
          id
          payload
        }
        description
        logo {
          __typename
          id
          payload
        }
      }
      metadata {
        __typename
        isDraft
        isPublic
        isRejected
        isUnverified
        isApproved
        isPendingReview
      }
    }
  }
`;
