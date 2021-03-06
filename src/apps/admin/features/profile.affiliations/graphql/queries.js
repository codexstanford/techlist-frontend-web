import gql from 'graphql-tag';

export const GET_PERSON_AFFILIATIONS_QUERY = gql`
  query GetPersonAffiliationsQuery(
    $where: PersonOrganizationAffiliationWhereInput
    $orderBy: PersonOrganizationAffiliationOrderByInput
  ) {
    personOrganizationAffiliations(where: $where, orderBy: $orderBy) {
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
