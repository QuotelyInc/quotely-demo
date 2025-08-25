'use client'

import React, { useState, useEffect } from 'react'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/layout/Footer'
import { 
  Brain, Cpu, Zap, Shield, Activity, TrendingUp, 
  CheckCircle, ArrowRight, Bot, Sparkles, Network,
  BarChart3, Lock, Globe, Layers, GitBranch, Database
} from 'lucide-react'

export default function AIAgentsPage() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [aiConfidence, setAiConfidence] = useState(94)
  const [tasksAutomated, setTasksAutomated] = useState(0)

  useEffect(() => {
    // Animate metrics
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4)
      setAiConfidence(90 + Math.floor(Math.random() * 10))
      setTasksAutomated((prev) => prev + Math.floor(Math.random() * 5) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: 'AI Confidence', value: `${aiConfidence}%`, icon: Brain },
    { label: 'Tasks Automated/Day', value: tasksAutomated.toLocaleString(), icon: Bot },
    { label: 'Processing Speed', value: '0.3s', icon: Zap },
    { label: 'Accuracy Rate', value: '99.8%', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <MinimalNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 font-mono text-sm uppercase tracking-wider">Neural Intelligence Platform</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered Insurance Agents
          </h1>
          
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
            Autonomous quote generation, intelligent risk assessment, and predictive analytics. 
            Our AI agents process 10,000+ decisions per second with 99.8% accuracy.
          </p>
          
          {/* Live Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {metrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <div 
                  key={i}
                  className={`bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border transition-all duration-500 ${
                    activeMetric === i ? 'border-blue-500 scale-105 shadow-2xl shadow-blue-500/50' : 'border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              Deploy AI Agents Now
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700 transition">
              View Architecture
              <Layers className="inline ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Capabilities Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Autonomous AI Capabilities</h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Self-learning neural networks that evolve with your business
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Neural Quote Engine',
                description: 'Deep learning models analyze 500+ risk factors in milliseconds',
                stats: '60-second quotes, 99.8% accuracy'
              },
              {
                icon: Bot,
                title: 'Autonomous Agents',
                description: 'Self-operating AI agents handle routine tasks without human intervention',
                stats: '10,000+ tasks automated daily'
              },
              {
                icon: Network,
                title: 'Predictive Analytics',
                description: 'Machine learning predicts customer behavior and optimal pricing',
                stats: '45% better conversion rates'
              },
              {
                icon: Shield,
                title: 'Risk Assessment AI',
                description: 'Advanced pattern recognition identifies fraud and evaluates risk profiles',
                stats: '78% fraud detection rate'
              },
              {
                icon: Cpu,
                title: 'Natural Language Processing',
                description: 'Understands and processes unstructured documents automatically',
                stats: '95% document extraction accuracy'
              },
              {
                icon: Activity,
                title: 'Real-time Learning',
                description: 'Continuously improves from every interaction and outcome',
                stats: 'Updates every 100ms'
              }
            ].map((capability, i) => {
              const Icon = capability.icon
              return (
                <div key={i} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105 group">
                  <Icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{capability.title}</h3>
                  <p className="text-gray-400 mb-3">{capability.description}</p>
                  <div className="text-sm text-blue-400 font-mono">{capability.stats}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">Enterprise AI Infrastructure</h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Built on cutting-edge neural architecture and cloud-native technology
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Architecture Diagram */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GitBranch className="w-6 h-6 text-purple-400" />
                Neural Architecture
              </h3>
              <div className="space-y-4">
                {[
                  { layer: 'Input Layer', desc: '500+ data points ingested', color: 'blue' },
                  { layer: 'Processing Layer', desc: 'TensorFlow & PyTorch models', color: 'purple' },
                  { layer: 'Decision Layer', desc: 'Multi-agent decision trees', color: 'pink' },
                  { layer: 'Output Layer', desc: 'Real-time API responses', color: 'green' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-${item.color}-500`} />
                    <div className="flex-1">
                      <div className="font-semibold">{item.layer}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tech Stack */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-400" />
                Technology Stack
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { tech: 'TensorFlow 2.0', type: 'ML Framework' },
                  { tech: 'Kubernetes', type: 'Orchestration' },
                  { tech: 'Redis Cache', type: 'Performance' },
                  { tech: 'PostgreSQL', type: 'Database' },
                  { tech: 'Apache Kafka', type: 'Streaming' },
                  { tech: 'Elasticsearch', type: 'Search' },
                  { tech: 'Docker', type: 'Containers' },
                  { tech: 'GraphQL', type: 'API Layer' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-lg p-3">
                    <div className="font-semibold text-sm">{item.tech}</div>
                    <div className="text-xs text-gray-500">{item.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Transparency Dashboard */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">AI Transparency Dashboard</h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Full visibility into AI decision-making processes
          </p>
          
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Live AI Activity
                </h3>
                <div className="space-y-2">
                  {['Quote generated for Auto Policy', 'Risk assessment completed', 'Document processed via NLP', 'Fraud check passed'].map((activity, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-gray-300">{activity}</span>
                      <span className="text-gray-500 text-xs ml-auto">now</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Performance Metrics
                </h3>
                <div className="space-y-3">
                  {[
                    { metric: 'API Response Time', value: '312ms' },
                    { metric: 'Model Accuracy', value: '99.8%' },
                    { metric: 'Uptime', value: '99.99%' },
                    { metric: 'Decisions/Second', value: '10,247' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{item.metric}</span>
                      <span className="font-mono text-sm font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Security & Compliance
                </h3>
                <div className="space-y-2">
                  {['SOC 2 Type II', 'HIPAA Compliant', 'ISO 27001', 'GDPR Ready'].map((cert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">AI Automation ROI</h2>
          <p className="text-xl text-gray-400 mb-12">
            See how AI agents transform your operational efficiency
          </p>
          
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-lg border border-gray-700">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-5xl font-black text-blue-400">87%</div>
                <div className="text-gray-400 mt-2">Reduction in Quote Time</div>
              </div>
              <div>
                <div className="text-5xl font-black text-purple-400">3.5x</div>
                <div className="text-gray-400 mt-2">Agent Productivity Increase</div>
              </div>
              <div>
                <div className="text-5xl font-black text-green-400">$47K</div>
                <div className="text-gray-400 mt-2">Annual Savings per Agent</div>
              </div>
            </div>
            
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              Calculate Your ROI
              <Sparkles className="inline ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}