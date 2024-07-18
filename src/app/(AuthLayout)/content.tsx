'use client'
import React from 'react'

export default function Content({children}: {children: React.ReactNode}) {
    const [hasScrolled, setHasScrolled] = React.useState(false);

    function changeScrolledStatus(event: React.UIEvent<HTMLElement>) {
        const target = event.target as HTMLElement;
        if (target.scrollTop > 0) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
        }
    }

  return (
    <section className="overflow-y-auto" data-content data-scrolled={hasScrolled} onScroll={changeScrolledStatus}>
        {children}
    </section>
  )
}
