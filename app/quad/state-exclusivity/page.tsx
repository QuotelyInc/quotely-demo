'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

function StateExclusivityPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('quad_state_exclusivity', {
      section: 'state_exclusivity',
      content_type: 'exclusive_program'
    })
  }, [trackPageView])

  const handleCTAClick = (action: string, location: string) => {
    trackUserAction('cta_clicked', {
      button: action,
      location: location,
      program: 'state_exclusivity'
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
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-slide {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          text-align: center;
          padding: 150px 0 100px;
          position: relative;
        }
        
        .hero-slide::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.05" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
          background-size: cover;
          opacity: 0.3;
        }
        
        .hero-slide h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }
        
        .hero-slide h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          opacity: 0.95;
          position: relative;
          z-index: 1;
        }
        
        .hero-slide .subtitle {
          font-size: 1.4rem;
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto 3rem;
          position: relative;
          z-index: 1;
        }
        
        /* Section Styles */
        .section {
          padding: 5rem 0;
          background: var(--background);
        }
        
        .section-alt {
          background: #F8FAFC;
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
        
        .section-header h3 {
          font-size: 1.8rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        
        .section-header p {
          font-size: 1.3rem;
          color: var(--text-secondary);
        }
        
        /* Urgency Box */
        .urgency-box {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          padding: 2rem;
          border-radius: 1rem;
          margin: 3rem auto;
          text-align: center;
          max-width: 800px;
        }
        
        .urgency-box.critical {
          background: linear-gradient(135deg, #FFE5E5 0%, #FFD6D6 100%);
          border: 3px solid #EF4444;
        }
        
        .urgency-box h3 {
          color: #DC2626;
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }
        
        .urgency-box p {
          font-size: 1.2rem;
          color: #7F1D1D;
        }
        
        .urgency-box.hero-urgent {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 215, 0, 0.5);
          color: white;
        }
        
        .urgency-box.hero-urgent h3 {
          color: #FFD700;
        }
        
        .urgency-box.hero-urgent p {
          color: white;
        }
        
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .stat-box {
          text-align: center;
          padding: 2rem;
          background: var(--surface);
          border-radius: 1rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        
        .stat-box p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        
        /* Pricing Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
          margin: 3rem 0;
        }
        
        .pricing-card {
          background: var(--surface);
          padding: 3rem;
          border-radius: 1rem;
          border: 3px solid var(--border);
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .exclusive-card {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          border-color: #10B981;
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.3);
        }
        
        .regular-card {
          opacity: 0.7;
        }
        
        .pricing-card h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }
        
        .exclusive-card h3 {
          color: white;
        }
        
        .price {
          font-size: 3rem;
          font-weight: 700;
          margin: 1.5rem 0;
        }
        
        .exclusive-card .price {
          color: white;
        }
        
        .price-small {
          font-size: 1.2rem;
          opacity: 0.8;
        }
        
        .feature-list {
          list-style: none;
          margin: 2rem 0;
          padding: 0;
          text-align: left;
        }
        
        .feature-list li {
          padding: 0.75rem 0;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .feature-list li:before {
          content: "✓";
          color: #10B981;
          font-weight: bold;
          font-size: 1.25rem;
        }
        
        .exclusive-card .feature-list li:before {
          color: white;
        }
        
        .crossed-out {
          text-decoration: line-through;
          opacity: 0.5;
        }
        
        /* Comparison Table */
        .comparison-table {
          width: 100%;
          margin: 3rem 0;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        
        .comparison-table th,
        .comparison-table td {
          padding: 1.25rem;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        
        .comparison-table th {
          background: #34495e;
          color: white;
          font-weight: 600;
        }
        
        .exclusive-row {
          background: #D1FAE5;
          font-weight: 600;
        }
        
        .highlight {
          color: #10B981;
          font-weight: 700;
        }
        
        /* Warning Box */
        .warning {
          background: #FEF3C7;
          border: 2px solid #F59E0B;
          padding: 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
        }
        
        .warning h3 {
          color: #92400E;
          margin-bottom: 1rem;
        }
        
        .warning p {
          color: #78350F;
          font-size: 1.1rem;
        }
        
        /* Step Boxes */
        .step-boxes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .step-box {
          background: var(--surface);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          border-top: 4px solid var(--primary);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        
        .step-number {
          background: var(--primary);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          margin: 0 auto 1.5rem;
        }
        
        .step-box h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .step-box p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        /* ROI Section */
        .roi-section {
          background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
          padding: 3rem;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .roi-section h3 {
          text-align: center;
          color: #065F46;
          margin-bottom: 2rem;
          font-size: 2rem;
        }
        
        /* State Status */
        .state-status {
          text-align: center;
          margin: 3rem 0;
        }
        
        .state-status h3 {
          color: #DC2626;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .state-status p {
          font-size: 1.3rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }
        
        /* CTA Button */
        .cta-button {
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          color: white;
          padding: 1.5rem 3rem;
          border: none;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
        }
        
        .cta-button.primary {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }
        
        .cta-button.primary:hover {
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }
        
        /* CTA Section */
        .cta-section {
          background: var(--gradient-bg);
          color: white;
          padding: 5rem 2rem;
          text-align: center;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .cta-section h2 {
          color: white;
          margin-bottom: 1.5rem;
        }
        
        .cta-section p {
          font-size: 1.2rem;
          opacity: 0.95;
          margin-bottom: 2rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-slide h1 {
            font-size: 3rem;
          }
          
          .pricing-grid,
          .stats-grid,
          .step-boxes {
            grid-template-columns: 1fr;
          }
          
          .exclusive-card {
            transform: none;
          }
          
          .comparison-table {
            font-size: 0.875rem;
          }
          
          .comparison-table th,
          .comparison-table td {
            padding: 0.75rem;
          }
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="hero-slide">
        <div className="container">
          <h1>QUAD State Exclusivity</h1>
          <h2>Secure Your Territory. Lock Your Advantage.</h2>
          <p className="subtitle">
            The only way to guarantee lifetime discount pricing for your agents in your state
          </p>
          <div className="urgency-box hero-urgent">
            <h3>⚠️ ONE AGGREGATOR PER STATE</h3>
            <p>Once your state is claimed, no other aggregator will receive this pricing. Ever.</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>The Problem You Face</h2>
          </div>
          
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">$749</div>
              <p>Monthly cost competitors will pay</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">0</div>
              <p>Control over pricing in your market</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">100%</div>
              <p>Chance competitors get same access</p>
            </div>
          </div>
          
          <p style={{fontSize: '1.3rem', textAlign: 'center', marginTop: '3rem'}}>
            <strong>Every other aggregator in your state will have the same QUAD access you do.</strong><br />
            Unless you secure exclusive discount pricing today.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Your Exclusive Solution</h2>
          </div>
          
          <div className="pricing-grid">
            <div className="pricing-card exclusive-card">
              <h3>YOUR EXCLUSIVE RATE</h3>
              <div className="price">$579<span className="price-small">/month</span></div>
              <p style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>
                <strong>$1,500 buy-in per agent</strong>
              </p>
              <ul className="feature-list">
                <li>Lifetime locked pricing</li>
                <li>All Level 1.0 QUAD features</li>
                <li>No markup, ever</li>
                <li>All future agents get same rate</li>
                <li>State exclusivity protection</li>
              </ul>
            </div>
            
            <div className="pricing-card regular-card">
              <h3>EVERYONE ELSE PAYS</h3>
              <div className="price">$749<span className="price-small">/month</span></div>
              <p style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>
                <strong>No buy-in discount</strong>
              </p>
              <ul className="feature-list">
                <li className="crossed-out">Locked pricing</li>
                <li>Same features</li>
                <li>Subject to price increases</li>
                <li className="crossed-out">Volume discounts</li>
                <li className="crossed-out">Exclusivity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Breakdown */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Your State Exclusivity Investment</h2>
          </div>
          
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Cost</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="exclusive-row">
                <td><strong>State Exclusivity Fee</strong></td>
                <td><strong>$7,500</strong></td>
                <td>Locks out all competitors forever</td>
              </tr>
              <tr>
                <td>Minimum 25 Agents</td>
                <td>25 × $1,500 = $37,500</td>
                <td>$170/month savings per agent vs retail</td>
              </tr>
              <tr className="exclusive-row">
                <td><strong>Total Investment</strong></td>
                <td><strong>$45,000</strong></td>
                <td><strong>Lifetime competitive advantage</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div className="warning">
            <h3>🔒 What This Guarantees:</h3>
            <p>
              <strong>Every agent you recruit in the future gets the $579 rate.</strong> No other 
              aggregator in your state can offer better pricing. This becomes your permanent recruiting 
              and retention advantage.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="roi-section">
            <h3>Your Return on Investment</h3>
            <p style={{textAlign: 'center', fontSize: '1.3rem', marginBottom: '2rem'}}>
              Monthly Savings Per Agent: <strong>$170</strong>
            </p>
            
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">25</div>
                <p>Agents<br /><span className="highlight">$4,250/month saved</span></p>
              </div>
              <div className="stat-box">
                <div className="stat-number">50</div>
                <p>Agents<br /><span className="highlight">$8,500/month saved</span></p>
              </div>
              <div className="stat-box">
                <div className="stat-number">100</div>
                <p>Agents<br /><span className="highlight">$17,000/month saved</span></p>
              </div>
            </div>
            
            <p style={{textAlign: 'center', fontSize: '1.3rem', marginTop: '2rem'}}>
              <strong>Your $45,000 investment pays for itself in just 10.6 months</strong><br />
              <span style={{color: '#059669'}}>(Based on 25 agents × $170 monthly savings)</span>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How State Exclusivity Works</h2>
          </div>
          
          <div className="step-boxes">
            <div className="step-box">
              <div className="step-number">1</div>
              <h3>Secure Your State</h3>
              <p>Pay $7,500 exclusivity fee + bring 25 agents minimum</p>
            </div>
            <div className="step-box">
              <div className="step-number">2</div>
              <h3>Lock Lifetime Rates</h3>
              <p>All your agents (current and future) get $579/month forever</p>
            </div>
            <div className="step-box">
              <div className="step-number">3</div>
              <h3>Dominate Your Market</h3>
              <p>Competitors pay $749+ with no volume discounts available</p>
            </div>
          </div>
          
          <div className="urgency-box critical">
            <h3>🚨 CRITICAL: Territory Protection</h3>
            <p>
              Once you claim your state, we will NOT offer discount pricing to any other aggregator 
              in your territory. This pricing advantage becomes your permanent competitive moat.
            </p>
          </div>
        </div>
      </section>

      {/* Why Act Now */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Why You Must Act Now</h2>
          </div>
          
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <ul className="feature-list" style={{fontSize: '1.3rem'}}>
              <li><strong>First Come, First Served:</strong> Only one aggregator per state gets this deal</li>
              <li><strong>No Exceptions:</strong> Once claimed, your competitors are permanently locked out</li>
              <li><strong>Price Increases Coming:</strong> Retail rates will rise, but your rate stays locked</li>
              <li><strong>Recruiting Advantage:</strong> Offer agents the lowest QUAD pricing in your state</li>
              <li><strong>Revenue Protection:</strong> Prevent competitors from undercutting your technology offering</li>
            </ul>
          </div>
          
          <div className="state-status">
            <h3>Your State Status: AVAILABLE</h3>
            <p>This window closes the moment another aggregator in your state claims it.</p>
            
            <button 
              onClick={() => {
                handleCTAClick('secure_state_now', 'urgency_section')
                window.location.href = 'mailto:sales@tryquotely.com?subject=State Exclusivity - [YOUR STATE]'
              }}
              className="cta-button"
            >
              SECURE MY STATE NOW
            </button>
            
            <p style={{marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.7}}>
              Email us immediately to begin the exclusivity process
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <h2>Secure Your Territory Today</h2>
            
            <h3 style={{marginBottom: '2rem'}}>Next Steps:</h3>
            <div className="step-boxes">
              <div className="step-box" style={{background: 'rgba(255,255,255,0.1)', borderTopColor: 'white'}}>
                <div className="step-number" style={{background: 'white', color: 'var(--primary)'}}>1</div>
                <h3 style={{color: 'white'}}>Email Us</h3>
                <p style={{color: 'white'}}>
                  sales@tryquotely.com<br />
                  Subject: "State Exclusivity - [Your State]"
                </p>
              </div>
              <div className="step-box" style={{background: 'rgba(255,255,255,0.1)', borderTopColor: 'white'}}>
                <div className="step-number" style={{background: 'white', color: 'var(--primary)'}}>2</div>
                <h3 style={{color: 'white'}}>Contract Review</h3>
                <p style={{color: 'white'}}>
                  We'll send exclusivity agreement and agent onboarding details
                </p>
              </div>
              <div className="step-box" style={{background: 'rgba(255,255,255,0.1)', borderTopColor: 'white'}}>
                <div className="step-number" style={{background: 'white', color: 'var(--primary)'}}>3</div>
                <h3 style={{color: 'white'}}>Lock Your State</h3>
                <p style={{color: 'white'}}>
                  Payment secures your territory and lifetime pricing forever
                </p>
              </div>
            </div>
            
            <div className="urgency-box" style={{background: 'rgba(255,255,255,0.1)', border: '2px solid white'}}>
              <h3 style={{color: 'white'}}>⏰ TIME SENSITIVE</h3>
              <p style={{color: 'white'}}>
                <strong>This offer expires the moment another aggregator in your state responds.</strong><br />
                Don't lose your competitive advantage to hesitation.
              </p>
            </div>
            
            <button 
              onClick={() => {
                handleCTAClick('claim_state_exclusivity', 'contact_section')
                window.location.href = 'mailto:sales@tryquotely.com?subject=State Exclusivity - URGENT'
              }}
              className="cta-button"
              style={{fontSize: '1.4rem', padding: '1.75rem 3.5rem', marginTop: '2rem'}}
            >
              CLAIM MY STATE EXCLUSIVITY
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function StateExclusivity() {
  return <StateExclusivityPage />
}