import Navbar from "@/components/navbar/Navbar";
import Videos from "@/components/videos/Videos";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { GiOysterPearl } from "react-icons/gi";

import styles from './page.module.css'

export default async function Home() {
  const session: any = await getServerSession(authOptions);
  var user = session?.user

  return (
    <>
      <Navbar user={user} />
      <div className={styles.page}>
        <div className={styles.landing}>
          <GiOysterPearl />
          <span>clamygif</span>
        </div>
      </div>
    </>
  );
}
