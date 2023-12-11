'use client'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import Link from "next/link";
import CopyToClipboard from "@/components/clientButtons/CopyToClipboard";

import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import styles from './Profile.module.css'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Uploads(props) {
  const key = '/api/user/' + props.secret

  const { data, error } = useSWR(key, fetcher)

  const user = data?.user

  return (
    <div className={styles.uploads}>
      {user && user.uploads.reverse().map((upload, i) => (
        <div key={i} className={styles.upload}>
          <div>
            <video height={30} width={30}>
              <source src={"/api/view/" + upload.uploadId} />
            </video>
            <span>{`${upload.title || "No title"} | ${upload.filename}`}</span>
          </div>
          <div>
            <button>
              <MdDeleteForever onClick={(e) => {
                e.preventDefault()
                const delBody = {
                  secret: props.secret,
                  uploadId: upload.uploadId
                }
                axios.delete('/api/user/delete', { data: delBody })
                  .then((res) => {
                    if (res.status == 200) {
                      mutate(key)
                    }
                  })
              }} />
            </button>
            <CopyToClipboard link={'/a/' + upload.uploadId} />
            <Link rel="noreferrer" target="_blank" href={"/a/" + upload.uploadId}>
              <button><FaExternalLinkAlt /></button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}