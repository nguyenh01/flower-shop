import * as yup from 'yup';

export const initialValue = {
  email: '',
  password: '',
};

const requiredValidation = (message: string) => `${message} is required`;

export const validationSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid Email').required(requiredValidation('Email')),
  password: yup.string().trim().required(requiredValidation('Password')),
});
