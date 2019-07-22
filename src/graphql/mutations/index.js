import gql from 'graphql-tag';

export const UPDATE_PERSON_AFFILIATION = gql`
  mutation UpdatePersonAffiliation(
    $data: PersonOrganizationAffiliationUpdateInput!
    $where: PersonOrganizationAffiliationWhereUniqueInput!
  ) {
    updatePersonOrganizationAffiliation(where: $where, data: $data) {
      __typename
      id
      fromDate
      throughDate
      role
      title
      description
      organization {
        __typename
        id
        name {
          __typename
          id
          payload
        }
      }
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson(
    $data: PersonUpdateInput!
    $where: PersonWhereUniqueInput!
  ) {
    updatePerson(where: $where, data: $data) {
      avatar {
        id
      }
      name {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany(
    $where: CompanyWhereUniqueInput!
    $data: CompanyUpdateInput!
  ) {
    updateCompany(where: $where, data: $data) {
      id
      name
      yearFounded
      description
    }
  }
`;

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson($input: PersonCreateInput!) {
    createPerson(input: $input) {
      id
    }
  }
`;

export const UPDATE_CURRENT_USER_MUTATION = gql`
  mutation UpdateCurrentUser(
    $data: PartyAccountUpdateInput!
    $where: PartyAccountWhereUniqueInput!
  ) {
    updatePartyAccount(where: $where, data: $data) {
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
