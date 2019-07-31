import gql from 'graphql-tag';

export const GET_USER_ADMIN_COMPANIES = gql`
  query GetUserAdminCompanies($where: PartyAccountWhereUniqueInput!) {
    partyAccount(where: $where) {
      id
      admin {
        id
        yearFounded
        name {
          id
          payload
        }
        logo {
          id
          payload
        }
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
