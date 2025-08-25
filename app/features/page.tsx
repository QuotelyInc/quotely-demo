'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import CalmFeatures from '@/components/CalmFeatures'
import CalmCTA from '@/components/CalmCTA'
import MinimalFooter from '@/components/MinimalFooter'
import '../globals-calm.css'

export default function FeaturesPage() {
  const { trackPageView } = useOTTOTracking()

  useEffect(() => {
    trackPageView('features', {
      section: 'features_overview'
    })
  }, [trackPageView])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MinimalNav />
      
      <div style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-xl)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--space-lg)', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-md)' }}>Features</h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
            Everything you need to run a modern insurance agency
          </p>
        </div>
      </div>
      
      <CalmFeatures />
      <CalmCTA />
      <MinimalFooter />
    </div>
  )
}