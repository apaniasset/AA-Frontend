import { z } from 'zod';

export const userRegisterSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .trim(),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .trim(),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(24, 'Password must be less than 24 characters'),
});

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;

export const validateUserRegisterForm = (data: Partial<UserRegisterFormData>) => {
  try {
    userRegisterSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (field) {
          fieldErrors[field] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: {} };
  }
};

export const validateUserRegisterField = (
  field: keyof UserRegisterFormData,
  value: string
): string | undefined => {
  try {
    const fieldSchemas: Record<string, z.ZodString> = {
      name: z.string().min(1, 'Full name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters').regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces').trim(),
      email: z.string().min(1, 'Email is required').email('Please enter a valid email address').max(100, 'Email must be less than 100 characters').toLowerCase().trim(),
      phone: z.string().min(1, 'Phone number is required').regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').trim(),
      password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(24, 'Password must be less than 24 characters'),
    };

    const fieldSchema = fieldSchemas[field];
    if (fieldSchema) {
      fieldSchema.parse(value);
    }

    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message;
    }
    return undefined;
  }
};
