import { getCurrentErrors } from './getCurrentErrors';

export const getDisplayedErrorMessage = (touched, errors) => {
  let error = { section: null, message: null };

  switch (getCurrentErrors(touched, errors)[0]) {
    case 'name':
      error = { section: 'Basics', message: errors.name };
      break;
    case 'description':
      error = { section: 'Basics', message: errors.description };
      break;
    case 'yearFounded':
      error = { section: 'Basics', message: errors.yearFounded };
      break;
    case 'targetMarkets':
      error = { section: 'Basics', message: errors.targetMarkets };
      break;
    default:
      error = null;
  }
  return error;
};
