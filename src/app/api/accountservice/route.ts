import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/Users';
import crypto from 'crypto';

export async function GET() {
  return NextResponse.json({"ERR":"ERR"}, {status: 405})
}

export async function POST(req) {
  var data = await req.json()

  await dbConnect()

  const checkEmail = await User.findOne({ email: data.email }, {password: 0, __v: 0})
  if (checkEmail) {
    return NextResponse.json({"ERR": "emailExists"}, {status: 200})
  }
  const checkUser = await User.findOne({ username: data.username }, {password: 0, __v: 0})
  if (checkUser) {
    return NextResponse.json({"ERR": "userExists"}, {status: 200})
  }


  if(!checkUser && !checkEmail) {
    var newUser = new User({
      secret: crypto.randomBytes(32).toString('hex'),
      email: data.email,
      username: data.username,
      password: data.password
    })
  
    await newUser.save()
  
    return NextResponse.json({"ERR": "success"}, {status: 200})
  }
  
}

export async function PATCH(req) {

}