import gql from 'graphql-tag';

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompan($data: CompanyCreateInput!) {
    createCompany(data: $data) {
      id
    }
  }
`;
