import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
  organizationID: Yup.string,
});
