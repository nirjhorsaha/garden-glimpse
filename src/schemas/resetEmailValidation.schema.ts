/* eslint-disable prettier/prettier */
import { z } from 'zod';

const resetEmailValidationSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
});

export default resetEmailValidationSchema;
