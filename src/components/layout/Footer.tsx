import React from 'react'
import PentagoLogo from "@/assets/Pentago.svg";

import Link from "next/link";
export default function Footer() {
  return (
    <footer className={`relative w-full h-16 flex justify-between bg-neutral-400 z-50`}>
      <div className='flex justify-center items-center w-full'>
      <p className="text-sm text-muted-foreground">Desenvolvido por:</p>
      <Link href="https://pentago.com.br/novo/" target="_blank">
          <PentagoLogo className="size-16 mx-6 hover:scale-110 transition-all" />
        </Link>
      </div>
    </footer>
  )
}
