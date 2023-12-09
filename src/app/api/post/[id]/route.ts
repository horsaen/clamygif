import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';

export async function GET(_req, { params }) {
  await dbConnect();

  const uploadId = params.id;

  const user = await User.findOne({'uploads.uploadId':uploadId}, {'uploads.$': 1})
  // const user = await User.findOne({'uploads.uploadId':uploadId}, {'uploads.$': 1, username: 1})

  return NextResponse.json(user);
}
