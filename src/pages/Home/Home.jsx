import React from 'react';
import Hero from '../../components/Hero/Hero';
import Pricing from '../../components/Pricing/Pricing';
import FAQ from '../../components/FAQ/FAQ';

const Home = () => {
  return (
    <div style={styles.home}>
      <Hero />
      <FeaturesSection />
      <Pricing />
      <FAQ />
    </div>
  );
};

// Features section component
const FeaturesSection = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast Quotes',
      description: 'Generate accurate insurance quotes in under 60 seconds with our intelligent automation platform.',
      benefits: ['Real-time carrier rates', '99.2% accuracy', 'Multi-carrier comparison', 'Mobile optimized']
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Get deep insights into your business performance with comprehensive reporting and analytics.',
      benefits: ['Revenue tracking', 'Conversion metrics', 'Performance benchmarks', 'Custom dashboards']
    },
    {
      icon: '🎯',
      title: 'Smart Lead Management',
      description: 'Automatically score, route, and nurture leads to maximize your conversion potential.',
      benefits: ['Lead scoring', 'Auto-routing', 'Follow-up automation', 'CRM integration']
    },
    {
      icon: '🔗',
      title: 'Seamless Integrations',
      description: 'Connect with your existing tools and carriers for a unified workflow experience.',
      benefits: ['50+ carrier integrations', 'CRM connectivity', 'API access', 'Custom workflows']
    },
    {
      icon: '📱',
      title: 'Mobile First Design',
      description: 'Work from anywhere with our fully responsive platform and native mobile apps.',
      benefits: ['iOS & Android apps', 'Offline capability', 'Cloud sync', 'Touch optimized']
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      description: 'Protect your business and customer data with bank-level security and compliance.',
      benefits: ['SOC 2 certified', 'GDPR compliant', '256-bit encryption', 'Regular audits']
    }
  ];

  return (
    <section style={styles.features}>
      <div style={styles.container}>
        <div style={styles.featuresHeader}>
          <h2 style={styles.featuresTitle}>Everything You Need to Grow Your Agency</h2>
          <p style={styles.featuresSubtitle}>
            Quotely combines powerful automation, intelligent insights, and seamless integrations 
            to help insurance agents work smarter and grow faster.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
              
              <ul style={styles.benefitsList}>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} style={styles.benefitItem}>
                    <span style={styles.checkIcon}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          <div style={styles.statsHeader}>
            <h3 style={styles.statsTitle}>Trusted by Insurance Professionals Worldwide</h3>
          </div>
          
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>10,000+</div>
              <div style={styles.statLabel}>Active Agents</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>2.5M+</div>
              <div style={styles.statLabel}>Quotes Generated</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>$500M+</div>
              <div style={styles.statLabel}>Premiums Written</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>99.9%</div>
              <div style={styles.statLabel}>Uptime</div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div style={styles.testimonialSection}>
          <div style={styles.testimonial}>
            <div style={styles.testimonialContent}>
              <div style={styles.testimonialQuote}>
                "Quotely has completely transformed our agency. We've increased our quote volume by 200% 
                and our conversion rate by 40%. The time savings alone have paid for the platform ten times over."
              </div>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorInfo}>
                  <div style={styles.authorName}>Sarah Johnson</div>
                  <div style={styles.authorTitle}>Owner, Johnson Insurance Agency</div>
                </div>
                <div style={styles.authorRating}>
                  <span style={styles.stars}>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div style={styles.ctaContent}>
            <h3 style={styles.ctaTitle}>Ready to Transform Your Agency?</h3>
            <p style={styles.ctaDescription}>
              Join thousands of agents who've already revolutionized their business with Quotely. 
              Start your free trial today - no credit card required.
            </p>
            <div style={styles.ctaButtons}>
              <a 
                href="/pricing" 
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.primaryButtonHover.backgroundColor;
                  e.target.style.transform = styles.primaryButtonHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.primaryButton.backgroundColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Start Free Trial
                <span style={styles.buttonArrow}>→</span>
              </a>
              <a 
                href="/calculator" 
                style={styles.secondaryButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.secondaryButtonHover.backgroundColor;
                  e.target.style.borderColor = styles.secondaryButtonHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.secondaryButton.backgroundColor;
                  e.target.style.borderColor = styles.secondaryButton.borderColor;
                }}
              >
                Calculate Your ROI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  home: {
    minHeight: '100vh'
  },
  features: {
    padding: '120px 0',
    backgroundColor: 'white'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  featuresHeader: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  featuresTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  featuresSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '32px',
    marginBottom: '100px'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px'
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  benefitsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '0.9rem',
    color: '#374151'
  },
  checkIcon: {
    color: '#10b981',
    fontWeight: '700',
    fontSize: '1rem'
  },
  statsSection: {
    textAlign: 'center',
    marginBottom: '100px'
  },
  statsHeader: {
    marginBottom: '48px'
  },
  statsTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px'
  },
  statCard: {
    padding: '24px',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '1.1rem',
    color: '#64748b',
    fontWeight: '500'
  },
  testimonialSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '60px 40px',
    marginBottom: '100px',
    border: '1px solid #e2e8f0'
  },
  testimonial: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  },
  testimonialContent: {},
  testimonialQuote: {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#1e293b',
    lineHeight: '1.5',
    marginBottom: '32px',
    fontStyle: 'italic'
  },
  testimonialAuthor: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      gap: '16px'
    }
  },
  authorInfo: {
    textAlign: 'left',
    '@media (max-width: 640px)': {
      textAlign: 'center'
    }
  },
  authorName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  authorTitle: {
    fontSize: '0.95rem',
    color: '#64748b'
  },
  authorRating: {},
  stars: {
    fontSize: '1.2rem'
  },
  ctaSection: {
    backgroundColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
    color: 'white'
  },
  ctaContent: {},
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '16px'
  },
  ctaDescription: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto 32px'
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  primaryButton: {
    backgroundColor: 'white',
    color: '#2563eb',
    padding: '16px 32px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  primaryButtonHover: {
    backgroundColor: '#f1f5f9',
    transform: 'translateY(-2px)'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  },
  secondaryButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  buttonArrow: {
    fontSize: '1.2rem',
    transition: 'transform 0.2s ease'
  }
};

export default Home;