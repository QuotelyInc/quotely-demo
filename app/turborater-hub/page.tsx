'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Activity, Zap, TrendingUp, Users, CheckCircle, AlertCircle, RefreshCw, Clock, DollarSign, Shield, Award, ChevronRight, ChevronLeft, X, Plus, Minus, Home, FileText, Settings, HelpCircle, LogOut, BarChart3, Database, Cpu, Globe, Lock, Search, Filter, Download, Upload, Send, Copy, Check, Bell, User, Menu } from 'lucide-react'
import { configService } from '@/lib/services/config-service'

// Performance Bar Component
const PerformanceBar = () => {
  const [metrics, setMetrics] = useState({
    quotes: 147,
    speed: 0.8,
    accuracy: 99.5,
    uptime: 99.9
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        quotes: prev.quotes + Math.floor(Math.random() * 3),
        speed: Math.max(0.5, Math.min(1.2, prev.speed + (Math.random() - 0.5) * 0.1)),
        accuracy: Math.max(98, Math.min(100, prev.accuracy + (Math.random() - 0.5) * 0.5)),
        uptime: 99.9
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">TURBORATER LIVE</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Quotes Today: <span className="font-bold text-green-400">{metrics.quotes}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Avg Speed: <span className="font-bold text-yellow-400">{metrics.speed.toFixed(1)}s</span></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Accuracy: <span className="font-bold text-green-400">{metrics.accuracy.toFixed(1)}%</span></span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Uptime: <span className="font-bold text-green-400">{metrics.uptime}%</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Smart Quote Generator Component
const SmartQuoteGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    coverage: '',
    drivers: 1,
    vehicles: 1,
    address: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [quoteResult, setQuoteResult] = useState<any>(null)

  const steps = [
    { id: 1, name: 'Coverage', icon: Shield },
    { id: 2, name: 'Drivers', icon: Users },
    { id: 3, name: 'Vehicles', icon: FileText },
    { id: 4, name: 'Review', icon: CheckCircle }
  ]

  const handleGenerateQuote = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setQuoteResult({
        monthly: Math.floor(Math.random() * 200) + 100,
        savings: Math.floor(Math.random() * 50) + 20,
        carriers: ['Progressive', 'State Farm', 'Geico', 'Allstate']
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Smart Quote Generator</h2>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          AI-Powered
        </span>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <StepIcon className="w-6 h-6" />
                </div>
                <span className="text-sm mt-2 font-medium text-gray-600">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Form Content */}
      <div className="space-y-4 mb-6">
        {currentStep === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Type</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.coverage}
              onChange={(e) => setFormData({...formData, coverage: e.target.value})}
            >
              <option value="">Select coverage</option>
              <option value="liability">Liability Only</option>
              <option value="comprehensive">Comprehensive</option>
              <option value="full">Full Coverage</option>
            </select>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Drivers</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFormData({...formData, drivers: Math.max(1, formData.drivers - 1)})}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{formData.drivers}</span>
              <button 
                onClick={() => setFormData({...formData, drivers: formData.drivers + 1})}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Vehicles</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFormData({...formData, vehicles: Math.max(1, formData.vehicles - 1)})}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{formData.vehicles}</span>
              <button 
                onClick={() => setFormData({...formData, vehicles: formData.vehicles + 1})}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Quote Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Coverage:</span>
                <span className="font-medium">{formData.coverage || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drivers:</span>
                <span className="font-medium">{formData.drivers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicles:</span>
                <span className="font-medium">{formData.vehicles}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2"
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        {currentStep < 4 ? (
          <button 
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleGenerateQuote}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Quote
                <Zap className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Quote Result */}
      {quoteResult && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">${quoteResult.monthly}/mo</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
              Save ${quoteResult.savings}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Best rates from: {quoteResult.carriers.join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

// AI Transparency Panel Component
const AITransparencyPanel = () => {
  const [recommendations, setRecommendations] = useState([
    { id: 1, type: 'cost', message: 'Lower deductible could save $23/mo', confidence: 92 },
    { id: 2, type: 'coverage', message: 'Gap coverage recommended for new vehicle', confidence: 88 },
    { id: 3, type: 'discount', message: '3 additional discounts available', confidence: 95 }
  ])

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Analysis</span>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-lg p-3 flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              rec.type === 'cost' ? 'bg-green-100 text-green-600' :
              rec.type === 'coverage' ? 'bg-blue-100 text-blue-600' :
              'bg-yellow-100 text-yellow-600'
            }`}>
              {rec.type === 'cost' ? <DollarSign className="w-4 h-4" /> :
               rec.type === 'coverage' ? <Shield className="w-4 h-4" /> :
               <Award className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{rec.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full"
                    style={{ width: `${rec.confidence}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{rec.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium text-sm">
        View All Recommendations
      </button>
    </div>
  )
}

// Speed Comparison Widget
const SpeedComparisonWidget = () => {
  const [activeComparison, setActiveComparison] = useState('ezlynx')
  
  const comparisons = {
    ezlynx: { name: 'EZLynx', ourTime: 0.8, theirTime: 4.2, color: 'red' },
    applied: { name: 'Applied', ourTime: 0.8, theirTime: 3.5, color: 'orange' },
    hawksoft: { name: 'HawkSoft', ourTime: 0.8, theirTime: 2.8, color: 'yellow' }
  }

  const comp = comparisons[activeComparison as keyof typeof comparisons]
  const speedup = ((comp.theirTime - comp.ourTime) / comp.theirTime * 100).toFixed(0)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Speed Comparison</h3>
      
      <div className="flex gap-2 mb-6">
        {Object.entries(comparisons).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveComparison(key)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              activeComparison === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {value.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Quotely</span>
            <span className="text-sm font-bold text-green-600">{comp.ourTime}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-6 rounded-full flex items-center justify-end pr-2"
              style={{ width: `${(comp.ourTime / comp.theirTime) * 100}%` }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{comp.name}</span>
            <span className="text-sm font-bold text-red-600">{comp.theirTime}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div 
              className={`bg-gradient-to-r from-red-400 to-red-500 h-6 rounded-full`}
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">You save:</span>
          <span className="text-2xl font-bold text-green-600">{speedup}% faster</span>
        </div>
      </div>
    </div>
  )
}

// Live Activity Feed
const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'quote', message: 'New quote generated for John D.', time: '2 min ago', icon: FileText },
    { id: 2, type: 'success', message: 'Policy bound: Auto + Home bundle', time: '5 min ago', icon: CheckCircle },
    { id: 3, type: 'alert', message: 'Carrier rate update: Progressive', time: '12 min ago', icon: AlertCircle },
    { id: 4, type: 'user', message: 'New agent joined: Sarah M.', time: '18 min ago', icon: Users }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ['quote', 'success', 'alert', 'user'][Math.floor(Math.random() * 4)],
        message: [
          'New quote generated',
          'Policy bound successfully', 
          'Carrier rates updated',
          'New user activity'
        ][Math.floor(Math.random() * 4)],
        time: 'Just now',
        icon: [FileText, CheckCircle, AlertCircle, Users][Math.floor(Math.random() * 4)]
      }
      
      setActivities(prev => [newActivity, ...prev.slice(0, 3)])
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Live Activity</h3>
        <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'quote' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'success' ? 'bg-green-100 text-green-600' :
                activity.type === 'alert' ? 'bg-yellow-100 text-yellow-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Integration Status Dashboard
const IntegrationStatus = () => {
  const [integrations, setIntegrations] = useState<Array<{
    name: string
    status: 'connected' | 'checking' | 'maintenance' | 'error'
    health: number
    latency?: number
  }>>([
    { name: 'TurboRater API', status: 'checking', health: 0 },
    { name: 'Progressive', status: 'connected', health: 98 },
    { name: 'State Farm', status: 'connected', health: 100 },
    { name: 'GEICO', status: 'maintenance', health: 0 },
    { name: 'Allstate', status: 'connected', health: 95 }
  ])
  const [configValid, setConfigValid] = useState<boolean | null>(null)
  const [isTestingConnection, setIsTestingConnection] = useState(false)

  useEffect(() => {
    // Check configuration on mount
    checkConfiguration()
    // Test connection every 30 seconds
    const interval = setInterval(() => {
      testApiConnection()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const checkConfiguration = async () => {
    try {
      const validation = await configService.validateConfig()
      setConfigValid(validation.valid)
      
      // Update TurboRater API status based on config
      setIntegrations(prev => prev.map(int => 
        int.name === 'TurboRater API' 
          ? { ...int, status: validation.valid ? 'connected' : 'error', health: validation.valid ? 100 : 0 }
          : int
      ))
    } catch (error) {
      console.error('Config check failed:', error)
      setConfigValid(false)
    }
  }

  const testApiConnection = async () => {
    if (isTestingConnection) return
    
    setIsTestingConnection(true)
    try {
      const result = await configService.testConnection()
      
      setIntegrations(prev => prev.map(int => 
        int.name === 'TurboRater API' 
          ? { 
              ...int, 
              status: result.status === 'connected' ? 'connected' : 'error',
              health: result.status === 'connected' ? 100 : 0,
              latency: result.latency
            }
          : int
      ))
    } catch (error) {
      console.error('Connection test failed:', error)
    } finally {
      setIsTestingConnection(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Integration Status</h3>
        <button 
          onClick={testApiConnection}
          disabled={isTestingConnection}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-gray-500 ${isTestingConnection ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {configValid === false && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">TurboRater API key not configured</span>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                integration.status === 'connected' ? 'bg-green-500 animate-pulse' :
                integration.status === 'maintenance' ? 'bg-yellow-500' :
                integration.status === 'checking' ? 'bg-blue-500 animate-pulse' :
                integration.status === 'error' ? 'bg-red-500' :
                'bg-gray-500'
              }`}></div>
              <span className="text-sm font-medium text-gray-700">{integration.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {integration.status === 'connected' ? (
                <>
                  <span className="text-xs text-gray-500">{integration.health}%</span>
                  {integration.latency && (
                    <span className="text-xs text-gray-400">{integration.latency}ms</span>
                  )}
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </>
              ) : integration.status === 'checking' ? (
                <span className="text-xs text-blue-600 font-medium">Checking...</span>
              ) : integration.status === 'maintenance' ? (
                <span className="text-xs text-yellow-600 font-medium">Maintenance</span>
              ) : (
                <span className="text-xs text-red-600 font-medium">Error</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">
        View All Integrations
      </button>
    </div>
  )
}

// Main Page Component
export default function TurboRaterHub() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Performance Bar */}
      <PerformanceBar />

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 h-screen sticky top-0`}>
          <div className="p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-between mb-6"
            >
              <span className={`font-bold text-xl text-gray-900 ${!sidebarOpen && 'hidden'}`}>
                TurboRater Hub
              </span>
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <nav className="space-y-2">
              {[
                { icon: Home, label: 'Dashboard', active: true },
                { icon: FileText, label: 'Quotes' },
                { icon: Users, label: 'Clients' },
                { icon: BarChart3, label: 'Analytics' },
                { icon: Settings, label: 'Settings' }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      item.active 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">TurboRater Integration Hub</h1>
              <p className="text-gray-600">Advanced quote generation and carrier management</p>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Quote Generator */}
              <div className="lg:col-span-2 space-y-6">
                <SmartQuoteGenerator />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <SpeedComparisonWidget />
                  <LiveActivityFeed />
                </div>
              </div>

              {/* Right Column - AI & Status */}
              <div className="space-y-6">
                <AITransparencyPanel />
                <IntegrationStatus />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}