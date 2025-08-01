import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(/^09\d{9}$/, 'شماره تلفن باید 11 رقم باشد و با 09 شروع شود')
    .length(11, 'شماره تلفن باید دقیقاً 11 رقم باشد'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;