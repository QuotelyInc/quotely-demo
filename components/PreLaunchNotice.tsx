'use client';

import { useState } from 'react';
import { X, Info, Calendar, Sparkles } from 'lucide-react';

export default function PreLaunchNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        .prelaunch-notice {
          position: relative;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          padding: 16px 24px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .notice-container {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .notice-content {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .notice-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .notice-text {
          flex: 1;
        }

        .notice-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .notice-description {
          font-size: 14px;
          opacity: 0.95;
          line-height: 1.4;
        }

        .launch-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.25);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .close-button {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s ease;
          opacity: 0.8;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .prelaunch-notice {
            padding: 12px 16px;
          }

          .notice-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .notice-icon {
            width: 32px;
            height: 32px;
          }

          .notice-title {
            font-size: 14px;
          }

          .notice-description {
            font-size: 13px;
          }

          .close-button {
            position: absolute;
            top: 12px;
            right: 12px;
          }
        }
      `}</style>

      <div className="prelaunch-notice">
        <div className="notice-container">
          <div className="notice-content">
            <div className="notice-icon">
              <Info size={24} />
            </div>
            <div className="notice-text">
              <div className="notice-title">
                <Sparkles size={18} />
                <span>Quotely Platform - Coming Q4 2024</span>
              </div>
              <div className="notice-description">
                Please note: Quotely is currently in development. Pricing, features, and offers shown are preliminary and subject to change before our official Q4 2024 launch.
                <span className="launch-badge">
                  <Calendar size={14} />
                  Expected Launch: Q4 2024
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="close-button"
            aria-label="Close notice"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
}