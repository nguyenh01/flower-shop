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
    .matches(/(\+|)(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Invalid Phone Number' })
    .required(requiredValidation('Phone Number')),
});
