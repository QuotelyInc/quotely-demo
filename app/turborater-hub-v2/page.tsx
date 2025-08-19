'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Activity, Zap, TrendingUp, Users, CheckCircle, AlertCircle, 
  RefreshCw, DollarSign, Shield, Award, ChevronRight, ChevronLeft, 
  Star, Search, MessageCircle, ArrowRight, Sparkles, Brain,
  Clock, Globe, Lock, Bell, Info, Check, X
} from 'lucide-react'
import { turboRaterConfig } from '@/lib/config/turborater-config'

// Performance Monitor Class
class PerformanceMonitor {
  metrics: {
    pageLoad: number
    apiCalls: Array<{ endpoint: string; duration: number; timestamp: number }>
    userActions: Array<{ action: string; timestamp: number }>
  }

  constructor() {
    this.metrics = {
      pageLoad: 0,
      apiCalls: [],
      userActions: []
    }
  }

  trackApiCall(endpoint: string, duration: number) {
    this.metrics.apiCalls.push({ endpoint, duration, timestamp: Date.now() })
  }

  trackUserAction(action: string) {
    this.metrics.userActions.push({ action, timestamp: Date.now() })
  }
}

// Enhanced Performance Bar Component
const PerformanceBar = () => {
  const [metrics, setMetrics] = useState({
    loadTime: '0.8s',
    quoteSpeed: '1.8 min avg',
    aiConfidence: 94
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        aiConfidence: 90 + Math.floor(Math.random() * 10)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-500 text-white py-1 px-4 text-xs z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Page Load: <span className="font-semibold">{metrics.loadTime}</span>
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Quote Speed: <span className="font-semibold">{metrics.quoteSpeed}</span>
        </span>
        <span className="flex items-center gap-1">
          <Brain className="w-3 h-3" />
          AI Confidence: <span className="font-semibold">{metrics.aiConfidence}%</span>
        </span>
      </div>
    </div>
  )
}

// Smart Search Bar Component
const SmartSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative">
      <input 
        ref={searchRef}
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search clients, policies, quotes... (⌘K)"
        className="w-full px-6 py-4 pr-12 text-gray-900 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Search className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}

// Progressive Quote Form Component  
const ProgressiveQuoteForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showAIAlert, setShowAIAlert] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    insuranceType: '',
    coverageAmount: '',
    deductible: '',
    comprehensiveCoverage: false,
    collisionCoverage: false,
    rentalReimbursement: false
  })
  
  const totalSteps = 2
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setFormData(prev => ({
      ...prev,
      [id]: newValue
    }))

    // Show AI alert after first field
    if (Object.values(formData).filter(v => v).length === 0) {
      setShowAIAlert(true)
    }

    // Save to localStorage
    localStorage.setItem('quoteFormData', JSON.stringify({
      ...formData,
      [id]: newValue
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  useEffect(() => {
    // Load saved form data
    const savedData = localStorage.getItem('quoteFormData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 ring-2 ring-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Smart Quote Generator</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Progress</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-semibold">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* AI Pre-fill Alert */}
      {showAIAlert && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <div className="flex items-center">
            <Info className="w-5 h-5 text-blue-500 mr-3" />
            <p className="text-sm text-blue-800">
              <span className="font-semibold">AI Auto-fill:</span> We've pre-populated 8 fields based on your client history
            </p>
          </div>
        </div>
      )}

      <form className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                placeholder="123 Main St, City, State ZIP"
              />
            </div>
          </div>
        )}

        {/* Step 2: Coverage Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Coverage Requirements</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
              <select 
                id="insuranceType"
                value={formData.insuranceType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select insurance type</option>
                <option value="auto">Auto Insurance</option>
                <option value="home">Homeowners Insurance</option>
                <option value="commercial">Commercial Insurance</option>
                <option value="life">Life Insurance</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Amount</label>
                <input 
                  type="text" 
                  id="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="$500,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deductible</label>
                <input 
                  type="text" 
                  id="deductible"
                  value={formData.deductible}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="$1,000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Coverage Options</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="comprehensiveCoverage"
                    checked={formData.comprehensiveCoverage}
                    onChange={handleInputChange}
                    className="mr-2 rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm">Comprehensive Coverage</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="collisionCoverage"
                    checked={formData.collisionCoverage}
                    onChange={handleInputChange}
                    className="mr-2 rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm">Collision Coverage</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="rentalReimbursement"
                    checked={formData.rentalReimbursement}
                    onChange={handleInputChange}
                    className="mr-2 rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm">Rental Reimbursement</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <button 
            onClick={handlePrev}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
        )}
        
        {currentStep < totalSteps ? (
          <button 
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all ml-auto flex items-center gap-2"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all ml-auto flex items-center gap-2"
          >
            Generate Quote
            <Zap className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// AI Transparency Panel Component
const AITransparencyPanel = ({ visible }: { visible: boolean }) => {
  const [showDetails, setShowDetails] = useState(false)

  if (!visible) return null

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Recommendation</h3>
            <p className="text-sm text-gray-600">
              Confidence: <span className="font-semibold text-green-600">94%</span>
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          {showDetails ? 'Hide' : 'View'} Details
          <ChevronRight className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-800">
          Based on the client profile and market analysis, we recommend <strong>Progressive Insurance</strong> 
          with an estimated premium of <strong>$1,247/year</strong>.
        </p>
      </div>

      {showDetails && (
        <div className="space-y-4 animate-slide-down">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Decision Factors:</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Client Risk Profile</span>
                <span className="font-semibold">Low Risk (Score: 82)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Market Competitiveness</span>
                <span className="font-semibold">High (15% below avg)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage Match</span>
                <span className="font-semibold">98% Match</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Data Sources:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>127 similar client profiles analyzed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Real-time carrier rate data (updated 2 min ago)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Historical claim patterns in ZIP code</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Current market conditions assessment</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex space-x-3 mt-4">
        <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
          Accept Recommendation
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
          Modify Options
        </button>
      </div>
    </div>
  )
}

// Speed Comparison Widget
const SpeedComparisonWidget = () => {
  const comparisons = [
    { name: 'Quotely', time: 1.8, color: 'bg-green-500', width: 'w-full' },
    { name: 'EZLynx', time: 4.2, color: 'bg-gray-300', width: 'w-20' },
    { name: 'Applied', time: 3.8, color: 'bg-gray-300', width: 'w-24' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Speed Advantage</h3>
      
      <div className="space-y-3">
        {comparisons.map((comp) => (
          <div key={comp.name} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-20">{comp.name}</span>
            <div className="flex items-center space-x-2 flex-1">
              <div className={`h-2 ${comp.color} rounded-full ${comp.width}`}></div>
              <span className="text-sm font-semibold">{comp.time} min</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Your Advantage</span>
          <span className="text-lg font-bold text-green-600">60% Faster</span>
        </div>
      </div>
    </div>
  )
}

// Live Activity Feed
const LiveActivityFeed = () => {
  const [activities] = useState([
    { time: 'Just now', action: 'Quote generated for John D.', type: 'success', icon: CheckCircle },
    { time: '2 min ago', action: 'New client onboarded', type: 'info', icon: Users },
    { time: '5 min ago', action: 'Policy bound for Sarah M.', type: 'success', icon: Shield },
    { time: '8 min ago', action: 'AI optimization completed', type: 'info', icon: Brain }
  ])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all">
              <div className={`w-2 h-2 ${
                activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              } rounded-full mt-1.5 animate-pulse`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Enhanced Integration Status
const IntegrationStatusPanel = () => {
  const integrations = [
    { name: 'TurboRater API', status: 'connected', icon: Zap },
    { name: 'Carrier Network', status: '27 Active', icon: Globe },
    { name: 'AI Engine', status: 'Optimal', icon: Brain },
    { name: 'Data Sync', status: 'Real-time', icon: RefreshCw }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h3>
      
      <div className="space-y-3">
        {integrations.map((integration) => {
          const Icon = integration.icon
          return (
            <div key={integration.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{integration.name}</span>
              </div>
              <span className="text-xs text-green-600 font-semibold">{integration.status}</span>
            </div>
          )
        })}
      </div>
      
      <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm">
        View Detailed Status →
      </button>
    </div>
  )
}

// Quote Results Component
const QuoteResults = ({ quotes }: { quotes: any[] }) => {
  if (!quotes || quotes.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quote Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((quote, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">{quote.carrier}</h4>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm ml-1">{quote.rating}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">{quote.premium}</div>
            <div className="text-sm text-green-600 mb-4">Save {quote.savings}</div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Select Quote
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Success Modal Component
const SuccessModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform scale-100 transition-transform">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quote Generated Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Your quote has been generated in just <span className="font-semibold">1.8 minutes</span> 
            - 60% faster than traditional platforms!
          </p>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            View Quote Details
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function TurboRaterHubV2() {
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [quotes, setQuotes] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const monitorRef = useRef(new PerformanceMonitor())

  const handleQuoteSubmit = async (formData: any) => {
    setIsGenerating(true)
    const startTime = Date.now()
    
    try {
      // Track user action
      monitorRef.current.trackUserAction('quote_generation_started')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const apiDuration = Date.now() - startTime
      monitorRef.current.trackApiCall('turborater/quote', apiDuration)
      
      // Show AI panel
      setShowAIPanel(true)
      
      // Set quote results
      const generatedQuotes = [
        { carrier: 'Progressive', premium: '$1,247/year', savings: '$458', rating: '4.8' },
        { carrier: 'State Farm', premium: '$1,389/year', savings: '$316', rating: '4.6' },
        { carrier: 'Geico', premium: '$1,455/year', savings: '$250', rating: '4.5' }
      ]
      setQuotes(generatedQuotes)
      
      // Show success modal
      setTimeout(() => {
        setShowSuccessModal(true)
      }, 500)
      
    } catch (error) {
      console.error('Quote generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <PerformanceBar />
      
      <div className="container mx-auto px-4 pt-12 pb-8 max-w-7xl">
        {/* Header Section */}
        <header className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">TurboRater Integration Hub</h1>
                <p className="text-gray-600">AI-Powered Insurance Rating Platform</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
              <Star className="w-5 h-5" />
              <span className="font-semibold">60% Faster than EZLynx</span>
            </div>
          </div>
          
          <SmartSearchBar />
        </header>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Quote Form */}
          <div className="lg:col-span-2">
            <ProgressiveQuoteForm onSubmit={handleQuoteSubmit} />
            <AITransparencyPanel visible={showAIPanel} />
          </div>
          
          {/* Right Panel - Live Metrics & Status */}
          <div className="space-y-6">
            <SpeedComparisonWidget />
            <LiveActivityFeed />
            <IntegrationStatusPanel />
            
            {/* Help & Support */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-blue-100 mb-4">
                Our AI assistant is ready to help you navigate the platform.
              </p>
              <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:shadow-lg transition-all text-sm font-semibold flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>
        
        {/* Quote Results Section */}
        <QuoteResults quotes={quotes} />
      </div>
      
      {/* Success Modal */}
      <SuccessModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}