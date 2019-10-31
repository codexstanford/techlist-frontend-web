import gql from 'graphql-tag';

export const CREATE_AFFILIATION_MUTATION = gql`
  mutation CreateAffiliation($data: PersonOrganizationAffiliationCreateInput!) {
    createAffiliation(data: $data) {
      __typename
      id
      description
      role
      fromDate
      throughDate
      title
      updatedAt
      createdAt
      organization {
        id
        name {
          id
          payload
          fromDate
          throughDate
        }
        description
        logo {
          id
          payload
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
              id
              payload
            }
            description
            logo {
              id
              payload
            }
          }
        }
      }

      metadata {
        id
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
