import gql from 'graphql-tag';

export const CREATE_AFFILIATION_MUTATION = gql`
  mutation CreateAffiliation($data: PersonOrganizationAffiliationCreateInput!) {
    createPersonOrganizationAffiliation(data: $data) {
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
        __typename
        id
        affiliation {
          __typename
          id
          fromDate
          throughDate
          title
          role
          description
          organization {
            id
            name {
              payload
            }
            logo {
              payload
            }
          }
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
