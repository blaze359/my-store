'use server';

const baseURL = "https://fakestoreapiserver.reactbd.org/api/";

export const getCategories = async () => {
  try {
    const res = await fetch(`${baseURL}categories`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
