import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/Users';

export async function GET() {
  return NextResponse.json({"ERR":"ERR"}, {status: 405})
}

export async function POST(req) {
  var data = await req.json()

  await dbConnect()

  var user = await User.findOne({ username: data.username })

  if (!user) {
    return NextResponse.json({ login: false })
  } 

  var confirm = user.comparePassword(data.password)
  if (!confirm) {
    return NextResponse.json({ login: confirm });
  }

  return NextResponse.json({ login: confirm, name: user.username, email: user.email, secret: user.secret });
}
