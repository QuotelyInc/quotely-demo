'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/Footer'
import RotatingNewsCommentary from '@/components/RotatingNewsCommentary'
import Link from 'next/link'

function IndustryInsightsPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('industry_insights', {
      section: 'content',
      content_type: 'industry_analysis'
    })
  }, [trackPageView])

  const handleResourceClick = (resource: string) => {
    trackUserAction('resource_clicked', {
      resource_type: resource,
      location: 'industry_insights'
    })
  }

  return (
    <div>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-section {
          background: var(--gradient-bg);
          color: white;
          padding: 150px 0 80px;
          text-align: center;
        }
        
        .hero-section h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Authority Badges */
        .authority-section {
          background: white;
          padding: 3rem 0;
          border-bottom: 1px solid var(--border);
        }
        
        .authority-badges {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }
        
        .badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .badge-icon {
          font-size: 2rem;
        }
        
        .badge-text {
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        /* Main Content */
        .content-section {
          padding: 4rem 0;
          background: var(--background);
        }
        
        /* Topic Categories */
        .topic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .topic-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        
        .topic-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        
        .topic-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .topic-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .topic-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .topic-count {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        /* Expert Commentary Section */
        .expert-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 4rem 0;
          margin: 4rem 0;
          border-radius: 1rem;
        }
        
        .expert-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .expert-header h2 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .expert-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Resources Section */
        .resources-section {
          padding: 4rem 0;
          background: white;
        }
        
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .resource-card {
          text-align: center;
          padding: 2rem;
          background: var(--background);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }
        
        .resource-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
        }
        
        .resource-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .resource-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .resource-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        
        .resource-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }
        
        .resource-link:hover {
          text-decoration: underline;
        }
        
        /* CTA Section */
        .cta-section {
          background: var(--gradient);
          color: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          text-align: center;
          margin: 4rem 0;
        }
        
        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .cta-section p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
        }
        
        .btn-white {
          background: white;
          color: var(--primary);
        }
        
        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-outline:hover {
          background: white;
          color: var(--primary);
        }
        
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }
          
          .topic-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <MinimalNav />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Industry Insights & Analysis</h1>
          <p>
            Expert commentary on insurance technology trends, 
            bridging Insurance Journal news with practical AMS solutions
          </p>
        </div>
      </section>

      {/* Authority Badges */}
      <section className="authority-section">
        <div className="container">
          <div className="authority-badges">
            <div className="badge">
              <span className="badge-icon">📰</span>
              <span className="badge-text">Insurance Journal Partner</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Industry Thought Leader</span>
            </div>
            <div className="badge">
              <span className="badge-icon">📊</span>
              <span className="badge-text">10,000+ Agencies Analyzed</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🔄</span>
              <span className="badge-text">Updated Hourly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section">
        <div className="container">
          {/* Rotating News Commentary */}
          <RotatingNewsCommentary />
          
          {/* Topic Categories */}
          <h2 style={{ fontSize: '2rem', marginTop: '4rem', marginBottom: '2rem', textAlign: 'center' }}>
            Browse by Topic
          </h2>
          
          <div className="topic-grid">
            <Link href="/industry-insights/ai-technology" className="topic-card">
              <div className="topic-icon">🤖</div>
              <h3 className="topic-title">AI & Technology</h3>
              <p className="topic-description">
                How artificial intelligence and emerging tech are reshaping insurance distribution
              </p>
              <span className="topic-count">23 articles this month</span>
            </Link>
            
            <Link href="/industry-insights/customer-experience" className="topic-card">
              <div className="topic-icon">💼</div>
              <h3 className="topic-title">Customer Experience</h3>
              <p className="topic-description">
                Modern approaches to client service and satisfaction in insurance
              </p>
              <span className="topic-count">18 articles this month</span>
            </Link>
            
            <Link href="/industry-insights/ams-technology" className="topic-card">
              <div className="topic-icon">⚡</div>
              <h3 className="topic-title">AMS Technology</h3>
              <p className="topic-description">
                Latest developments in agency management systems and platforms
              </p>
              <span className="topic-count">31 articles this month</span>
            </Link>
            
            <Link href="/industry-insights/digital-transformation" className="topic-card">
              <div className="topic-icon">🚀</div>
              <h3 className="topic-title">Digital Transformation</h3>
              <p className="topic-description">
                How agencies are modernizing operations and workflows
              </p>
              <span className="topic-count">27 articles this month</span>
            </Link>
            
            <Link href="/industry-insights/market-trends" className="topic-card">
              <div className="topic-icon">📈</div>
              <h3 className="topic-title">Market Trends</h3>
              <p className="topic-description">
                Analysis of insurance market dynamics and future predictions
              </p>
              <span className="topic-count">15 articles this month</span>
            </Link>
            
            <Link href="/industry-insights/competitive-analysis" className="topic-card">
              <div className="topic-icon">🎯</div>
              <h3 className="topic-title">Competitive Analysis</h3>
              <p className="topic-description">
                Platform comparisons and competitive intelligence
              </p>
              <span className="topic-count">12 articles this month</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
            Industry Resources
          </h2>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3 className="resource-title">AMS Buyer's Guide</h3>
              <p className="resource-description">
                Complete guide to selecting the right AMS platform
              </p>
              <Link 
                href="/resources/ams-guide" 
                className="resource-link"
                onClick={() => handleResourceClick('ams-guide')}
              >
                Download Guide →
              </Link>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">🎥</div>
              <h3 className="resource-title">Expert Webinars</h3>
              <p className="resource-description">
                Monthly sessions on insurance technology trends
              </p>
              <Link 
                href="/webinars" 
                className="resource-link"
                onClick={() => handleResourceClick('webinars')}
              >
                View Schedule →
              </Link>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">📊</div>
              <h3 className="resource-title">Industry Reports</h3>
              <p className="resource-description">
                Data-driven insights from 10,000+ agencies
              </p>
              <Link 
                href="/resources/reports" 
                className="resource-link"
                onClick={() => handleResourceClick('reports')}
              >
                Access Reports →
              </Link>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">💡</div>
              <h3 className="resource-title">Best Practices</h3>
              <p className="resource-description">
                Proven strategies for agency success
              </p>
              <Link 
                href="/resources/best-practices" 
                className="resource-link"
                onClick={() => handleResourceClick('best-practices')}
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="container">
          <div className="cta-section">
            <h2>Ready to Transform Your Agency?</h2>
            <p>
              See how Quotely's transparent AI platform outperforms traditional AMS solutions
            </p>
            <div className="cta-buttons">
              <Link href="/demo" className="btn btn-white">
                Watch Demo
              </Link>
              <Link href="/get-started" className="btn btn-outline">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function IndustryInsights() {
  return <IndustryInsightsPage />
}