import fs from 'fs'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';

export async function GET(_req, { params }) {
  await dbConnect();

  const uploadId = params.video[0];

  const user = await User.findOne({'uploads.uploadId':uploadId}, {'uploads.$': 1, username: 1})

  var data = fs.readFileSync(`./data/${user.username}/${user.uploads[0].filename}`)

  return new NextResponse(data);
  // return NextResponse.json(user);
}
