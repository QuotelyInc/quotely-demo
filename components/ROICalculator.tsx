'use client';

import { useState } from 'react';

export default function ROICalculator() {
  const [agents, setAgents] = useState(10);
  const [quotesPerMonth, setQuotesPerMonth] = useState(200);
  const [selectedCompetitor, setSelectedCompetitor] = useState('ezlynx');

  // Competitor pricing data
  const competitorPricing = {
    ezlynx: { base: 199, perAgent: 89, setupFee: 2500, name: 'EZLynx' },
    applied: { base: 250, perAgent: 95, setupFee: 3000, name: 'Applied Systems' },
    vertafore: { base: 275, perAgent: 110, setupFee: 3500, name: 'Vertafore' },
    hawksoft: { base: 189, perAgent: 79, setupFee: 1500, name: 'HawkSoft' }
  };

  // Quotely QUAD pricing
  const quotelyPricing = {
    quad1: { buyIn: 1500, monthly: 679, name: 'QUAD 1.0' },
    quad2: { buyIn: 3000, monthly: 979, name: 'QUAD 2.0' },
    quad3: { buyIn: 5000, monthly: 1529, name: 'QUAD 3.0' }
  };

  // Calculate competitor cost
  const competitor = competitorPricing[selectedCompetitor as keyof typeof competitorPricing];
  const competitorMonthly = competitor.base + (competitor.perAgent * agents);
  const competitorAnnual = (competitorMonthly * 12) + competitor.setupFee;

  // Determine best QUAD tier based on agents
  const recommendedQuad = agents <= 5 ? quotelyPricing.quad1 : 
                         agents <= 15 ? quotelyPricing.quad2 : 
                         quotelyPricing.quad3;
  
  const quotelyMonthly = recommendedQuad.monthly;
  const quotelyAnnual = (quotelyMonthly * 12) + recommendedQuad.buyIn;

  // Calculate savings
  const monthlySavings = competitorMonthly - quotelyMonthly;
  const annualSavings = competitorAnnual - quotelyAnnual;
  const savingsPercentage = ((annualSavings / competitorAnnual) * 100).toFixed(1);

  // Time savings calculation
  const avgQuoteTimeCompetitor = 4.2; // minutes
  const avgQuoteTimeQuotely = 1.8; // minutes
  const timeSavedPerQuote = avgQuoteTimeCompetitor - avgQuoteTimeQuotely;
  const monthlyTimeSaved = (timeSavedPerQuote * quotesPerMonth) / 60; // in hours
  const annualTimeSaved = monthlyTimeSaved * 12;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ROI Calculator</h2>
      
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Agents
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={agents}
            onChange={(e) => setAgents(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quotes per Month
          </label>
          <input
            type="number"
            min="10"
            max="10000"
            value={quotesPerMonth}
            onChange={(e) => setQuotesPerMonth(Math.max(10, parseInt(e.target.value) || 10))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compare Against
          </label>
          <select
            value={selectedCompetitor}
            onChange={(e) => setSelectedCompetitor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ezlynx">EZLynx</option>
            <option value="applied">Applied Systems</option>
            <option value="vertafore">Vertafore</option>
            <option value="hawksoft">HawkSoft</option>
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Competitor Column */}
          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <h3 className="font-semibold text-lg mb-3">{competitor.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Setup Fee:</span>
                <span className="font-medium">${competitor.setupFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Cost:</span>
                <span className="font-medium">${competitorMonthly.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Cost:</span>
                <span className="font-bold text-lg">${competitorAnnual.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Quote Time:</span>
                <span className="font-medium">{avgQuoteTimeCompetitor} min</span>
              </div>
            </div>
          </div>

          {/* Quotely Column */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 border-2 border-green-500">
            <h3 className="font-semibold text-lg mb-3">
              Quotely {recommendedQuad.name}
              <span className="text-xs ml-2 bg-green-500 text-white px-2 py-1 rounded">RECOMMENDED</span>
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Buy-In:</span>
                <span className="font-medium">${recommendedQuad.buyIn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Cost:</span>
                <span className="font-medium">${quotelyMonthly.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Cost:</span>
                <span className="font-bold text-lg">${quotelyAnnual.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Quote Time:</span>
                <span className="font-medium">{avgQuoteTimeQuotely} min</span>
              </div>
            </div>
          </div>

          {/* Savings Column */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-emerald-600">
            <h3 className="font-semibold text-lg mb-3 text-emerald-800">Your Savings</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Savings:</span>
                <span className="font-medium text-green-600">${monthlySavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Savings:</span>
                <span className="font-bold text-lg text-green-600">${annualSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Percentage Saved:</span>
                <span className="font-medium text-green-600">{savingsPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Saved/Year:</span>
                <span className="font-medium text-green-600">{annualTimeSaved.toFixed(0)} hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Additional Benefits with Quotely</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">60% faster quote generation</span>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">No per-agent fees</span>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">AI-powered insights</span>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">State exclusivity options</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
          Get Your Personalized Demo
        </button>
        <p className="text-sm text-gray-600 mt-2">
          See exactly how much you'll save with a 15-minute demo
        </p>
      </div>
    </div>
  );
}