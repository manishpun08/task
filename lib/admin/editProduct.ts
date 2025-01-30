'use server';

import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { products } from '@/database/schema';

export const updateProduct = async (
  id: string,
  params: Partial<ProductParams>
) => {
  try {
    const updatedProduct = await db
      .update(products)
      .set(params)
      .where(eq(products.id, id))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedProduct[0])),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while updating the product',
    };
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    const productData = product[0];

    return {
      success: true,
      data: JSON.parse(JSON.stringify(productData)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while fetching the product',
    };
  }
};
