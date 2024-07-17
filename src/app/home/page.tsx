import React from 'react'
import Header from '@/components/layout/Header'
import DrawerMenu from '@/components/layout/DrawerMenu'

export default function Home() {
  return (
    <main className='h-screen bg-neutral-500'>
      <Header />
      <DrawerMenu />
    </main>
  )
}
