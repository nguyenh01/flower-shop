import { requiredValidation } from './../../../utils/constants';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required(requiredValidation('Category Name')),
  description: yup.string().trim().required(requiredValidation('Description')),
});
