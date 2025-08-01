import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .required('شماره تلفن الزامی است')
    .matches(/^09\d{9}$/, 'شماره تلفن باید 11 رقم باشد و با 09 شروع شود')
    .length(11, 'شماره تلفن باید دقیقاً 11 رقم باشد'),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;