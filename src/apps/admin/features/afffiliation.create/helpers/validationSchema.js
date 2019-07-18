import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
  AffiliationCompany: Yup.string().required(
    'Affiliation Company is required, start typing and select a company from the list.'
  ),
});
