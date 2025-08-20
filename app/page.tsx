'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import CalmHero from '@/components/CalmHero'
import LogoShowcase from '@/components/LogoShowcase'
import MinimalFooter from '@/components/MinimalFooter'
import './globals-calm.css'

export default function HomePage() {
  const { trackPageView } = useOTTOTracking()

  useEffect(() => {
    trackPageView('home', {
      section: 'landing',
      variant: 'calm_design_v1'
    })

    // Simple navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector('nav')
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled')
        } else {
          navbar.classList.remove('scrolled')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [trackPageView])

  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MinimalNav />
        <CalmHero />
        <LogoShowcase />
        <MinimalFooter />
      </div>
    </>
  )
}