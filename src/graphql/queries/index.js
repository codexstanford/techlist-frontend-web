import gql from 'graphql-tag';
console.log('GET_CURRENT_USER_QUERY', GET_CURRENT_USER_QUERY);
export const GET_CURRENT_USER_QUERY = gql`
  query GetMe {
    me {
      id
      cognitoId
      handle
      person {
        id
        affiliations {
          id
          role
          startDate
          company {
            id
            name
            yearFounded
            description
          }
        }
        profile {
          id
          avatar
          firstName
          lastName
          links {
            id
            type
            url
          }
        }
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      cognitoId
    }
  }
`;

export const GET_PERSON_QUERY = gql`
  query GetPerson($where: PersonWhereUniqueInput!) {
    person(where: $where) {
      id
      profile {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_COMPANY_QUERY = gql`
  query GetCompany($where: CompanyWhereUniqueInput!) {
    company(where: $where) {
      id
      name
      yearFounded
      description

      logo
      affiliations {
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;
