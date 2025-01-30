'use server';

import { db } from '@/database/drizzle';
import { categories } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const updateCategory = async (
  id: string,
  category: Partial<Omit<Category, 'id' | 'createdAt'>>
) => {
  try {
    await db.update(categories).set(category).where(eq(categories.id, id));
    return {
      success: true,
      message: 'Category updated successfully',
    };
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      message: 'An error occurred while updating the category',
    };
  }
};
