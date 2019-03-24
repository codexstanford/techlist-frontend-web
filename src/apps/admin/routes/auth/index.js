import * as yup from 'yup';

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
  lastName: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
  handle: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
});

export const companySchema = yup.object().shape({});
