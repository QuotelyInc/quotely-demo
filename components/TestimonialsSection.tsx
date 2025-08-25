'use client'

import React from 'react'
import { Star, Quote, Building, TrendingUp, Clock, DollarSign } from 'lucide-react'
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
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
            />
          )
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="relative">
              <Star className="h-5 w-5 text-gray-300" />
              <Star
                className="h-5 w-5 fill-yellow-400 text-yellow-400 absolute top-0 left-0"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            </div>
          )
        } else {
          return (
            <Star
              key={index}
              className="h-5 w-5 text-gray-300"
            />
          )
        }
      })}
    </div>
  )
}

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  author,
  title,
  avatar,
  company,
  highlight = false
}: {
  quote: string
  author: string
  title: string
  avatar?: string
  company: string
  highlight?: boolean
}) => {
  // Generate initials from author name for avatar fallback
  const initials = author
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
  
  return (
    <div
      className={`
        relative bg-white rounded-2xl p-8 transition-all duration-300
        ${highlight 
          ? 'shadow-2xl border-2 border-blue-500 transform scale-105' 
          : 'shadow-lg hover:shadow-xl border border-gray-200'
        }
      `}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 bg-blue-600 rounded-full p-3">
        <Quote className="h-6 w-6 text-white" />
      </div>
      
      {/* Quote Text */}
      <blockquote className="mb-6">
        <p className="text-gray-700 text-lg leading-relaxed italic">
          "{quote}"
        </p>
      </blockquote>
      
      {/* Star Rating */}
      <div className="mb-4">
        <StarRating rating={5} />
      </div>
      
      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{initials}</span>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{initials}</span>
            </div>
          )}
        </div>
        
        {/* Author Details */}
        <div className="flex-grow">
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-xs text-blue-600 font-medium mt-1">{company}</div>
        </div>
      </div>
      
      {highlight && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          VERIFIED
        </div>
      )}
    </div>
  )
}

// Stats Card Component
const StatsCard = ({ icon: Icon, value, label }: { icon: any; value: string; label: string }) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
)

// Main Testimonials Section Component
const TestimonialsSection = () => {
  const { trackUserAction } = useOTTOTracking()
  
  React.useEffect(() => {
    trackUserAction('section_viewed', {
      section: 'testimonials',
      location: 'homepage'
    })
  }, [trackUserAction])
  
  const testimonials = [
    {
      quote: "We cut our quote time from 4 minutes to 45 seconds. The ROI was immediate.",
      author: "Sarah Chen",
      title: "Owner, Chen Insurance Agency",
      company: "Previously legacy rater user"
    },
    {
      quote: "Finally, a platform that doesn't nickel and dime us with hidden fees.",
      author: "Mike Rodriguez",
      title: "Independent Agent",
      company: "Switched from competitor platforms"
    },
    {
      quote: "The mobile experience alone made switching worth it. Our agents can quote anywhere.",
      author: "Jennifer Walsh",
      title: "Agency Manager",
      company: "150+ agent network"
    },
    {
      quote: "AI recommendations increased our close rate by 34% in the first month.",
      author: "David Thompson",
      title: "Senior Agent",
      company: "Thompson & Associates"
    },
    {
      quote: "Setup took less than a day. With Applied, it took us 3 weeks.",
      author: "Maria Garcia",
      title: "IT Director",
      company: "Multi-state agency"
    },
    {
      quote: "Customer support actually answers the phone. Revolutionary concept!",
      author: "Robert Kim",
      title: "Agency Owner",
      company: "Kim Insurance Group"
    }
  ]
  
  return (
    <Section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50"></div>
      
      <Container>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="h-4 w-4" />
              CUSTOMER SUCCESS STORIES
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Independent Agents Say
            </h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <StarRating rating={4.9} />
              <span className="text-lg text-gray-600">4.9/5 from 500+ reviews</span>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of agents who've transformed their business with Quotely
            </p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <StatsCard icon={Clock} value="75%" label="Time Saved" />
            <StatsCard icon={TrendingUp} value="34%" label="More Quotes" />
            <StatsCard icon={DollarSign} value="$461" label="Monthly Savings" />
            <StatsCard icon={Building} value="2,000+" label="Agencies" />
          </div>
          
          {/* Main Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                highlight={index === 1}
              />
            ))}
          </div>
          
          {/* Secondary Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(3, 6).map((testimonial, index) => (
              <TestimonialCard
                key={index + 3}
                {...testimonial}
              />
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="h-4 w-4" />
              JOIN 2,000+ SUCCESSFUL AGENCIES
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Ready to transform your agency?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/get-started'}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Your Free Trial
              </button>
              <button 
                onClick={() => window.location.href = '/demo'}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-3 rounded-xl shadow-lg transform rotate-12 animate-float">
        <Star className="h-6 w-6" />
      </div>
      <div className="absolute bottom-10 left-10 bg-gradient-to-br from-green-400 to-emerald-500 text-white p-3 rounded-xl shadow-lg transform -rotate-12 animate-float animation-delay-2000">
        <TrendingUp className="h-6 w-6" />
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
          100% { transform: translateY(0px) rotate(12deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </Section>
  )
}

export default TestimonialsSection