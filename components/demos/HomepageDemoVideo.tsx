'use client';

import React, { useState, useEffect } from 'react';
import { Play, Zap, CheckCircle } from 'lucide-react';

const HomepageDemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startSequence();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const startSequence = async () => {
    setIsPlaying(true);
    setCurrentPhase(0);
    setShowStats(false);

    // Phase 1: Load credentials (0-5s)
    setCurrentPhase(1);
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Phase 2: Connect & Generate (5-15s)
    setCurrentPhase(2);
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Phase 3: Show Results (15-25s)
    setCurrentPhase(3);
    setShowStats(true);
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Phase 4: Call to Action (25-30s)
    setCurrentPhase(4);
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Loop back
    setTimeout(() => {
      startSequence();
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="relative aspect-video">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center">
            {/* Phase 1: Introduction */}
            {currentPhase === 1 && (
              <div className="text-center animate-fadeIn">
                <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  TurboRater Integration
                </h2>
                <p className="text-gray-300 text-lg">
                  Watch how fast we generate quotes with real API integration
                </p>
              </div>
            )}

            {/* Phase 2: Loading/Processing */}
            {currentPhase === 2 && (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-blue-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <p className="text-white mt-2">Load API Keys</p>
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-purple-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <p className="text-white mt-2">Connect to API</p>
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-pink-400 rounded-full flex items-center justify-center animate-spin">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <p className="text-white mt-2">Generate Quote</p>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 3: Results */}
            {currentPhase === 3 && showStats && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-white text-center mb-6">
                  Quote Generated in 1.8 Seconds!
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
                    <p className="text-3xl font-bold text-green-400">$1,189</p>
                    <p className="text-gray-300 text-sm">Best Quote</p>
                    <p className="text-green-400 text-xs mt-1">Save $292/year</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
                    <p className="text-3xl font-bold text-blue-400">60%</p>
                    <p className="text-gray-300 text-sm">Faster</p>
                    <p className="text-blue-400 text-xs mt-1">Than competitors</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
                    <p className="text-3xl font-bold text-purple-400">8</p>
                    <p className="text-gray-300 text-sm">Carriers</p>
                    <p className="text-purple-400 text-xs mt-1">Compared instantly</p>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 4: CTA */}
            {currentPhase === 4 && (
              <div className="text-center animate-fadeIn">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Experience the Speed?
                </h2>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg">
                  Start Free Trial
                </button>
              </div>
            )}
          </div>

          {/* Play Button Overlay (when not playing) */}
          {!isPlaying && (
            <button
              onClick={startSequence}
              className="absolute inset-0 flex items-center justify-center bg-black/50 group"
            >
              <div className="bg-white/20 backdrop-blur rounded-full p-6 group-hover:bg-white/30 transition-all">
                <Play className="w-12 h-12 text-white" fill="white" />
              </div>
            </button>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-[30000ms] ease-linear"
              style={{ 
                width: isPlaying ? '100%' : '0%',
                transitionProperty: isPlaying ? 'width' : 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-gray-600 text-sm mt-4">
        30-second demo • Real API integration • Live data
      </p>
    </div>
  );
};

export default HomepageDemoVideo;