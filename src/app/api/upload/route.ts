import { NextResponse } from 'next/server';
import fs from 'fs'
import { writeFile } from 'fs/promises'
import crypto from 'crypto';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../lib/models/Users';

export async function POST(req) {
  if (!fs.existsSync("./data")) {fs.mkdirSync("./data")}

  const data = await req.formData()

  var file = data.get("file"), 
  size = file.size, 
  extension = file.name.split('.').pop(),
  secret = data.get("secret"), title = data.get("title")

  await dbConnect()

  var userData = await User.findOne({ secret: secret })
  if (!userData) {
    return NextResponse.json(null, {status: 404})
  }

  if(size > 52428800) {
    return NextResponse.json({ERR: "toolarge"}, {status: 200})
  }

  const bytes = await data.get("file").arrayBuffer()
  const buffer = Buffer.from(bytes)

  var path = `./data/${userData.username}`
  var filename = `${crypto.randomBytes(8).toString('hex')}.${extension}`

  if (!fs.existsSync(path)) {fs.mkdirSync(path)}

  await writeFile(`${path}/${filename}`, buffer)

  var uploadId = crypto.randomBytes(8).toString('hex'), date = Date.now()

  await User.findOneAndUpdate({ secret: secret }, { $push: {uploads: {uploadId: uploadId, title: title, date: date, filename: filename}} })

  return NextResponse.json(uploadId, {status: 201})
}