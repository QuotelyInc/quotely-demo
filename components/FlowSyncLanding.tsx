'use client'

import { useState, useEffect } from 'react'
import { useOTTOTracking } from './OTTOProvider'

export default function FlowSyncLanding() {
  const { trackUserAction } = useOTTOTracking()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Loading screen removal
    setTimeout(() => {
      const loader = document.querySelector('.loading')
      if (loader) {
        loader.classList.add('fade-out')
        setTimeout(() => loader.remove(), 500)
      }
    }, 1000)

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const handleCTAClick = (action: string) => {
    trackUserAction('cta_clicked', {
      action: action,
      location: 'flowsync_landing'
    })
  }

  return (
    <>
      <style jsx>{`
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0A0B0D;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease;
        }

        .loading.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #5B3FFF;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.5rem 5%;
          background: rgba(10, 11, 13, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        nav.scrolled {
          padding: 1rem 5%;
          background: rgba(10, 11, 13, 0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #5B3FFF 0%, #FF3F7E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          color: #9CA3AF;
          text-decoration: none;
          transition: color 0.3s;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-links a:hover {
          color: white;
        }

        .btn {
          padding: 0.75rem 1.75rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
          border: none;
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #5B3FFF 0%, #FF3F7E 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(91, 63, 255, 0.3);
        }

        .btn-outline {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          background: transparent;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
        }

        .mobile-menu span {
          width: 25px;
          height: 2px;
          background: white;
          transition: all 0.3s;
        }

        .mobile-menu.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 6rem 5% 4rem;
          overflow: hidden;
          background: #0A0B0D;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
          background: 
            radial-gradient(circle at 20% 50%, rgba(91, 63, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 63, 126, 0.3) 0%, transparent 50%);
          animation: pulse 10s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #9CA3AF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 0.8s ease;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #9CA3AF;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dashboard-preview {
          margin-top: 4rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: fadeInUp 0.8s ease 0.6s both;
          position: relative;
          overflow: hidden;
        }

        .dashboard-preview::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .dashboard-img {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #1A1B1F 0%, #0A0B0D 100%);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }

        .features {
          padding: 6rem 5%;
          background: linear-gradient(180deg, #0A0B0D 0%, #1A1B1F 100%);
        }

        .features-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .features h2 {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #5B3FFF 0%, #FF3F7E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .features-subtitle {
          text-align: center;
          color: #9CA3AF;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
        }

        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
          animation: fadeInUp 0.8s ease;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(135deg, #5B3FFF 0%, #FF3F7E 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #5B3FFF 0%, #FF3F7E 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .feature-card p {
          color: #9CA3AF;
          line-height: 1.8;
        }

        .integrations {
          padding: 6rem 5%;
          background: #0A0B0D;
          position: relative;
          overflow: hidden;
        }

        .integrations::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(91, 63, 255, 0.1) 0%, transparent 70%);
          transform: translate(-50%, -50%);
        }

        .integrations-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .integrations h2 {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 3rem;
          color: white;
        }

        .integration-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .integration-logo {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;
          color: #9CA3AF;
        }

        .integration-logo:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .cta {
          padding: 6rem 5%;
          background: linear-gradient(135deg, #4730D3 0%, #FF3F7E 100%);
          text-align: center;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta h2 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          color: white;
        }

        .cta p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          color: white;
        }

        .cta .btn {
          background: white;
          color: #5B3FFF;
          font-size: 1.1rem;
          padding: 1rem 2.5rem;
        }

        .cta .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        footer {
          padding: 3rem 5%;
          background: #1A1B1F;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-links a {
          color: #9CA3AF;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: white;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #0A0B0D;
            flex-direction: column;
            padding: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-links.mobile-open {
            display: flex;
          }

          .mobile-menu {
            display: flex;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
          }

          .hero-cta .btn {
            width: 100%;
            max-width: 300px;
          }

          .features h2, .integrations h2, .cta h2 {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .footer-container {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      {/* Loading Screen */}
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>

      {/* Navigation */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <div className="logo">Quotely</div>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#features">Features</a></li>
            <li><a href="#integrations">Carriers</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="#" className="btn btn-outline">Sign In</a></li>
            <li><a href="/get-started" className="btn btn-primary" onClick={() => handleCTAClick('nav_get_started')}>Get Started</a></li>
          </ul>
          <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1>Everything Your Agency Needs in One Platform</h1>
          <p className="hero-subtitle">
            Replace EZLynx, Applied, and legacy systems with Quotely. Instant quotes, AI recommendations, 
            and multi-carrier integration - all seamlessly connected.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => handleCTAClick('hero_start_trial')}>
              Start Free Trial
            </button>
            <button className="btn btn-outline" onClick={() => handleCTAClick('hero_watch_demo')}>
              Watch Demo
            </button>
          </div>
          
          <div className="dashboard-preview">
            <div className="dashboard-img"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <h2>Powerful Features for Modern Agencies</h2>
          <p className="features-subtitle">
            Everything you need to quote faster, close more deals, and grow your agency.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>1.8 Min Quotes</h3>
              <p>Generate accurate quotes in under 2 minutes with our AI-powered engine. 60% faster than legacy platforms.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Recommendations</h3>
              <p>Get intelligent coverage suggestions based on real-time risk analysis and historical data patterns.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile-First Design</h3>
              <p>Quote clients anywhere with full functionality on any device. No more being tied to your desk.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>50+ Carriers</h3>
              <p>Connect with top carriers instantly. Real-time rates, automated submissions, and instant binding.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Analytics</h3>
              <p>Get detailed insights into quote-to-bind ratios, agent performance, and revenue forecasting.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Enterprise Security</h3>
              <p>Bank-level security with SSO, 2FA, and SOC 2 compliance. Your data is always protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations" id="integrations">
        <div className="integrations-container">
          <h2>Seamlessly Integrate with Top Carriers</h2>
          
          <div className="integration-logos">
            <div className="integration-logo">Progressive</div>
            <div className="integration-logo">State Farm</div>
            <div className="integration-logo">Allstate</div>
            <div className="integration-logo">Liberty</div>
            <div className="integration-logo">Farmers</div>
            <div className="integration-logo">Nationwide</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ready to Transform Your Agency?</h2>
          <p>Join 1000+ agencies already using Quotely to quote faster and close more deals.</p>
          <button className="btn" onClick={() => handleCTAClick('footer_get_started')}>
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="logo">Quotely</div>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
          <p style={{color: '#6B7280'}}>© 2024 Quotely. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}