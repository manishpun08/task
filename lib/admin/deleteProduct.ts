'use server';

import { db } from '@/database/drizzle';
import { products } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const deleteProduct = async (id: string) => {
  try {
    await db.delete(products).where(eq(products.id, id));
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      message: 'An error occurred while deleting the product',
    };
  }
};
