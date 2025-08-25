'use client';

import Link from 'next/link';

export function BrandHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6">
          <span className="text-white text-sm font-medium">🚀 Next-Generation Insurance Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          The Future of
          <span className="block text-yellow-300">Insurance Quoting</span>
          Is Here
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Revolutionary AI-powered platform that transforms how insurance agents work. 
          Lightning-fast quotes, seamless integrations, unmatched reliability.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-10">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-1">10x</div>
            <div className="text-white/80 text-sm">Faster Processing</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-1">99.9%</div>
            <div className="text-white/80 text-sm">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-1">50+</div>
            <div className="text-white/80 text-sm">Carrier APIs</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-started"
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transform hover:-translate-y-1 transition-all shadow-xl"
          >
            Start Free 14-Day Trial
          </Link>
          <Link
            href="/demo"
            className="inline-block bg-white/20 backdrop-blur-md text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/30 transform hover:-translate-y-1 transition-all"
          >
            Watch Live Demo
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            SOC 2 Type II Certified
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Bank-Level Security
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            10,000+ Active Users
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}