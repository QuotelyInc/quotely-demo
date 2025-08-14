'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useOTTOTracking } from '@/components/OTTOProvider'
import { AMSContentMap, getArticlesByTier, getChildArticles } from '@/lib/ams-content-map'

export default function AMSSitemap() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  
  useEffect(() => {
    trackPageView('ams_sitemap', {
      section: 'navigation',
      content_type: 'sitemap'
    })
  }, [trackPageView])

  const handleArticleClick = (articleId: string, tier: string) => {
    trackUserAction('article_click', {
      article_id: articleId,
      article_tier: tier,
      source: 'sitemap'
    })
  }

  const hub = getArticlesByTier('hub')[0]
  const pillars = getArticlesByTier('pillar')

  return (
    <div>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--background);
          color: var(--text-primary);
        }
        
        .hero-section {
          background: var(--gradient-bg);
          color: white;
          padding: 120px 0 60px;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        
        .hero-description {
          font-size: 1.25rem;
          opacity: 0.95;
          max-width: 800px;
        }
        
        .stats-bar {
          display: flex;
          gap: 3rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        
        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 20px;
        }
        
        .tier-section {
          margin-bottom: 4rem;
        }
        
        .tier-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .tier-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--gradient);
          color: white;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .tier-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .tier-description {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }
        
        /* Hub Card */
        .hub-card {
          background: white;
          border: 3px solid var(--primary);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .hub-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .hub-card h2 {
          font-size: 1.75rem;
          color: var(--primary);
          margin-bottom: 0.75rem;
        }
        
        .hub-card p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        
        .hub-meta {
          display: flex;
          gap: 2rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* Pillar Grid */
        .pillar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .pillar-card {
          background: white;
          border: 2px solid var(--border);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .pillar-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        .pillar-number {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .pillar-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .pillar-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        
        .pillar-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        
        /* Subtopic List */
        .subtopic-list {
          background: var(--background);
          border-radius: 0.5rem;
          padding: 1rem;
          margin-top: 1rem;
        }
        
        .subtopic-item {
          display: block;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          background: white;
          border-radius: 0.5rem;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s ease;
          border: 1px solid var(--border);
        }
        
        .subtopic-item:hover {
          background: var(--primary);
          color: white;
          transform: translateX(4px);
        }
        
        .subtopic-title {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .subtopic-meta {
          font-size: 0.75rem;
          opacity: 0.8;
        }
        
        /* Progress Tracker */
        .progress-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 3rem;
          border-radius: 1rem;
          margin-bottom: 3rem;
        }
        
        .progress-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .progress-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }
        
        .progress-item {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .progress-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        
        .progress-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        /* CTA Section */
        .cta-section {
          background: var(--gradient);
          color: white;
          padding: 3rem;
          border-radius: 1rem;
          text-align: center;
          margin-top: 3rem;
        }
        
        .cta-title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .cta-description {
          font-size: 1.125rem;
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
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .btn-white {
          background: white;
          color: var(--primary);
        }
        
        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          
          .pillar-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-bar {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>AMS Content Library & Resource Center</h1>
          <p className="hero-description">
            Your complete guide to Agency Management Systems. Explore our comprehensive library of 
            49 expert articles covering every aspect of AMS selection, implementation, and optimization.
          </p>
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-value">49</span>
              <span className="stat-label">Expert Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100K+</span>
              <span className="stat-label">Total Words</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1,000+</span>
              <span className="stat-label">Implementations Analyzed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">8hrs</span>
              <span className="stat-label">Reading Time</span>
            </div>
          </div>
        </div>
      </section>

      <div className="content-wrapper">
        {/* Progress Tracker */}
        <div className="progress-section">
          <h2 className="progress-title">📊 AMS Content Production Progress</h2>
          <div className="progress-grid">
            <div className="progress-item">
              <div className="progress-value">2</div>
              <div className="progress-label">Articles Published</div>
            </div>
            <div className="progress-item">
              <div className="progress-value">8,000</div>
              <div className="progress-label">Words Written</div>
            </div>
            <div className="progress-item">
              <div className="progress-value">47</div>
              <div className="progress-label">Articles Remaining</div>
            </div>
            <div className="progress-item">
              <div className="progress-value">4%</div>
              <div className="progress-label">Completion</div>
            </div>
          </div>
        </div>

        {/* Tier 1: Hub */}
        <div className="tier-section">
          <div className="tier-header">
            <span className="tier-badge">TIER 1</span>
            <h2 className="tier-title">Core Hub Page</h2>
          </div>
          <p className="tier-description">
            The foundational guide that connects all AMS content. Start here for a comprehensive overview.
          </p>
          
          <Link 
            href={`/${hub.slug}`}
            onClick={() => handleArticleClick(hub.id, 'hub')}
          >
            <div className="hub-card">
              <h2>{hub.title}</h2>
              <p>{hub.metaDescription}</p>
              <div className="hub-meta">
                <span>📚 {hub.wordCount.toLocaleString()} words</span>
                <span>⏱️ {hub.readTime} min read</span>
                <span>✅ Published</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Tier 2: Pillars */}
        <div className="tier-section">
          <div className="tier-header">
            <span className="tier-badge">TIER 2</span>
            <h2 className="tier-title">Pillar Pages</h2>
          </div>
          <p className="tier-description">
            In-depth guides covering major AMS topics. Each pillar explores a critical aspect of agency management systems.
          </p>
          
          <div className="pillar-grid">
            {pillars.map((pillar, index) => {
              const subtopics = getChildArticles(pillar.id)
              const isPublished = index < 2 // First 2 pillars are published
              
              return (
                <div key={pillar.id} className="pillar-card">
                  <span className="pillar-number">{index + 1}</span>
                  <Link 
                    href={`/${pillar.slug}`}
                    onClick={() => handleArticleClick(pillar.id, 'pillar')}
                  >
                    <h3 className="pillar-title">{pillar.title}</h3>
                  </Link>
                  <p className="pillar-description">{pillar.metaDescription}</p>
                  <div className="pillar-meta">
                    <span>📚 {pillar.wordCount.toLocaleString()} words</span>
                    <span>⏱️ {pillar.readTime} min</span>
                    <span>{isPublished ? '✅ Published' : '🔄 Coming Soon'}</span>
                  </div>
                  
                  {subtopics.length > 0 && (
                    <div className="subtopic-list">
                      <h4 style={{ fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                        Related Articles ({subtopics.length})
                      </h4>
                      {subtopics.map(subtopic => (
                        <Link 
                          key={subtopic.id}
                          href={`/${subtopic.slug}`}
                          className="subtopic-item"
                          onClick={() => handleArticleClick(subtopic.id, 'subtopic')}
                        >
                          <div className="subtopic-title">{subtopic.title}</div>
                          <div className="subtopic-meta">
                            {subtopic.wordCount} words • {subtopic.readTime} min read
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Transform Your Agency?</h2>
          <p className="cta-description">
            See why leading agencies choose Quotely's transparent AI-powered AMS platform
          </p>
          <div className="cta-buttons">
            <Link href="/demo" className="btn btn-white">
              Watch Demo
            </Link>
            <Link href="/get-started" className="btn btn-white">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}