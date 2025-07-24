import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test'); // Make sure this is your database name

    const portfolioCount = await db.collection('portfolios').countDocuments();
    const runningImagesCount = await db.collection('running_images').countDocuments();

    return NextResponse.json({
      portfolioCount,
      runningImagesCount,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return new NextResponse(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
    });
  }
} 