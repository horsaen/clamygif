"use client";

import axios from 'axios'
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BiError } from "react-icons/bi";

import styles from './SignIn.module.css'
var url = process.env.NEXTAUTH_URL

export default function SignIn(){

  const [error, setError]: any = useState(undefined)

  const onSubmit = async (e) => {
    e.preventDefault()
    var data = {"username": e.target.username.value, "password": e.target.password.value}

    // const res = await axios.post('http://localhost:3000/api/loginservice', data)

    // var user = res.data

    var callbackUrl = "/"
    const res: any = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl
    });

    if (res.error ) {
      setError("CredentialsSignin")
    } else {
      window.location.href = callbackUrl
    }

  }

  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <span className={styles.title}>Sign In</span>
        {error ?
          <div className={styles.error}>
            <BiError />
            <span>Login Incorrect</span>
          </div>
        :
          null
        }
        <form className={styles.form} onSubmit={onSubmit}>
          <input id="username" placeholder="Username" />
          <input id="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <Link href="/sign-up">Sign Up</Link>
      </div>
      {/* <div className={styles.loginCard}>
        <span>Sign In</span>
        <form className={styles.form} onSubmit={onSubmit}>
          <input id="username" placeholder="Username" />
          <input id="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        
        
      </div> */}
    </div>
  )
}