import gql from 'graphql-tag';

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($data: OrganizationCreateInput!) {
    createOrganization(data: $data) {
      id
      logo {
        id
        payload
        fromDate
        throughDate
      }
      name {
        id
        payload
        fromDate
        throughDate
      }
      description
      yearFounded
      location {
        id
        formatted_address
        geometry
      }
      affiliation {
        id
        fromDate
        person {
          id
        }
      }
      admins {
        id
        person {
          id
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
