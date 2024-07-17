import React from 'react'
import HomeIcon from '@/assets/icons/Home.svg'
import DocIcon from '@/assets/icons/Documentacao.svg'
import EditalIcon from "@/assets/icons/Editais.svg"
import EquipeIcon from "@/assets/icons/Equipe técnica.svg"
import Image from 'next/image'





export default function DrawerMenu() {
  return (
    <div className='w-24 h-screen bg-neutral-400 fixed flex flex-col items-center justify-evenly'>
      <Image className='mx-3 size-6 hover:scale-110 transition-all' src={HomeIcon} alt=''></Image>
      <Image className='mx-3 size-6 hover:scale-110 transition-all' src={EquipeIcon} alt='' ></Image>
      <Image className='mx-3 size-6 hover:scale-110 transition-all' src={EditalIcon} alt=''></Image>
      <Image className='mx-3 size-6 hover:scale-110 transition-all' src={DocIcon} alt=''></Image>
    </div>
  )
}
