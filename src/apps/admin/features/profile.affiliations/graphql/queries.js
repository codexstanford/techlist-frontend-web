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
        id
        name {
          id
          payload
        }
        description
        logo {
          id
          payload
        }
      }
      metadata {
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
