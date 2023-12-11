import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';

export async function GET(req, {params}) {
  const secret = params.user

  await dbConnect()
  
  const user = await User.findOne({ secret: secret }, {secret: 0, password: 0, __v: 0})
  
  return NextResponse.json({ user })
}