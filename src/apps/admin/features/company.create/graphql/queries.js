import gql from 'graphql-tag';

export const GET_COMPANY_TARGET_MARKETS = gql`
  query GetTargetMarketsQuery {
    organizationTargetMarkets {
      id
      payload
    }
  }
`;
