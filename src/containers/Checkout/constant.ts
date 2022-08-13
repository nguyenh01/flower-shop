import { OrderFormik } from '@src/api/model/order.data-model';
import * as yup from 'yup';
import { requiredValidation } from '@src/utils/constants';

export const initialValues = {
  email: '',
  lastName: '',
  firstName: '',
  phone: '',
  address: '',
  province: undefined,
  district: undefined,
  ward: undefined,
  note: '',
};

export const validationSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid Email').required(requiredValidation('Email')),
  firstName: yup.string().trim().required(requiredValidation('First Name')),
  lastName: yup.string().trim().required(requiredValidation('Last Name')),
  phone: yup
    .string()
    .matches(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})/g, { message: 'Invalid Phone Number' })
    .required(requiredValidation('Phone Number')),
  province: yup.string().nullable().required(requiredValidation('Province')),
  district: yup.string().nullable().required(requiredValidation('District')),
  ward: yup.string().nullable().required(requiredValidation('Ward')),
  address: yup.string().trim().required(requiredValidation('Address')),
});

export const payload = (values: OrderFormik) => {
  return {
    to_district_id: values.district,
    to_ward_code: values.ward,
    note: values.note,
    phone: values.phone,
    address: values.address,
    email: values.email,
    first_name: values.firstName,
    last_name: values.lastName,
  };
};
