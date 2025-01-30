import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductForm from '@/components/admin/forms/ProductForm';

const AddProducts = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/products">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <ProductForm />
      </section>
    </>
  );
};
export default AddProducts;
