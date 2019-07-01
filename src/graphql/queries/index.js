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

export const GET_USER_QUERY = gql`
  query GetUserQuery($where: UserWhereUniqueInput!) {
    partyAccount(where: $where) {
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
