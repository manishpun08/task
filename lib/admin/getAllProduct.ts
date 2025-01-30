'use server';

import { db } from '@/database/drizzle';
import { products } from '@/database/schema';

export const getProducts = async () => {
  try {
    const productList = await db.select().from(products);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(productList)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while fetching products',
    };
  }
};
