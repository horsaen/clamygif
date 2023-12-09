import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';
const url = process.env.NEXTAUTH_URL
import styles from './Profile.module.css'

import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import CopyToClipboard from "@/components/clientButtons/CopyToClipboard";
import SignOutButton from "@/components/clientButtons/SignOut";

export default async function Profile(){
  var session: any = await getServerSession(authOptions);
  if (!session){session = false}

  var user = session.user

  await dbConnect()

  var user = await User.findOne({ username: session.user.name }, {secret: 0, password: 0})

  return (
    <div className={styles.page}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <CgProfile />
        </div>
        <div className={styles.info}>
          <span>{user.username}</span>
          <span>{user.email}</span>
          <div className={styles.buttons}>
            {/* <button><MdDeleteForever /></button> */}
            <SignOutButton />
          </div>
        </div>
      </div>
      <div className={styles.uploads}>
        {user.uploads.reverse().map((upload, i) => (
          <div key={i} className={styles.upload}>
            <div>
              <video height={30} width={30}>
                <source src={url + "/api/view/" + upload.uploadId} />
              </video>
              <span>{`${upload.title || "No title"} | ${upload.filename}`}</span>
            </div>
            <div>
              <CopyToClipboard link={url + '/a/' + upload.uploadId} />
              <Link rel="noreferrer" target="_blank" href={url + "/a/" + upload.uploadId}>
                <button><FaExternalLinkAlt /></button>
              </Link>
            </div>
          </div>
        ))}
      </div> 
    </div>
  )
}