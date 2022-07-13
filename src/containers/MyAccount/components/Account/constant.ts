import * as yup from 'yup';
import { requiredValidation } from '@src/utils/constants';

export const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
};

export const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required(requiredValidation('First Name')),
  lastName: yup.string().trim().required(requiredValidation('Last Name')),
  phone: yup
    .string()
    .matches(/(\+|)([0-9])\w+/g, { message: 'Invalid Phone Number' })
    .required(requiredValidation('Phone Number')),
});
