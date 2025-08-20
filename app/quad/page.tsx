'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/Footer'

function QUADPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('quad', {
      section: 'quad_dashboard',
      content_type: 'product_page'
    })
  }, [trackPageView])

  const handleCTAClick = (action: string, location: string) => {
    trackUserAction('cta_clicked', {
      button: action,
      location: location,
      product: 'QUAD'
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
          background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
        }
        
        .btn-secondary {
          background: var(--gradient);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 87, 255, 0.3);
        }
        
        .btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 87, 255, 0.4);
        }
        
        .btn-outline {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        
        .btn-outline:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }
        
        /* Hero Section */
        .quad-hero {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          padding: 150px 0 100px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .quad-hero::before {
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
        
        .quad-hero h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
          font-weight: 700;
          letter-spacing: 2px;
          position: relative;
          z-index: 1;
        }
        
        .quad-hero h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          opacity: 0.95;
          position: relative;
          z-index: 1;
        }
        
        .quad-hero .subtitle {
          font-size: 1.4rem;
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto 3rem;
          position: relative;
          z-index: 1;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
          position: relative;
          z-index: 1;
        }
        
        .stat-box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 1.1rem;
          opacity: 0.95;
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
          margin-bottom: 4rem;
        }
        
        .section-header h2 {
          font-size: 3rem;
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
          max-width: 800px;
          margin: 0 auto;
        }
        
        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .feature-card {
          background: var(--surface);
          padding: 2.5rem;
          border-radius: 1rem;
          border-left: 5px solid var(--primary);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .feature-list {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }
        
        .feature-list li {
          padding: 0.75rem 0;
          color: var(--text-primary);
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
        
        /* Analytics Visual Section */
        .analytics-visual {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem;
          border-radius: 1rem;
          margin: 3rem 0;
          text-align: center;
        }
        
        .analytics-visual h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .analytics-visual p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }
        
        .dashboard-preview {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 1rem;
          padding: 3rem;
          margin: 2rem 0;
          text-align: center;
        }
        
        .dashboard-preview h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
        
        .dashboard-preview p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        /* Pricing Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .pricing-card {
          background: var(--surface);
          padding: 2.5rem;
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
        
        .pricing-card.popular {
          border-color: var(--primary);
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(52, 152, 219, 0.3);
        }
        
        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .pricing-card h3 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .price {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary);
          margin: 1.5rem 0;
        }
        
        .price span {
          font-size: 1.2rem;
          color: var(--text-secondary);
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
        
        /* Highlight Box */
        .highlight-box {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          padding: 3rem;
          border-radius: 1rem;
          margin: 3rem 0;
          text-align: center;
        }
        
        .highlight-box h3 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 1rem;
        }
        
        .highlight-box p {
          font-size: 1.2rem;
          color: #34495e;
        }
        
        .warning-box {
          background: linear-gradient(135deg, #FFE5E5 0%, #FFD6D6 100%);
          border: 2px solid #EF4444;
          padding: 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
          text-align: center;
        }
        
        .warning-box h3 {
          color: #DC2626;
          margin-bottom: 1rem;
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
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        
        .comparison-table th {
          background: #34495e;
          color: white;
          font-weight: 600;
        }
        
        .comparison-table tbody tr:hover {
          background: #F8FAFC;
        }
        
        .tier-row {
          background: #e8f5e8;
          font-weight: 600;
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
        
        /* CTA Section */
        .cta-section {
          background: var(--gradient-bg);
          color: white;
          padding: 5rem 2rem;
          text-align: center;
          margin-top: 5rem;
        }
        
        .cta-section h2 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .cta-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          margin-bottom: 2rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .quad-hero h1 {
            font-size: 3rem;
          }
          
          .features-grid,
          .pricing-grid,
          .step-boxes {
            grid-template-columns: 1fr;
          }
          
          .pricing-card.popular {
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

      <MinimalNav />

      {/* Hero Section */}
      <section className="quad-hero">
        <div className="container">
          <h1>QUAD</h1>
          <h2>Quotely User Agency Dashboard</h2>
          <p className="subtitle">
            The Complete Insurance Platform & Analytics Engine for Independent Agents
          </p>
          
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">75%</div>
              <div className="stat-label">Faster Quote Generation</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">3X</div>
              <div className="stat-label">Productivity Increase</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">90%</div>
              <div className="stat-label">Reduction in Training Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is QUAD */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What is QUAD?</h2>
            <p>
              QUAD (Quotely User Agency Dashboard) is your complete insurance platform that combines 
              powerful quoting capabilities with advanced data analytics to give you unprecedented 
              visibility into your agency's performance.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Visual Analytics Dashboard</h3>
              <p>
                See your agency's cost structure, ROI, and performance metrics in real-time through 
                intuitive visualizations and interactive dashboards.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Smart Data Insights</h3>
              <p>
                Get actionable insights on which products drive profitability, identify cost centers, 
                and optimize your agency operations.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>ROI Tracking</h3>
              <p>
                Track return on investment across all product lines, marketing channels, and 
                operational initiatives with precision analytics.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Complete Platform</h3>
              <p>
                All-in-one solution combining quoting, policy management, analytics, and business 
                intelligence in a single modern interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Power */}
      <section className="section section-alt">
        <div className="container">
          <div className="analytics-visual">
            <h2>See Your Agency Like Never Before</h2>
            <p>
              QUAD transforms complex agency data into clear, actionable insights through powerful visual analytics.
            </p>
            
            <div className="stats-grid">
              <div className="stat-box">
                <h3>📈 Cost Analysis</h3>
                <p>Track every dollar spent across operations, marketing, and technology</p>
              </div>
              <div className="stat-box">
                <h3>💰 Profit Tracking</h3>
                <p>Monitor profitability by product line, client, and time period</p>
              </div>
              <div className="stat-box">
                <h3>🎯 ROI Optimization</h3>
                <p>Identify highest-return activities and eliminate waste</p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-preview">
            <h3>📊 Interactive Dashboard Preview</h3>
            <p>Real-time charts • Performance metrics • Trend analysis • Custom reports</p>
          </div>
        </div>
      </section>

      {/* What QUAD Does */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What QUAD Does for Your Agency</h2>
          </div>
          
          <div className="step-boxes">
            <div className="step-box">
              <div className="step-number">1</div>
              <h3>Collect & Organize</h3>
              <p>
                Automatically gathers data from all your systems, quotes, policies, and operations 
                into one centralized platform.
              </p>
            </div>
            <div className="step-box">
              <div className="step-number">2</div>
              <h3>Analyze & Visualize</h3>
              <p>
                Transforms raw data into beautiful, interactive dashboards showing costs, revenues, 
                trends, and opportunities.
              </p>
            </div>
            <div className="step-box">
              <div className="step-number">3</div>
              <h3>Optimize & Grow</h3>
              <p>
                Provides actionable insights to reduce costs, increase profitability, and make 
                data-driven business decisions.
              </p>
            </div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🚗 Complete Product Coverage</h3>
              <ul className="feature-list">
                <li>Personal Lines (Auto, Home, Life)</li>
                <li>Commercial Lines (GL, Property, WC)</li>
                <li>Recreational Vehicles</li>
                <li>Life & Health Insurance</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>🔧 Modern Integrations</h3>
              <ul className="feature-list">
                <li>TurboRater Integration</li>
                <li>Momentum AMP (NowCerts)</li>
                <li>Gail Partnership</li>
                <li>QuickBooks & RingCentral</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Agents Early Access */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>🎯 Early Access for Individual Agents</h2>
            <h3>Lock in Lifetime Savings Before Public Launch</h3>
          </div>
          
          <div className="highlight-box">
            <h3>Limited Time: Early Access Pricing</h3>
            <p>Secure your position before we launch to the broader market</p>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <button 
              onClick={() => {
                handleCTAClick('view_buy_in_details', 'individual_section')
                window.location.href = '/quad/buy-in'
              }}
              className="btn btn-secondary"
            >
              View Complete Buy-In Program Details →
            </button>
          </div>
          
          <div className="stats-grid">
            <div className="stat-box" style={{background: 'var(--surface)'}}>
              <div className="stat-number" style={{color: 'var(--primary)'}}>$200</div>
              <div className="stat-label" style={{color: 'var(--text-primary)'}}>
                <strong>Monthly Savings</strong><br />vs. retail pricing locked forever
              </div>
            </div>
            <div className="stat-box" style={{background: 'var(--surface)'}}>
              <div className="stat-number" style={{color: 'var(--primary)'}}>3-12</div>
              <div className="stat-label" style={{color: 'var(--text-primary)'}}>
                <strong>Month Payback</strong><br />on your buy-in investment
              </div>
            </div>
            <div className="stat-box" style={{background: 'var(--surface)'}}>
              <div className="stat-number" style={{color: 'var(--primary)'}}>✓</div>
              <div className="stat-label" style={{color: 'var(--text-primary)'}}>
                <strong>Flexible Growth</strong><br />upgrade tiers anytime with credit
              </div>
            </div>
          </div>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>QUAD 1.0</h3>
              <div className="price">$679<span>/month</span></div>
              <p style={{marginBottom: '1.5rem'}}>Perfect for getting started</p>
              <ul className="feature-list">
                <li>65 Monthly Quotes</li>
                <li>Complete Analytics Dashboard</li>
                <li>All Product Lines</li>
                <li>Basic Support</li>
              </ul>
              <button 
                onClick={() => {
                  handleCTAClick('start_quad_1', 'individual_agents')
                  window.location.href = 'mailto:sales@quotely.com?subject=Early Access - QUAD 1.0'
                }}
                className="btn btn-secondary"
              >
                Start Here
              </button>
            </div>
            
            <div className="pricing-card popular">
              <div className="pricing-badge">MOST POPULAR</div>
              <h3>QUAD 3.0</h3>
              <div className="price">$929<span>/month</span></div>
              <p style={{marginBottom: '1.5rem'}}>Most popular choice</p>
              <ul className="feature-list">
                <li>225 Monthly Quotes</li>
                <li>Advanced Analytics</li>
                <li>All Product Lines</li>
                <li>Premium Support</li>
                <li>ROI Optimization Tools</li>
              </ul>
              <button 
                onClick={() => {
                  handleCTAClick('start_quad_3', 'individual_agents')
                  window.location.href = 'mailto:sales@quotely.com?subject=Early Access - QUAD 3.0'
                }}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
            
            <div className="pricing-card">
              <h3>QUAD 7.0</h3>
              <div className="price">$1,529<span>/month</span></div>
              <p style={{marginBottom: '1.5rem'}}>Enterprise solution</p>
              <ul className="feature-list">
                <li>625+ Monthly Quotes</li>
                <li>Custom Analytics</li>
                <li>Unlimited Everything</li>
                <li>24/7 Priority Support</li>
                <li>API Access</li>
              </ul>
              <button 
                onClick={() => {
                  handleCTAClick('start_quad_7', 'individual_agents')
                  window.location.href = 'mailto:sales@quotely.com?subject=Early Access - QUAD 7.0'
                }}
                className="btn btn-secondary"
              >
                Scale Up
              </button>
            </div>
          </div>
          
          <div className="step-boxes">
            <div className="step-box">
              <div className="step-number">1</div>
              <h3>Choose Your Tier</h3>
              <p>Start with QUAD 1.0 ($1,500 buy-in) or go higher for more features</p>
            </div>
            <div className="step-box">
              <div className="step-number">2</div>
              <h3>Lock Lifetime Rate</h3>
              <p>Your monthly rate stays locked - even as we raise retail prices</p>
            </div>
            <div className="step-box">
              <div className="step-number">3</div>
              <h3>Upgrade Anytime</h3>
              <p>Apply your initial investment as credit toward higher tiers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aggregator Partnership Program */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🏢 Aggregator Partnership Program</h2>
            <h3>Leverage Your Buying Power for Exclusive Rates</h3>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Volume Advantage</h3>
              <p>
                Bring 25+ agents and unlock special pricing that individual agents can't access.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Member Benefits</h3>
              <p>
                Offer your agents exclusive QUAD access at discounted rates - a powerful recruitment tool.
              </p>
            </div>
          </div>
          
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Aggregator Benefits</th>
                <th>Requirements</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tier-row">
                <td><strong>Exclusive Group Pricing</strong></td>
                <td>25 agent minimum</td>
                <td>$200/month savings per agent vs retail</td>
              </tr>
              <tr>
                <td>Member Recruitment Tool</td>
                <td>$1,500 buy-in per agent</td>
                <td>Competitive advantage in agent retention</td>
              </tr>
              <tr className="tier-row">
                <td><strong>Custom Branding</strong></td>
                <td>Higher tiers available</td>
                <td>Brand the platform for your organization</td>
              </tr>
            </tbody>
          </table>
          
          <div className="highlight-box">
            <h3>💡 Smart Strategy for Aggregators</h3>
            <p>
              Use your volume to secure better rates than individual agents can get. 
              Offer this as a member benefit to attract and retain top agents in your network.
            </p>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '3rem'}}>
            <button 
              onClick={() => {
                handleCTAClick('explore_partnership', 'aggregator_program')
                window.location.href = 'mailto:partnerships@quotely.com?subject=Aggregator Partnership'
              }}
              className="btn btn-primary"
            >
              Explore Partnership
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>🚀 Enterprise Features</h2>
            <h3>Advanced Capabilities for Power Users</h3>
          </div>
          
          <div className="warning-box">
            <h3>⚡ UNLIMITED POWER WITH QUAD 7.0</h3>
            <p style={{fontSize: '1.1rem'}}>
              Get unlimited quotes, custom features, and dedicated support with our enterprise tier.
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-box" style={{background: 'var(--surface)'}}>
              <div className="stat-number" style={{color: 'var(--primary)'}}>625+</div>
              <div className="stat-label" style={{color: 'var(--text-primary)'}}>
                <strong>Monthly Quotes</strong><br />Unlimited with QUAD 7.0
              </div>
            </div>
            <div className="stat-box" style={{background: 'var(--surface)'}}>
              <div className="stat-number" style={{color: 'var(--primary)'}}>24/7</div>
              <div className="stat-label" style={{color: 'var(--text-primary)'}}>
                <strong>Dedicated Support</strong><br />Priority assistance anytime
              </div>
            </div>
            <div className="stat-box" style={{background: 'var(--surface)'}}>
              <div className="stat-number" style={{color: 'var(--primary)'}}>100%</div>
              <div className="stat-label" style={{color: 'var(--text-primary)'}}>
                <strong>Custom Features</strong><br />Tailored to your needs
              </div>
            </div>
          </div>
          
          <div className="step-boxes">
            <div className="step-box">
              <div className="step-number">1</div>
              <h3>Choose Your Tier</h3>
              <p>Select from QUAD 1.0 to 7.0 based on your agency's needs and volume</p>
            </div>
            <div className="step-box">
              <div className="step-number">2</div>
              <h3>Pay Setup Fee</h3>
              <p>One-time setup fee to configure your account and onboard your team</p>
            </div>
            <div className="step-box">
              <div className="step-number">3</div>
              <h3>Scale Your Business</h3>
              <p>Upgrade anytime with 100% of your setup fee credited toward the higher tier</p>
            </div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🛡️ What Enterprise Includes</h3>
              <ul className="feature-list">
                <li>Custom development and feature requests</li>
                <li>Dedicated account management team</li>
                <li>Custom branding and personalization</li>
                <li>Advanced analytics and reporting</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>📈 ROI Breakdown</h3>
              <ul className="feature-list">
                <li><strong>QUAD 1.0:</strong> $200/month savings, 7.5 month payback</li>
                <li><strong>QUAD 3.0:</strong> $270/month savings, 11.1 month payback</li>
                <li><strong>QUAD 7.0:</strong> $470/month savings, 12.8 month payback</li>
                <li><strong>Years 2+:</strong> Pure savings every month</li>
              </ul>
            </div>
          </div>
          
          <div className="state-status">
            <h3>Ready to Scale?</h3>
            <p>Start with any tier and upgrade anytime. Your setup fee is always credited.</p>
            
            <button 
              onClick={() => {
                handleCTAClick('get_started', 'enterprise_features')
                window.location.href = 'mailto:sales@quotely.com?subject=QUAD Enterprise Inquiry'
              }}
              className="btn btn-primary"
              style={{fontSize: '1.3rem', padding: '1.5rem 3rem'}}
            >
              GET STARTED TODAY
            </button>
            
            <p style={{marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.7}}>
              Contact our sales team to discuss your needs
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose QUAD */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Why Independent Agents Choose QUAD</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Built for 2025, Not 2005</h3>
              <p>
                Modern API-first architecture with seamless integrations. Leave behind fax machines 
                and phone books forever.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data-Driven Decisions</h3>
              <p>
                See exactly where your money goes and what drives profits with visual analytics 
                that make sense.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast Learning</h3>
              <p>
                Master the platform in weeks, not months. Your team becomes productive immediately.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>
                No hidden fees or surprise rate hikes. Lock in your savings with early access pricing.
              </p>
            </div>
          </div>
          
          <div className="analytics-visual">
            <h3>The QUAD Advantage</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">2-4</div>
                <p>Weeks to master vs months with legacy systems</p>
              </div>
              <div className="stat-box">
                <div className="stat-number">75%</div>
                <p>Faster quote generation than traditional platforms</p>
              </div>
              <div className="stat-box">
                <div className="stat-number">3X</div>
                <p>Productivity increase with streamlined workflows</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Agency?</h2>
          <p>Join the QUAD Revolution</p>
          
          <div className="step-boxes" style={{marginTop: '3rem'}}>
            <div className="step-box" style={{background: 'rgba(255,255,255,0.1)', borderTopColor: 'white'}}>
              <div className="step-number" style={{background: 'white', color: 'var(--primary)'}}>1</div>
              <h3 style={{color: 'white'}}>Individual Agents</h3>
              <p style={{color: 'white'}}>
                Lock in early access pricing starting at $679/month with $1,500 setup fee
              </p>
              <button 
                onClick={() => {
                  handleCTAClick('get_started_agent', 'cta_section')
                  window.location.href = 'mailto:sales@quotely.com?subject=Early Access Agent'
                }}
                className="btn"
                style={{background: 'white', color: 'var(--primary)', marginTop: '1rem'}}
              >
                Get Started
              </button>
            </div>
            <div className="step-box" style={{background: 'rgba(255,255,255,0.1)', borderTopColor: 'white'}}>
              <div className="step-number" style={{background: 'white', color: 'var(--primary)'}}>2</div>
              <h3 style={{color: 'white'}}>Aggregators</h3>
              <p style={{color: 'white'}}>
                Volume discounts for 25+ agents with member recruitment advantages
              </p>
              <button 
                onClick={() => {
                  handleCTAClick('partner_with_us', 'cta_section')
                  window.location.href = 'mailto:partnerships@quotely.com?subject=Aggregator Partnership'
                }}
                className="btn"
                style={{background: 'white', color: 'var(--primary)', marginTop: '1rem'}}
              >
                Partner With Us
              </button>
            </div>
            <div className="step-box" style={{background: 'rgba(255,255,255,0.1)', borderTopColor: 'white'}}>
              <div className="step-number" style={{background: 'white', color: 'var(--primary)'}}>3</div>
              <h3 style={{color: 'white'}}>Enterprise</h3>
              <p style={{color: 'white'}}>
                Unlimited quotes and custom features with our enterprise tiers
              </p>
              <button 
                onClick={() => {
                  handleCTAClick('contact_enterprise', 'cta_section')
                  window.location.href = 'mailto:enterprise@quotely.com?subject=Enterprise Inquiry'
                }}
                className="btn btn-primary"
                style={{marginTop: '1rem'}}
              >
                Contact Enterprise
              </button>
            </div>
          </div>
          
          <div style={{marginTop: '4rem'}}>
            <h3>Don't Wait - Limited Time Offers</h3>
            <p>
              Early access pricing ends when we launch publicly. Lock in your savings today.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function QUAD() {
  return <QUADPage />
}