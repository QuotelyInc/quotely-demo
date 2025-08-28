'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import { BrandHero } from '@/components/home/BrandHero'
import { ProductSpecs } from '@/components/home/ProductSpecs'
import { FeatureComparison } from '@/components/FeatureComparison'
import { ResponsiveQuoteForm } from '@/components'

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
      variant: 'brand_rebuild_v3'
    })
  }, [trackPageView])

  return (
    <>
      <BrandHero />
      <ProductSpecs />
      <FeatureComparison />
      <ResponsiveQuoteForm
        fields={formFields}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />
    </>
  )
}