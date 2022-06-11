import * as yup from 'yup';

export const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const requiredValidation = (message: string) => `${message} is required`;

export const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required(requiredValidation('First Name')),
  lastName: yup.string().trim().required(requiredValidation('Last Name')),
  email: yup.string().trim().email('Invalid Email').required(requiredValidation('Email')),
  phone: yup
    .string()
    .matches(/(\+|)([0-9])\w+/g, { message: 'Invalid Phone Number' })
    .required(requiredValidation('Phone Number')),
  password: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required(requiredValidation('Password')),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const payload = (object: any) => {
  return {
    firstName: object.firstName,
    lastName: object.lastName,
    email: object.email,
    phone: object.phone,
    password: object.password,
  };
};
