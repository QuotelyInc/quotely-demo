'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

function AboutPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('about', {
      section: 'about',
      content_type: 'company_info'
    })
  }, [trackPageView])

  const handleContactClick = () => {
    trackUserAction('contact_clicked', {
      location: 'about_page'
    })
  }

  const handleCareersClick = () => {
    trackUserAction('careers_clicked', {
      location: 'about_page'
    })
  }

  const handleDemoClick = () => {
    trackUserAction('demo_clicked', {
      location: 'about_page',
      source: 'about_cta'
    })
  }

  return (
    <div>
      <style jsx>{`
        :root {
          --primary: #0057FF;
          --primary-dark: #0041CC;
          --secondary: #2E2E2E;
          --accent: #00C851;
          --warning: #FF6B35;
          --surface: #FFFFFF;
          --background: #F8FAFC;
          --text-primary: #1F2937;
          --text-secondary: #6B7280;
          --border: #E5E7EB;
          --gradient: linear-gradient(135deg, #0057FF 0%, #0041CC 100%);
          --gradient-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #4f46e5;
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .nav-links a:hover,
        .nav-links a.active {
          color: #4f46e5;
        }
        
        .nav-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: var(--gradient);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 87, 255, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 87, 255, 0.5);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }
        
        /* Hero Section */
        .about-hero {
          background: var(--gradient-bg);
          padding: 150px 0 80px;
          text-align: center;
          color: white;
        }
        
        .about-hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .about-hero p {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Mission Section */
        .mission-section {
          padding: 4rem 2rem;
          background: white;
        }
        
        .mission-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .mission-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .mission-content p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        /* Story Section */
        .story-section {
          padding: 4rem 2rem;
          background: var(--background);
        }
        
        .story-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .story-content h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .story-content p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .story-image {
          width: 100%;
          height: 400px;
          background: var(--gradient);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 4rem;
        }
        
        /* Values Section */
        .values-section {
          padding: 4rem 2rem;
          background: white;
        }
        
        .values-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .values-container h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .value-card {
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background: var(--background);
          transition: transform 0.3s ease;
        }
        
        .value-card:hover {
          transform: translateY(-5px);
        }
        
        .value-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          background: var(--gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        
        .value-card h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .value-card p {
          color: var(--text-secondary);
        }
        
        /* Team Section */
        .team-section {
          padding: 4rem 2rem;
          background: var(--background);
        }
        
        .team-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .team-container h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .team-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
        }
        
        .team-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          background: var(--gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .team-card h3 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .team-card .role {
          color: var(--primary);
          font-weight: 500;
          margin-bottom: 1rem;
        }
        
        .team-card p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* Stats Section */
        .stats-section {
          padding: 4rem 2rem;
          background: white;
        }
        
        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .stat-card {
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background: var(--background);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* CTA Section */
        .cta-section {
          padding: 4rem 2rem;
          background: var(--gradient);
          color: white;
          text-align: center;
        }
        
        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .cta-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* Footer */
        .footer {
          background: #1f2937;
          color: white;
          padding: 50px 0;
        }
        
        .footer-content {
          text-align: center;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .about-hero h1 {
            font-size: 2rem;
          }
          
          .story-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .values-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <Navigation />

      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>Transforming Insurance Technology</h1>
          <p>We're building the future of insurance platforms with AI-powered intelligence, seamless integrations, and industry-leading performance.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>To revolutionize the insurance industry by providing independent agents with cutting-edge technology that's faster, smarter, and more intuitive than anything that came before.</p>
          <p>We believe every insurance agency deserves access to enterprise-level technology without the enterprise-level complexity or cost.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-grid">
          <div className="story-content">
            <h2>The Quotely Story</h2>
            <p>Founded by insurance industry veterans who were frustrated with outdated, expensive platforms that slowed down agencies instead of speeding them up.</p>
            <p>After years of dealing with systems like EZLynx and Applied Systems, we knew there had to be a better way. So we built it.</p>
            <p>Today, Quotely powers over 1,000 independent insurance agencies across the United States, helping them quote faster, close more deals, and grow their businesses.</p>
          </div>
          <div className="story-image">
            🚀
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed First</h3>
              <p>Every feature we build prioritizes speed and efficiency. If it doesn't make you faster, we don't ship it.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Transparency</h3>
              <p>No hidden fees, no surprise costs, no complex contracts. What you see is what you pay.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>We leverage artificial intelligence to make insurance quoting smarter, not just faster.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🔧</div>
              <h3>Built for Agents</h3>
              <p>Every decision is made with independent insurance agents in mind. You know your business best.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">📈</div>
              <h3>Growth Focused</h3>
              <p>Our platform isn't just about managing existing business - it's about helping you win more.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Security & Compliance</h3>
              <p>Enterprise-grade security and full compliance with all insurance industry regulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2>Leadership Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">MK</div>
              <h3>Michael Kim</h3>
              <div className="role">CEO & Founder</div>
              <p>Former VP of Technology at Applied Systems. 15 years building insurance software.</p>
            </div>
            
            <div className="team-card">
              <div className="team-avatar">SC</div>
              <h3>Sarah Chen</h3>
              <div className="role">CTO</div>
              <p>Ex-Google AI researcher. Led machine learning initiatives at three successful fintech startups.</p>
            </div>
            
            <div className="team-card">
              <div className="team-avatar">DR</div>
              <h3>David Rodriguez</h3>
              <div className="role">VP of Product</div>
              <p>Former Head of Product at EZLynx. Deep expertise in insurance agent workflows.</p>
            </div>
            
            <div className="team-card">
              <div className="team-avatar">JW</div>
              <h3>Jennifer Walsh</h3>
              <div className="role">VP of Sales</div>
              <p>20-year veteran of insurance sales. Built and scaled teams at Vertafore and HawkSoft.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">1,000+</div>
            <div className="stat-label">Active Agencies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2M+</div>
            <div className="stat-label">Quotes Generated</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Carrier Integrations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1.8s</div>
            <div className="stat-label">Avg Quote Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">94%</div>
            <div className="stat-label">Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Join Our Mission?</h2>
          <p className="cta-subtitle">See why 1,000+ agencies trust Quotely to power their business growth.</p>
          <div className="cta-buttons">
            <button onClick={handleDemoClick} className="btn btn-primary" style={{background: 'white', color: 'var(--primary)'}}>
              🚀 Schedule Demo
            </button>
            <button onClick={handleCareersClick} className="btn btn-secondary">
              💼 View Careers
            </button>
            <button onClick={handleContactClick} className="btn btn-secondary">
              📞 Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function About() {
  return <AboutPage />
}