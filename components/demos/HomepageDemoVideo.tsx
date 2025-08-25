"use client";

import React, { useState, useEffect } from "react";
import { Play, Zap, CheckCircle } from "lucide-react";

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
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Phase 2: Connect & Generate (5-15s)
    setCurrentPhase(2);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Phase 3: Show Results (15-25s)
    setCurrentPhase(3);
    setShowStats(true);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Phase 4: Call to Action (25-30s)
    setCurrentPhase(4);
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse" />
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center">
            {/* Phase 1: Introduction */}
            {currentPhase === 1 && (
              <div className="text-center opacity-0 animate-pulse">
                <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  TurboRater Integration
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Watch how fast we generate quotes with real API integration
                </p>
              </div>
            )}

            {/* Phase 2: Processing Steps */}
            {currentPhase === 2 && (
              <div className="opacity-0 animate-pulse">
                <div className="flex items-center justify-center space-x-8 md:space-x-12">
                  {/* Step 1: Load API Keys */}
                  <div className="text-center transform transition-all duration-500 hover:scale-105">
                    <div className="w-20 h-20 border-4 border-blue-400 rounded-full flex items-center justify-center animate-pulse bg-blue-400/10">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <p className="text-white mt-2 text-sm font-medium">
                      Load API Keys
                    </p>
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-1" />
                  </div>

                  {/* Connection Line */}
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>

                  {/* Step 2: Connect to API */}
                  <div className="text-center transform transition-all duration-500 hover:scale-105">
                    <div className="w-20 h-20 border-4 border-purple-400 rounded-full flex items-center justify-center animate-pulse bg-purple-400/10">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <p className="text-white mt-2 text-sm font-medium">
                      Connect to API
                    </p>
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto mt-1" />
                  </div>

                  {/* Connection Line */}
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>

                  {/* Step 3: Generate Quote */}
                  <div className="text-center transform transition-all duration-500 hover:scale-105">
                    <div className="w-20 h-20 border-4 border-pink-400 rounded-full flex items-center justify-center animate-spin bg-pink-400/10">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <p className="text-white mt-2 text-sm font-medium">
                      Generate Quote
                    </p>
                    <div className="w-5 h-5 mx-auto mt-1 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 3: Results Display */}
            {currentPhase === 3 && showStats && (
              <div className="opacity-0 animate-pulse">
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 tracking-tight">
                  Quote Generated in{" "}
                  <span className="text-green-400">1.8 Seconds!</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {/* Best Quote Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/20">
                    <p className="text-4xl font-bold text-green-400 mb-2">
                      $1,189
                    </p>
                    <p className="text-gray-300 text-base font-medium">
                      Best Quote
                    </p>
                    <p className="text-green-400 text-sm mt-2 font-semibold">
                      Save $292/year
                    </p>
                  </div>

                  {/* Speed Comparison Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/20">
                    <p className="text-4xl font-bold text-blue-400 mb-2">60%</p>
                    <p className="text-gray-300 text-base font-medium">
                      Faster
                    </p>
                    <p className="text-blue-400 text-sm mt-2 font-semibold">
                      Than competitors
                    </p>
                  </div>

                  {/* Carriers Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/20">
                    <p className="text-4xl font-bold text-purple-400 mb-2">8</p>
                    <p className="text-gray-300 text-base font-medium">
                      Carriers
                    </p>
                    <p className="text-purple-400 text-sm mt-2 font-semibold">
                      Compared instantly
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 4: Call to Action */}
            {currentPhase === 4 && (
              <div className="text-center opacity-0 animate-pulse">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6 animate-bounce" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  Ready to Experience the Speed?
                </h2>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg hover:from-blue-500 hover:to-purple-500">
                  Start Free Trial
                </button>
              </div>
            )}
          </div>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <button
              onClick={startSequence}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm group transition-all duration-300 hover:bg-black/60"
            >
              <div className="bg-white/20 backdrop-blur-md rounded-full p-6 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                <Play className="w-12 h-12 text-white" fill="white" />
              </div>
            </button>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
            <div
              className={`h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all ease-linear ${
                isPlaying ? "w-full duration-[30000ms]" : "w-0 duration-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-gray-600 text-sm mt-4 font-medium">
        30-second demo • Real API integration • Live data
      </p>
    </div>
  );
};

export default HomepageDemoVideo;
