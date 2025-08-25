'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import MinimalFooter from '@/components/MinimalFooter'
import '../globals-calm.css'

export default function ComparePage() {
  const { trackPageView } = useOTTOTracking()

  useEffect(() => {
    trackPageView('compare', {
      section: 'comparison'
    })
  }, [trackPageView])

  const comparisonData = [
    { feature: 'Average Quote Time', quotely: '< 2 minutes', ezlynx: '5+ minutes', applied: '4+ minutes' },
    { feature: 'Page Load Speed', quotely: '1.2 seconds', ezlynx: '3.4 seconds', applied: '2.9 seconds' },
    { feature: 'Mobile Score', quotely: '95/100', ezlynx: '72/100', applied: '68/100' },
    { feature: 'AI Transparency', quotely: 'Full visibility', ezlynx: 'Limited', applied: 'None' },
    { feature: 'Setup Time', quotely: '3 days', ezlynx: '2 weeks', applied: '3 weeks' },
    { feature: 'Monthly Cost', quotely: 'Contact for pricing', ezlynx: 'Contact for comparison', applied: 'Contact for comparison' },
    { feature: 'Carrier Integrations', quotely: '250+', ezlynx: '200+', applied: '180+' },
    { feature: 'Support Response', quotely: '< 1 hour', ezlynx: '24 hours', applied: '48 hours' },
  ]

  return (
    <>
      <style jsx>{`
        .compare-hero {
          padding: var(--space-3xl) var(--space-lg) var(--space-xl);
          text-align: center;
          background: var(--surface);
        }

        .compare-hero h1 {
          font-size: var(--font-size-4xl);
          color: var(--secondary);
          margin-bottom: var(--space-md);
        }

        .compare-hero p {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .comparison-table {
          max-width: 1200px;
          margin: var(--space-3xl) auto;
          padding: 0 var(--space-lg);
          overflow-x: auto;
        }

        table {
          width: 100%;
          background: var(--background);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        thead {
          background: var(--surface);
        }

        th {
          padding: var(--space-md);
          text-align: left;
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 2px solid var(--border);
        }

        th:first-child {
          min-width: 200px;
        }

        .product-header {
          font-size: var(--font-size-lg);
        }

        .quotely-header {
          color: var(--accent);
        }

        td {
          padding: var(--space-md);
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
        }

        td:first-child {
          font-weight: 500;
          color: var(--text-primary);
        }

        .quotely-cell {
          color: var(--accent);
          font-weight: 600;
        }

        .winner-badge {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          margin-left: 0.5rem;
        }

        .cta-section {
          padding: var(--space-3xl) var(--space-lg);
          text-align: center;
          background: var(--surface);
        }

        .cta-section h2 {
          font-size: var(--font-size-3xl);
          color: var(--secondary);
          margin-bottom: var(--space-md);
        }

        .cta-section p {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-bottom: var(--space-xl);
        }

        .btn {
          padding: 0.875rem 2rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn:hover {
          background: #4C51BF;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 768px) {
          .comparison-table {
            padding: 0 var(--space-sm);
          }

          th, td {
            padding: var(--space-sm);
            font-size: var(--font-size-sm);
          }

          .product-header {
            font-size: var(--font-size-base);
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MinimalNav />
        
        <div className="compare-hero">
          <h1>Compare Quotely</h1>
          <p>
            See how Quotely stacks up against the competition with real performance metrics and features
          </p>
        </div>

        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th className="product-header quotely-header">
                  Quotely
                  <span className="winner-badge">Best Value</span>
                </th>
                <th className="product-header">EZLynx</th>
                <th className="product-header">Applied Systems</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td>{row.feature}</td>
                  <td className="quotely-cell">{row.quotely}</td>
                  <td>{row.ezlynx}</td>
                  <td>{row.applied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cta-section">
          <h2>Ready to switch?</h2>
          <p>Join hundreds of agencies already saving time and money with Quotely</p>
          <a href="/get-started" className="btn">
            Start Free Trial
          </a>
        </div>

        <MinimalFooter />
      </div>
    </>
  )
}