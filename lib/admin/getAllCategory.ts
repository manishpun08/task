'use server';

import { db } from '@/database/drizzle';
import { categories } from '@/database/schema';

export const getCategories = async () => {
  try {
    const result = await db.select().from(categories);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      message: 'An error occurred while fetching the categories',
    };
  }
};
