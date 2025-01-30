'use server';

import { db } from '@/database/drizzle';
import { categories } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const deleteCategory = async (id: string) => {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      message: 'An error occurred while deleting the category',
    };
  }
};
