'use client'

import React from 'react'
import { Shield, Lock, CheckCircle, Award, Building2, Users, Globe, Zap } from 'lucide-react'
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

// Security Badge Component
const SecurityBadge = ({
  icon,
  title,
  subtitle,
  iconComponent: IconComponent
}: {
  icon?: string
  title: string
  subtitle: string
  iconComponent?: any
}) => {
  return (
    <div className="group flex flex-col items-center text-center hover:transform hover:scale-110 transition-all duration-300">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative bg-white rounded-full p-6 shadow-lg group-hover:shadow-xl transition-shadow">
          {IconComponent ? (
            <IconComponent className="h-12 w-12 text-blue-600" />
          ) : icon ? (
            <div className="h-12 w-12 flex items-center justify-center">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          ) : (
            <Shield className="h-12 w-12 text-blue-600" />
          )}
        </div>
        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
      </div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}

// Customer Logos Component
const CustomerLogos = () => {
  const customers = [
    { name: "State Farm", type: "Insurance Partner" },
    { name: "Allstate", type: "Insurance Partner" },
    { name: "Progressive", type: "Insurance Partner" },
    { name: "Liberty Mutual", type: "Insurance Partner" },
    { name: "Farmers", type: "Insurance Partner" },
    { name: "Nationwide", type: "Insurance Partner" },
    { name: "USAA", type: "Insurance Partner" },
    { name: "Travelers", type: "Insurance Partner" }
  ]
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Trusted by Leading Insurance Carriers
        </h4>
        <p className="text-sm text-gray-600">
          Seamless integration with all major carriers
        </p>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="group relative flex items-center justify-center"
          >
            <div className="bg-gray-100 rounded-lg p-4 w-full aspect-square flex items-center justify-center group-hover:bg-gray-200 transition-all duration-200 group-hover:shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  {customer.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-xs text-gray-600 text-center">{customer.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Additional Trust Indicators Component
const TrustIndicators = () => {
  const indicators = [
    { value: "99.9%", label: "Uptime SLA", icon: Zap },
    { value: "24/7", label: "Support Available", icon: Users },
    { value: "15+", label: "States Licensed", icon: Globe },
    { value: "A+", label: "BBB Rating", icon: Award }
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-gray-200">
      {indicators.map((indicator, index) => (
        <div key={index} className="text-center">
          <indicator.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{indicator.value}</div>
          <div className="text-sm text-gray-600">{indicator.label}</div>
        </div>
      ))}
    </div>
  )
}

// Main Trust Section Component
const TrustSection = () => {
  const { trackUserAction } = useOTTOTracking()
  
  React.useEffect(() => {
    trackUserAction('section_viewed', {
      section: 'trust_security',
      location: 'homepage'
    })
  }, [trackUserAction])
  
  return (
    <Section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`,
        }}></div>
      </div>
      
      <Container>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="h-4 w-4" />
              SECURITY & COMPLIANCE
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security & Compliance
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bank-level security with full compliance certifications to protect your agency and clients
            </p>
          </div>
          
          {/* Security Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-12">
            <SecurityBadge 
              iconComponent={Shield}
              title="SOC 2 Type II"
              subtitle="Certified"
            />
            <SecurityBadge 
              iconComponent={Lock}
              title="GDPR"
              subtitle="Compliant"
            />
            <SecurityBadge 
              iconComponent={Award}
              title="HIPAA"
              subtitle="Ready"
            />
            <SecurityBadge 
              iconComponent={Globe}
              title="256-bit SSL"
              subtitle="Encryption"
            />
          </div>
          
          {/* Additional Security Features */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Daily Backups</h4>
                  <p className="text-sm text-gray-600">Automated daily backups with instant recovery</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Role-Based Access</h4>
                  <p className="text-sm text-gray-600">Granular permissions and access controls</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Audit Logging</h4>
                  <p className="text-sm text-gray-600">Complete activity tracking and compliance logs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Data Residency</h4>
                  <p className="text-sm text-gray-600">US-based servers with no offshore processing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">2FA Authentication</h4>
                  <p className="text-sm text-gray-600">Multi-factor authentication for all accounts</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">PCI Compliant</h4>
                  <p className="text-sm text-gray-600">Secure payment processing standards</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <TrustIndicators />
          
          {/* Customer Logos */}
          <div className="mt-12">
            <CustomerLogos />
          </div>
          
          {/* Bottom Message */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Your Data is Your Business
            </h4>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We never sell, share, or access your data. You maintain complete ownership and can export everything at any time.
            </p>
            <button 
              onClick={() => window.location.href = '/security'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              <Lock className="h-5 w-5" />
              View Security Whitepaper
            </button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default TrustSection