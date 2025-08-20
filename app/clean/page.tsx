'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import MinimalistHero from '@/components/MinimalistHero'
import SimpleFeatures from '@/components/SimpleFeatures'
import SimpleCTA from '@/components/SimpleCTA'
import MinimalFooter from '@/components/MinimalFooter'

export default function CleanHomePage() {
  const { trackPageView } = useOTTOTracking()

  useEffect(() => {
    trackPageView('clean_home', {
      section: 'landing',
      variant: 'minimalist'
    })
  }, [trackPageView])

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #FFFFFF;
          color: #1a1a1a;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background: rgba(0, 87, 255, 0.1);
          color: #0057FF;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f0f0f0;
        }

        ::-webkit-scrollbar-thumb {
          background: #d0d0d0;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #b0b0b0;
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MinimalNav />
        <MinimalistHero />
        <SimpleFeatures />
        <SimpleCTA />
        <MinimalFooter />
      </div>
    </>
  )
}