'use client';

import { useState, useEffect } from 'react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves viewport from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Mobile detection - show after 30 seconds of inactivity
    let mobileTimer: NodeJS.Timeout;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && !hasShown) {
      mobileTimer = setTimeout(() => {
        if (!hasShown) {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem('exitIntentShown', 'true');
        }
      }, 30000); // 30 seconds
    }

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    // Navigate to demo page
    window.location.href = '/demo';
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-[10001] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slide-up">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Wait! Don't Miss Out
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get an exclusive 20% discount on your first month
              </p>
            </div>

            {/* Offer details */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Limited Time Offer</h3>
                  <p className="text-sm text-gray-600">
                    Schedule a demo in the next 24 hours and receive:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• 20% off your first month</li>
                    <li>• Free data migration (valued at $500)</li>
                    <li>• Priority onboarding support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClaim}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Claim Your 20% Discount
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                No thanks
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              No credit card required • Offer expires in 24 hours
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}