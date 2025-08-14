'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

function QUADBuyInPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('quad_buy_in', {
      section: 'quad_early_access',
      content_type: 'pricing_program'
    })
  }, [trackPageView])

  const handleCTAClick = (action: string, program: string) => {
    trackUserAction('cta_clicked', {
      button: action,
      program: program,
      location: 'quad_buy_in'
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 150px 0 80px;
          text-align: center;
          color: white;
        }
        
        .hero-section h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 800px;
          margin: 0 auto;
        }
        
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
        
        .section-header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
        }
        
        .program-overview {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          padding: 3rem;
          border-radius: 1rem;
          margin: 3rem auto;
          text-align: center;
          max-width: 1000px;
        }
        
        .program-overview h2 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }
        
        .program-overview p {
          font-size: 1.2rem;
          color: #34495e;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .benefit-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: 1rem;
          border-left: 5px solid var(--primary);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .benefit-card:hover {
          transform: translateY(-5px);
        }
        
        .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .benefit-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .benefit-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .tier-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .tier-card {
          border: 2px solid var(--border);
          border-radius: 1rem;
          padding: 2rem;
          background: var(--surface);
          position: relative;
          transition: all 0.3s ease;
        }
        
        .tier-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .tier-card.recommended {
          border-color: #10B981;
          background: linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%);
          transform: scale(1.02);
        }
        
        .tier-card.recommended::before {
          content: "RECOMMENDED";
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #10B981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .tier-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .buy-in-amount {
          font-size: 2rem;
          color: var(--primary);
          font-weight: 700;
          text-align: center;
          margin: 1rem 0;
        }
        
        .monthly-rate {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .roi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        
        .roi-metric {
          background: #F8FAFC;
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          border: 2px solid #10B981;
        }
        
        .roi-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #10B981;
        }
        
        .roi-metric p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }
        
        .feature-list {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }
        
        .feature-list li {
          padding: 0.5rem 0;
          color: var(--text-primary);
        }
        
        .feature-list li:before {
          content: "✓";
          color: #10B981;
          font-weight: bold;
          margin-right: 0.75rem;
        }
        
        .upgrade-path {
          background: #EFF6FF;
          padding: 2.5rem;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .upgrade-path h3 {
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        
        .upgrade-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: var(--surface);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .upgrade-table th,
        .upgrade-table td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        
        .upgrade-table th {
          background: var(--primary);
          color: white;
          font-weight: 600;
        }
        
        .upgrade-table tbody tr:hover {
          background: #F8FAFC;
        }
        
        .warning-box {
          background: #FEF3C7;
          border: 1px solid #F59E0B;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        
        .warning-box h4 {
          color: #92400E;
          margin-bottom: 0.5rem;
        }
        
        .warning-box p {
          color: #78350F;
        }
        
        .pricing-breakdown {
          background: #FEF3C7;
          padding: 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
        }
        
        .pricing-breakdown h3 {
          color: #92400E;
          margin-bottom: 1rem;
        }
        
        .pricing-breakdown p {
          color: #78350F;
        }
        
        .price-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: var(--surface);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .price-table th,
        .price-table td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        
        .price-table th {
          background: #F59E0B;
          color: white;
        }
        
        .savings-highlight {
          background: #D1FAE5;
          font-weight: 600;
        }
        
        .aggregator-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .aggregator-section h2 {
          color: white;
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .aggregator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .aggregator-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .aggregator-card h3 {
          color: white;
          margin-bottom: 1rem;
        }
        
        .aggregator-card ul {
          list-style: none;
          padding: 0;
        }
        
        .aggregator-card li {
          padding: 0.5rem 0;
        }
        
        .aggregator-card li:before {
          content: "✓";
          margin-right: 0.75rem;
          font-weight: bold;
        }
        
        .state-exclusivity {
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          color: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .state-exclusivity h2 {
          color: white;
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .exclusivity-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .exclusivity-metric {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 0.75rem;
          text-align: center;
        }
        
        .metric-large {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .timeline-section {
          background: #F8FAFC;
          padding: 4rem 2rem;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .timeline-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .timeline-step {
          background: var(--surface);
          padding: 2rem;
          border-radius: 0.75rem;
          position: relative;
          border-top: 4px solid var(--primary);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .step-number {
          background: var(--primary);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .timeline-step h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .timeline-step p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .roi-calculator {
          background: #D1FAE5;
          padding: 3rem 2rem;
          border-radius: 1rem;
          margin: 3rem 0;
        }
        
        .roi-calculator h2 {
          color: #065F46;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .roi-calculator h3 {
          color: #047857;
          margin: 2rem 0 1rem;
        }
        
        .cta-section {
          background: var(--gradient-bg);
          color: white;
          padding: 5rem 2rem;
          border-radius: 1rem;
          margin: 4rem 0;
          text-align: center;
        }
        
        .cta-section h2 {
          color: white;
          margin-bottom: 1rem;
        }
        
        .cta-section p {
          font-size: 1.2rem;
          opacity: 0.95;
          margin-bottom: 2rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1.1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }
        
        .btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }
        
        .btn-tertiary {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }
        
        .btn-tertiary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }
          
          .tier-comparison,
          .aggregator-grid,
          .timeline-steps,
          .exclusivity-metrics {
            grid-template-columns: 1fr;
          }
          
          .tier-card.recommended {
            transform: none;
          }
          
          .price-table,
          .upgrade-table {
            font-size: 0.875rem;
          }
          
          .price-table th,
          .price-table td,
          .upgrade-table th,
          .upgrade-table td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>QUAD Early Buy-In Program</h1>
          <p>Complete breakdown of early access pricing, benefits, and upgrade pathways</p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="section">
        <div className="container">
          <div className="program-overview">
            <h2>⚡ Limited Time Early Access</h2>
            <p style={{marginBottom: '1rem'}}>Lock in lifetime savings before we launch to the broader market</p>
            <p>Early access pricing ends when we go public. Once retail launches, these rates will never be available again.</p>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>🎯 Early Buy-In Benefits</h2>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Lifetime Savings</h3>
              <p><strong>$200-$500 monthly savings</strong> vs retail pricing, locked in forever. Your rate never increases, even as we raise retail prices.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Quick ROI</h3>
              <p><strong>3-15 month payback</strong> periods depending on tier. Lower tiers pay for themselves in under a year.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🔄</div>
              <h3>Flexible Upgrades</h3>
              <p><strong>Buy-in credit applies</strong> to higher tiers. Start conservative and upgrade when ready with full credit.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>No Risk</h3>
              <p><strong>Start anywhere, upgrade anytime.</strong> Test the platform at QUAD 1.0, then scale up as your agency grows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Agent Buy-In */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>👤 Individual Agent Buy-In Options</h2>
          </div>
          
          <div className="pricing-breakdown">
            <h3>Smart Buy-In Strategy: Start Conservative, Scale Up</h3>
            <p>Most agents should start with QUAD 1.0 or 2.0 to test the platform, then upgrade when ready.</p>
          </div>
          
          <div className="tier-comparison">
            <div className="tier-card recommended">
              <h3>QUAD 1.0 - Best Entry Point</h3>
              <div className="buy-in-amount">$1,500 Buy-In</div>
              <div className="monthly-rate">$679/month (vs $879 retail)</div>
              
              <div className="roi-grid">
                <div className="roi-metric">
                  <div className="roi-number">$200</div>
                  <p>Monthly Savings</p>
                </div>
                <div className="roi-metric">
                  <div className="roi-number">7.5</div>
                  <p>Months Payback</p>
                </div>
                <div className="roi-metric">
                  <div className="roi-number">$900</div>
                  <p>Year 1 Net Gain</p>
                </div>
              </div>
              
              <ul className="feature-list">
                <li>65 Monthly Quotes</li>
                <li>Complete Analytics Dashboard</li>
                <li>All Product Lines</li>
                <li>Perfect for testing platform</li>
              </ul>
              
              <button 
                onClick={() => {
                  handleCTAClick('start_quad_1', 'individual')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 1.0 Early Access'
                }}
                className="btn btn-primary"
                style={{width: '100%'}}
              >
                Start with QUAD 1.0
              </button>
            </div>
            
            <div className="tier-card">
              <h3>QUAD 3.0 - Most Popular</h3>
              <div className="buy-in-amount">$3,000 Buy-In</div>
              <div className="monthly-rate">$929/month (vs $1,199 retail)</div>
              
              <div className="roi-grid">
                <div className="roi-metric">
                  <div className="roi-number">$270</div>
                  <p>Monthly Savings</p>
                </div>
                <div className="roi-metric">
                  <div className="roi-number">11.1</div>
                  <p>Months Payback</p>
                </div>
                <div className="roi-metric">
                  <div className="roi-number">$240</div>
                  <p>Year 1 Net Gain</p>
                </div>
              </div>
              
              <ul className="feature-list">
                <li>225 Monthly Quotes</li>
                <li>Premium Analytics Suite</li>
                <li>Advanced Features</li>
                <li>Best value for growing agencies</li>
              </ul>
              
              <button 
                onClick={() => {
                  handleCTAClick('start_quad_3', 'individual')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 3.0 Early Access'
                }}
                className="btn btn-secondary"
                style={{width: '100%'}}
              >
                Choose QUAD 3.0
              </button>
            </div>
            
            <div className="tier-card">
              <h3>QUAD 7.0 - Enterprise</h3>
              <div className="buy-in-amount">$6,000 Buy-In</div>
              <div className="monthly-rate">$1,529/month (vs $1,999 retail)</div>
              
              <div className="roi-grid">
                <div className="roi-metric">
                  <div className="roi-number">$470</div>
                  <p>Monthly Savings</p>
                </div>
                <div className="roi-metric">
                  <div className="roi-number">12.8</div>
                  <p>Months Payback</p>
                </div>
                <div className="roi-metric">
                  <div className="roi-number">-$360</div>
                  <p>Year 1 (Year 2+)</p>
                </div>
              </div>
              
              <ul className="feature-list">
                <li>625+ Monthly Quotes</li>
                <li>Unlimited Everything</li>
                <li>Custom Development</li>
                <li>Maximum features & support</li>
              </ul>
              
              <button 
                onClick={() => {
                  handleCTAClick('start_quad_7', 'individual')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 7.0 Early Access'
                }}
                className="btn btn-tertiary"
                style={{width: '100%'}}
              >
                Go Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Path Strategy */}
      <section className="section section-alt">
        <div className="container">
          <div className="upgrade-path">
            <h3>🔄 Smart Upgrade Strategy</h3>
            <p>Start conservatively, then upgrade with full credit applied. This minimizes risk while maximizing long-term value.</p>
            
            <table className="upgrade-table">
              <thead>
                <tr>
                  <th>Upgrade Path</th>
                  <th>Additional Cost</th>
                  <th>New Monthly Rate</th>
                  <th>When to Consider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>QUAD 1.0 → 2.0</td>
                  <td>$500</td>
                  <td>$779/month</td>
                  <td>Need more quotes/features</td>
                </tr>
                <tr>
                  <td>QUAD 1.0 → 3.0</td>
                  <td>$1,500</td>
                  <td>$929/month</td>
                  <td>Growing agency, need analytics</td>
                </tr>
                <tr>
                  <td>QUAD 2.0 → 3.0</td>
                  <td>$1,000</td>
                  <td>$929/month</td>
                  <td>Premium features needed</td>
                </tr>
                <tr>
                  <td>QUAD 3.0 → 7.0</td>
                  <td>$3,000</td>
                  <td>$1,529/month</td>
                  <td>Enterprise scale needed</td>
                </tr>
              </tbody>
            </table>
            
            <div className="warning-box">
              <h4>💡 Upgrade Credit System</h4>
              <p>Your initial buy-in always counts as credit toward higher tiers. If you start with QUAD 1.0 ($1,500) and want to upgrade to QUAD 3.0 ($3,000), you only pay the $1,500 difference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aggregator Program */}
      <section className="section">
        <div className="container">
          <div className="aggregator-section">
            <h2>🏢 Aggregator Volume Program</h2>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center'}}>
              Leverage your agent network for exclusive group pricing
            </p>
            
            <div className="aggregator-grid">
              <div className="aggregator-card">
                <h3>Volume Requirements</h3>
                <ul>
                  <li>Minimum 25 agents</li>
                  <li>All agents at QUAD 1.0+ level</li>
                  <li>$1,500 buy-in per agent</li>
                  <li>No additional aggregator fee</li>
                </ul>
              </div>
              
              <div className="aggregator-card">
                <h3>Exclusive Benefits</h3>
                <ul>
                  <li>Group pricing for all agents</li>
                  <li>Member recruitment advantage</li>
                  <li>White-label options available</li>
                  <li>Priority support & training</li>
                </ul>
              </div>
              
              <div className="aggregator-card">
                <h3>ROI for Aggregators</h3>
                <div style={{fontSize: '2rem', margin: '1rem 0', fontWeight: 700}}>$5,000/month</div>
                <p>Collective savings for 25 agents vs retail pricing</p>
                <p style={{marginTop: '1rem'}}>Use as member benefit to attract and retain top agents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Exclusivity */}
      <section className="section section-alt">
        <div className="container">
          <div className="state-exclusivity">
            <h2>🗺️ State Exclusivity Program</h2>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center'}}>
              Lock out your competition forever - one aggregator per state
            </p>
            
            <div className="exclusivity-metrics">
              <div className="exclusivity-metric">
                <div className="metric-large">$7,500</div>
                <p>State Exclusivity Fee</p>
              </div>
              <div className="exclusivity-metric">
                <div className="metric-large">25</div>
                <p>Agent Minimum Required</p>
              </div>
              <div className="exclusivity-metric">
                <div className="metric-large">$45,000</div>
                <p>Total Investment</p>
              </div>
            </div>
            
            <div style={{background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '0.75rem', margin: '2rem 0'}}>
              <h3 style={{color: 'white', marginBottom: '1rem'}}>What State Exclusivity Guarantees:</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{padding: '0.5rem 0'}}>🔒 No other aggregator in your state gets discount pricing</li>
                <li style={{padding: '0.5rem 0'}}>🎯 All future agents you recruit get the same exclusive rate</li>
                <li style={{padding: '0.5rem 0'}}>💪 Permanent competitive advantage in your territory</li>
                <li style={{padding: '0.5rem 0'}}>📈 9-month payback period with 25 agents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Process */}
      <section className="section">
        <div className="container">
          <div className="timeline-section">
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>📅 Implementation Timeline</h2>
            
            <div className="timeline-steps">
              <div className="timeline-step">
                <div className="step-number">1</div>
                <h3>Choose Your Program</h3>
                <p><strong>Week 1:</strong> Decide between individual, aggregator, or state exclusivity program based on your needs and agent count.</p>
              </div>
              
              <div className="timeline-step">
                <div className="step-number">2</div>
                <h3>Secure Your Position</h3>
                <p><strong>Week 2:</strong> Complete buy-in payment and agreements. Lock in your lifetime pricing before rates increase.</p>
              </div>
              
              <div className="timeline-step">
                <div className="step-number">3</div>
                <h3>Platform Setup</h3>
                <p><strong>Weeks 3-4:</strong> Account provisioning, integration setup, and initial training. Get your team ready to use QUAD.</p>
              </div>
              
              <div className="timeline-step">
                <div className="step-number">4</div>
                <h3>Go Live</h3>
                <p><strong>Month 2:</strong> Full platform access with ongoing support. Start seeing ROI immediately with faster quoting and analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section section-alt">
        <div className="container">
          <div className="roi-calculator">
            <h2>📊 ROI Scenarios</h2>
            
            <h3>Individual Agent Scenarios</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Buy-In</th>
                  <th>Monthly Rate</th>
                  <th>Retail Rate</th>
                  <th>Monthly Savings</th>
                  <th>Payback Period</th>
                </tr>
              </thead>
              <tbody>
                <tr className="savings-highlight">
                  <td>QUAD 1.0</td>
                  <td>$1,500</td>
                  <td>$679</td>
                  <td>$879</td>
                  <td>$200</td>
                  <td>7.5 months</td>
                </tr>
                <tr>
                  <td>QUAD 2.0</td>
                  <td>$2,000</td>
                  <td>$779</td>
                  <td>$949</td>
                  <td>$170</td>
                  <td>11.8 months</td>
                </tr>
                <tr className="savings-highlight">
                  <td>QUAD 3.0</td>
                  <td>$3,000</td>
                  <td>$929</td>
                  <td>$1,199</td>
                  <td>$270</td>
                  <td>11.1 months</td>
                </tr>
                <tr>
                  <td>QUAD 4.0</td>
                  <td>$3,500</td>
                  <td>$1,079</td>
                  <td>$1,399</td>
                  <td>$320</td>
                  <td>10.9 months</td>
                </tr>
                <tr>
                  <td>QUAD 5.0</td>
                  <td>$4,500</td>
                  <td>$1,229</td>
                  <td>$1,599</td>
                  <td>$370</td>
                  <td>12.2 months</td>
                </tr>
                <tr>
                  <td>QUAD 6.0</td>
                  <td>$5,500</td>
                  <td>$1,379</td>
                  <td>$1,799</td>
                  <td>$420</td>
                  <td>13.1 months</td>
                </tr>
                <tr className="savings-highlight">
                  <td>QUAD 7.0</td>
                  <td>$6,000</td>
                  <td>$1,529</td>
                  <td>$1,999</td>
                  <td>$470</td>
                  <td>12.8 months</td>
                </tr>
              </tbody>
            </table>
            
            <h3>Aggregator/State Exclusivity ROI</h3>
            <div className="roi-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
              <div className="roi-metric" style={{border: '2px solid #10B981'}}>
                <div className="roi-number">25</div>
                <p>Agents @ $200 savings each = <strong>$5,000/month</strong> collective benefit</p>
              </div>
              <div className="roi-metric" style={{border: '2px solid #10B981'}}>
                <div className="roi-number">50</div>
                <p>Agents @ $200 savings each = <strong>$10,000/month</strong> collective benefit</p>
              </div>
              <div className="roi-metric" style={{border: '2px solid #10B981'}}>
                <div className="roi-number">9</div>
                <p>Month payback on $45,000 state exclusivity investment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <h2>Ready to Lock In Your Savings?</h2>
            <p>Early access pricing is limited time only. Once we launch publicly, these rates disappear forever.</p>
            
            <div className="cta-buttons">
              <button 
                onClick={() => {
                  handleCTAClick('individual_access', 'cta')
                  window.location.href = 'mailto:sales@quotely.com?subject=Individual Early Access'
                }}
                className="btn btn-secondary"
              >
                Individual Agent Access
              </button>
              <button 
                onClick={() => {
                  handleCTAClick('aggregator_program', 'cta')
                  window.location.href = 'mailto:partnerships@quotely.com?subject=Aggregator Partnership'
                }}
                className="btn btn-tertiary"
              >
                Aggregator Program
              </button>
              <button 
                onClick={() => {
                  handleCTAClick('state_exclusivity', 'cta')
                  window.location.href = 'mailto:exclusivity@quotely.com?subject=State Exclusivity'
                }}
                className="btn btn-primary"
              >
                State Exclusivity
              </button>
            </div>
            
            <div style={{marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8}}>
              <p>Questions? Email us at support@quotely.com or call (555) 123-QUAD</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function QUADBuyIn() {
  return <QUADBuyInPage />
}