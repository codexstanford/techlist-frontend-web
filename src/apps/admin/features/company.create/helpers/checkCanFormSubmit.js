import { getCurrentErrors } from './getCurrentErrors';

export const checkCanFormSubmit = (touched, errors) => {
  if (Object.keys(touched).length < 1) {
    return true;
  }

  if (getCurrentErrors(touched, errors).length > 0) {
    return true;
  }

  return false;
};
