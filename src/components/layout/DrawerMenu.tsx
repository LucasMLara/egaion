import React from 'react'
import HomeIcon from '@/assets/icons/Home.svg'
import DocIcon from '@/assets/icons/Documentacao.svg'
import EditalIcon from "@/assets/icons/Editais.svg"
import EquipeIcon from "@/assets/icons/Equipe técnica.svg"
import Image from 'next/image'
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function DrawerMenu() {
  return (
    <div className='w-24 h-screen bg-neutral-400 fixed flex flex-col items-center justify-center gap-16'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href='/home'>
              <Image className='mx-3 size-6 hover:scale-110 transition-all' src={HomeIcon} alt=''></Image>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Início</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href='/team'>
              <Image className='mx-3 size-6 hover:scale-110 transition-all' src={EquipeIcon} alt='' ></Image>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Equipe T.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href='edital'>
              <Image className='mx-3 size-6 hover:scale-110 transition-all' src={EditalIcon} alt=''></Image>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editais</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href='docs'>
              <Image className='mx-3 size-6 hover:scale-110 transition-all' src={DocIcon} alt=''></Image>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Doc.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> 
    </div>
  )
}
