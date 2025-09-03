'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import MinimalFooter from '@/components/MinimalFooter'
import '../globals-calm.css'

export default function AboutPage() {
  const { trackPageView } = useOTTOTracking()

  useEffect(() => {
    trackPageView('about', {
      section: 'company_info'
    })
  }, [trackPageView])

  return (
    <>
      <style jsx>{`
        .about-hero {
          padding: var(--space-3xl) var(--space-lg);
          text-align: center;
          background: var(--surface);
        }

        .about-hero h1 {
          font-size: var(--font-size-4xl);
          color: var(--secondary);
          margin-bottom: var(--space-md);
        }

        .about-hero p {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .content-section {
          padding: var(--space-3xl) var(--space-lg);
          max-width: 900px;
          margin: 0 auto;
        }

        .content-section h2 {
          font-size: var(--font-size-2xl);
          color: var(--secondary);
          margin-bottom: var(--space-md);
        }

        .content-section p {
          font-size: var(--font-size-base);
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--space-md);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
          margin-top: var(--space-xl);
        }

        .value-card {
          padding: var(--space-lg);
          background: var(--surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }

        .value-icon {
          width: 48px;
          height: 48px;
          background: var(--accent-soft);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: var(--space-md);
        }

        .value-card h3 {
          font-size: var(--font-size-xl);
          color: var(--secondary);
          margin-bottom: var(--space-sm);
        }

        .value-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .team-section {
          background: var(--surface);
          padding: var(--space-3xl) var(--space-lg);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-lg);
          margin-top: var(--space-xl);
          text-align: center;
        }

        .stat {
          padding: var(--space-md);
        }

        .stat-number {
          font-size: var(--font-size-3xl);
          font-weight: 600;
          color: var(--accent);
          display: block;
          margin-bottom: var(--space-xs);
        }

        .stat-label {
          font-size: var(--font-size-sm);
          color: var(--text-muted);
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MinimalNav />
        
        <div className="about-hero">
          <h1>About Quotely</h1>
          <p>
            We're building the future of insurance technology, making it simpler, 
            faster, and more transparent for agencies everywhere.
          </p>
        </div>

        <div className="content-section">
          <h2>Our Mission</h2>
          <p>
            Quotely was founded with a simple belief: insurance technology should empower agents, 
            not frustrate them. We're on a mission to streamline the entire insurance workflow, 
            from quote to bind, with tools that are intuitive, fast, and transparent.
          </p>
          <p>
            We believe that by giving agents better tools, we can help them serve their clients 
            more effectively, grow their businesses, and spend less time on repetitive tasks.
          </p>
        </div>


        <div className="content-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Simplicity</h3>
              <p>
                Complex problems don't require complex solutions. We focus on making 
                insurance simple.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed</h3>
              <p>
                Every second counts. We obsess over performance to save you time 
                every day.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Transparency</h3>
              <p>
                No black boxes. We believe in showing you exactly how everything works.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Partnership</h3>
              <p>
                Your success is our success. We're here to support you every step 
                of the way.
              </p>
            </div>
          </div>
        </div>

        <MinimalFooter />
      </div>
    </>
  )
}