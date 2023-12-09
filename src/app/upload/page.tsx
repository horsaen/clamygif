import axios from 'axios'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import styles from './Upload.module.css'
import UploadForm from './UploadForm';

export default async function Upload() {
  const session: any = await getServerSession(authOptions);
  var user = session?.user

  return (
    <div className={styles.page}>
      <UploadForm user={user} />
    </div>
  )
}