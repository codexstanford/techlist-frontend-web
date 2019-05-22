export const LOCAL_STORAGE_KEY = '__LEGAL_TECH__';

export const GET_USER_QUERY = `{
    me {
        id
        name
        email
        phone
        phone_number_verified
        email_verified
        handle
        cognitoId
        person {
            id
            email
            phone
            profile {
                id
                firstName
                lastName
                avatar
                title
                headline
                location 
            }
        }
        role
    }
}

`;
