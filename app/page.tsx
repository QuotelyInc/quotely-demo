'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import { ResponsiveHero, ResponsiveComparisonTable, ResponsiveQuoteForm } from '@/components'

const comparisonData = [
  { feature: 'User Interface', appliedRater: '❌ Outdated', ezlynx: '⚠️ Average', quotely: '✅ Modern & Intuitive' },
  { feature: 'Mobile Support', appliedRater: false, ezlynx: false, quotely: true },
  { feature: 'Quote Speed', appliedRater: '2-4 minutes', ezlynx: '3-5 minutes', quotely: '30-60 seconds' },
];

const formFields = [
  { name: 'businessName', label: 'Business Name', type: 'text', required: true },
  { name: 'industry', label: 'Industry', type: 'select', options: ['Retail', 'Restaurant', 'Construction', 'Professional Services'] },
  { name: 'revenue', label: 'Annual Revenue', type: 'select', options: ['< $500K', '$500K - $1M', '$1M - $5M', '> $5M'] },
];

export default function HomePage() {
  const { trackPageView } = useOTTOTracking()

  useEffect(() => {
    trackPageView('home', {
      section: 'landing',
      variant: 'responsive_v2'
    })
  }, [trackPageView])

  return (
    <>
      <ResponsiveHero
        title="Say Goodbye to Applied Rater's 1990s Interface"
        subtitle="The modern insurance quoting platform built for independent agents who want to escape Applied Rater and EZLynx limitations"
        ctaText="Start Free Trial"
        ctaHref="/signup"
        features={['60% Faster Quotes', 'Modern Interface', 'Full API Access', 'No Hidden Fees']}
      />
      
      <ResponsiveComparisonTable
        title="Why Agents Choose Quotely"
        data={comparisonData}
      />
      
      <ResponsiveQuoteForm
        fields={formFields}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    </>
  )
}