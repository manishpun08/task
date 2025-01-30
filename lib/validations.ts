import { title } from 'process';
import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  image: z.string().nonempty('Image is required'),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .max(55, 'Name must be at most 55 characters')
    .nonempty('Name is required'),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
  category: z.string().nonempty('Category is required'),
  description: z.string().nonempty('Description is required').min(10).max(1000),
  image: z.string().optional(),
});
