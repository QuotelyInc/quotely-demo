'use client'

import React from 'react'
import { ArrowRight, PlayCircle, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react'
import { useOTTOTracking } from '@/components/OTTOProvider'

// Hero Section Container
const HeroSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative min-h-[90vh] flex items-center ${className}`}>
    {children}
  </section>
)

// Container Component
const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}>
    {children}
  </div>
)

// Badge Component
const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex items-center text-sm font-semibold ${className}`}>
    {children}
  </div>
)

// Button Component
const Button = ({ 
  children, 
  size = 'md', 
  variant = 'primary',
  className = '',
  onClick
}: { 
  children: React.ReactNode; 
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void;
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 bg-white'
  }
  
  return (
    <button 
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg
        transition-all duration-200 transform hover:scale-105
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
      `}
    >
      {children}
    </button>
  )
}

// Background Pattern Component
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(226, 232, 240)" strokeWidth="1" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
)

// Trust Indicators Component
const TrustIndicators = () => (
  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
    <div className="flex items-center gap-2">
      <Shield className="h-5 w-5 text-green-600" />
      <span>SOC 2 Compliant</span>
    </div>
    <div className="flex items-center gap-2">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <span>500+ Agencies Trust Us</span>
    </div>
    <div className="flex items-center gap-2">
      <TrendingUp className="h-5 w-5 text-green-600" />
      <span>98% Customer Satisfaction</span>
    </div>
  </div>
)

// Dashboard Preview Component
const DashboardPreview = () => (
  <div className="relative">
    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-white text-sm font-semibold">Quotely Dashboard</span>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">1.8min</div>
            <div className="text-xs text-gray-600 mt-1">Avg Quote Time</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">847</div>
            <div className="text-xs text-gray-600 mt-1">Quotes Today</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">$2.4M</div>
            <div className="text-xs text-gray-600 mt-1">Premium Volume</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold">Auto Quote - Sarah Johnson</div>
                <div className="text-xs text-gray-500">Generated in 28 seconds</div>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600">$1,240/yr</span>
          </div>
          
          <div className="bg-white p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold">Home Quote - Mike Chen</div>
                <div className="text-xs text-gray-500">Generated in 45 seconds</div>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600">$890/yr</span>
          </div>
          
          <div className="bg-white p-3 rounded-lg flex items-center justify-between opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-semibold">Commercial Quote - ABC Corp</div>
                <div className="text-xs text-gray-500">Generated in 52 seconds</div>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600">$4,560/yr</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Floating Elements Component
const FloatingElements = () => (
  <>
    <div className="absolute -top-10 -right-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg transform rotate-6 animate-float">
      <div className="text-2xl font-bold">60%</div>
      <div className="text-xs">Faster</div>
    </div>
    
    <div className="absolute bottom-10 -left-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg transform -rotate-6 animate-float animation-delay-2000">
      <div className="text-2xl font-bold">$461</div>
      <div className="text-xs">Saved/Month</div>
    </div>
    
    <div className="absolute top-1/2 -right-20 bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl shadow-lg transform rotate-12 animate-float animation-delay-4000">
      <div className="text-xl font-bold">AI</div>
      <div className="text-xs">Powered</div>
    </div>
  </>
)

// Main Professional Hero Component
const ProfessionalHero = () => {
  const { trackUserAction } = useOTTOTracking()
  
  const handleStartTrial = () => {
    trackUserAction('cta_clicked', {
      button: 'start_free_trial',
      location: 'hero'
    })
    window.location.href = '/get-started'
  }
  
  const handleWatchDemo = () => {
    trackUserAction('cta_clicked', {
      button: 'watch_demo',
      location: 'hero'
    })
    const demoSection = document.getElementById('demo-video')
    demoSection?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <HeroSection className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <BackgroundPattern />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              🚀 60% Faster Than EZLynx & Applied Rater
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gray-900">The Modern</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Insurance Platform
              </span>
              <br />
              <span className="text-gray-900">Agents Actually Love</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Escape Applied Rater's 1990s interface and EZLynx's hidden fees. 
              Generate quotes in 60 seconds with transparent AI insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleStartTrial} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleWatchDemo} className="px-8 py-4">
                Watch Demo (2 min)
                <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <TrustIndicators />
          </div>
          
          <div className="relative">
            <DashboardPreview />
            <FloatingElements />
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
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(6deg); }
          100% { transform: translateY(0px) rotate(6deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </HeroSection>
  )
}

export default ProfessionalHero