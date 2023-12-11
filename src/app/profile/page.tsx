import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/Users';
const url = process.env.NEXTAUTH_URL
import styles from './Profile.module.css'

import { CgProfile } from "react-icons/cg";
import SignOutButton from "@/components/clientButtons/SignOut";
import Uploads from "./Uploads";

export default async function Profile(){
  var session: any = await getServerSession(authOptions);
  if (!session){session = false}

  var user = session.user

  return (
    <div className={styles.page}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <CgProfile />
        </div>
        <div className={styles.info}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <div className={styles.buttons}>
            {/* <button><MdDeleteForever /></button> */}
            <SignOutButton />
          </div>
        </div>
      </div>
      <Uploads secret={user.secret} />
    </div>
  )
}