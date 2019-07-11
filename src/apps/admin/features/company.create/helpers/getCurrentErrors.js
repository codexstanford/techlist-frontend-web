export const getCurrentErrors = (touched, errors) =>
  Object.keys(touched).filter(element => Object.keys(errors).includes(element));
