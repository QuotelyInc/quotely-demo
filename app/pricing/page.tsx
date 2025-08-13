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

  const handleUpgradeClick = () => {
    trackUserAction('cta_clicked', {
      button: 'upgrade',
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
        .pricing-hero {
          background: var(--gradient-bg);
          padding: 150px 0 80px;
          text-align: center;
          color: white;
        }
        
        .pricing-hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .pricing-hero p {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto 1rem;
        }
        
        .early-access-badge {
          background: var(--warning);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
          display: inline-block;
        }
        
        /* QUAD PRICING SECTION */
        .pricing-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
        }
        
        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .pricing-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .pricing-card:hover {
          transform: translateY(-5px);
        }
        
        .pricing-card.popular {
          border: 3px solid var(--primary);
          transform: scale(1.05);
        }
        
        .pricing-card.recommended {
          border: 2px solid var(--accent);
        }
        
        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .popular-badge {
          background: var(--primary);
        }
        
        .pricing-card h3 {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .pricing-main {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .buy-in-price {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        
        .monthly-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        
        .monthly-price span {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        
        .retail-price {
          color: var(--text-secondary);
          text-decoration: line-through;
          margin-top: 0.25rem;
        }
        
        .savings-highlight {
          background: linear-gradient(135deg, #00C851, #28a745);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .savings-amount {
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .payback-period {
          font-size: 0.875rem;
          opacity: 0.9;
        }
        
        .feature-list {
          list-style: none;
          margin-bottom: 2rem;
          padding: 0;
        }
        
        .feature-list li {
          padding: 0.5rem 0;
          color: var(--text-primary);
        }
        
        .pricing-benefits {
          max-width: 1000px;
          margin: 3rem auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .benefit-item {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .benefit-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .benefit-item h4 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        /* Complete Pricing Table */
        .complete-pricing {
          margin-top: 4rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .complete-pricing h3 {
          text-align: center;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }
        
        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .pricing-table th,
        .pricing-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        
        .pricing-table th {
          background: var(--gradient);
          color: white;
          font-weight: 600;
          text-align: center;
        }
        
        .pricing-table tbody tr:nth-child(even) {
          background: #F8FAFC;
        }
        
        .pricing-table tbody tr.highlighted {
          background: rgba(0, 87, 255, 0.05);
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
          
          .pricing-hero h1 {
            font-size: 2rem;
          }
          
          .pricing-container {
            grid-template-columns: 1fr;
          }
          
          .pricing-card.popular {
            transform: none;
          }
          
          .pricing-table {
            font-size: 0.875rem;
          }
          
          .pricing-table th,
          .pricing-table td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>

      <Navigation />

      {/* Pricing Hero */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Choose Your QUAD Experience</h1>
          <p>Complete Insurance Technology Platform with Analytics & AI</p>
          <div className="early-access-badge">
            🔥 Early Access Pricing - Lock in lifetime savings before public launch
          </div>
        </div>
      </section>

      {/* QUAD Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-card recommended">
            <div className="pricing-badge">RECOMMENDED</div>
            <h3>QUAD 1.0</h3>
            <div className="pricing-main">
              <div className="buy-in-price">$1,500 Buy-In</div>
              <div className="monthly-price">$679<span>/month</span></div>
              <div className="retail-price">vs $879 retail</div>
            </div>
            <div className="savings-highlight">
              <div className="savings-amount">$200/month savings</div>
              <div className="payback-period">7.5 month payback</div>
            </div>
            <ul className="feature-list">
              <li>✓ 65 Monthly Quotes</li>
              <li>✓ Complete Analytics Dashboard</li>
              <li>✓ All Product Lines</li>
              <li>✓ Perfect for testing platform</li>
            </ul>
            <button onClick={() => handlePlanClick('QUAD 1.0', '$679')} className="btn btn-primary">Start Here</button>
          </div>
          
          <div className="pricing-card popular">
            <div className="pricing-badge popular-badge">MOST POPULAR</div>
            <h3>QUAD 3.0</h3>
            <div className="pricing-main">
              <div className="buy-in-price">$3,000 Buy-In</div>
              <div className="monthly-price">$929<span>/month</span></div>
              <div className="retail-price">vs $1,199 retail</div>
            </div>
            <div className="savings-highlight">
              <div className="savings-amount">$270/month savings</div>
              <div className="payback-period">11.1 month payback</div>
            </div>
            <ul className="feature-list">
              <li>✓ 225 Monthly Quotes</li>
              <li>✓ Premium Analytics Suite</li>
              <li>✓ Advanced Features</li>
              <li>✓ Best value for growing agencies</li>
            </ul>
            <button onClick={() => handlePlanClick('QUAD 3.0', '$929')} className="btn btn-primary">Get Started</button>
          </div>
          
          <div className="pricing-card enterprise">
            <div className="pricing-badge">ENTERPRISE</div>
            <h3>QUAD 7.0</h3>
            <div className="pricing-main">
              <div className="buy-in-price">$6,000 Buy-In</div>
              <div className="monthly-price">$1,529<span>/month</span></div>
              <div className="retail-price">vs $1,999 retail</div>
            </div>
            <div className="savings-highlight">
              <div className="savings-amount">$470/month savings</div>
              <div className="payback-period">12.8 month payback</div>
            </div>
            <ul className="feature-list">
              <li>✓ 625+ Monthly Quotes</li>
              <li>✓ Unlimited Everything</li>
              <li>✓ Custom Development</li>
              <li>✓ Maximum features & support</li>
            </ul>
            <button onClick={() => handlePlanClick('QUAD 7.0', '$1529')} className="btn btn-primary">Scale Up</button>
          </div>
        </div>
        
        <div className="pricing-benefits">
          <div className="benefit-item">
            <div className="benefit-icon">💰</div>
            <h4>Lifetime Savings</h4>
            <p>Your rate stays locked forever - even as we raise retail prices</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔄</div>
            <h4>Flexible Upgrades</h4>
            <p>Start conservative, upgrade anytime with full credit applied</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⚡</div>
            <h4>Quick ROI</h4>
            <p>3-15 month payback periods. Lower tiers pay for themselves in under a year</p>
          </div>
        </div>

        {/* Complete Pricing Table */}
        <div className="complete-pricing">
          <h3>Complete Pricing Structure - All QUAD Levels</h3>
          
          <div style={{overflowX: 'auto'}}>
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Monthly Price</th>
                  <th>Buy-In</th>
                  <th>Quotes/Month</th>
                  <th>Key Features</th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlighted">
                  <td><strong>QUAD 1.0</strong></td>
                  <td>$679/mo</td>
                  <td>$1,500</td>
                  <td>65</td>
                  <td>Basic dashboard, Auto/Home, TurboRater</td>
                </tr>
                
                <tr>
                  <td><strong>QUAD 1.5</strong></td>
                  <td>$739/mo</td>
                  <td>$1,750</td>
                  <td>90</td>
                  <td>+ Commercial lines, QuickBooks integration</td>
                </tr>
                
                <tr className="highlighted">
                  <td><strong>QUAD 2.0</strong></td>
                  <td>$799/mo</td>
                  <td>$2,250</td>
                  <td>125</td>
                  <td>+ Umbrella coverage, Advanced analytics</td>
                </tr>
                
                <tr>
                  <td><strong>QUAD 2.5</strong></td>
                  <td>$864/mo</td>
                  <td>$2,625</td>
                  <td>175</td>
                  <td>+ Flood insurance, NowCerts integration</td>
                </tr>
                
                <tr style={{background: 'rgba(245, 158, 11, 0.1)'}}>
                  <td><strong>QUAD 3.0</strong></td>
                  <td><strong>$929/mo</strong></td>
                  <td>$3,000</td>
                  <td>225</td>
                  <td>+ Recreational, Momentom AMP, Priority support</td>
                </tr>
                
                <tr>
                  <td><strong>QUAD 3.5</strong></td>
                  <td>$994/mo</td>
                  <td>$3,375</td>
                  <td>280</td>
                  <td>+ Specialty lines, AI risk assessment</td>
                </tr>
                
                <tr className="highlighted">
                  <td><strong>QUAD 4.0</strong></td>
                  <td>$1,059/mo</td>
                  <td>$3,750</td>
                  <td>340</td>
                  <td>+ Workers Comp, Multi-state operations</td>
                </tr>
                
                <tr>
                  <td><strong>QUAD 4.5</strong></td>
                  <td>$1,124/mo</td>
                  <td>$4,125</td>
                  <td>405</td>
                  <td>+ Professional liability, Gail Partnership</td>
                </tr>
                
                <tr className="highlighted">
                  <td><strong>QUAD 5.0</strong></td>
                  <td>$1,189/mo</td>
                  <td>$4,500</td>
                  <td>475</td>
                  <td>+ Cyber insurance, Custom workflows</td>
                </tr>
                
                <tr>
                  <td><strong>QUAD 5.5</strong></td>
                  <td>$1,269/mo</td>
                  <td>$4,875</td>
                  <td>510</td>
                  <td>+ E&O coverage, Advanced AI features</td>
                </tr>
                
                <tr className="highlighted">
                  <td><strong>QUAD 6.0</strong></td>
                  <td>$1,349/mo</td>
                  <td>$5,250</td>
                  <td>550</td>
                  <td>+ Directors & Officers, Team management</td>
                </tr>
                
                <tr>
                  <td><strong>QUAD 6.5</strong></td>
                  <td>$1,439/mo</td>
                  <td>$5,625</td>
                  <td>590</td>
                  <td>+ Aviation/Marine, Custom reporting</td>
                </tr>
                
                <tr style={{background: 'rgba(239, 68, 68, 0.1)'}}>
                  <td><strong>QUAD 7.0</strong></td>
                  <td><strong>$1,529/mo</strong></td>
                  <td>$6,000</td>
                  <td>625+</td>
                  <td>Unlimited everything, API, White-label, 24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '2rem', background: 'rgba(79, 70, 229, 0.1)', padding: '1.5rem', borderRadius: '8px'}}>
            <h4 style={{color: '#4f46e5', marginBottom: '1rem'}}>🎯 Smart Upgrade Strategy</h4>
            <p style={{marginBottom: '1rem'}}>Start with any level and upgrade anytime - your buy-in is 100% credited!</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button onClick={handleUpgradeClick} className="btn btn-secondary">Lock in Early Access</button>
              <button onClick={handleContactClick} className="btn btn-primary">Get Custom Quote</button>
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px'}}>
            <p style={{color: '#ef4444', fontWeight: 600, margin: 0}}>⚠️ Early access pricing available now. Lock in lifetime savings!</p>
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