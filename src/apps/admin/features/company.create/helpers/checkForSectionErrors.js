import { getCurrentErrors } from './getCurrentErrors';

export const checkForSectionErrors = (touched, errors, checkArray) => {
  if (getCurrentErrors(touched, errors).length > 0) {
    return getCurrentErrors(touched, errors).every(i => {
      if (checkArray.includes(i)) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};
