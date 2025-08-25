'use client'

import { useOTTOTracking } from './OTTOProvider'

export default function CalmHero() {
  const { trackUserAction } = useOTTOTracking()

  const handleGetStarted = () => {
    trackUserAction('hero_cta_clicked', {
      action: 'get_started'
    })
    window.location.href = '/get-started'
  }

  const handleLearnMore = () => {
    trackUserAction('hero_cta_clicked', {
      action: 'learn_more'
    })
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style jsx>{`
        .hero {
          min-height: 85vh;
          display: flex;
          align-items: center;
          background: var(--background);
          padding: var(--space-3xl) 0;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
          text-align: center;
        }

        .hero-badge {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: 500;
          margin-bottom: var(--space-lg);
          border: 1px solid var(--accent);
          opacity: 0.9;
        }

        .hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 600;
          color: var(--secondary);
          margin-bottom: var(--space-md);
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .hero-cta {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          margin-bottom: var(--space-2xl);
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: var(--space-xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--border);
          margin-top: var(--space-2xl);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: var(--font-size-2xl);
          font-weight: 600;
          color: var(--secondary);
          display: block;
        }

        .stat-label {
          font-size: var(--font-size-sm);
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 70vh;
            padding: var(--space-2xl) 0;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
          }

          .hero-cta .btn {
            width: 100%;
            max-width: 280px;
          }

          .hero-stats {
            flex-direction: column;
            gap: var(--space-md);
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">
            Trusted by 500+ agencies
          </div>
          
          <h1>Insurance quoting, simplified</h1>
          
          <p className="hero-subtitle">
            A modern platform that helps insurance agencies quote faster, 
            work smarter, and grow their business with confidence.
          </p>
          
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2 min</span>
              <span className="stat-label">Average quote time</span>
            </div>
            <div className="stat">
              <span className="stat-number">45%</span>
              <span className="stat-label">Faster conversions</span>
            </div>
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}