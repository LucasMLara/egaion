import React from 'react'
import PentagoLogo from '@/assets/Pentago.svg'


export default function Documentacao() {
  return (
    <section className='h-full flex flex-wrap flex-col items-center justify-center'>
      <PentagoLogo className="size-96 animate-[bounce_3000ms_ease_infinite]" />
      <h1 className='text-2xl'>Em desenvolvimento...</h1>
    </section>
  )
}
