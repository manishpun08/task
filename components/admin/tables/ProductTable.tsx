import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MdOutlineDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteProduct } from '@/lib/admin/deleteProduct';

interface ProductTableProps {
  products: Product[];
  onProductDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onProductDelete,
}) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const result = await deleteProduct(id);
    if (result.success) {
      onProductDelete(id);
    } else {
      console.error(result.message);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-lg font-bold">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {/* <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                /> */}
                {product.name}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="flex gap-4">
                <button
                  className="text-2xl"
                  onClick={() => {
                    router.push(`/admin/edit-product/${product.id}`);
                  }}
                >
                  <CiEdit />
                </button>
                <button
                  className="text-2xl"
                  onClick={() => handleDelete(product.id)}
                >
                  <MdOutlineDelete />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
