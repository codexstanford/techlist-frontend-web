import gql from 'graphql-tag';

export const CREATE_AFFILIATION_MUTATION = gql`
  mutation CreateAffiliation($data: AffiliationCreateInput!) {
    createAffiliation(data: $data) {
      __typename
      id
      description
      role
      fromDate
      throughDate
      title
      updatedAt
      organization {
        id
        name {
          payload
          fromDate
          throughDate
        }
      }
      person {
        id
        name {
          payload
          fromDate
          throughDate
        }
      }

      metadata {
        isDraft
        isPublic
        isRejected
        isUnverified
        isVerified
        isApproved
        isPendingReview
      }
    }
  }
`;
