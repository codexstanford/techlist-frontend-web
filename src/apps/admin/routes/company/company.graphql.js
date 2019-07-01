import gql from 'graphql-tag';

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($data: OrganizationCreateInput!) {
    createOrganization(data: $data) {
      __typename
      id
      name {
        payload
        fromDate
        throughDate
      }
      description
      location {
        __typename
        id
        formatted_address
        geometry
      }
      affiliation {
        __typename
        id
        fromDate
        person {
          __typename
          id
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
