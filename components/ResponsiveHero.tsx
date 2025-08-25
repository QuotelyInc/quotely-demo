'use client';

import Link from 'next/link';

interface ResponsiveHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  features: string[];
}

export function ResponsiveHero({ title, subtitle, ctaText, ctaHref, features }: ResponsiveHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 md:mb-10 max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {features.map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm text-sm md:text-base font-medium text-gray-800"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </span>
          ))}
        </div>
        
        <Link
          href={ctaHref}
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}