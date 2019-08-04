import gql from 'graphql-tag';

export const GET_CURRENT_USER_QUERY = gql`
  query GetMe {
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

export const GET_USER_QUERY = gql`
  query GetUserQuery($where: PartyAccountWhereUniqueInput!) {
    partyAccount(where: $where) {
      id
      cognitoId
    }
  }
`;

// TODO: delete this code once refactored company module is in place

export const GET_COMPANY_TARGET_MARKETS = gql`
  query GetTargetMarketsQuery {
    organizationTargetMarkets {
      id
      payload
    }
  }
`;
