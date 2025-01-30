'use client';

import ProductTable from '@/components/admin/tables/ProductTable';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/admin/getAllProduct';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      if (result.success) {
        setProducts(result.data);
      } else {
        console.error(result.message);
      }
    };

    fetchProducts();
  }, []);

  const handleProductDelete = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Products</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/products/new" className="text-white">
            + Add Products
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <ProductTable
          products={products}
          onProductDelete={handleProductDelete}
        />
      </div>
    </section>
  );
};

export default Products;
