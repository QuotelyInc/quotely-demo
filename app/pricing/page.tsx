'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/Footer'

function PricingPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('pricing', {
      section: 'pricing',
      content_type: 'pricing_plans'
    })
  }, [trackPageView])

  const handlePlanClick = (plan: string) => {
    trackUserAction('pricing_plan_clicked', {
      plan: plan,
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
        
        .contact-pricing {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary);
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
          border-radius: 0.75rem;
          border: 1px solid var(--primary);
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
        }
      `}</style>

      <MinimalNav />

      {/* Pricing Hero */}
      <section className="pricing-hero">
        <div className="container">
          <div className="early-access-badge">
            🔥 Exclusive Early Access Available
          </div>
          <h1>Flexible QUAD Pricing Plans</h1>
          <p>Choose your perfect tier with customized solutions for agencies of all sizes</p>
        </div>
      </section>

      {/* AI Automation Metrics */}
      <section className="section" style={{background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'white', padding: '4rem 0'}}>
        <div className="container">
          <div className="section-header" style={{marginBottom: '3rem'}}>
            <h2 style={{color: 'white', fontSize: '2.5rem', marginBottom: '1rem'}}>AI-Powered Automation Metrics</h2>
            <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem'}}>See how our neural networks transform your agency's efficiency</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem'}}>10,247</div>
              <div style={{fontSize: '1rem', opacity: 0.9}}>AI Decisions/Second</div>
              <div style={{fontSize: '0.875rem', marginTop: '0.5rem', color: '#90EE90'}}>↑ 45% vs Traditional</div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem'}}>99.8%</div>
              <div style={{fontSize: '1rem', opacity: 0.9}}>Model Accuracy</div>
              <div style={{fontSize: '0.875rem', marginTop: '0.5rem', color: '#90EE90'}}>Industry Leading</div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem'}}>0.3s</div>
              <div style={{fontSize: '1rem', opacity: 0.9}}>Quote Generation</div>
              <div style={{fontSize: '0.875rem', marginTop: '0.5rem', color: '#90EE90'}}>Real-time Processing</div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '0.5rem'}}>Proven</div>
              <div style={{fontSize: '1rem', opacity: 0.9}}>ROI Improvement</div>
              <div style={{fontSize: '0.875rem', marginTop: '0.5rem', color: '#90EE90'}}>From Automation</div>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'white'}}>AI Features Included in All QUAD Tiers</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              fontSize: '0.95rem'
            }}>
              <div>✓ Neural Quote Engine</div>
              <div>✓ Predictive Analytics</div>
              <div>✓ Risk Assessment AI</div>
              <div>✓ Document Processing NLP</div>
              <div>✓ Fraud Detection</div>
              <div>✓ Carrier Matching AI</div>
              <div>✓ Real-time Learning</div>
              <div>✓ AI Transparency Dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured QUAD Tiers */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured QUAD Tiers</h2>
            <p>Start anywhere, upgrade anytime with flexible options</p>
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
                <div className="contact-pricing">Contact for Pricing</div>
              </div>
              
              <ul className="feature-list">
                <li>Monthly Quote Allocation</li>
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
                <h4>💡 Flexible Upgrade Path</h4>
                <p>Start here and upgrade anytime as your agency grows</p>
              </div>
              
              <button 
                onClick={() => {
                  handlePlanClick('QUAD 1.0')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 1.0 Pricing Inquiry'
                }} 
                className="btn btn-primary" 
                style={{width: '100%'}}
              >
                Get QUAD 1.0 Pricing
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
                <div className="contact-pricing">Contact for Pricing</div>
              </div>
              
              <ul className="feature-list">
                <li>Increased Quote Volume</li>
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
                <h4>💡 Scalable Solution</h4>
                <p>Perfect balance of features and value for growing teams</p>
              </div>
              
              <button 
                onClick={() => {
                  handlePlanClick('QUAD 3.0')
                  window.location.href = 'mailto:sales@quotely.com?subject=QUAD 3.0 Pricing Inquiry'
                }} 
                className="btn btn-primary" 
                style={{width: '100%'}}
              >
                Get QUAD 3.0 Pricing
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
                <div className="contact-pricing">Contact for Pricing</div>
              </div>
              
              <ul className="feature-list">
                <li>Unlimited Quote Volume</li>
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
                <p>Enterprise level solution with unlimited capabilities</p>
              </div>
              
              <button 
                onClick={() => {
                  handlePlanClick('QUAD 7.0')
                  window.location.href = 'mailto:enterprise@quotely.com?subject=QUAD 7.0 Enterprise Pricing'
                }} 
                className="btn btn-primary" 
                style={{width: '100%'}}
              >
                Get Enterprise Pricing
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
                <th>Quote Volume</th>
                <th>Features</th>
                <th>Support Level</th>
                <th>Best For</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="highlight-row">
                <td><strong>QUAD 1.0</strong></td>
                <td>Starter Volume</td>
                <td>Core Features</td>
                <td>Basic Support</td>
                <td>New agencies, testing platform</td>
                <td><a href="mailto:sales@quotely.com?subject=QUAD 1.0">Contact Sales</a></td>
              </tr>
              <tr>
                <td><strong>QUAD 2.0</strong></td>
                <td>Small Agency Volume</td>
                <td>Enhanced Features</td>
                <td>Standard Support</td>
                <td>Small agencies</td>
                <td><a href="mailto:sales@quotely.com?subject=QUAD 2.0">Contact Sales</a></td>
              </tr>
              <tr className="highlight-row">
                <td><strong>QUAD 3.0</strong></td>
                <td>Growing Agency Volume</td>
                <td>Premium Features</td>
                <td>Premium Support</td>
                <td>Growing agencies</td>
                <td><a href="mailto:sales@quotely.com?subject=QUAD 3.0">Contact Sales</a></td>
              </tr>
              <tr>
                <td><strong>QUAD 4.0</strong></td>
                <td>Established Volume</td>
                <td>Advanced Features</td>
                <td>Priority Support</td>
                <td>Established agencies</td>
                <td><a href="mailto:sales@quotely.com?subject=QUAD 4.0">Contact Sales</a></td>
              </tr>
              <tr>
                <td><strong>QUAD 5.0</strong></td>
                <td>High Volume</td>
                <td>Professional Features</td>
                <td>Dedicated Support</td>
                <td>High-volume agencies</td>
                <td><a href="mailto:sales@quotely.com?subject=QUAD 5.0">Contact Sales</a></td>
              </tr>
              <tr className="enterprise-row">
                <td><strong>QUAD 6.0</strong></td>
                <td>Enterprise Volume</td>
                <td>Enterprise Features</td>
                <td>24/7 Support</td>
                <td>Enterprise agencies</td>
                <td><a href="mailto:sales@quotely.com?subject=QUAD 6.0">Contact Sales</a></td>
              </tr>
              <tr className="enterprise-row">
                <td><strong>QUAD 7.0</strong></td>
                <td>Unlimited</td>
                <td>All Features + Custom</td>
                <td>White Glove Support</td>
                <td>Ultimate enterprise</td>
                <td><a href="mailto:enterprise@quotely.com?subject=QUAD 7.0">Contact Sales</a></td>
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
              <div className="addon-description">
                Full CRM functionality with lead management, pipeline tracking, and automated follow-ups. 
                Seamlessly integrated with QUAD platform for complete client lifecycle management.
                <br /><br />
                <strong>Contact for pricing details</strong>
              </div>
            </div>
            
            <div className="addon-card">
              <h3>SEO Package</h3>
              <div className="addon-description">
                Tier-based SEO services to boost your agency's online presence.
                Customized strategies based on your QUAD tier and agency size.
                <br /><br />
                <strong>Contact for pricing details</strong>
              </div>
            </div>
            
            <div className="addon-card">
              <h3>RingCentral VOIP</h3>
              <div className="addon-description">
                Professional phone system with full QUAD integration, call recording, analytics, 
                and automatic client data population from calls.
                <br /><br />
                <strong>Contact for pricing details</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>🎯 Get Your Custom Pricing Today</h2>
          <p>
            Contact our sales team for personalized pricing based on your agency's needs
          </p>
          <div className="cta-buttons">
            <button 
              onClick={() => {
                handleContactClick()
                window.location.href = 'mailto:sales@quotely.com?subject=QUAD Pricing Inquiry'
              }}
              className="btn btn-primary"
            >
              Get Custom Quote
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