'use client'

import { useOTTOTracking } from './OTTOProvider'

export default function SimpleCTA() {
  const { trackUserAction } = useOTTOTracking()

  const handleStartTrial = () => {
    trackUserAction('cta_clicked', {
      action: 'start_trial',
      location: 'simple_cta'
    })
    window.location.href = '/get-started'
  }

  return (
    <>
      <style jsx>{`
        .cta-section {
          padding: 6rem 2rem;
          background: #111827;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(0, 87, 255, 0.1), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .cta-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #1a1a1a;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .cta-subtitle {
          font-size: 1.125rem;
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cta-button {
          padding: 1.125rem 2.5rem;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 87, 255, 0.3);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #00C851 0%, #0057FF 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-button:hover::before {
          opacity: 1;
        }

        .cta-button span {
          position: relative;
          z-index: 1;
        }

        .cta-note {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #999;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 2rem;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to simplify?</h2>
          <p className="cta-subtitle">
            Join forward-thinking agencies transforming with Quotely
          </p>
          <button className="cta-button" onClick={handleStartTrial}>
            <span>Start Free Trial</span>
          </button>
          <p className="cta-note">No credit card required</p>
        </div>
      </section>
    </>
  )
}