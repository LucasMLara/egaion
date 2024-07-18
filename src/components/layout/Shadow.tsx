'use client'
import React from 'react'
import { clsx } from 'clsx'

export default function Shadow() {
    const shadowRef = React.useRef<HTMLDivElement>(null)
    const [showShadow, setShowShadow] = React.useState(false)

    React.useEffect(() => {
        const contentContainer = document.querySelector('[data-content="true"]')
        if (!contentContainer) return
        ;(contentContainer as HTMLDivElement).onscroll = () => {
            setTimeout(() => {
                const hasScrolled = JSON.parse(contentContainer.getAttribute('data-scrolled') || 'false')
                setShowShadow(hasScrolled)
            }, 1)
        }
    }, [])
  
  return (
    <div ref={shadowRef} className={clsx('absolute top-0 left-0 w-full h-full -z-10 transition-all [transition-duration:250ms]', showShadow && 'shadow-md')} />
  )
}
