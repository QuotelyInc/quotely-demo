'use client'

import { useEffect } from 'react'
import { OTTOProvider, useOTTOTracking } from '@/components/OTTOProvider'

function HomePage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('home', {
      section: 'landing',
      product: 'quotely-platform'
    })
  }, [trackPageView])

  const handleGetStarted = () => {
    trackUserAction('cta_clicked', {
      button: 'get_started',
      location: 'hero'
    })
  }

  const handleRequestDemo = () => {
    trackUserAction('cta_clicked', {
      button: 'request_demo',
      location: 'hero'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
            Welcome to <span className="text-blue-600">Quotely</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            The Revolutionary Insurance Platform That Transforms Your Agency Into a 
            High-Performance, AI-Powered Revenue Machine
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Get Started Free
            </button>
            <button 
              onClick={handleRequestDemo}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors text-lg"
            >
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Quotely?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast Quotes</h3>
              <p className="text-gray-600">
                Generate accurate insurance quotes in seconds, not minutes. 
                10x faster than traditional platforms.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Intelligence</h3>
              <p className="text-gray-600">
                QUAD system provides real-time competitive intelligence and 
                market insights to win more business.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Proven ROI</h3>
              <p className="text-gray-600">
                Agencies see 40% reduction in quote time and 25% increase in 
                close rates within 90 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Outperform the Competition
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Better Than Legacy Systems
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>50% faster than EZLynx quote generation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>More intuitive than Applied Systems interfaces</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Better pricing than Vertafore solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Modern API-first architecture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>No legacy technical debt</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Performance Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Quote Speed</span>
                    <span className="font-semibold">2.3 seconds</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Accuracy Rate</span>
                    <span className="font-semibold">99.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '99%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>User Satisfaction</span>
                    <span className="font-semibold">4.9/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Insurance Agency?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of agencies already using Quotely to dominate their markets
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">© 2025 Quotely, Inc. All rights reserved.</p>
          <p className="text-gray-400">
            Transforming insurance technology, one agency at a time.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <OTTOProvider>
      <HomePage />
    </OTTOProvider>
  )
}