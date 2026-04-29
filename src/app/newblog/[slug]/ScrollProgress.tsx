'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const next = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setPct(Math.max(0, Math.min(100, next)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 h-1 bg-primary/20 w-full z-50">
      <div
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

