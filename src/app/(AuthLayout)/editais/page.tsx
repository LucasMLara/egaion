import React from 'react'
import EditalCard from '@/components/layout/EditalCard'



export default function Editais() {
  const editaisCount = Math.round(Math.random() * 20);

  const editalCards = Array.from({ length: editaisCount }, (_, index) => <EditalCard key={index} />);

  return (
    <section className='flex flex-wrap gap-6 py-10 items-center justify-center'>
      {editalCards}
    </section>
  );
}
