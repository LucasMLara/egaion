import React from 'react'
import EditalCard from '@/components/layout/EditalCard'


export default function Home() {
  const editaisCount = Math.round(Math.random() * 20);

  console.log(editaisCount);

  const editalCards = Array.from({ length: editaisCount }, (_, index) => <EditalCard key={index} />);

  return (
    <section className='h-full flex flex-wrap gap-6 ml-24 py-10 items-center justify-center'>
      {editalCards}
    </section>
  );
}

