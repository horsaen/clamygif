"use client"
import { signOut } from "next-auth/react";
import { GoSignOut } from "react-icons/go";


export default function SignOutButton(){
  return (
    <button onClick={()=>signOut({ callbackUrl: '/' })}><GoSignOut /></button>
  )
}