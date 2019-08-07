import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fromDate: Yup.date().required('From Date is required.'),
  throughDate: Yup.date().required('Through Date is required.'),
  role: Yup.string().required('Role is required.'),
  title: Yup.string().required('Title is required.'),
});
