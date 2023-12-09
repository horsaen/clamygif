import type { Metadata, ResolvingMetadata } from 'next'
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import axios from 'axios'
import Navbar from '@/components/navbar/Navbar'
import CopyToClipboard from '@/components/clientButtons/CopyToClipboard';

import styles from './Video.module.css'

const url = process.env.NEXTAUTH_URL
// const url = "https://de34-199-120-65-140.ngrok-free.app"

type Props = {
  params: { video: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.video
 
  return {
    title: "clamygif",
    description: " ",
    openGraph: {
      title: String(Date.now()),
      type: "video.other",
      videos: [url + "/api/view/" + id + ".mp4", {url: url + "/api/view/" + id + ".mp4"}]
    },
  }
}
 
export default async function A({ params }: Props){
  const session: any = await getServerSession(authOptions);
  var user = session?.user

  const res = await axios.get(url + '/api/post/' + params.video)
  const data = res.data.uploads[0]

  const date = new Date(data.date).toLocaleDateString("en-US")

  return (
    <>
      <Navbar user={user} />
      <div className={styles.page}>
        <video height="400" controls autoPlay>
          <source src={url + "/api/view/" + params.video} />
        </video>
        <div className={styles.info}>
          <span className={styles.title}>{data.title}</span>
          <span>{date}</span>
          <div>
            <CopyToClipboard link={url + '/a/' + params.video} />
          </div>
        </div>
      </div>
    </>
  )
}