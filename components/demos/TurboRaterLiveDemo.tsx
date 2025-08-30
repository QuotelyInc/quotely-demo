'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCw, CheckCircle, Zap, 
  FileKey, Wifi, Calculator, TrendingUp, Award,
  Clock, DollarSign, Users, Shield
} from 'lucide-react';

interface DemoStep {
  id: number;
  title: string;
  duration: number; // in seconds
  action: () => Promise<void>;
  icon: React.ReactNode;
}

const TurboRaterLiveDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [demoData, setDemoData] = useState({
    credentials: null as any,
    connection: false,
    quote: null as any,
    savings: 0
  });
  const [showResults, setShowResults] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Demo steps with timing
  const demoSteps: DemoStep[] = [
    {
      id: 1,
      title: "Loading Credentials",
      duration: 3,
      icon: <FileKey size={20} />,
      action: async () => {
        // Load credentials from API
        const response = await fetch('/api/env/load', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filePath: '.env.local',
            environment: 'test'
          })
        });
        const data = await response.json();
        setDemoData(prev => ({ ...prev, credentials: data.credentials }));
      }
    },
    {
      id: 2,
      title: "Connecting to TurboRater",
      duration: 3,
      icon: <Wifi size={20} />,
      action: async () => {
        // Simulate connection
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDemoData(prev => ({ ...prev, connection: true }));
      }
    },
    {
      id: 3,
      title: "Entering Customer Data",
      duration: 4,
      icon: <Users size={20} />,
      action: async () => {
        // Show form filling animation
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    },
    {
      id: 4,
      title: "Analyzing Risk Factors",
      duration: 3,
      icon: <Shield size={20} />,
      action: async () => {
        // AI analysis simulation
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    },
    {
      id: 5,
      title: "Generating Quotes",
      duration: 5,
      icon: <Calculator size={20} />,
      action: async () => {
        // Generate real quote
        const mockQuote = {
          id: `Q-${Date.now().toString().slice(-6)}`,
          premium: Math.floor(Math.random() * 500 + 1000),
          carriers: [
            { name: 'Carrier A', premium: 1247, savings: 234 },
            { name: 'Carrier B', premium: 1189, savings: 292 },
            { name: 'Carrier C', premium: 1356, savings: 125 }
          ],
          generatedIn: 1.8
        };
        setDemoData(prev => ({ ...prev, quote: mockQuote }));
      }
    },
    {
      id: 6,
      title: "Comparing Carriers",
      duration: 4,
      icon: <TrendingUp size={20} />,
      action: async () => {
        // Calculate savings
        const savings = Math.floor(Math.random() * 300 + 200);
        setDemoData(prev => ({ ...prev, savings }));
      }
    },
    {
      id: 7,
      title: "Quote Complete!",
      duration: 4,
      icon: <CheckCircle size={20} />,
      action: async () => {
        setShowResults(true);
      }
    }
  ];

  const totalDuration = demoSteps.reduce((acc, step) => acc + step.duration, 0);

  // Start demo
  const startDemo = async () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
    setShowResults(false);
    setDemoData({
      credentials: null,
      connection: false,
      quote: null,
      savings: 0
    });
    startTimeRef.current = Date.now();

    // Execute steps sequentially
    for (let i = 0; i < demoSteps.length; i++) {
      if (!isPlaying && i > 0) break; // Stop if paused
      
      setCurrentStep(i);
      await demoSteps[i].action();
      
      // Update progress during step
      const stepStartTime = Date.now();
      const stepDuration = demoSteps[i].duration * 1000;
      
      await new Promise<void>((resolve) => {
        const updateProgress = () => {
          const elapsed = Date.now() - startTimeRef.current;
          const totalProgress = (elapsed / (totalDuration * 1000)) * 100;
          setProgress(Math.min(totalProgress, 100));
          
          if (Date.now() - stepStartTime >= stepDuration) {
            resolve();
          }
        };
        
        intervalRef.current = setInterval(updateProgress, 100);
        
        setTimeout(() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          resolve();
        }, stepDuration);
      });
    }
    
    setIsPlaying(false);
    setProgress(100);
  };

  // Stop demo
  const stopDemo = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Reset demo
  const resetDemo = () => {
    stopDemo();
    setCurrentStep(0);
    setProgress(0);
    setShowResults(false);
    setDemoData({
      credentials: null,
      connection: false,
      quote: null,
      savings: 0
    });
  };

  // Auto-start on mount (optional)
  useEffect(() => {
    // Auto-start after 2 seconds
    const timer = setTimeout(() => {
      startDemo();
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-xl overflow-hidden shadow-2xl">
      {/* Video-like container with 16:9 aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="text-yellow-400" size={24} />
              <h3 className="text-white font-bold text-lg">
                TurboRater Live Demo
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-white text-sm">
              <Clock size={16} />
              <span>{Math.floor((progress / 100) * totalDuration)}s / {totalDuration}s</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Left Panel - Steps */}
            <div className="lg:w-1/3 space-y-2">
              {demoSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-white/20 border border-white/30' 
                      : index < currentStep 
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`${
                    index === currentStep 
                      ? 'text-yellow-400' 
                      : index < currentStep 
                      ? 'text-green-400'
                      : 'text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      index === currentStep 
                        ? 'text-white' 
                        : index < currentStep 
                        ? 'text-green-300'
                        : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    {index === currentStep && (
                      <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                        <div className="bg-yellow-400 h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                    )}
                  </div>
                  {index < currentStep && (
                    <CheckCircle className="text-green-400" size={16} />
                  )}
                </div>
              ))}
            </div>

            {/* Right Panel - Live Display */}
            <div className="lg:w-2/3 bg-black/30 rounded-lg p-6 backdrop-blur-sm">
              {/* Dynamic content based on current step */}
              {currentStep >= 0 && currentStep < 2 && (
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-xl mb-4">
                    Initializing System...
                  </h4>
                  {demoData.credentials && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                      <p className="text-green-300 text-sm">✓ Credentials loaded successfully</p>
                      <p className="text-green-200 text-xs mt-1">Account: Quotely Test Environment</p>
                    </div>
                  )}
                  {demoData.connection && (
                    <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                      <p className="text-blue-300 text-sm">✓ Connected to TurboRater API</p>
                      <p className="text-blue-200 text-xs mt-1">Response time: 47ms</p>
                    </div>
                  )}
                </div>
              )}

              {currentStep >= 2 && currentStep < 5 && (
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-xl mb-4">
                    Processing Quote Request...
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Customer</p>
                      <p className="text-white font-medium">John Smith</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Vehicle</p>
                      <p className="text-white font-medium">2022 Tesla Model 3</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Coverage</p>
                      <p className="text-white font-medium">Full Coverage</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Location</p>
                      <p className="text-white font-medium">Austin, TX</p>
                    </div>
                  </div>
                  {currentStep >= 4 && (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                      <span className="text-yellow-400 ml-3">Analyzing with AI...</span>
                    </div>
                  )}
                </div>
              )}

              {currentStep >= 5 && showResults && demoData.quote && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold text-xl">
                      Quote Generated!
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Award className="text-yellow-400" size={20} />
                      <span className="text-yellow-400 font-bold">
                        {demoData.quote.generatedIn}s
                      </span>
                    </div>
                  </div>
                  
                  {/* Carrier Comparison */}
                  <div className="space-y-2">
                    {demoData.quote.carriers.map((carrier: any, index: number) => (
                      <div 
                        key={index}
                        className={`bg-white/10 rounded-lg p-3 flex items-center justify-between ${
                          index === 1 ? 'border-2 border-green-400' : ''
                        }`}
                      >
                        <div>
                          <p className="text-white font-medium">{carrier.name}</p>
                          {index === 1 && (
                            <p className="text-green-400 text-xs">Best Value</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">${carrier.premium}/6mo</p>
                          <p className="text-green-400 text-xs">Save ${carrier.savings}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-green-500/20 rounded-lg p-2 text-center">
                      <DollarSign className="text-green-400 mx-auto mb-1" size={20} />
                      <p className="text-green-400 font-bold">${demoData.savings}</p>
                      <p className="text-green-300 text-xs">Saved</p>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-2 text-center">
                      <Clock className="text-blue-400 mx-auto mb-1" size={20} />
                      <p className="text-blue-400 font-bold">1.8s</p>
                      <p className="text-blue-300 text-xs">Quote Time</p>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-2 text-center">
                      <TrendingUp className="text-purple-400 mx-auto mb-1" size={20} />
                      <p className="text-purple-400 font-bold">60%</p>
                      <p className="text-purple-300 text-xs">Faster</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty state for early steps */}
              {currentStep < 2 && !demoData.credentials && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-pulse">
                      <FileKey className="text-gray-400 mx-auto mb-3" size={48} />
                    </div>
                    <p className="text-gray-400">Initializing demo...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <button
              onClick={isPlaying ? stopDemo : startDemo}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={resetDemo}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <RotateCw size={20} />
            </button>
            <div className="text-white text-xs">
              {isPlaying ? 'Playing...' : progress === 100 ? 'Complete' : 'Ready'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurboRaterLiveDemo;