'use client';

import { getAllProducts } from '@/app/actions/api';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/productTypes';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams, useRouter } from 'next/navigation';

type sortOptions = 'none' | 'title' | 'price';
type orderOptions = 'asc' | 'desc';

export default function AllProducts() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<sortOptions>(
    (searchParams.get('sort') as sortOptions) || 'none'
  );
  const [order, setOrder] = useState<orderOptions>(
    (searchParams.get('order') as orderOptions) || 'asc'
  );

  const productsPerPage = 9;

  // Update URL params whenever page, sort, or order changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (page !== 1) params.set('page', String(page));
    if (sort !== 'none') params.set('sort', sort);
    if (order !== 'asc') params.set('order', order);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [page, sort, order, router]);

  useEffect(() => {
    const sortParam = sort === 'none' ? '' : sort;
    getAllProducts(productsPerPage, (page - 1) * productsPerPage, sortParam, order).then((data) => {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
    });
  }, [page, sort, order]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center mt-4 gap-4">
        <div className="flex flex-row gap-2 items-center">
          <div>Sort by:</div>
          <div className="flex flex-row gap-2 items-center">
            <Select onValueChange={(value) => setSort(value as sortOptions)} value={sort}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['none', 'title', 'price'].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value === 'none' ? 'None' : value.charAt(0).toUpperCase() + value.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setOrder(value as orderOptions)} value={order}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['asc', 'desc'].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <Button className="ml-2" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
          <div>
            <Select onValueChange={(value) => setPage(Number(value))} value={String(page)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalPages }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    Page {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block mx-4">
            <span>
              Page {page} of {totalPages}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} locale="en" />
        ))}
      </div>
    </>
  );
}
