import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/Users';

export async function GET() {
  return NextResponse.json({"ERR":"ERR"}, {status: 405})
}

export async function POST(req) {
  var data = await req.json()

  await dbConnect()

  const user = await User.findOne({ username: data.username }, {password: 0, __v: 0})

  return NextResponse.json({ user })
}