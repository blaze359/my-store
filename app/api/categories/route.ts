import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://fakestoreapiserver.reactbd.org/api/categories', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
