'use client'

import React, { useState, useEffect, useRef } from 'react'
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

// Animated Stat Component
const AnimatedStat = ({ 
  number, 
  label, 
  prefix = '', 
  suffix = '', 
  icon 
}: { 
  number: string; 
  label: string; 
  prefix?: string; 
  suffix?: string; 
  icon: string 
}) => {
  const [displayNumber, setDisplayNumber] = useState('0')
  const [isVisible, setIsVisible] = useState(false)
  const statRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    if (statRef.current) {
      observer.observe(statRef.current)
    }
    
    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current)
      }
    }
  }, [isVisible])
  
  useEffect(() => {
    if (!isVisible) return
    
    // Parse the target number (handle formats like "2,000+" or "98.5")
    const cleanNumber = number.replace(/[^0-9.]/g, '')
    const targetValue = parseFloat(cleanNumber)
    const hasDecimal = cleanNumber.includes('.')
    const hasPlus = number.includes('+')
    const hasComma = number.includes(',')
    
    // Animation duration based on the size of the number
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      
      // Easing function for smooth animation
      const progress = currentStep / steps
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
      
      const currentValue = targetValue * easedProgress
      
      // Format the display number
      let formattedNumber = hasDecimal 
        ? currentValue.toFixed(1)
        : Math.floor(currentValue).toString()
      
      // Add comma formatting if needed
      if (hasComma && !hasDecimal) {
        formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      
      // Add plus sign if needed
      if (hasPlus && currentStep === steps) {
        formattedNumber += '+'
      }
      
      setDisplayNumber(formattedNumber)
      
      if (currentStep >= steps) {
        clearInterval(timer)
        // Ensure final value matches exactly
        setDisplayNumber(number)
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [isVisible, number])
  
  return (
    <div 
      ref={statRef}
      className="text-center group hover:transform hover:scale-105 transition-all duration-300"
    >
      <div className="text-5xl mb-2 animate-bounce-once">{icon}</div>
      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        {prefix}{displayNumber}{suffix}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </div>
  )
}

// Main Statistics Section Component
const StatisticsSection = () => {
  const { trackUserAction } = useOTTOTracking()
  
  useEffect(() => {
    trackUserAction('section_viewed', {
      section: 'statistics',
      location: 'homepage'
    })
  }, [trackUserAction])
  
  return (
    <Section className="bg-gray-900 text-white py-14 relative overflow-hidden">      
      <Container>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trusted by 2,000+ Independent Agents
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join the growing community of agents who've made the switch to modern insurance technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedStat
              number="2,000+"
              label="Active Agents"
              prefix=""
              suffix=""
              icon="👥"
            />
            <AnimatedStat
              number="60"
              label="Faster Than Competitors"
              prefix=""
              suffix="%"
              icon="⚡"
            />
            <AnimatedStat
              number="98.5"
              label="Customer Satisfaction"
              prefix=""
              suffix="%"
              icon="⭐"
            />
            <AnimatedStat
              number="24"
              label="Average Setup Time"
              prefix=""
              suffix=" hours"
              icon="🚀"
            />
          </div>
          
          {/* Additional Trust Indicators */}
          <div>
            <hr className='border-gray-800 mt-4' />
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="mt-2 text-2xl font-bold text-blue-400 mb-2">$2.4M</div>
                <div className="text-gray-400 text-sm">Average Agency Revenue Increase</div>
              </div>
              <div className="group">
                <div className="mt-2 text-2xl font-bold text-green-400 mb-2">15 States</div>
                <div className="text-gray-400 text-sm">Licensed & Operating</div>
              </div>
              <div className="group">
                <div className="mt-2 text-2xl font-bold text-purple-400 mb-2">500K+</div>
                <div className="text-gray-400 text-sm">Quotes Generated Monthly</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-bounce-once {
          animation: bounce-once 1s ease-in-out;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </Section>
  )
}

export default StatisticsSection