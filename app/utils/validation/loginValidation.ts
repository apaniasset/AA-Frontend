import { z } from 'zod';

export const loginSchema = z.object({
  userId: z
    .string()
    .min(1, 'User ID or Email is required')
    .trim(),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Helper function to validate form
export const validateLoginForm = (data: Partial<LoginFormData>) => {
  try {
    loginSchema.parse(data);
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

// Helper function to validate single field
export const validateLoginField = (
  field: keyof LoginFormData,
  value: string
): string | undefined => {
  try {
    const fieldSchemas: Record<string, z.ZodString> = {
      userId: z.string().min(1, 'User ID or Email is required').trim(),
      password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
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
