'use client'

import { useEffect, useState } from 'react'
import { OTTOProvider, useOTTOTracking } from '@/components/OTTOProvider'

function HomePage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const scrollToSection = (sectionId: string) => {
    trackUserAction('navigation', {
      target: sectionId
    })
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Quotely</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600">Features</button>
              <button onClick={() => scrollToSection('comparison')} className="text-gray-700 hover:text-blue-600">Comparison</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600">Testimonials</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-blue-600">Pricing</button>
              <button onClick={() => scrollToSection('integrations')} className="text-gray-700 hover:text-blue-600">Integrations</button>
              <button onClick={handleGetStarted} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Get Started</button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left">Features</button>
              <button onClick={() => scrollToSection('comparison')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left">Comparison</button>
              <button onClick={() => scrollToSection('testimonials')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left">Testimonials</button>
              <button onClick={() => scrollToSection('pricing')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left">Pricing</button>
              <button onClick={() => scrollToSection('integrations')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left">Integrations</button>
              <button onClick={handleGetStarted} className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-3">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-32 px-4 sm:px-6 lg:px-8">
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
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
      <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Our Clients Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Quotely transformed our agency. We're closing 40% more policies and spending 
                60% less time on quotes. It's a game-changer."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JD
                </div>
                <div>
                  <p className="font-semibold">John Davidson</p>
                  <p className="text-sm text-gray-600">Davidson Insurance Group</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The QUAD intelligence system gives us insights we never had before. 
                We're always one step ahead of the competition."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-sm text-gray-600">Premier Insurance Solutions</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Switching from Applied Systems to Quotely was the best decision. 
                Faster, cheaper, and so much more intuitive."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  RC
                </div>
                <div>
                  <p className="font-semibold">Robert Chen</p>
                  <p className="text-sm text-gray-600">Chen & Associates Insurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Choose the plan that fits your agency's needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-4">$299<span className="text-lg font-normal">/month</span></p>
              <p className="text-gray-600 mb-6">Perfect for small agencies</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Up to 100 quotes/month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>5 carrier integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Email support</span>
                </li>
              </ul>
              <button onClick={handleGetStarted} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Start Free Trial
              </button>
            </div>

            <div className="bg-blue-600 p-8 rounded-lg shadow-xl text-white transform scale-105">
              <div className="bg-yellow-400 text-blue-900 text-sm font-bold py-1 px-4 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-4xl font-bold mb-4">$799<span className="text-lg font-normal">/month</span></p>
              <p className="text-blue-100 mb-6">For growing agencies</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Unlimited quotes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>All carrier integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>QUAD intelligence system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <button onClick={handleGetStarted} className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold">
                Start Free Trial
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-4">Custom</p>
              <p className="text-gray-600 mb-6">For large organizations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>SLA guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>On-premise option</span>
                </li>
              </ul>
              <button onClick={handleRequestDemo} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Connect with all major carriers and platforms
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'Progressive', 'GEICO', 'State Farm', 'Allstate', 
              'Liberty Mutual', 'Farmers', 'Nationwide', 'Travelers',
              'USAA', 'American Family', 'The Hartford', 'MetLife'
            ].map((carrier) => (
              <div key={carrier} className="bg-gray-50 p-6 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow">
                <p className="font-semibold text-gray-700">{carrier}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-8">Also Integrates With</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-6 py-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-700">Salesforce</p>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-700">HubSpot</p>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-700">QuickBooks</p>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-700">Zapier</p>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-700">Microsoft 365</p>
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