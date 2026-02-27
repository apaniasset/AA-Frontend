import { z } from 'zod';

export const registerSchema = z.object({
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

  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),

  city: z
    .string()
    .min(1, 'City is required')
    .max(30, 'City must be less than 30 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces')
    .trim(),

  state: z
    .string()
    .min(1, 'State is required')
    .max(30, 'State must be less than 30 characters')
    .regex(/^[a-zA-Z\s]+$/, 'State can only contain letters and spaces')
    .trim(),

  address: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Please enter a complete address')
    .trim(),
  
  // Optional referral code: exactly 10 characters if provided
  referral_code: z
    .union([
      z.literal(''),
      z
        .string()
        .length(10, 'Referral code must be exactly 10 characters'),
    ])
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Helper function to validate form
export const validateRegisterForm = (data: Partial<RegisterFormData>) => {
  try {
    registerSchema.parse(data);
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
export const validateRegisterField = (
  field: keyof RegisterFormData,
  value: string,
  formData?: Partial<RegisterFormData>
): string | undefined => {
  try {
    // Special check for confirmPassword - needs password comparison
    if (field === 'confirmPassword') {
      if (!value) {
        return 'Please confirm your password';
      }
      if (formData?.password && value !== formData.password) {
        return 'Passwords do not match';
      }
      return undefined;
    }

    // Build test data with current form values for validation
    const testData: Partial<RegisterFormData> = formData
      ? { ...formData, [field]: value }
      : { [field]: value } as Partial<RegisterFormData>;

    // Create individual field schemas
    const fieldSchemas: Record<string, z.ZodTypeAny> = {
      name: z.string().min(1, 'Full name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters').regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces').trim(),
      email: z.string().min(1, 'Email is required').email('Please enter a valid email address').max(100, 'Email must be less than 100 characters').toLowerCase().trim(),
      phone: z.string().min(1, 'Phone number is required').regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').trim(),
      password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(24, 'Password must be less than 24 characters'),
      city: z.string().min(1, 'City is required').max(30, 'City must be less than 30 characters').regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces').trim(),
      state: z.string().min(1, 'State is required').max(30, 'State must be less than 30 characters').regex(/^[a-zA-Z\s]+$/, 'State can only contain letters and spaces').trim(),
      address: z.string().min(1, 'Address is required').min(10, 'Please enter a complete address').trim(),
      referral_code: z
        .union([
          z.literal(''),
          z
            .string()
            .length(10, 'Referral code must be exactly 10 characters'),
        ]),
    };

    // Validate the specific field
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
