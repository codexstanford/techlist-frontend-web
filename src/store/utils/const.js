// import gql from 'graphql-tag';

export const LOCAL_STORAGE_KEY = '__LEGAL_TECH__';

export const GET_USER_QUERY = `
  {
    me {
      __typename
      id
      createdAt
      name
      email
      phone
      phone_number_verified
      email_verified
      person {
        id
        name {
          id
          firstName
          lastName
          middleInitial
          suffix
          fromDate
          throughDate
        }
        email {
          id
          payload
          fromDate
          throughDate
        }
        avatar {
          id
          payload
          fromDate
          throughDate
        }
        metadata {
          isDraft
          isPublic
          isRejected
          isApproved
          isPendingReview
        }
        affiliation {
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
    }
  }
`;
