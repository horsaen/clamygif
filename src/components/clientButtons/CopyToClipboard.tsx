"use client"
import { BiCopy } from 'react-icons/bi'

export default function CopyToClipboard(props){
  const handleCopy = (e) => {
    navigator.clipboard.writeText(props.link)
  }

  return (
    <button onClick={handleCopy}>
      <BiCopy />
    </button>
  )
}