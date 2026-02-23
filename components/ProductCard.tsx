'use client';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Product } from '@/lib/productTypes';
import { StarRating } from './ui/StarRating';
import StockStatus from './StockStatus';
import DisplayPrice from './DisplayPrice';
import AddToCartButton from './AddToCartButton';
import { useRouter } from 'next/navigation';

interface ProductData {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: Readonly<ProductData>) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${locale}/product/${product?.id}`);
  };

  return (
    <Card key={product.id} className="w-96 cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-2xl" onClick={handleCardClick}>
      <div className="relative h-96">
        <Image
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <CardHeader className="bg-gray-100 py-4 flex-1">
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <StarRating value={product.rating} readOnly />
        <CardFooter className="font-bold flex flex-row justify-between items-baseline">
          <StockStatus status={product.availabilityStatus} />
          <DisplayPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
            locale={locale}
            displayPercentage={false}
          />
        </CardFooter>
      </CardHeader>
      <CardFooter className="flex gap-4 items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AddToCartButton product={product} className="flex-1" />
      </CardFooter>
    </Card>
  );
}
