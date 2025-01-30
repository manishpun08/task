'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { getProductById } from '@/lib/admin/editProduct';
import ProductForm from '@/components/admin/forms/ProductForm';

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const result = await getProductById(id);
        if (result.success) {
          setProduct(result.data);
        } else {
          console.error(result.message);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-5">Edit Product</h1>
      <ProductForm type="update" {...product} />
    </div>
  );
};

export default EditProductPage;
