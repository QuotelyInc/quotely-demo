import React, { useState } from 'react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const tokenPackages = [
    { amount: 50, price: 85, savings: 15 },
    { amount: 200, price: 340, savings: 60 },
    { amount: 500, price: 650, savings: 350 },
    { amount: 1000, price: 1200, savings: 800 }
  ];

  return (
    <section style={styles.pricing}>
      <div style={styles.container}>
        {/* Flash Sale Banner */}
        <div style={{ textAlign: 'center' }}>
          <div style={styles.flashSale}>
            <span style={styles.flashIcon}>⚡</span>
            <span style={styles.flashText}>FLASH SALE: Early Adopter Pricing for First 1,000 Customers!</span>
            <span style={styles.flashIcon}>⚡</span>
          </div>
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>Transform Your Insurance Agency with Quotely</h2>
          <p style={styles.subtitle}>
            Join thousands of agents saving 10+ hours per week with our all-in-one platform
          </p>
        </div>

        {/* Core Platform Section */}
        <div style={styles.corePlatform}>
          <div style={styles.platformCard}>
            <div style={styles.platformHeader}>
              <h3 style={styles.platformTitle}>Core Platform</h3>
              <div style={styles.priceWrapper}>
                <div style={styles.originalPrice}>$1,699/month</div>
                <div style={styles.currentPrice}>
                  <span style={styles.currency}>$</span>
                  <span style={styles.amount}>999</span>
                  <span style={styles.period}>/month</span>
                </div>
                <div style={styles.tokenIncluded}>50 tokens included</div>
              </div>
            </div>

            <div style={styles.features}>
              <h4 style={styles.featuresTitle}>Everything You Need to Scale:</h4>
              <div style={styles.featuresGrid}>
                <div style={styles.featureColumn}>
                  <h5 style={styles.featureCategory}>Quote & Bind</h5>
                  <ul style={styles.featuresList}>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Real-time carrier rates
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Multi-carrier comparison
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Instant binding
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Document generation
                    </li>
                  </ul>
                </div>

                <div style={styles.featureColumn}>
                  <h5 style={styles.featureCategory}>CRM & Automation</h5>
                  <ul style={styles.featuresList}>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Lead management
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Automated follow-ups
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Pipeline tracking
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Task automation
                    </li>
                  </ul>
                </div>

                <div style={styles.featureColumn}>
                  <h5 style={styles.featureCategory}>Analytics & Reporting</h5>
                  <ul style={styles.featuresList}>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Performance dashboards
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Commission tracking
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      ROI analytics
                    </li>
                    <li style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      Custom reports
                    </li>
                  </ul>
                </div>
              </div>

              <div style={styles.additionalFeatures}>
                <div style={styles.additionalFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Unlimited users & team collaboration
                </div>
                <div style={styles.additionalFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  White-label client portal
                </div>
                <div style={styles.additionalFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  24/7 priority support
                </div>
                <div style={styles.additionalFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  API access & integrations
                </div>
              </div>
            </div>

            <button
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.ctaButtonHover.backgroundColor;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = styles.ctaButton.backgroundColor;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Get Early Access (Save $700/month)
            </button>

            <div style={styles.guarantee}>
              <span style={styles.guaranteeIcon}>🛡️</span>
              No setup fees • Cancel anytime
            </div>
          </div>
        </div>

        {/* Token Packages Section */}
        <div style={styles.tokenSection}>
          <h3 style={styles.tokenTitle}>Need More Tokens?</h3>
          <p style={styles.tokenSubtitle}>
            Add token packages anytime. Each token = 1 quote submission.
          </p>
          
          <div style={styles.tokenGrid}>
            {tokenPackages.map((pkg, index) => (
              <div key={index} style={styles.tokenCard}>
                <div style={styles.tokenAmount}>{pkg.amount} tokens</div>
                <div style={styles.tokenPrice}>${pkg.price}</div>
                <div style={styles.tokenSavings}>Save ${pkg.savings}</div>
                <div style={styles.tokenPerUnit}>${(pkg.price / pkg.amount).toFixed(2)} per token</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.urgency}>
            <span style={styles.urgencyIcon}>🔥</span>
            <span style={styles.urgencyText}>
              Limited Time: Lock in your early adopter rate forever!
            </span>
          </div>
          
          <div style={styles.trustIndicators}>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🔒</span>
              <span>Bank-level Security</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>⚡</span>
              <span>10x Faster Quotes</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>📈</span>
              <span>30% Revenue Growth</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🏆</span>
              <span>Trusted by 5,000+ Agents</span>
            </div>
          </div>

          <p style={styles.footerText}>
            Questions? <a href="/contact" style={styles.footerLink}>Schedule a personalized demo</a> 
            or call us at 918-794-6993
          </p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  pricing: {
    padding: '120px 0',
    backgroundColor: '#f8fafc',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  flashSale: {
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    margin: '0 auto 40px',
    animation: 'pulse 2s infinite',
    boxShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
  },
  flashIcon: {
    fontSize: '1.2rem'
  },
  flashText: {
    fontWeight: '600',
    fontSize: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#6c757d',
    maxWidth: '600px',
    margin: '0 auto'
  },
  corePlatform: {
    marginBottom: '60px'
  },
  platformCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '48px',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
    border: '2px solid #ff6600',
    position: 'relative'
  },
  platformHeader: {
    marginBottom: '40px',
    textAlign: 'center'
  },
  platformTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '24px'
  },
  priceWrapper: {
    position: 'relative'
  },
  originalPrice: {
    fontSize: '1.2rem',
    color: '#6c757d',
    textDecoration: 'line-through',
    marginBottom: '8px'
  },
  currentPrice: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: '8px'
  },
  currency: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#ff6600'
  },
  amount: {
    fontSize: '4rem',
    fontWeight: '700',
    color: '#ff6600'
  },
  period: {
    fontSize: '1.5rem',
    color: '#6c757d',
    marginLeft: '8px'
  },
  tokenIncluded: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.95rem',
    fontWeight: '600',
    display: 'inline-block'
  },
  features: {
    marginBottom: '40px'
  },
  featuresTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '32px',
    textAlign: 'center'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '32px'
  },
  featureColumn: {
    textAlign: 'left'
  },
  featureCategory: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1a3a6e',
    marginBottom: '16px'
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '12px',
    fontSize: '0.95rem',
    color: '#495057'
  },
  checkIcon: {
    color: '#28a745',
    fontWeight: '700',
    fontSize: '1.1rem',
    flexShrink: 0
  },
  additionalFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    padding: '24px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px'
  },
  additionalFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.95rem',
    color: '#495057'
  },
  ctaButton: {
    width: '100%',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '16px',
    backgroundColor: '#ff6600',
    color: 'white',
    boxShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
  },
  ctaButtonHover: {
    backgroundColor: '#ff8533'
  },
  guarantee: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#6c757d'
  },
  guaranteeIcon: {
    fontSize: '1rem'
  },
  tokenSection: {
    marginBottom: '60px',
    textAlign: 'center'
  },
  tokenTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '12px'
  },
  tokenSubtitle: {
    fontSize: '1.1rem',
    color: '#6c757d',
    marginBottom: '40px'
  },
  tokenGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  tokenCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease'
  },
  tokenAmount: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '8px'
  },
  tokenPrice: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#ff6600',
    marginBottom: '4px'
  },
  tokenSavings: {
    fontSize: '0.9rem',
    color: '#28a745',
    fontWeight: '600',
    marginBottom: '8px'
  },
  tokenPerUnit: {
    fontSize: '0.85rem',
    color: '#6c757d'
  },
  footer: {
    textAlign: 'center'
  },
  urgency: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '12px 24px',
    borderRadius: '8px',
    marginBottom: '40px'
  },
  urgencyIcon: {
    fontSize: '1.2rem'
  },
  urgencyText: {
    fontWeight: '600'
  },
  footerText: {
    fontSize: '1.1rem',
    color: '#6c757d',
    marginTop: '32px'
  },
  footerLink: {
    color: '#ff6600',
    textDecoration: 'none',
    fontWeight: '600'
  },
  trustIndicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    flexWrap: 'wrap',
    marginBottom: '32px'
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    color: '#495057'
  },
  trustIcon: {
    fontSize: '1.2rem'
  }
};

export default Pricing;