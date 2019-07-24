import gql from 'graphql-tag';

export const LOCAL_STORAGE_KEY = '__LEGAL_TECH__';

export const GET_USER_QUERY = gql`
  query GetMeQuery {
    me {
      __typename
      id
      createdAt
      name
      email
      phone
      phone_number_verified
      email_verified
      admin {
        __typename
        id
      }
      person {
        __typename
        id
        name {
          __typename
          id
          firstName
          lastName
          middleInitial
          suffix
          fromDate
          throughDate
        }
        email {
          __typename
          id
          payload
          fromDate
          throughDate
        }
        avatar {
          __typename
          id
          payload
          fromDate
          throughDate
        }
        metadata {
          __typename
          id
          isDraft
          isPublic
          isRejected
          isApproved
          isPendingReview
        }
        affiliation {
          __typename
          id
          fromDate
          throughDate
          title
          role
          description
          organization {
            __typename
            id
            name {
              id
              __typename
              payload
            }
            logo {
              id
              __typename
              payload
            }
          }
        }
      }
    }
  }
`;
