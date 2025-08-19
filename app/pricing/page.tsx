'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

function PricingPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('pricing', {
      section: 'pricing',
      content_type: 'pricing_plans'
    })
  }, [trackPageView])

  const handlePlanClick = (plan: string, price: string) => {
    trackUserAction('pricing_plan_clicked', {
      plan: plan,
      monthly_price: price,
      location: 'pricing_page'
    })
  }

  const handleContactClick = () => {
    trackUserAction('cta_clicked', {
      button: 'contact_sales',
      location: 'pricing_page'
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
        .pricing-hero {
          background: var(--gradient-bg);
          padding: 150px 0 80px;
          text-align: center;
          color: white;
        }
        
        .pricing-hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .pricing-hero p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto 2rem;
        }
        
        .early-access-badge {
          background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 2rem;
          display: inline-block;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        /* QUAD Tiers Grid */
        .pricing-section {
          padding: 5rem 2rem;
          background: var(--background);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
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
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .pricing-card {
          background: var(--surface);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          position: relative;
          transition: all 0.3s ease;
          border: 2px solid var(--border);
        }
        
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .pricing-card.recommended {
          border-color: #10B981;
          background: linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%);
        }
        
        .pricing-card.popular {
          border-color: var(--primary);
          background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%);
          transform: scale(1.03);
        }
        
        .pricing-card.enterprise {
          border-color: #8B5CF6;
          background: linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 100%);
        }
        
        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
        }
        
        .badge-recommended {
          background: #10B981;
        }
        
        .badge-popular {
          background: var(--primary);
        }
        
        .badge-enterprise {
          background: #8B5CF6;
        }
        
        .pricing-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .pricing-name {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .pricing-description {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        
        .pricing-main {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .retail-price {
          font-size: 1.2rem;
          color: #EF4444;
          text-decoration: line-through;
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }
        
        .monthly-price {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        
        .monthly-price span {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        
        .buy-in-price {
          background: #FEF3C7;
          color: #92400E;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .roi-highlight {
          background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
          border: 1px solid #10B981;
          padding: 1rem;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        
        .roi-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        
        .roi-item {
          text-align: center;
        }
        
        .roi-label {
          font-size: 0.875rem;
          color: #065F46;
          margin-bottom: 0.25rem;
        }
        
        .roi-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #059669;
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
          font-size: 1rem;
        }
        
        .feature-list li:before {
          content: "✓";
          color: #10B981;
          font-weight: bold;
          font-size: 1.25rem;
        }
        
        .upgrade-info {
          background: #EFF6FF;
          border: 1px solid var(--primary);
          padding: 1rem;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          text-align: center;
        }
        
        .upgrade-info h4 {
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        
        .upgrade-info p {
          color: var(--text-primary);
          font-size: 0.9rem;
        }
        
        /* Comparison Table */
        .comparison-section {
          max-width: 1400px;
          margin: 4rem auto;
          padding: 0 2rem;
        }
        
        .comparison-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 3rem;
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        
        .comparison-table th,
        .comparison-table td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        
        .comparison-table th {
          background: var(--gradient-bg);
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .comparison-table tbody tr:hover {
          background: #F8FAFC;
        }
        
        .comparison-table .highlight-row {
          background: linear-gradient(90deg, #EFF6FF 0%, #F0F9FF 100%);
        }
        
        .comparison-table .enterprise-row {
          background: linear-gradient(90deg, #F5F3FF 0%, #FAF5FF 100%);
        }
        
        /* Add-ons Section */
        .addons-section {
          background: #F8FAFC;
          padding: 4rem 2rem;
          margin-top: 4rem;
        }
        
        .addons-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .addons-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 3rem;
        }
        
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .addon-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .addon-card h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .addon-price {
          color: var(--primary);
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .addon-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        /* CTA Section */
        .cta-section {
          background: var(--gradient-bg);
          color: white;
          padding: 5rem 2rem;
          text-align: center;
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
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .pricing-hero h1 {
            font-size: 2.5rem;
          }
          
          .pricing-grid {
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
            padding: 0.75rem 0.5rem;
          }
          
          .roi-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navigation />

      {/* Pricing Hero */}
      <section className="pricing-hero">
        <div className="container">
          <div className="early-access-badge">
            🔥 Early Access Pricing - Lock in Lifetime Savings
          </div>
          <h1>Complete QUAD Pricing Structure</h1>
          <p>Choose your perfect tier with flexible upgrade paths and guaranteed lifetime discount pricing</p>
        </div>
      </section>

      {/* Featured QUAD Tiers */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured QUAD Tiers</h2>
            <p>Start anywhere, upgrade anytime - your setup fee is 100% credited</p>
          </div>
          
          <div className="pricing-grid">
            {/* QUAD 1.0 */}
            <div className="pricing-card recommended">
              <div className="pricing-badge badge-recommended">BEST ENTRY POINT</div>
              <div className="pricing-header">
                <div className="pricing-name">QUAD 1.0</div>
                <div className="pricing-description">Perfect for getting started</div>
              </div>
              
              <div className="pricing-main">
                <div className="retail-price">Retail: $879/month</div>
                <div className="monthly-price">$679<span>/month</span></div>
                <div className="buy-in-price">$1,500 Setup Fee</div>
              </div>
              
              <div className="roi-highlight">
                <div className="roi-metrics">
                  <div className="roi-item">
                    <div className="roi-label">Monthly Savings</div>
                    <div className="roi-value">$200</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Payback Period</div>
                    <div className="roi-value">7.5 months</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Annual Savings</div>
                    <div className="roi-value">$2,400</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Year 1 Net Gain</div>
                    <div className="roi-value">$900</div>
                  </div>
                </div>
              </div>
              
              <ul className="feature-list">
                <li>65 Monthly Quotes</li>
                <li>Complete Analytics Dashboard</li>
                <li>All Personal Lines</li>
                <li>All Commercial Lines</li>
                <li>All Recreational Vehicles</li>
                <li>Life Insurance Quoting</li>
                <li>RingCentral VOIP Integration</li>
                <li>QuickBooks Integration</li>
                <li>Basic Support</li>
              </ul>
              
              <div className="upgrade-info">
                <h4>💡 Upgrade Path</h4>
                <p>$1,500 credit applies to any higher tier. Start here to test the platform risk-free.</p>
              </div>
              
              <button 
                onClick={() => {
                  handlePlanClick('QUAD 1.0', '$679')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 1.0 Early Access'
                }} 
                className="btn btn-primary" 
                style={{width: '100%'}}
              >
                Start with QUAD 1.0
              </button>
            </div>

            {/* QUAD 3.0 */}
            <div className="pricing-card popular">
              <div className="pricing-badge badge-popular">MOST POPULAR</div>
              <div className="pricing-header">
                <div className="pricing-name">QUAD 3.0</div>
                <div className="pricing-description">Growing agencies</div>
              </div>
              
              <div className="pricing-main">
                <div className="retail-price">Retail: $1,199/month</div>
                <div className="monthly-price">$929<span>/month</span></div>
                <div className="buy-in-price">$3,000 Setup Fee</div>
              </div>
              
              <div className="roi-highlight">
                <div className="roi-metrics">
                  <div className="roi-item">
                    <div className="roi-label">Monthly Savings</div>
                    <div className="roi-value">$270</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Payback Period</div>
                    <div className="roi-value">11.1 months</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Annual Savings</div>
                    <div className="roi-value">$3,240</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Year 1 Net Gain</div>
                    <div className="roi-value">$240</div>
                  </div>
                </div>
              </div>
              
              <ul className="feature-list">
                <li>225 Monthly Quotes</li>
                <li>Premium Analytics Suite</li>
                <li>All Product Lines</li>
                <li>Premium Support</li>
                <li>Advanced Cross-Selling</li>
                <li>Custom Dashboards</li>
                <li>Automated Workflows</li>
                <li>API Integration Access</li>
                <li>Performance Optimization</li>
              </ul>
              
              <div className="upgrade-info">
                <h4>💡 Upgrade Paths</h4>
                <p>From QUAD 1.0: Pay $1,500 more | From QUAD 2.0: Pay $1,000 more</p>
              </div>
              
              <button 
                onClick={() => {
                  handlePlanClick('QUAD 3.0', '$929')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 3.0 Early Access'
                }} 
                className="btn btn-primary" 
                style={{width: '100%'}}
              >
                Choose QUAD 3.0
              </button>
            </div>

            {/* QUAD 7.0 */}
            <div className="pricing-card enterprise">
              <div className="pricing-badge badge-enterprise">UNLIMITED</div>
              <div className="pricing-header">
                <div className="pricing-name">QUAD 7.0</div>
                <div className="pricing-description">Ultimate enterprise solution</div>
              </div>
              
              <div className="pricing-main">
                <div className="retail-price">Retail: $1,999/month</div>
                <div className="monthly-price">$1,529<span>/month</span></div>
                <div className="buy-in-price">$6,000 Setup Fee</div>
              </div>
              
              <div className="roi-highlight">
                <div className="roi-metrics">
                  <div className="roi-item">
                    <div className="roi-label">Monthly Savings</div>
                    <div className="roi-value">$470</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Payback Period</div>
                    <div className="roi-value">12.8 months</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Annual Savings</div>
                    <div className="roi-value">$5,640</div>
                  </div>
                  <div className="roi-item">
                    <div className="roi-label">Year 2+ Net Gain</div>
                    <div className="roi-value">$5,640/yr</div>
                  </div>
                </div>
              </div>
              
              <ul className="feature-list">
                <li>625+ Monthly Quotes (Unlimited)</li>
                <li>Unlimited Everything</li>
                <li>Custom Enterprise Features</li>
                <li>Full API Access & Control</li>
                <li>24/7 Dedicated Support Team</li>
                <li>Custom Development Team</li>
                <li>Custom Branding Options</li>
                <li>Priority Development Queue</li>
                <li>Custom Feature Development</li>
              </ul>
              
              <div className="upgrade-info">
                <h4>💡 Maximum Power</h4>
                <p>Enterprise level - maximum savings for power users</p>
              </div>
              
              <button 
                onClick={() => {
                  handlePlanClick('QUAD 7.0', '$1529')
                  window.location.href = 'mailto:enterprise@quotely.com?subject=QUAD 7.0 Ultimate'
                }} 
                className="btn btn-primary" 
                style={{width: '100%'}}
              >
                Choose QUAD 7.0
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Comparison Table */}
      <section className="comparison-section">
        <h2>📊 Complete QUAD Comparison - All 7 Levels</h2>
        
        <div style={{overflowX: 'auto'}}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Setup Fee</th>
                <th>Monthly Rate</th>
                <th>Retail Rate</th>
                <th>Monthly Savings</th>
                <th>Quotes/Month</th>
                <th>Payback Period</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="highlight-row">
                <td><strong>QUAD 1.0</strong></td>
                <td>$1,500</td>
                <td><strong>$679</strong></td>
                <td>$879</td>
                <td>$200</td>
                <td>65</td>
                <td>7.5 months</td>
                <td>New agencies, testing platform</td>
              </tr>
              <tr>
                <td><strong>QUAD 2.0</strong></td>
                <td>$2,000</td>
                <td><strong>$779</strong></td>
                <td>$949</td>
                <td>$170</td>
                <td>150</td>
                <td>11.8 months</td>
                <td>Small agencies</td>
              </tr>
              <tr className="highlight-row">
                <td><strong>QUAD 3.0</strong></td>
                <td>$3,000</td>
                <td><strong>$929</strong></td>
                <td>$1,199</td>
                <td>$270</td>
                <td>225</td>
                <td>11.1 months</td>
                <td>Growing agencies</td>
              </tr>
              <tr>
                <td><strong>QUAD 4.0</strong></td>
                <td>$3,500</td>
                <td><strong>$1,079</strong></td>
                <td>$1,399</td>
                <td>$320</td>
                <td>300</td>
                <td>10.9 months</td>
                <td>Established agencies</td>
              </tr>
              <tr>
                <td><strong>QUAD 5.0</strong></td>
                <td>$4,500</td>
                <td><strong>$1,229</strong></td>
                <td>$1,599</td>
                <td>$370</td>
                <td>400</td>
                <td>12.2 months</td>
                <td>High-volume agencies</td>
              </tr>
              <tr className="enterprise-row">
                <td><strong>QUAD 6.0</strong></td>
                <td>$5,500</td>
                <td><strong>$1,379</strong></td>
                <td>$1,799</td>
                <td>$420</td>
                <td>500</td>
                <td>13.1 months</td>
                <td>Enterprise agencies</td>
              </tr>
              <tr className="enterprise-row">
                <td><strong>QUAD 7.0</strong></td>
                <td>$6,000</td>
                <td><strong>$1,529</strong></td>
                <td>$1,999</td>
                <td>$470</td>
                <td>625+</td>
                <td>12.8 months</td>
                <td>Ultimate enterprise</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="addons-section">
        <div className="addons-container">
          <h2>🔧 Optional Add-Ons (Available for All Tiers)</h2>
          
          <div className="addons-grid">
            <div className="addon-card">
              <h3>CRM Integration</h3>
              <div className="addon-price">+$150/month</div>
              <div className="addon-description">
                Full CRM functionality with lead management, pipeline tracking, and automated follow-ups. 
                Seamlessly integrated with QUAD platform for complete client lifecycle management.
              </div>
            </div>
            
            <div className="addon-card">
              <h3>SEO Package</h3>
              <div className="addon-price">$200-$600/month</div>
              <div className="addon-description">
                Tier-based SEO services to boost your agency's online presence:
                <br />• QUAD 1.0-2.0: $200/mo
                <br />• QUAD 3.0-4.0: $350/mo
                <br />• QUAD 5.0+: $500/mo
              </div>
            </div>
            
            <div className="addon-card">
              <h3>RingCentral VOIP</h3>
              <div className="addon-price">$20-$35/user/month</div>
              <div className="addon-description">
                Professional phone system with full QUAD integration, call recording, analytics, 
                and automatic client data population from calls.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>🎯 Lock in Your Lifetime Savings Today</h2>
          <p>
            Early access pricing ends soon. These rates will never be available again once we launch publicly.
          </p>
          <div className="cta-buttons">
            <button 
              onClick={() => {
                handleContactClick()
                window.location.href = 'mailto:sales@quotely.com?subject=QUAD Early Access Inquiry'
              }}
              className="btn btn-primary"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => {
                handleContactClick()
                window.location.href = 'https://calendly.com/quotely/demo'
              }}
              className="btn btn-secondary" 
              style={{background: 'white', color: 'var(--primary)'}}
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Pricing() {
  return <PricingPage />
}