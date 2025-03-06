import React from 'react'
import DesenvolvidoPorPentago from "@/assets/DesenvolvidoPorPentago.svg"

import Link from "next/link";
export default function Footer() {
  return (
    <footer className={`relative w-full h-16 flex justify-between bg-neutral-400 z-50`}>
      <div className='flex justify-end items-center w-full'>
      <Link href="https://pentago.com.br/novo/" target="_blank">
          <DesenvolvidoPorPentago className="mx-6 size-20 hover:scale-110 transition-all"/>
      </Link>
      </div>
    </footer>
  )
}
