"use client"
import axios from "axios"
import { useState } from 'react'
import styles from './Upload.module.css'

import { BiError } from "react-icons/bi";
import { LuFilePlus2 } from "react-icons/lu";

export default function UploadForm(props){

  const [file, setFile]: any = useState("Click to Upload File (215MiB limit)")
  const [err, setErr]: any = useState(undefined)

  const uploadFile = async (e) => {
    e.preventDefault()
    const formData = new FormData
    formData.append('file', e.target.uploadFile.files[0])
    formData.append('secret', props.user.secret)
    formData.append('title', e.target.title.value)
    axios.post("/api/upload", formData)
    .then((res) => {
      if(res.status == 201) {
        window.location.href = "/a/" + res.data
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={uploadFile}>
      <span className={styles.title}>Upload File</span>
      {err ?
        <div className={styles.error}>
          <BiError />
          <span>{err}</span>
        </div>
      : null }
      <input className={styles.uploadTitle} id="title" placeholder='Upload Title' />
      <input 
        id="uploadFile" 
        accept="video/*" 
        className={styles.uploadFile} 
        type="file" 
        onChange={(e)=> {
          if (e.target.files && e.target.files[0].size > 225443840) {
            setErr("File too large")
          } else {
            setErr(undefined)
          }
          setFile(e.target.files?.[0]?.name || 'Click to Upload File')
        }}
      />
      <label htmlFor='uploadFile'><LuFilePlus2 /> {file}</label>
      {file == "Click to Upload File" || err != undefined ? null : 
        <button type="submit">Upload</button>
      }
    </form>
  )
}