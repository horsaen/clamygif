"use client";

import axios from 'axios'
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BiError } from "react-icons/bi";

import styles from './SignUp.module.css'
var url = process.env.NEXTAUTH_URL

export default function SignUp(){

  const [error, setError]: any = useState(undefined)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (e.target.password.value != e.target.confirmPass.value) {
      setError("Passwords do not match")
      return
    }
    var data = {"email": e.target.email.value, "username": e.target.username.value, "password": e.target.password.value}

    const res = await axios.post('/api/accountservice', data)

    var user = res.data
    
    if (user.ERR == "emailExists") {
      setError("Email Exists")
    }

    if (user.ERR == "userExists") {
      setError("User Exists")
    }

    
    if (user.ERR == "success") {
      window.location.href = "/"
    }

    // var callbackUrl = "/"
    // const res: any = await signIn("credentials", {
    //   redirect: false,
    //   username: data.username,
    //   password: data.password,
    //   callbackUrl,
    // });

    // if (res.error ) {
    //   setError("CredentialsSignin")
    // } else {
    //   window.location.href = callbackUrl
    // }

  }

  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <span className={styles.title}>Sign In</span>
        {error ?
          <div className={styles.error}>
            <BiError />
            <span>{error}</span>
          </div>
        :
          null
        }
        <form className={styles.form} onSubmit={onSubmit}>
          <input required id="email" placeholder="Email" type="email" />
          <input required id="username" placeholder="Username" />
          <input required id="password" type="password" placeholder="Password" />
          <input required id="confirmPass" type="password" placeholder='Confirm Password' />
          <button type="submit">Sign Up</button>
        </form>
        <Link href="/sign-in">Sign In</Link>
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