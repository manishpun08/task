'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { productSchema } from '@/lib/validations';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import { createProduct } from '@/lib/admin/product';
import { toast } from '@/hooks/use-toast';

interface Props extends Partial<Product> {
  type?: 'create' | 'update';
}

const ProductForm = ({ type, ...product }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 1,
      quantity: 1,
      category: '',
      description: '',
      image: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const result = await createProduct(values);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Product created successfully',
      });
      router.push(`/admin/products/${result.data.id}`);
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        {/* product name  */}
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Product name"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        {/* product price  */}
        <FormField
          control={form.control}
          name={'price'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Price
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  placeholder="Product Price"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        {/* product quantity  */}
        <FormField
          control={form.control}
          name={'quantity'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Quantity
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  placeholder="Product Quantity"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        {/* product category  */}
        <FormField
          control={form.control}
          name={'category'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Category
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Product Category"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        {/* product image  */}
        <FormField
          control={form.control}
          name={'image'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload your image"
                  folder="product"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* product description  */}
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Description
              </FormLabel>
              <FormControl>
                <Textarea
                  required
                  rows={10}
                  placeholder="Product Description"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          Submit Product
        </Button>
      </form>
    </Form>
  );
};
export default ProductForm;
