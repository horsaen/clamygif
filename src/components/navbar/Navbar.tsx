"use client";

import Link from 'next/link';

import { signIn, signOut } from 'next-auth/react';
import styles from './Navbar.module.css'

import { MdOutlineFileUpload } from "react-icons/md";
import { GiOysterPearl } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

export default function Navbar(props){
  var user = props.user
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/">
          <GiOysterPearl />
        </Link>
      </div>
      <div className={styles.profile}>
      {user ?
        <div>
          <Link href="/upload">
            <button><MdOutlineFileUpload /> Upload</button>
          </Link>
          <Link href="/profile">
            <button><CgProfile /> {user.name}</button>  
          </Link>
        </div>
        :
        <div>
          <Link  href="/sign-up">
            <button>
              Sign Up
            </button>
          </Link>
          <Link href="/sign-in">
            <button>
              Sign In
            </button>
          </Link>
        </div>
      }
      </div>
    </div>
  )
}