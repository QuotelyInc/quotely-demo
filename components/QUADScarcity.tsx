'use client';

import { useState, useEffect } from 'react';

interface TierAvailability {
  tier: string;
  total: number;
  remaining: number;
  buyIn: number;
  monthly: number;
  color: string;
}

export default function QUADScarcity() {
  const [availability, setAvailability] = useState<TierAvailability[]>([
    { tier: 'QUAD 1.0', total: 100, remaining: 47, buyIn: 1500, monthly: 679, color: 'blue' },
    { tier: 'QUAD 2.0', total: 50, remaining: 18, buyIn: 3000, monthly: 979, color: 'purple' },
    { tier: 'QUAD 3.0', total: 25, remaining: 7, buyIn: 5000, monthly: 1529, color: 'gold' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAvailability(prev => prev.map(tier => {
        // Randomly decrease availability (simulating purchases)
        if (Math.random() > 0.95 && tier.remaining > 1) {
          return { ...tier, remaining: tier.remaining - 1 };
        }
        return tier;
      }));
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getUrgencyLevel = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage <= 10) return 'critical';
    if (percentage <= 30) return 'high';
    if (percentage <= 50) return 'medium';
    return 'low';
  };

  const getColorClasses = (color: string, urgency: string) => {
    if (urgency === 'critical') {
      return 'bg-red-50 border-red-500 text-red-900';
    }
    
    const colorMap = {
      blue: 'bg-blue-50 border-blue-500 text-blue-900',
      purple: 'bg-purple-50 border-purple-500 text-purple-900',
      gold: 'bg-yellow-50 border-yellow-500 text-yellow-900'
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getProgressBarColor = (urgency: string) => {
    if (urgency === 'critical') return 'bg-red-500';
    if (urgency === 'high') return 'bg-orange-500';
    if (urgency === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Limited QUAD Spots Available
          </h2>
          <p className="text-lg text-gray-600">
            Secure your state exclusivity before it's gone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availability.map((tier) => {
            const urgency = getUrgencyLevel(tier.remaining, tier.total);
            const percentageRemaining = (tier.remaining / tier.total) * 100;
            
            return (
              <div
                key={tier.tier}
                className={`rounded-xl border-2 p-6 relative overflow-hidden transition-all hover:shadow-lg ${
                  getColorClasses(tier.color, urgency)
                }`}
              >
                {/* Urgency Badge */}
                {urgency === 'critical' && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg text-xs font-bold animate-pulse">
                    ALMOST GONE
                  </div>
                )}
                
                {/* Tier Name */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{tier.tier}</h3>
                  <div className="text-sm opacity-75 mt-1">
                    ${tier.buyIn} buy-in • ${tier.monthly}/mo
                  </div>
                </div>

                {/* Availability Counter */}
                <div className="mb-4">
                  <div className="text-4xl font-bold">
                    {tier.remaining}
                    <span className="text-lg font-normal ml-2">spots left</span>
                  </div>
                  <div className="text-sm opacity-75">
                    out of {tier.total} total
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${getProgressBarColor(urgency)}`}
                      style={{ width: `${100 - percentageRemaining}%` }}
                    />
                  </div>
                  <div className="text-xs mt-1 opacity-75">
                    {(100 - percentageRemaining).toFixed(0)}% claimed
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>State exclusivity rights</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Locked-in pricing forever</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Priority support & features</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  urgency === 'critical' 
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}>
                  {urgency === 'critical' ? 'Claim Last Spot' : 'Reserve Your Spot'}
                </button>

                {/* Recent Activity */}
                {urgency === 'critical' || urgency === 'high' ? (
                  <div className="mt-3 text-xs text-center opacity-75">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      3 agencies viewing now
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Urgency Message */}
        <div className="mt-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Important:</strong> QUAD spots are allocated on a first-come, first-served basis. 
            Once your state is claimed, it's exclusive to that agency.
          </p>
        </div>
      </div>
    </div>
  );
}