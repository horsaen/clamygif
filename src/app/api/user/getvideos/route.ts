import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';

export async function GET() {
  await dbConnect()

  const allUploads = await User.aggregate([
    { $unwind: '$uploads' },
    { $sort: { 'uploads.date': -1 } },
    { $limit: 10},
    { $group: { _id: null, uploads: { $push: '$uploads' } } },
  ]);

  return NextResponse.json(allUploads[0].uploads)
}