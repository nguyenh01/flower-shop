import { requiredValidation } from './../../../../utils/constants';
import * as yup from 'yup';

export const initialValues = {
  current_password: '',
  new_password: '',
  confirm_new_password: '',
};

export const validationSchema = yup.object().shape({
  current_password: yup.string().trim().required(requiredValidation('Current Password')),
  new_password: yup
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required(requiredValidation('Current Password')),
  confirm_new_password: yup.string().oneOf([yup.ref('new_password'), null], 'Password must match'),
});
