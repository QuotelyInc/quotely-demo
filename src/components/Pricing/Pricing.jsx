import React, { useState } from 'react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for independent agents getting started',
      monthlyPrice: 299,
      yearlyPrice: 2690, // 10% discount
      features: [
        'Up to 500 quotes per month',
        'Basic analytics dashboard',
        'Email support',
        'Mobile app access',
        'Standard integrations',
        'Basic CRM features',
        'Quote comparison tools',
        'Client portal access'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing agencies and teams',
      monthlyPrice: 799,
      yearlyPrice: 7190, // 10% discount
      features: [
        'Unlimited quotes',
        'Advanced analytics & reporting',
        'Priority support',
        'Team collaboration tools',
        'Premium integrations',
        'Advanced CRM features',
        'Custom quote templates',
        'White-label options',
        'Lead scoring & routing',
        'Automated follow-ups',
        'Performance benchmarks',
        'API access'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      description: 'For large agencies and enterprise solutions',
      monthlyPrice: 1999,
      yearlyPrice: 17990, // 10% discount
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'Advanced security features',
        'Multi-location support',
        'Custom reporting',
        'Training & onboarding',
        'SLA guarantee',
        'Data migration assistance',
        'Compliance tools',
        'Enterprise SSO'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const getPrice = (plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12);
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlySavings = monthlyCost - plan.yearlyPrice;
    return Math.floor(yearlySavings);
  };

  return (
    <section style={styles.pricing}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Choose Your Perfect Plan</h2>
          <p style={styles.subtitle}>
            Scale your insurance business with flexible pricing that grows with you. 
            All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div style={styles.billingToggle}>
            <span style={{
              ...styles.billingLabel,
              ...(billingPeriod === 'monthly' ? styles.billingLabelActive : {})
            }}>
              Monthly
            </span>
            <button
              style={{
                ...styles.toggleSwitch,
                ...(billingPeriod === 'yearly' ? styles.toggleSwitchActive : {})
              }}
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div style={{
                ...styles.toggleButton,
                ...(billingPeriod === 'yearly' ? styles.toggleButtonActive : {})
              }}></div>
            </button>
            <span style={{
              ...styles.billingLabel,
              ...(billingPeriod === 'yearly' ? styles.billingLabelActive : {})
            }}>
              Yearly <span style={styles.saveBadge}>Save 10%</span>
            </span>
          </div>
        </div>

        <div style={styles.plansContainer}>
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                ...styles.planCard,
                ...(plan.popular ? styles.planCardPopular : {})
              }}
            >
              {plan.popular && (
                <div style={styles.popularBadge}>Most Popular</div>
              )}

              <div style={styles.planHeader}>
                <h3 style={styles.planName}>{plan.name}</h3>
                <p style={styles.planDescription}>{plan.description}</p>
                
                <div style={styles.priceContainer}>
                  <div style={styles.price}>
                    <span style={styles.currency}>$</span>
                    <span style={styles.amount}>{getPrice(plan).toLocaleString()}</span>
                    <span style={styles.period}>/month</span>
                  </div>
                  
                  {billingPeriod === 'yearly' && (
                    <div style={styles.yearlyNote}>
                      Billed annually • Save ${getSavings(plan).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.features}>
                <h4 style={styles.featuresTitle}>Everything you need:</h4>
                <ul style={styles.featuresList}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                style={{
                  ...styles.ctaButton,
                  ...(plan.popular ? styles.ctaButtonPopular : styles.ctaButtonDefault)
                }}
                onMouseEnter={(e) => {
                  if (plan.popular) {
                    e.target.style.backgroundColor = styles.ctaButtonPopularHover.backgroundColor;
                  } else {
                    e.target.style.backgroundColor = styles.ctaButtonDefaultHover.backgroundColor;
                    e.target.style.color = styles.ctaButtonDefaultHover.color;
                  }
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  if (plan.popular) {
                    e.target.style.backgroundColor = styles.ctaButtonPopular.backgroundColor;
                  } else {
                    e.target.style.backgroundColor = styles.ctaButtonDefault.backgroundColor;
                    e.target.style.color = styles.ctaButtonDefault.color;
                  }
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {plan.cta}
              </button>

              <div style={styles.guarantee}>
                <span style={styles.guaranteeIcon}>🛡️</span>
                14-day money-back guarantee
              </div>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Questions about our pricing? <a href="/contact" style={styles.footerLink}>Contact our sales team</a> 
            for a custom quote or to schedule a demo.
          </p>
          
          <div style={styles.trustIndicators}>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🔒</span>
              <span>SOC 2 Compliant</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>📊</span>
              <span>99.9% Uptime</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🏆</span>
              <span>Award-Winning Support</span>
            </div>
          </div>
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
  header: {
    textAlign: 'center',
    marginBottom: '80px'
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
    margin: '0 auto 32px'
  },
  billingToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '32px'
  },
  billingLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6c757d',
    transition: 'color 0.2s ease'
  },
  billingLabelActive: {
    color: '#0077cc'
  },
  toggleSwitch: {
    width: '60px',
    height: '32px',
    borderRadius: '16px',
    border: 'none',
    backgroundColor: '#e2e8f0',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleSwitchActive: {
    backgroundColor: '#ff6600'
  },
  toggleButton: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    top: '2px',
    left: '2px',
    transition: 'transform 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  toggleButtonActive: {
    transform: 'translateX(28px)'
  },
  saveBadge: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginLeft: '8px'
  },
  plansContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '32px',
    marginBottom: '80px'
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    position: 'relative',
    transition: 'all 0.2s ease'
  },
  planCardPopular: {
    border: '2px solid #2563eb',
    boxShadow: '0 8px 40px rgba(37, 99, 235, 0.15)',
    transform: 'scale(1.05)'
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  planHeader: {
    marginBottom: '32px'
  },
  planName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '8px'
  },
  planDescription: {
    color: '#6c757d',
    marginBottom: '24px',
    lineHeight: '1.5'
  },
  priceContainer: {
    marginBottom: '8px'
  },
  price: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: '8px'
  },
  currency: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#212529'
  },
  amount: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#212529'
  },
  period: {
    fontSize: '1.2rem',
    color: '#6c757d',
    marginLeft: '4px'
  },
  yearlyNote: {
    fontSize: '0.9rem',
    color: '#28a745',
    fontWeight: '600'
  },
  features: {
    marginBottom: '32px'
  },
  featuresTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#212529',
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
  ctaButton: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '16px'
  },
  ctaButtonPopular: {
    backgroundColor: '#ff6600',
    color: 'white'
  },
  ctaButtonPopularHover: {
    backgroundColor: '#ff8533'
  },
  ctaButtonDefault: {
    backgroundColor: 'transparent',
    color: '#1a3a6e',
    border: '2px solid #2563eb'
  },
  ctaButtonDefaultHover: {
    backgroundColor: '#ff6600',
    color: 'white'
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
  footer: {
    textAlign: 'center'
  },
  footerText: {
    fontSize: '1.1rem',
    color: '#6c757d',
    marginBottom: '32px'
  },
  footerLink: {
    color: '#1a3a6e',
    textDecoration: 'none',
    fontWeight: '600'
  },
  trustIndicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    flexWrap: 'wrap'
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    color: '#6c757d'
  },
  trustIcon: {
    fontSize: '1.2rem'
  }
};

export default Pricing;