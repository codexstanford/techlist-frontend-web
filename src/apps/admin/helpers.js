export const validateCreateAccountForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required.';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters long.';
  }

  if (!values.confirm) {
    errors.confirm = 'Required';
  } else if (values.confirm !== values.password) {
    errors.confirm = 'Passwords do not match.';
  }
  return errors;
};

export const validateSignInForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required.';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters long.';
  }

  return errors;
};
