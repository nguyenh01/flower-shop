import { integerValidation, positiveValidation, requiredValidation } from '@src/utils/constants';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required(requiredValidation('Product Name')),
  cate_id: yup.string().nullable().required(requiredValidation('Category')),
  mate_id: yup.string().nullable().required(requiredValidation('Material')),
  price: yup
    .number()
    .integer(integerValidation('Price'))
    .positive(positiveValidation('Price'))
    .required(requiredValidation('Price')),
  unitsinstock: yup
    .number()
    .integer(integerValidation('Stock'))
    .positive(positiveValidation('Stock'))
    .required(requiredValidation('Stock')),
  description: yup.string().trim().required(requiredValidation('Description')),
});
