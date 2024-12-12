import { z } from 'zod';

// Zod schema for validating the email format during password reset.
const resetEmailValidationSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
});

export default resetEmailValidationSchema;
