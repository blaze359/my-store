import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/lib/productTypes";
import { formatCurrency } from "@/lib/utils";

interface ProductData {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: Readonly<ProductData>) {
  return (
    <Card key={product.id} className="w-96">
      <div className="relative h-96">
        <Image
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <CardHeader className="bg-gray-100">
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardFooter className="font-bold">
          {formatCurrency(product.price, locale)}
        </CardFooter>
      </CardHeader>
      <CardFooter className="flex gap-4">
        <Button color="gray" className="flex-1">
          Add to Cart
        </Button>
        <Link href={`/${locale}/product/${product?.id}`}>
          <Button className="flex-1 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
            More Info
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}