'use server';

export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/categories`, {
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
