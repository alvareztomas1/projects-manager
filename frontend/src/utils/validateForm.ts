import * as yup from 'yup';

export const LoginValidate = yup.object().shape({
  userIdentifier: yup
    .string()
    .trim()
    .min(5, 'Must be at least 5 characters')
    .max(254, 'Must not exceed 254 characters')
    .required('Username/Email field is required'),

  password: yup
    .string()
    .trim()
    .required('Password field is required')
    .min(5, 'Must be at least 5 characters')
    .max(25, 'Must be max 25 characters'),

  remember: yup.boolean(),
});

export const SignUpValidate = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Username field is required')
    .min(4, 'Must be at least 4 characters')
    .max(15, 'Must be max 15 characters'),

  password: yup
    .string()
    .trim()
    .required('Password field is required')
    .min(5, 'Must be at least 5 characters')
    .max(25, 'Must be max 25 characters'),

  email: yup
    .string()
    .email('Must be a valid email format')
    .trim()
    .min(5, 'Must be at least 5 characters')
    .max(254, 'Must not exceed 254 characters')
    .required('Email field is required'),

  firstName: yup
    .string()
    .trim()
    .min(1, 'Must have at least 1 character')
    .max(100, 'Must not exceed 100 characters')
    .required('First name field is required'),

  lastName: yup
    .string()
    .trim()
    .min(1, 'Last name must have at least 1 character')
    .max(100, 'Last name must not exceed 100 characters')
    .required('Last name field is required'),

  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm password field is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const CreateProjectValidate = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(50, 'Title must be max 50 characters'),
  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be max 500 characters'),
});
