'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import logoutbtn from '@/assets/icons/Logout.svg'
import userbtn from '@/assets/icons/Usuário.svg'
import Logo from '@/assets/BrandPentago.svg'
import Link from "next/link"



export default function Header() {

  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  
  return (
    <header className={`w-full h-16 flex justify-between ${shadow ? 'shadow-md' : ''} bg-neutral-400`}>
      <div className='h-full w-full flex items-center'>
        <Link href='https://www.pentago.com.br/novo/index.html' target='_blank'>
          <Image src={Logo} className='size-14 mx-4 hover:scale-110 transition-all' alt='logo' />
        </Link>
      </div>
      <div className='h-full w-full flex justify-end items-center'>
        <Link href='#'>
          <Image src={userbtn} className='mx-3 size-6 hover:scale-110 transition-all' alt='usuário' />
        </Link>
        <Link href='/'>
          <Image src={logoutbtn} alt='Logout' className='mx-3 size-6 hover:scale-110 transition-all' />
        </Link>
      </div>
    </header>
  )
}
