'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/shared/ui/logo'

export default function Home() {

  const router = useRouter()

  const handleClick = () => {
    router.push('/lingkoforteacher')
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div className="absolute top-0 left-2">
          <Logo />
        </div>

        <button
          onClick={handleClick}
          className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
        >
          lingkoforteacher
        </button>
      </div>
    </main>
  )
}
