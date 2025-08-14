'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

function VsEZLynxPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('compare_vs_ezlynx', {
      section: 'competitor_comparison',
      competitor: 'ezlynx'
    })
  }, [trackPageView])

  const handleCTAClick = (action: string) => {
    trackUserAction('cta_clicked', {
      button: action,
      location: 'vs_ezlynx_page'
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
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 150px 0 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          animation: rotate 30s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hero-section h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }
        
        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 800px;
          margin: 0 auto 2rem;
          position: relative;
          z-index: 1;
        }
        
        .switch-badge {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          display: inline-block;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          margin-top: 1rem;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        
        /* Comparison Table */
        .comparison-section {
          padding: 5rem 0;
          background: var(--background);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-header h2 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .section-header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        
        .comparison-table th,
        .comparison-table td {
          padding: 1.25rem;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        
        .comparison-table th {
          background: #34495e;
          color: white;
          font-weight: 600;
          text-align: center;
        }
        
        .comparison-table th:first-child {
          text-align: left;
        }
        
        .comparison-table td:not(:first-child) {
          text-align: center;
        }
        
        .comparison-table tbody tr:hover {
          background: #F8FAFC;
        }
        
        .feature-name {
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .check {
          color: #10B981;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .cross {
          color: #EF4444;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .partial {
          color: #F59E0B;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .quotely-col {
          background: linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%);
          position: relative;
        }
        
        .winner-badge {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #10B981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        /* Key Differences */
        .differences-section {
          padding: 5rem 0;
          background: #F8FAFC;
        }
        
        .differences-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 3rem;
          margin-top: 3rem;
        }
        
        .difference-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .difference-card h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .brand-name {
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
        }
        
        .quotely-brand {
          background: #D1FAE5;
          color: #065F46;
        }
        
        .ezlynx-brand {
          background: #FEE2E2;
          color: #991B1B;
        }
        
        .difference-list {
          list-style: none;
          padding: 0;
        }
        
        .difference-list li {
          padding: 0.75rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .difference-list li::before {
          content: '→';
          color: var(--primary);
          font-weight: bold;
          flex-shrink: 0;
        }
        
        /* Pain Points */
        .pain-points-section {
          padding: 5rem 0;
          background: var(--background);
        }
        
        .pain-points-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .pain-point-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: 1rem;
          border-left: 4px solid #EF4444;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .pain-point-card h3 {
          color: #DC2626;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        
        .pain-point-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .solution {
          background: #F0FDF4;
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 3px solid #10B981;
        }
        
        .solution strong {
          color: #059669;
        }
        
        /* Testimonials */
        .testimonials-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .testimonial-quote {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .author-avatar {
          width: 50px;
          height: 50px;
          background: var(--gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }
        
        .author-info h4 {
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .author-info p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        /* Migration Section */
        .migration-section {
          padding: 5rem 0;
          background: var(--background);
        }
        
        .migration-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .step-card {
          text-align: center;
          padding: 2rem;
          background: var(--surface);
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
        }
        
        .step-number {
          width: 50px;
          height: 50px;
          background: var(--gradient);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-weight: 700;
          font-size: 1.5rem;
        }
        
        .step-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .step-card p {
          color: var(--text-secondary);
        }
        
        /* CTA Section */
        .cta-section {
          background: var(--gradient-bg);
          color: white;
          padding: 5rem 2rem;
          text-align: center;
          border-radius: 1rem;
          margin: 5rem 0;
        }
        
        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .cta-section p {
          font-size: 1.2rem;
          opacity: 0.95;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .special-offer {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 1rem;
          margin: 2rem auto;
          max-width: 500px;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .special-offer h3 {
          color: #FFD700;
          margin-bottom: 0.5rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-secondary:hover {
          background: white;
          color: var(--primary);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }
          
          .comparison-table {
            font-size: 0.875rem;
          }
          
          .comparison-table th,
          .comparison-table td {
            padding: 0.75rem;
          }
          
          .differences-grid {
            grid-template-columns: 1fr;
          }
          
          .pain-points-grid,
          .testimonials-grid,
          .migration-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Quotely vs EZLynx</h1>
          <p>
            Why thousands of agents are switching from EZLynx to Quotely's 
            faster, more transparent, and affordable platform
          </p>
          <div className="switch-badge">
            💰 Save $400+/month when you switch
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2>Feature-by-Feature Comparison</h2>
            <p>See why Quotely outperforms EZLynx in every category that matters</p>
          </div>
          
          <div style={{position: 'relative', marginTop: '3rem'}}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="quotely-col" style={{position: 'relative'}}>
                    <span className="winner-badge">WINNER</span>
                    Quotely
                  </th>
                  <th>EZLynx</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Quote Generation Speed</td>
                  <td className="quotely-col"><span className="check">✓</span> 4.2 seconds</td>
                  <td><span className="cross">✗</span> 12+ seconds</td>
                </tr>
                <tr>
                  <td className="feature-name">AI Transparency</td>
                  <td className="quotely-col"><span className="check">✓</span> 100% Explainable</td>
                  <td><span className="cross">✗</span> Black Box</td>
                </tr>
                <tr>
                  <td className="feature-name">Monthly Pricing</td>
                  <td className="quotely-col"><span className="check">✓</span> From $679</td>
                  <td><span className="cross">✗</span> From $1,099</td>
                </tr>
                <tr>
                  <td className="feature-name">Setup Time</td>
                  <td className="quotely-col"><span className="check">✓</span> < 2 minutes</td>
                  <td><span className="cross">✗</span> 2-4 weeks</td>
                </tr>
                <tr>
                  <td className="feature-name">Multi-Carrier Comparison</td>
                  <td className="quotely-col"><span className="check">✓</span> 8.7 seconds</td>
                  <td><span className="partial">⚠</span> 25+ seconds</td>
                </tr>
                <tr>
                  <td className="feature-name">Mobile App</td>
                  <td className="quotely-col"><span className="check">✓</span> Full Featured</td>
                  <td><span className="partial">⚠</span> Limited</td>
                </tr>
                <tr>
                  <td className="feature-name">API Access</td>
                  <td className="quotely-col"><span className="check">✓</span> Open API</td>
                  <td><span className="partial">⚠</span> Restricted</td>
                </tr>
                <tr>
                  <td className="feature-name">Customer Support</td>
                  <td className="quotely-col"><span className="check">✓</span> 24/7 Live Chat</td>
                  <td><span className="partial">⚠</span> Business Hours</td>
                </tr>
                <tr>
                  <td className="feature-name">Data Migration</td>
                  <td className="quotely-col"><span className="check">✓</span> Free & Assisted</td>
                  <td><span className="cross">✗</span> Extra Cost</td>
                </tr>
                <tr>
                  <td className="feature-name">Contract Requirements</td>
                  <td className="quotely-col"><span className="check">✓</span> Month-to-Month</td>
                  <td><span className="cross">✗</span> Annual Lock-in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="differences-section">
        <div className="container">
          <div className="section-header">
            <h2>The Real Differences That Matter</h2>
            <p>Beyond features - how Quotely transforms your daily workflow</p>
          </div>
          
          <div className="differences-grid">
            <div className="difference-card">
              <h3>
                <span className="brand-name quotely-brand">Quotely</span>
              </h3>
              <ul className="difference-list">
                <li>See exactly how every quote is calculated with full AI transparency</li>
                <li>Generate quotes 60% faster with intelligent data prefill</li>
                <li>Pay only for what you use with flexible, transparent pricing</li>
                <li>Get started in minutes, not weeks - no IT team required</li>
                <li>Access your full data anytime through our open API</li>
                <li>Work seamlessly on any device with true mobile parity</li>
              </ul>
            </div>
            
            <div className="difference-card">
              <h3>
                <span className="brand-name ezlynx-brand">EZLynx</span>
              </h3>
              <ul className="difference-list">
                <li>Black box algorithms with no visibility into calculations</li>
                <li>Slower quote generation with manual data entry</li>
                <li>Hidden fees and expensive add-ons increase costs</li>
                <li>Complex setup requiring weeks of configuration</li>
                <li>Limited API access restricts your data freedom</li>
                <li>Desktop-focused with limited mobile functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common EZLynx Pain Points */}
      <section className="pain-points-section">
        <div className="container">
          <div className="section-header">
            <h2>Common EZLynx Frustrations We Solve</h2>
            <p>Based on feedback from hundreds of agents who made the switch</p>
          </div>
          
          <div className="pain-points-grid">
            <div className="pain-point-card">
              <h3>⏱️ "Everything takes forever"</h3>
              <p>
                EZLynx users report spending 12+ seconds per quote, with multi-carrier 
                comparisons taking even longer.
              </p>
              <div className="solution">
                <strong>Quotely Solution:</strong> 4.2 second quotes, 8.7 second multi-carrier 
                comparisons. Save 3+ hours every day.
              </div>
            </div>
            
            <div className="pain-point-card">
              <h3>🔒 "We can't see how it works"</h3>
              <p>
                EZLynx's black box approach makes it impossible to explain calculations 
                to clients or verify accuracy.
              </p>
              <div className="solution">
                <strong>Quotely Solution:</strong> 100% transparent AI shows you exactly 
                how every decision is made.
              </div>
            </div>
            
            <div className="pain-point-card">
              <h3>💸 "Hidden costs everywhere"</h3>
              <p>
                What starts at $1,099/month quickly balloons with add-ons, setup fees, 
                and surprise charges.
              </p>
              <div className="solution">
                <strong>Quotely Solution:</strong> Transparent pricing starting at $679/month. 
                No hidden fees, ever.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Agents Who Made the Switch</h2>
            <p>Real stories from agencies that left EZLynx for Quotely</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "We cut our quote time by 65% after switching from EZLynx. The transparency 
                feature alone has helped us close 30% more deals because clients trust us more."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JM</div>
                <div className="author-info">
                  <h4>Jessica Martinez</h4>
                  <p>Premier Insurance Group • 12 agents</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "EZLynx was costing us $1,400/month with all the add-ons. Quotely gives us 
                more features for $929. That's $5,600 saved annually."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RT</div>
                <div className="author-info">
                  <h4>Robert Thompson</h4>
                  <p>Thompson & Associates • 8 agents</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "The migration from EZLynx was painless. Quotely handled everything, and we 
                were up and running in 2 days instead of the weeks EZLynx took to set up."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SK</div>
                <div className="author-info">
                  <h4>Sarah Kim</h4>
                  <p>Secure Shield Insurance • 15 agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="migration-section">
        <div className="container">
          <div className="section-header">
            <h2>Switching is Simple</h2>
            <p>Our white-glove migration service makes the transition seamless</p>
          </div>
          
          <div className="migration-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Free Consultation</h3>
              <p>
                We analyze your EZLynx setup and create a custom migration plan
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Data Migration</h3>
              <p>
                We handle all data transfer, including clients, policies, and documents
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Team Training</h3>
              <p>
                Personalized onboarding for your entire team with ongoing support
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Go Live</h3>
              <p>
                Start saving time and money immediately with no downtime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="cta-section">
          <h2>Ready to Leave EZLynx Behind?</h2>
          <p>
            Join thousands of agents who've already made the switch to faster, 
            more transparent, and affordable insurance technology.
          </p>
          
          <div className="special-offer">
            <h3>🎁 EZLynx Switcher Special</h3>
            <p>
              Get 3 months free when you switch from EZLynx. 
              Plus free data migration and dedicated onboarding support.
            </p>
          </div>
          
          <div className="cta-buttons">
            <Link 
              href="/get-started" 
              className="btn btn-primary"
              onClick={() => handleCTAClick('switch_from_ezlynx')}
            >
              Switch to Quotely →
            </Link>
            <Link 
              href="/demo" 
              className="btn btn-secondary"
              onClick={() => handleCTAClick('see_demo')}
            >
              See Live Comparison
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function VsEZLynx() {
  return <VsEZLynxPage />
}