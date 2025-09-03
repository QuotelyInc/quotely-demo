import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuoteCard from '@/components/QuoteCard'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Temporary Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-700">
            <strong>Platform Update:</strong> We're currently updating our platform features. For the most current information about integrations and capabilities, please contact our team directly.
          </p>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="purple-gradient text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="launch-notice bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full inline-block mb-4" style={{
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                fontWeight: '500'
              }}>
                InsurTech SaaS Startup | Launching Q4 2025 | For Independent Insurance Agents
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Insurance Workflow Platform for Independent Agents
              </h1>
              
              <p className="hero-subtitle text-xl lg:text-2xl text-white/90 leading-relaxed">
                Quotely is an InsurTech SaaS startup launching Q4 2025, designed specifically for independent insurance agents. 
                Streamline workflows and reduce operational costs with 24/7 AI-powered assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/demo"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors inline-flex items-center justify-center"
                >
                  Join Early Access
                </Link>
              </div>
            </div>

            {/* Right Content - Quote Cards */}
            <div className="relative">
              <div className="space-y-6">
                {/* Sarah Mitchell Card */}
                <div className="transform rotate-2 hover:rotate-0 transition-transform">
                  <QuoteCard
                    name="Sarah Mitchell"
                    company="Mitchell Insurance Agency"
                    initials="SM"
                    bgColor="bg-orange-500"
                  />
                </div>

                {/* Jennifer Chen Card */}
                <div className="transform -rotate-1 hover:rotate-0 transition-transform ml-8">
                  <QuoteCard
                    name="Jennifer Chen"
                    company="Premier Insurance"
                    initials="JC"
                    bgColor="bg-orange-600"
                    quoteType="Home Insurance"
                    amount="$1,120/year"
                    description="GAIL AI recommendation"
                  />
                </div>

                {/* Mike Rodriguez Card */}
                <div className="transform rotate-1 hover:rotate-0 transition-transform">
                  <QuoteCard
                    name="Mike Rodriguez"
                    company="Rodriguez & Associates"
                    initials="MR"
                    bgColor="bg-orange-500"
                    quoteType="Commercial Quote"
                    amount="$2,340/year"
                    comparison="Beat EZLynx by $180"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose Quotely
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for independent insurance agents to streamline operations and enhance productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Platform</h3>
              <p className="text-gray-600">
                All-in-one solution combining quoting, CRM, and analytics tools designed for independent agents.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Workflow Automation</h3>
              <p className="text-gray-600">
                Streamline your daily operations with intelligent automation that reduces manual tasks and saves time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 AI Assistant</h3>
              <p className="text-gray-600">
                Get intelligent support around the clock with our AI assistant that helps with quotes, questions, and recommendations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Carrier Comparison</h3>
              <p className="text-gray-600">
                Compare quotes from multiple carriers through our TurboRater partnership to find the best coverage and rates for your clients.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600">
                SOC 2 Type II certified with bank-level security to protect your clients' sensitive information.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600">
                Track performance, conversion rates, and client satisfaction with comprehensive reporting tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your quoting process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join over 1 million agencies already using Quotely to serve their clients better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}