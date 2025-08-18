'use client'

import React from 'react'
import { Check, X, Star, TrendingUp, AlertTriangle } from 'lucide-react'
import { useOTTOTracking } from '@/components/OTTOProvider'

// Section Component
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={className}>
    {children}
  </section>
)

// Container Component
const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}>
    {children}
  </div>
)

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

// Competitor Card Component
const CompetitorCard = ({
  name,
  logo,
  rating,
  issues = [],
  advantages = [],
  color,
  highlighted = false
}: {
  name: string
  logo?: string
  rating: number
  issues?: string[]
  advantages?: string[]
  color: 'red' | 'yellow' | 'green'
  highlighted?: boolean
}) => {
  const colorClasses = {
    red: 'border-red-200 bg-red-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    green: 'border-green-200 bg-green-50'
  }
  
  const headerColors = {
    red: 'bg-gradient-to-r from-red-500 to-red-600',
    yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-600'
  }
  
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden border-2 transition-all duration-300
        ${highlighted ? 'shadow-2xl transform scale-105 border-green-500' : 'shadow-lg hover:shadow-xl'}
        ${colorClasses[color]}
      `}
    >
      {highlighted && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl font-semibold text-sm">
            RECOMMENDED
          </div>
        </div>
      )}
      
      <div className={`${headerColors[color]} p-6 text-white`}>
        <div className="flex flex-col items-center">
          {logo ? (
            <img src={logo} alt={name} className="h-12 mb-3 filter brightness-0 invert" />
          ) : (
            <div className="h-12 mb-3 flex items-center justify-center">
              <span className="text-3xl font-bold">{name[0]}</span>
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <StarRating rating={rating} />
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Display issues for competitors */}
        {issues.length > 0 && (
          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{issue}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Display advantages for Quotely */}
        {advantages.length > 0 && (
          <div className="space-y-3">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{advantage}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Performance Indicator */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 uppercase tracking-wide">Performance</span>
            <span className="text-xs font-semibold">
              {name === 'Quotely' ? '60 sec' : name === 'EZLynx' ? '3-5 min' : '2-4 min'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                name === 'Quotely'
                  ? 'bg-green-500 w-full'
                  : name === 'EZLynx'
                  ? 'bg-yellow-500 w-1/3'
                  : 'bg-red-500 w-1/2'
              }`}
            />
          </div>
        </div>
        
        {/* Price Indicator */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-600 uppercase tracking-wide">Monthly Cost</span>
          <span className="font-bold text-lg">
            {name === 'Quotely' ? '$679' : name === 'EZLynx' ? '$1,299' : '$1,140'}
          </span>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="p-6 pt-0">
        <button
          className={`
            w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200
            ${
              highlighted
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }
          `}
        >
          {highlighted ? 'Start Free Trial' : 'Learn More'}
        </button>
      </div>
    </div>
  )
}

// Feature Comparison Table Component
const FeatureComparisonTable = () => {
  const features = [
    { feature: 'Average Quote Time', quotely: '60 seconds', ezlynx: '3-5 minutes', applied: '2-4 minutes' },
    { feature: 'Mobile Support', quotely: true, ezlynx: 'Limited', applied: false },
    { feature: 'AI Insights', quotely: true, ezlynx: false, applied: false },
    { feature: 'API Access', quotely: 'Full REST API', ezlynx: 'Paid Add-on', applied: 'Limited' },
    { feature: 'Setup Time', quotely: '24 hours', ezlynx: '2-3 weeks', applied: '1-2 weeks' },
    { feature: 'Hidden Fees', quotely: false, ezlynx: true, applied: true },
    { feature: 'Customer Support', quotely: '24/7 Live Chat', ezlynx: 'Business Hours', applied: 'Email Only' },
    { feature: 'Training Required', quotely: '2 hours', ezlynx: '2 days', applied: '3 days' },
  ]
  
  return (
    <div className="mt-16 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                <div className="flex flex-col items-center">
                  <span>Quotely</span>
                  <span className="text-xs font-normal opacity-90">(Recommended)</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">EZLynx</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Applied Rater</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                <td className="px-6 py-4 text-center">
                  {typeof row.quotely === 'boolean' ? (
                    row.quotely ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-semibold text-green-600">{row.quotely}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {typeof row.ezlynx === 'boolean' ? (
                    row.ezlynx ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-gray-600">{row.ezlynx}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {typeof row.applied === 'boolean' ? (
                    row.applied ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-gray-600">{row.applied}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Main Comparison Section Component
const ComparisonSection = () => {
  const { trackUserAction } = useOTTOTracking()
  
  React.useEffect(() => {
    trackUserAction('section_viewed', {
      section: 'comparison',
      location: 'homepage'
    })
  }, [trackUserAction])
  
  return (
    <Section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <Container>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="h-4 w-4" />
              PLATFORM COMPARISON
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Agents Choose Quotely Over Legacy Platforms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Side-by-side comparison showing why modern agents are making the switch
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <CompetitorCard
              name="Applied Rater"
              rating={2}
              issues={[
                "1990s interface design",
                "Limited mobile support", 
                "2-4 minute quote times",
                "Restricted API access"
              ]}
              color="red"
            />
            
            <CompetitorCard
              name="EZLynx"
              rating={3}
              issues={[
                "Hidden fees and charges",
                "3-5 minute quote times",
                "Limited customization",
                "Expensive API access"
              ]}
              color="yellow"
            />
            
            <CompetitorCard
              name="Quotely"
              rating={5}
              advantages={[
                "Modern, intuitive interface",
                "30-60 second quote times",
                "Transparent pricing",
                "Full REST API included",
                "AI-powered insights",
                "Mobile-first design"
              ]}
              color="green"
              highlighted={true}
            />
          </div>
          
          {/* Detailed Feature Comparison Table */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Detailed Feature Comparison</h3>
            <p className="text-gray-600">See exactly how Quotely outperforms the competition</p>
          </div>
          <FeatureComparisonTable />
          
          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <AlertTriangle className="h-4 w-4" />
              LIMITED TIME: Save $461/month by switching today
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Start Your Free Trial
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ComparisonSection