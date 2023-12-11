// import fs from 'fs'
// import { NextResponse } from 'next/server'
// import dbConnect from '@/lib/dbConnect';
// import User from '@/lib/models/Users';

// export async function GET(_req, { params }) {
//   await dbConnect();

//   // const uploadId = params.video[0]
//   const uploadId = params.video[0].split('.')[0];

//   const user = await User.findOne({'uploads.uploadId':uploadId}, {'uploads.$': 1, username: 1})

//   var data = fs.readFileSync(`./data/${user.username}/${user.uploads[0].filename}`)

//   return new NextResponse(data);
//   // return NextResponse.json(user);
// }

import fs from 'fs';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';

export async function GET(_req: any, { params }: any) {
  await dbConnect();

  const uploadId = params.video[0].split('.')[0];

  const user = await User.findOne(
    { 'uploads.uploadId': uploadId },
    { 'uploads.$': 1, username: 1 }
  );

  const filePath = `./data/${user.username}/${user.uploads[0].filename}`;

  // Read the file as a buffer
  const fileBuffer = fs.readFileSync(filePath);

  // Set the appropriate headers for the response
  const headers = {
    'Content-Type': 'video/mp4', // Replace with the appropriate content type
  };

  // Return the response with the buffer as the body
  return new NextResponse(fileBuffer, { headers });
}