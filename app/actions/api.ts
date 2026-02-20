'use server';

import { Product } from '@/lib/productTypes';

const baseURL = 'https://dummyjson.com/';

export const getCategories = async () => {
  try {
    const res = await fetch(`${baseURL}products/categories`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getAllProducts = async (
  limit?: number,
  skip?: number,
  sort?: string,
  order?: 'asc' | 'desc'
) => {
  const params = [];
  if (limit) params.push(`limit=${limit}`);
  if (skip) params.push(`skip=${skip}`);
  if (sort) params.push(`sortBy=${sort}`);
  if (order) params.push(`order=${order}`);
  const queryParams = params.length > 0 ? `?${params.join('&')}` : '';

  try {
    const res = await fetch(`${baseURL}products${queryParams}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (slug: string) => {
  try {
    const res = await fetch(`${baseURL}products/category/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products for category ${slug}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${slug}:`, error);
    throw error;
  }
};

export const getProduct = async (
  slug: string,
  limit?: number,
  skip?: number,
  sort?: string,
  order?: 'asc' | 'desc'
) => {
  const params = [];
  if (limit) params.push(`limit=${limit}`);
  if (skip) params.push(`skip=${skip}`);
  if (sort) params.push(`sort=${sort}`);
  if (order) params.push(`order=${order}`);
  const queryParams = params.length > 0 ? `?${params.join('&')}` : '';
  try {
    const res = await fetch(`${baseURL}products/${slug}${queryParams}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product ${slug}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    throw error;
  }
};

export async function searchProducts(
  query: string,
  limit?: number,
  skip?: number,
  sort?: string,
  order?: 'asc' | 'desc'
): Promise<Product[]> {
  const params = [];
  if (limit) params.push(`limit=${limit}`);
  if (skip) params.push(`skip=${skip}`);
  if (sort) params.push(`sort=${sort}`);
  if (order) params.push(`order=${order}`);
  const queryParams = params.length > 0 ? `?${params.join('&')}` : '';
  try {
    const res = await fetch(
      `${baseURL}products/search?q=${encodeURIComponent(query)}${queryParams}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to search products with query "${query}": ${res.statusText}`);
    }

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    throw error;
  }
}

export async function getCartsByUser(userId: string) {
  try {
    const res = await fetch(`${baseURL}carts/user/${userId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch carts for user ${userId}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching carts for user ${userId}:`, error);
    throw error;
  }
}

export async function getUserProfile(userId: number) {
  try {
    const res = await fetch(`${baseURL}users/${userId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile for user ${userId}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error;
  }
}
