import React from 'react';
import Pricing from '../../components/Pricing/Pricing';

const PricingPage = () => {
  return (
    <div style={styles.pricingPage}>
      <PricingHero />
      <Pricing />
      <ComparisonSection />
      <FAQSection />
    </div>
  );
};

// Pricing Hero Section
const PricingHero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Simple, Transparent Pricing
          </h1>
          <p style={styles.heroSubtitle}>
            Choose the perfect plan for your agency. All plans include our core features, 
            14-day free trial, and 24/7 customer support. No hidden fees, no surprises.
          </p>
          
          <div style={styles.heroFeatures}>
            <div style={styles.heroFeature}>
              <span style={styles.featureIcon}>✅</span>
              <span>14-day free trial</span>
            </div>
            <div style={styles.heroFeature}>
              <span style={styles.featureIcon}>✅</span>
              <span>No setup fees</span>
            </div>
            <div style={styles.heroFeature}>
              <span style={styles.featureIcon}>✅</span>
              <span>Cancel anytime</span>
            </div>
            <div style={styles.heroFeature}>
              <span style={styles.featureIcon}>✅</span>
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Detailed Comparison Section
const ComparisonSection = () => {
  const comparisonData = [
    {
      category: 'Quote Generation',
      features: [
        { name: 'Monthly quote limit', starter: '500', professional: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Quote generation speed', starter: 'Standard', professional: 'Fast', enterprise: 'Fastest' },
        { name: 'Multi-carrier comparison', starter: '✓', professional: '✓', enterprise: '✓' },
        { name: 'Custom quote templates', starter: '✗', professional: '✓', enterprise: '✓' },
        { name: 'White-label quotes', starter: '✗', professional: '✓', enterprise: '✓' }
      ]
    },
    {
      category: 'Analytics & Reporting',
      features: [
        { name: 'Basic analytics dashboard', starter: '✓', professional: '✓', enterprise: '✓' },
        { name: 'Advanced reporting', starter: '✗', professional: '✓', enterprise: '✓' },
        { name: 'Custom reports', starter: '✗', professional: '✗', enterprise: '✓' },
        { name: 'Performance benchmarks', starter: '✗', professional: '✓', enterprise: '✓' },
        { name: 'Revenue tracking', starter: 'Basic', professional: 'Advanced', enterprise: 'Advanced' }
      ]
    },
    {
      category: 'Integrations & API',
      features: [
        { name: 'Standard integrations', starter: '✓', professional: '✓', enterprise: '✓' },
        { name: 'Premium integrations', starter: '✗', professional: '✓', enterprise: '✓' },
        { name: 'API access', starter: '✗', professional: '✓', enterprise: '✓' },
        { name: 'Custom integrations', starter: '✗', professional: '✗', enterprise: '✓' },
        { name: 'Webhook support', starter: '✗', professional: '✓', enterprise: '✓' }
      ]
    },
    {
      category: 'Support & Training',
      features: [
        { name: 'Email support', starter: '✓', professional: '✓', enterprise: '✓' },
        { name: 'Priority support', starter: '✗', professional: '✓', enterprise: '✓' },
        { name: 'Phone support', starter: '✗', professional: '✗', enterprise: '✓' },
        { name: 'Dedicated account manager', starter: '✗', professional: '✗', enterprise: '✓' },
        { name: 'Custom training', starter: '✗', professional: '✗', enterprise: '✓' }
      ]
    }
  ];

  return (
    <section style={styles.comparison}>
      <div style={styles.container}>
        <div style={styles.comparisonHeader}>
          <h2 style={styles.comparisonTitle}>Detailed Feature Comparison</h2>
          <p style={styles.comparisonSubtitle}>
            Compare all features across our plans to find the perfect fit for your agency.
          </p>
        </div>

        <div style={styles.comparisonTable}>
          <div style={styles.tableHeader}>
            <div style={styles.featureColumn}>Features</div>
            <div style={styles.planColumn}>
              <div style={styles.planName}>Starter</div>
              <div style={styles.planPrice}>$299/mo</div>
            </div>
            <div style={styles.planColumn}>
              <div style={styles.planName}>Professional</div>
              <div style={styles.planPrice}>$799/mo</div>
              <div style={styles.popularBadge}>Most Popular</div>
            </div>
            <div style={styles.planColumn}>
              <div style={styles.planName}>Enterprise</div>
              <div style={styles.planPrice}>$1,999/mo</div>
            </div>
          </div>

          {comparisonData.map((category, categoryIndex) => (
            <div key={categoryIndex} style={styles.categorySection}>
              <div style={styles.categoryTitle}>{category.category}</div>
              
              {category.features.map((feature, featureIndex) => (
                <div key={featureIndex} style={styles.featureRow}>
                  <div style={styles.featureName}>{feature.name}</div>
                  <div style={styles.featureValue}>{feature.starter}</div>
                  <div style={styles.featureValue}>{feature.professional}</div>
                  <div style={styles.featureValue}>{feature.enterprise}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section specific to pricing
const FAQSection = () => {
  const pricingFAQs = [
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial for all plans. No credit card required to start. You'll have access to all features during your trial period."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and ACH bank transfers for annual plans. All payments are processed securely through Stripe."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees ever. The price you see is the price you pay. We believe in transparent, straightforward pricing with no hidden costs."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes! Save 10% when you choose annual billing. You'll pay for 10 months and get 12 months of service. This discount applies to all plans."
    }
  ];

  return (
    <section style={styles.faqSection}>
      <div style={styles.container}>
        <div style={styles.faqHeader}>
          <h2 style={styles.faqTitle}>Pricing FAQs</h2>
          <p style={styles.faqSubtitle}>
            Common questions about our pricing and billing.
          </p>
        </div>

        <div style={styles.faqGrid}>
          {pricingFAQs.map((faq, index) => (
            <div key={index} style={styles.faqCard}>
              <h3 style={styles.faqQuestion}>{faq.question}</h3>
              <p style={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  pricingPage: {
    paddingTop: '70px'
  },
  hero: {
    padding: '80px 0',
    backgroundColor: '#f8fafc',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '24px'
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '40px'
  },
  heroFeatures: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap'
  },
  heroFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.1rem',
    color: '#374151'
  },
  featureIcon: {
    color: '#10b981',
    fontSize: '1.2rem'
  },
  comparison: {
    padding: '120px 0',
    backgroundColor: 'white'
  },
  comparisonHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  comparisonTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  comparisonSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b'
  },
  comparisonTable: {
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  featureColumn: {
    padding: '24px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  planColumn: {
    padding: '24px',
    textAlign: 'center',
    position: 'relative'
  },
  planName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '4px'
  },
  planPrice: {
    fontSize: '1rem',
    color: '#2563eb',
    fontWeight: '600'
  },
  popularBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: '600'
  },
  categorySection: {
    borderBottom: '1px solid #f1f5f9'
  },
  categoryTitle: {
    padding: '20px 24px',
    backgroundColor: '#f8fafc',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    borderBottom: '1px solid #e2e8f0'
  },
  featureRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    borderBottom: '1px solid #f1f5f9'
  },
  featureName: {
    padding: '16px 24px',
    fontSize: '0.95rem',
    color: '#374151'
  },
  featureValue: {
    padding: '16px 24px',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#1e293b',
    fontWeight: '500'
  },
  faqSection: {
    padding: '120px 0',
    backgroundColor: '#f8fafc'
  },
  faqHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  faqTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  faqSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b'
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px'
  },
  faqCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  faqQuestion: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '12px'
  },
  faqAnswer: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0
  }
};

export default PricingPage;