'use client';

import { useState, useEffect } from 'react';

interface Signup {
  company: string;
  location: string;
  time: string;
  agents: number;
}

export default function SocialProofTicker() {
  const [currentSignup, setCurrentSignup] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Mock data - in production, this would come from your backend
  const recentSignups: Signup[] = [
    { company: 'Premier Insurance Group', location: 'Austin, TX', time: '2 minutes ago', agents: 12 },
    { company: 'SafeGuard Agency', location: 'Miami, FL', time: '5 minutes ago', agents: 8 },
    { company: 'United Coverage Partners', location: 'Chicago, IL', time: '11 minutes ago', agents: 15 },
    { company: 'Shield Insurance Co', location: 'Phoenix, AZ', time: '18 minutes ago', agents: 6 },
    { company: 'Liberty Associates', location: 'Boston, MA', time: '22 minutes ago', agents: 10 },
    { company: 'Pacific Coast Insurance', location: 'San Diego, CA', time: '28 minutes ago', agents: 9 },
    { company: 'Mountain View Agency', location: 'Denver, CO', time: '31 minutes ago', agents: 7 },
    { company: 'Evergreen Insurance', location: 'Seattle, WA', time: '45 minutes ago', agents: 11 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSignup((prev) => (prev + 1) % recentSignups.length);
        setIsVisible(true);
      }, 300);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [recentSignups.length]);

  const signup = recentSignups[currentSignup];

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {signup.company}
            </p>
            <p className="text-xs text-gray-600">
              {signup.location} • {signup.agents} agents
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Just switched to Quotely • {signup.time}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">2,847 agencies</span> switched this month
        </p>
      </div>
    </div>
  );
}