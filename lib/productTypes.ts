export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 string (e.g. "2025-04-30T09:41:02.053Z")
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  barcode: string;
  qrCode: string; // URL string
}
