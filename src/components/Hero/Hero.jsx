import React from 'react';
import { EarlySignupButton } from '../EarlySignupForm/EarlySignupForm';

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.textContent}>
            <h1 style={styles.title}>
              Transform Your Insurance Agency with{' '}
              <span style={styles.highlight}>Quotely</span>
            </h1>
            <p style={styles.subtitle}>
              Streamline your quote process, increase conversions, and grow your revenue 
              with our intelligent insurance platform. Join thousands of agents who've 
              already revolutionized their business.
            </p>
            
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>300%</span>
                <span style={styles.statLabel}>Faster Quotes</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>85%</span>
                <span style={styles.statLabel}>Higher Conversion</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>$2.5M+</span>
                <span style={styles.statLabel}>Revenue Generated</span>
              </div>
            </div>

            <div style={styles.ctaContainer}>
              <EarlySignupButton 
                buttonStyle={styles.primaryButton}
              >
                Get Early Access
                <span style={styles.buttonIcon}>→</span>
              </EarlySignupButton>
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
                Calculate ROI
              </a>
            </div>

            <div style={styles.trustIndicators}>
              <p style={styles.trustText}>Trusted by 10,000+ insurance professionals</p>
              <div style={styles.trustLogos}>
                <div style={styles.trustLogo}>Progressive</div>
                <div style={styles.trustLogo}>State Farm</div>
                <div style={styles.trustLogo}>Allstate</div>
                <div style={styles.trustLogo}>Geico</div>
              </div>
            </div>
          </div>

          <div style={styles.visualContent}>
            <div style={styles.heroImage}>
              <div style={styles.dashboardMockup}>
                <div style={styles.mockupHeader}>
                  <div style={styles.mockupDots}>
                    <span style={{ ...styles.dot, backgroundColor: '#ff5f57' }}></span>
                    <span style={{ ...styles.dot, backgroundColor: '#ffbd2e' }}></span>
                    <span style={{ ...styles.dot, backgroundColor: '#28ca42' }}></span>
                  </div>
                  <span style={styles.mockupTitle}>Quotely Dashboard</span>
                </div>
                <div style={styles.mockupContent}>
                  <div style={styles.mockupRow}>
                    <div style={styles.mockupCard}>
                      <div style={styles.mockupCardHeader}>Quotes Today</div>
                      <div style={styles.mockupCardValue}>247</div>
                      <div style={styles.mockupCardTrend}>+23% ↗</div>
                    </div>
                    <div style={styles.mockupCard}>
                      <div style={styles.mockupCardHeader}>Conversions</div>
                      <div style={styles.mockupCardValue}>89%</div>
                      <div style={styles.mockupCardTrend}>+12% ↗</div>
                    </div>
                  </div>
                  <div style={styles.mockupChart}>
                    <div style={styles.chartBars}>
                      <div style={{ ...styles.chartBar, height: '60%' }}></div>
                      <div style={{ ...styles.chartBar, height: '80%' }}></div>
                      <div style={{ ...styles.chartBar, height: '45%' }}></div>
                      <div style={{ ...styles.chartBar, height: '90%' }}></div>
                      <div style={{ ...styles.chartBar, height: '75%' }}></div>
                      <div style={{ ...styles.chartBar, height: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={styles.floatingElements}>
              <div style={{ ...styles.floatingCard, ...styles.floating1 }}>
                <div style={styles.floatingIcon}>📊</div>
                <span>Real-time Analytics</span>
              </div>
              <div style={{ ...styles.floatingCard, ...styles.floating2 }}>
                <div style={styles.floatingIcon}>⚡</div>
                <span>Instant Quotes</span>
              </div>
              <div style={{ ...styles.floatingCard, ...styles.floating3 }}>
                <div style={styles.floatingIcon}>🎯</div>
                <span>Smart Targeting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1a3a6e 0%, #112b50 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '70px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    width: '100%'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    minHeight: '80vh',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '40px',
      textAlign: 'center'
    }
  },
  textContent: {
    color: 'white'
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '700',
    lineHeight: '1.1',
    marginBottom: '24px',
    color: 'white'
  },
  highlight: {
    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '1.25rem',
    lineHeight: '1.6',
    marginBottom: '32px',
    opacity: 0.9,
    maxWidth: '500px'
  },
  stats: {
    display: 'flex',
    gap: '32px',
    marginBottom: '40px',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    }
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media (max-width: 968px)': {
      alignItems: 'center'
    }
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ff6600'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.8
  },
  ctaContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '48px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  primaryButton: {
    backgroundColor: '#ff6600',
    color: '#ffffff',
    padding: '16px 32px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 20px rgba(255, 102, 0, 0.3)'
  },
  primaryButtonHover: {
    backgroundColor: '#ff8533',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(255, 102, 0, 0.4)'
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
  buttonIcon: {
    fontSize: '1.2rem',
    transition: 'transform 0.2s ease'
  },
  trustIndicators: {
    marginTop: '24px'
  },
  trustText: {
    fontSize: '0.9rem',
    opacity: 0.8,
    marginBottom: '16px'
  },
  trustLogos: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    '@media (max-width: 968px)': {
      justifyContent: 'center'
    }
  },
  trustLogo: {
    padding: '8px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  visualContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  heroImage: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px'
  },
  dashboardMockup: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    transform: 'perspective(1000px) rotateY(-5deg) rotateX(10deg)',
    transition: 'transform 0.3s ease'
  },
  mockupHeader: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  mockupDots: {
    display: 'flex',
    gap: '6px'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  mockupTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  mockupContent: {
    padding: '24px'
  },
  mockupRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px'
  },
  mockupCard: {
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  mockupCardHeader: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '8px'
  },
  mockupCardValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px'
  },
  mockupCardTrend: {
    fontSize: '12px',
    color: '#059669',
    fontWeight: '600'
  },
  mockupChart: {
    height: '100px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    alignItems: 'end'
  },
  chartBars: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    height: '100%',
    alignItems: 'end'
  },
  chartBar: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: '2px 2px 0 0',
    minHeight: '20%'
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  },
  floatingCard: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    animation: 'float 6s ease-in-out infinite'
  },
  floating1: {
    top: '10%',
    right: '10%',
    animationDelay: '0s'
  },
  floating2: {
    top: '60%',
    left: '-10%',
    animationDelay: '2s'
  },
  floating3: {
    bottom: '20%',
    right: '-5%',
    animationDelay: '4s'
  },
  floatingIcon: {
    fontSize: '1.2rem'
  }
};

// Add CSS animation for floating elements
const floatAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

// Inject the animation into the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = floatAnimation;
  document.head.appendChild(style);
}

export default Hero;