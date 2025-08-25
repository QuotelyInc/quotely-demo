'use client'

import { useOTTOTracking } from './OTTOProvider'

export default function CalmCTA() {
  const { trackUserAction } = useOTTOTracking()

  const handleStartTrial = () => {
    trackUserAction('cta_clicked', {
      action: 'start_trial',
      location: 'calm_cta'
    })
    window.location.href = '/get-started'
  }

  return (
    <>
      <style jsx>{`
        .cta-section {
          padding: var(--space-3xl) 0;
          background: var(--background);
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
          text-align: center;
        }

        .cta-title {
          font-size: var(--font-size-3xl);
          color: var(--secondary);
          margin-bottom: var(--space-md);
          font-weight: 600;
        }

        .cta-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
        }

        .cta-button {
          padding: 1rem 2rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cta-button:hover {
          background: #4C51BF;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .cta-note {
          margin-top: var(--space-md);
          font-size: var(--font-size-sm);
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: var(--font-size-2xl);
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-subtitle">
            Join hundreds of agencies already using Quotely to streamline their business
          </p>
          <button className="cta-button" onClick={handleStartTrial}>
            Start Your Free Trial
          </button>
          <p className="cta-note">No credit card required • 14-day free trial</p>
        </div>
      </section>
    </>
  )
}