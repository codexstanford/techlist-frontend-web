import gql from 'graphql-tag';

export const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompany($where: OrganizationWhereUniqueInput!) {
    deleteOrganization(where: $where) {
      __typename
      id
    }
  }
`;

export const UPDATE_COMPANY_MUATATION = gql`
  mutation UpdateCompany(
    $where: OrganizationWhereUniqueInput!
    $data: OrganizationUpdateInput!
  ) {
    updateOrganization(where: $where, data: $data) {
      __typename
      id
      name {
        payload
      }
    }
  }
`;
