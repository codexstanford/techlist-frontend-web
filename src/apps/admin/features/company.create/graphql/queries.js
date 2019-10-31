import gql from 'graphql-tag';

export const GET_COMPANY_TARGET_MARKETS = gql`
  query GetTargetMarketsQuery {
    organizationTargetMarkets {
      id
      payload
    }
  }
`;

export const GET_USER_ADMIN_COMPANIES = gql`
  query GetUserAdminCompanies($where: PartyAccountWhereUniqueInput!) {
    partyAccount(where: $where) {
      id
      admin {
        id
        yearFounded
        description
        name {
          id
          payload
        }
        logo {
          id
          payload
        }
        description
        metadata {
          id
          isDraft
          isPublic
          isRejected
          isUnverified
          isApproved
          isPendingReview
        }
      }
    }
  }
`;
