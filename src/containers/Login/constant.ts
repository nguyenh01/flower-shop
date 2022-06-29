import * as yup from 'yup';
import { requiredValidation } from '@src/utils/constants';

export const initialValue = {
  email: '',
  password: '',
};

export const validationSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid Email').required(requiredValidation('Email')),
  password: yup.string().trim().required(requiredValidation('Password')),
});
