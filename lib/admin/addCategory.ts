'use server';

import { db } from '@/database/drizzle';
import { categories } from '@/database/schema';

export const addCategory = async (
  category: Omit<Category, 'id' | 'createdAt'>
) => {
  try {
    await db.insert(categories).values(category);
    return {
      success: true,
      message: 'Category added successfully',
    };
  } catch (error) {
    console.error('Error adding category:', error);
    return {
      success: false,
      message: 'An error occurred while adding the category',
    };
  }
};
