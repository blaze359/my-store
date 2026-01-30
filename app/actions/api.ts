'use server';

const baseURL = "https://dummyjson.com/";

export const getCategories = async () => {
  try {
    const res = await fetch(`${baseURL}products/categories`, {
      cache: "no-store",
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

export const getProductsByCategory = async (categoryId: number) => {
  try {
    const res = await fetch(`${baseURL}products/category/${categoryId}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products for category ${categoryId}: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

export const getProduct = async (productId: number) => {
  try {
    const res = await fetch(`${baseURL}products/${productId}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch product ${productId}: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};