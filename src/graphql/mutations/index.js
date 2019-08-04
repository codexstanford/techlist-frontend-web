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
      id
      __typename

      avatar {
        id
        __typename
        payload
      }
      name {
        id
        __typename
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: PartyAccountCreateInput!) {
    createPartyAccount(data: $data) {
      __typename
      id
    }
  }
`;

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson($data: PersonCreateInput!) {
    createPerson(data: $data) {
      __typename
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
        __typename
        name {
          id
          __typename
          firstName
          lastName
          middleInitial
          suffix
          fromDate
          throughDate
        }
        email {
          __typename
          id
          payload
          fromDate
          throughDate
        }
        avatar {
          __typename
          id
          payload
          fromDate
          throughDate
        }
        metadata {
          id
          __typename
          isDraft
          isPublic
          isRejected
          isApproved
          isPendingReview
        }
        affiliation {
          id
          __typename
          fromDate
          throughDate
          title
          role
          description
          organization {
            id
            __typename
            name {
              id
              __typename
              payload
            }
            logo {
              id
              __typename
              payload
            }
          }
        }
      }
    }
  }
`;
