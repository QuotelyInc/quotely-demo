'use client'

import React, { useState, useEffect } from 'react'
import { Brain, Activity, Zap, Shield, BarChart3, Lock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

export default function AITransparencyDashboard() {
  const [aiMetrics, setAiMetrics] = useState({
    confidence: 94,
    decisionsPerSecond: 10247,
    accuracy: 99.8,
    tasksAutomated: 8934,
    apiResponseTime: 312,
    uptime: 99.99
  })

  const [activities, setActivities] = useState([
    { action: 'Quote generated for Auto Policy #A2847', time: 'now', status: 'success' },
    { action: 'Risk assessment completed - Score: 87/100', time: '2s ago', status: 'success' },
    { action: 'Document processed via NLP - 18 fields extracted', time: '5s ago', status: 'success' },
    { action: 'Fraud check passed - Confidence: 96%', time: '8s ago', status: 'success' },
    { action: 'Multi-carrier comparison completed', time: '12s ago', status: 'success' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with realistic variations
      setAiMetrics(prev => ({
        confidence: 90 + Math.floor(Math.random() * 10),
        decisionsPerSecond: 9000 + Math.floor(Math.random() * 2000),
        accuracy: 99.5 + (Math.random() * 0.5),
        tasksAutomated: prev.tasksAutomated + Math.floor(Math.random() * 10),
        apiResponseTime: 280 + Math.floor(Math.random() * 80),
        uptime: 99.99
      }))

      // Add new activity
      const newActivities = [
        'Quote generated for Home Policy',
        'Risk assessment completed',
        'Document processed via NLP',
        'Carrier API synchronized',
        'Premium calculation optimized'
      ]
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
      
      setActivities(prev => [
        { action: randomActivity, time: 'now', status: 'success' },
        ...prev.slice(0, 4)
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-xl border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Transparency Dashboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">AI Confidence</span>
            <Brain className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiMetrics.confidence}%</div>
          <div className="text-xs text-green-600 mt-1">↑ 2% from baseline</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Decisions/Second</span>
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiMetrics.decisionsPerSecond.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">Processing at peak</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Model Accuracy</span>
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiMetrics.accuracy.toFixed(1)}%</div>
          <div className="text-xs text-green-600 mt-1">Industry leading</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tasks Automated</span>
            <Activity className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiMetrics.tasksAutomated.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Today</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">API Response</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiMetrics.apiResponseTime}ms</div>
          <div className="text-xs text-green-600 mt-1">45% faster than avg</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">System Uptime</span>
            <Shield className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{aiMetrics.uptime}%</div>
          <div className="text-xs text-gray-500 mt-1">Enterprise SLA</div>
        </div>
      </div>

      {/* Activity Feed and AI Decisions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Live AI Activity
          </h3>
          <div className="space-y-3">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="mt-1">
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-gray-700">{activity.action}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-500" />
            AI Decision Transparency
          </h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="text-sm font-semibold text-gray-700">Risk Score Calculation</div>
              <div className="text-xs text-gray-600 mt-1">
                Analyzed: Credit (750), Claims (0), Location (Low Risk)
              </div>
              <div className="text-xs text-blue-600 font-semibold mt-1">Decision: Approved - Premium Tier A</div>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="text-sm font-semibold text-gray-700">Carrier Matching</div>
              <div className="text-xs text-gray-600 mt-1">
                Compared 12 carriers in 287ms
              </div>
              <div className="text-xs text-green-600 font-semibold mt-1">Best Match: Progressive (Score: 94/100)</div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="text-sm font-semibold text-gray-700">Document Processing</div>
              <div className="text-xs text-gray-600 mt-1">
                Extracted 24 fields with 99.2% confidence
              </div>
              <div className="text-xs text-purple-600 font-semibold mt-1">Status: Auto-populated to forms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>ISO 27001</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>GDPR Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}