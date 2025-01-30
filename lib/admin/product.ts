'use server';

import { db } from '@/database/drizzle';
import { products } from '@/database/schema';

export const createProduct = async (params: ProductParams) => {
  try {
    const newProduct = await db
      .insert(products)
      .values({
        ...params,
        quantity: params.quantity,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newProduct[0])),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occur while creating the product',
    };
  }
};
