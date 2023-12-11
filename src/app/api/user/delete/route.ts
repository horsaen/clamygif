import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/lib/models/Users'

export async function GET() {
  return NextResponse.json({"ERR":"ERR"}, {status: 405})
}

export async function DELETE(req){
  const data = await req.json()
  
  const uploadData = await User.findOne({'uploads.uploadId': data.uploadId})

  await User.findOneAndUpdate({ secret: data.secret }, { $pull: {uploads: {uploadId: data.uploadId}} })

  fs.rmSync(`./data/${uploadData.username}/${uploadData.uploads[0].filename}`)

  return NextResponse.json(null, {status: 200})
}