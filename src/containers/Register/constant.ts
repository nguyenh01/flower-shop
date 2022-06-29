import * as yup from 'yup';
import cookie from 'js-cookie';
import { login as loginSlice } from '@src/redux/slices/userSlice';
import dispatch from '@src/utils/dispatch';
import { requiredValidation } from '@src/utils/constants';

export const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

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

export const handleAuthentication = (response: any) => {
  const convertTypeToString = response.type + '';
  cookie.set('token', response.token, { expires: 2 });
  localStorage.setItem('token', response.token);
  localStorage.setItem('type', convertTypeToString);
  dispatch(loginSlice({ type: response.type }));
};
