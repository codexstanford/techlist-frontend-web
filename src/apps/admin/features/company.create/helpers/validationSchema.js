import * as Yup from 'yup';

const currentDate = new Date();
const yesterday = new Date(
  currentDate.setDate(currentDate.getDate() - 1)
).toISOString();

export const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  description: Yup.string()
    .required('Description is required.')
    .min(150, 'Description must be at least 150 characters.'),
  yearFounded: Yup.date()
    .required('Date Founded is required.')
    .max(yesterday, 'Date Founded must be before today.'),
  targetMarkets: Yup.string().required('Target Markets is required'),
});
