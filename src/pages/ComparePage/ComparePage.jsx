import React, { useState } from 'react';

const ComparePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div style={styles.comparePage}>
      <CompareHero />
      <ComparisonSection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <AlternativesSection />
      <DecisionSection />
    </div>
  );
};

// Hero Section
const CompareHero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Compare Quotely to Other Platforms
          </h1>
          <p style={styles.heroSubtitle}>
            See how Quotely stacks up against other insurance quoting platforms. 
            We believe in transparency, so here's an honest comparison of features, 
            pricing, and capabilities.
          </p>
          
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <span style={styles.statIcon}>🏆</span>
              <span style={styles.statText}>#1 Rated Platform</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.statIcon}>⚡</span>
              <span style={styles.statText}>3x Faster Implementation</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.statIcon}>💰</span>
              <span style={styles.statText}>40% Better ROI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Comparison Section
const ComparisonSection = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'quotes', name: 'Quote Generation' },
    { id: 'integrations', name: 'Integrations' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'support', name: 'Support' },
    { id: 'pricing', name: 'Pricing' }
  ];

  const competitors = [
    { name: 'Quotely', isUs: true },
    { name: 'EZLynx', isUs: false },
    { name: 'Applied Epic', isUs: false },
    { name: 'QQCatalyst', isUs: false },
    { name: 'Hawksoft', isUs: false }
  ];

  const comparisonData = [
    {
      category: 'quotes',
      feature: 'Quote Generation Speed',
      quotely: { value: '< 60 seconds', status: 'excellent' },
      ezlynx: { value: '2-3 minutes', status: 'good' },
      applied: { value: '3-5 minutes', status: 'average' },
      qqcatalyst: { value: '2-4 minutes', status: 'good' },
      hawksoft: { value: '4-6 minutes', status: 'poor' }
    },
    {
      category: 'quotes',
      feature: 'Multi-carrier Comparison',
      quotely: { value: '50+ carriers', status: 'excellent' },
      ezlynx: { value: '30+ carriers', status: 'good' },
      applied: { value: '25+ carriers', status: 'good' },
      qqcatalyst: { value: '20+ carriers', status: 'average' },
      hawksoft: { value: '15+ carriers', status: 'poor' }
    },
    {
      category: 'quotes',
      feature: 'Real-time Rates',
      quotely: { value: '✓', status: 'excellent' },
      ezlynx: { value: '✓', status: 'excellent' },
      applied: { value: '✓', status: 'excellent' },
      qqcatalyst: { value: '✓', status: 'excellent' },
      hawksoft: { value: '✗', status: 'poor' }
    },
    {
      category: 'integrations',
      feature: 'CRM Integrations',
      quotely: { value: '20+', status: 'excellent' },
      ezlynx: { value: '10+', status: 'good' },
      applied: { value: '15+', status: 'good' },
      qqcatalyst: { value: '8+', status: 'average' },
      hawksoft: { value: '5+', status: 'poor' }
    },
    {
      category: 'integrations',
      feature: 'API Access',
      quotely: { value: 'Full REST API', status: 'excellent' },
      ezlynx: { value: 'Limited API', status: 'average' },
      applied: { value: 'Legacy API', status: 'poor' },
      qqcatalyst: { value: 'Basic API', status: 'average' },
      hawksoft: { value: 'No API', status: 'poor' }
    },
    {
      category: 'integrations',
      feature: 'Webhook Support',
      quotely: { value: '✓', status: 'excellent' },
      ezlynx: { value: '✗', status: 'poor' },
      applied: { value: '✗', status: 'poor' },
      qqcatalyst: { value: '✓', status: 'excellent' },
      hawksoft: { value: '✗', status: 'poor' }
    },
    {
      category: 'analytics',
      feature: 'Real-time Dashboard',
      quotely: { value: '✓', status: 'excellent' },
      ezlynx: { value: '✓', status: 'excellent' },
      applied: { value: '✓', status: 'excellent' },
      qqcatalyst: { value: '✓', status: 'excellent' },
      hawksoft: { value: '✗', status: 'poor' }
    },
    {
      category: 'analytics',
      feature: 'Custom Reports',
      quotely: { value: 'Advanced', status: 'excellent' },
      ezlynx: { value: 'Basic', status: 'average' },
      applied: { value: 'Standard', status: 'good' },
      qqcatalyst: { value: 'Basic', status: 'average' },
      hawksoft: { value: 'Limited', status: 'poor' }
    },
    {
      category: 'analytics',
      feature: 'Performance Benchmarks',
      quotely: { value: '✓', status: 'excellent' },
      ezlynx: { value: '✗', status: 'poor' },
      applied: { value: '✗', status: 'poor' },
      qqcatalyst: { value: '✗', status: 'poor' },
      hawksoft: { value: '✗', status: 'poor' }
    },
    {
      category: 'support',
      feature: 'Response Time',
      quotely: { value: '< 2 hours', status: 'excellent' },
      ezlynx: { value: '4-6 hours', status: 'average' },
      applied: { value: '8-12 hours', status: 'poor' },
      qqcatalyst: { value: '6-8 hours', status: 'average' },
      hawksoft: { value: '12-24 hours', status: 'poor' }
    },
    {
      category: 'support',
      feature: '24/7 Support',
      quotely: { value: '✓ (Enterprise)', status: 'good' },
      ezlynx: { value: '✗', status: 'poor' },
      applied: { value: '✓ (Premium)', status: 'good' },
      qqcatalyst: { value: '✗', status: 'poor' },
      hawksoft: { value: '✗', status: 'poor' }
    },
    {
      category: 'support',
      feature: 'Training & Onboarding',
      quotely: { value: 'Comprehensive', status: 'excellent' },
      ezlynx: { value: 'Standard', status: 'good' },
      applied: { value: 'Basic', status: 'average' },
      qqcatalyst: { value: 'Standard', status: 'good' },
      hawksoft: { value: 'Limited', status: 'poor' }
    },
    {
      category: 'pricing',
      feature: 'Starting Price',
      quotely: { value: '$299/month', status: 'good' },
      ezlynx: { value: '$450/month', status: 'poor' },
      applied: { value: '$600/month', status: 'poor' },
      qqcatalyst: { value: '$350/month', status: 'average' },
      hawksoft: { value: '$200/month', status: 'excellent' }
    },
    {
      category: 'pricing',
      feature: 'Setup Fee',
      quotely: { value: '$0', status: 'excellent' },
      ezlynx: { value: '$2,500', status: 'poor' },
      applied: { value: '$5,000', status: 'poor' },
      qqcatalyst: { value: '$1,000', status: 'average' },
      hawksoft: { value: '$1,500', status: 'poor' }
    },
    {
      category: 'pricing',
      feature: 'Contract Length',
      quotely: { value: 'Month-to-month', status: 'excellent' },
      ezlynx: { value: '12 months', status: 'average' },
      applied: { value: '24 months', status: 'poor' },
      qqcatalyst: { value: '12 months', status: 'average' },
      hawksoft: { value: '12 months', status: 'average' }
    }
  ];

  const filteredData = selectedCategory === 'all' 
    ? comparisonData 
    : comparisonData.filter(item => item.category === selectedCategory);

  const getStatusStyle = (status) => {
    const statusStyles = {
      excellent: { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' },
      good: { backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe' },
      average: { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' },
      poor: { backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }
    };
    return statusStyles[status] || statusStyles.average;
  };

  return (
    <section style={styles.comparison}>
      <div style={styles.container}>
        <div style={styles.comparisonHeader}>
          <h2 style={styles.comparisonTitle}>Feature Comparison</h2>
          <p style={styles.comparisonSubtitle}>
            Compare key features across major insurance quoting platforms.
          </p>
          
          <div style={styles.categoryFilter}>
            {categories.map(category => (
              <button
                key={category.id}
                style={{
                  ...styles.filterButton,
                  ...(selectedCategory === category.id ? styles.filterButtonActive : {})
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.comparisonTable}>
          <div style={styles.tableHeader}>
            <div style={styles.featureColumn}>Feature</div>
            {competitors.map(competitor => (
              <div 
                key={competitor.name} 
                style={{
                  ...styles.competitorColumn,
                  ...(competitor.isUs ? styles.ourColumn : {})
                }}
              >
                {competitor.name}
                {competitor.isUs && <span style={styles.ourBadge}>That's Us!</span>}
              </div>
            ))}
          </div>

          <div style={styles.tableBody}>
            {filteredData.map((row, index) => (
              <div key={index} style={styles.tableRow}>
                <div style={styles.featureName}>{row.feature}</div>
                <div style={{
                  ...styles.featureValue,
                  ...getStatusStyle(row.quotely.status),
                  ...(styles.ourValue)
                }}>
                  {row.quotely.value}
                </div>
                <div style={{
                  ...styles.featureValue,
                  ...getStatusStyle(row.ezlynx.status)
                }}>
                  {row.ezlynx.value}
                </div>
                <div style={{
                  ...styles.featureValue,
                  ...getStatusStyle(row.applied.status)
                }}>
                  {row.applied.value}
                </div>
                <div style={{
                  ...styles.featureValue,
                  ...getStatusStyle(row.qqcatalyst.status)
                }}>
                  {row.qqcatalyst.value}
                </div>
                <div style={{
                  ...styles.featureValue,
                  ...getStatusStyle(row.hawksoft.status)
                }}>
                  {row.hawksoft.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.legend}>
          <div style={styles.legendTitle}>Legend:</div>
          <div style={styles.legendItems}>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...getStatusStyle('excellent')}}></div>
              <span>Excellent</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...getStatusStyle('good')}}></div>
              <span>Good</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...getStatusStyle('average')}}></div>
              <span>Average</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{...styles.legendColor, ...getStatusStyle('poor')}}></div>
              <span>Poor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Alternatives Section
const AlternativesSection = () => {
  const alternatives = [
    {
      name: 'EZLynx',
      description: 'Popular choice for established agencies',
      pros: ['Comprehensive features', 'Strong carrier relationships', 'Good reputation'],
      cons: ['Higher pricing', 'Complex setup', 'Steep learning curve'],
      bestFor: 'Large agencies with complex needs'
    },
    {
      name: 'Applied Epic',
      description: 'Enterprise-focused platform',
      pros: ['Enterprise features', 'Customizable workflows', 'Strong reporting'],
      cons: ['Very expensive', 'Long implementation', 'Requires dedicated IT'],
      bestFor: 'Large enterprise agencies'
    },
    {
      name: 'QQCatalyst',
      description: 'Growing platform with modern features',
      pros: ['Modern interface', 'Good API', 'Competitive pricing'],
      cons: ['Smaller carrier network', 'Limited support', 'Newer platform'],
      bestFor: 'Tech-savvy smaller agencies'
    },
    {
      name: 'Hawksoft',
      description: 'Budget-friendly option',
      pros: ['Low cost', 'Simple interface', 'Quick setup'],
      cons: ['Limited features', 'Poor support', 'Outdated technology'],
      bestFor: 'Price-sensitive small agencies'
    }
  ];

  return (
    <section style={styles.alternatives}>
      <div style={styles.container}>
        <div style={styles.alternativesHeader}>
          <h2 style={styles.alternativesTitle}>Honest Look at Alternatives</h2>
          <p style={styles.alternativesSubtitle}>
            We respect our competitors and believe in helping you make the best choice for your business.
          </p>
        </div>

        <div style={styles.alternativesGrid}>
          {alternatives.map((alt, index) => (
            <div key={index} style={styles.alternativeCard}>
              <h3 style={styles.alternativeName}>{alt.name}</h3>
              <p style={styles.alternativeDescription}>{alt.description}</p>
              
              <div style={styles.prosConsContainer}>
                <div style={styles.prosSection}>
                  <h4 style={styles.prosConsTitle}>Pros:</h4>
                  <ul style={styles.prosList}>
                    {alt.pros.map((pro, proIndex) => (
                      <li key={proIndex} style={styles.prosItem}>
                        <span style={styles.prosIcon}>✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={styles.consSection}>
                  <h4 style={styles.prosConsTitle}>Cons:</h4>
                  <ul style={styles.consList}>
                    {alt.cons.map((con, conIndex) => (
                      <li key={conIndex} style={styles.consItem}>
                        <span style={styles.consIcon}>✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div style={styles.bestForSection}>
                <span style={styles.bestForLabel}>Best for: </span>
                <span style={styles.bestForText}>{alt.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Decision Section
const DecisionSection = () => {
  return (
    <section style={styles.decision}>
      <div style={styles.container}>
        <div style={styles.decisionContent}>
          <h2 style={styles.decisionTitle}>Why Choose Quotely?</h2>
          <p style={styles.decisionSubtitle}>
            While every platform has its strengths, here's why thousands of agents choose Quotely:
          </p>
          
          <div style={styles.reasonsGrid}>
            <div style={styles.reasonCard}>
              <div style={styles.reasonIcon}>⚡</div>
              <h3 style={styles.reasonTitle}>Fastest Implementation</h3>
              <p style={styles.reasonDescription}>
                Get up and running in minutes, not months. Our streamlined onboarding 
                gets you generating quotes on day one.
              </p>
            </div>
            
            <div style={styles.reasonCard}>
              <div style={styles.reasonIcon}>💰</div>
              <h3 style={styles.reasonTitle}>Best Value</h3>
              <p style={styles.reasonDescription}>
                No setup fees, no long contracts, and transparent pricing. 
                Pay only for what you use with the flexibility to scale.
              </p>
            </div>
            
            <div style={styles.reasonCard}>
              <div style={styles.reasonIcon}>🚀</div>
              <h3 style={styles.reasonTitle}>Modern Technology</h3>
              <p style={styles.reasonDescription}>
                Built from the ground up with modern technology. Regular updates, 
                mobile-first design, and future-proof architecture.
              </p>
            </div>
            
            <div style={styles.reasonCard}>
              <div style={styles.reasonIcon}>🏆</div>
              <h3 style={styles.reasonTitle}>Proven Results</h3>
              <p style={styles.reasonDescription}>
                Join 10,000+ agents who've increased their revenue by an average 
                of 40% within their first year.
              </p>
            </div>
          </div>
          
          <div style={styles.decisionCta}>
            <h3 style={styles.ctaTitle}>Ready to Experience the Difference?</h3>
            <p style={styles.ctaDescription}>
              Try Quotely free for 14 days and see why agents are switching from other platforms.
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
              </a>
              <a 
                href="/contact" 
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
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  comparePage: {
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
    maxWidth: '900px',
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
    marginBottom: '48px'
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    flexWrap: 'wrap'
  },
  heroStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.1rem',
    color: '#374151',
    fontWeight: '600'
  },
  statIcon: {
    fontSize: '1.5rem'
  },
  statText: {},
  comparison: {
    padding: '120px 0',
    backgroundColor: 'white'
  },
  comparisonHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  comparisonTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  comparisonSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    marginBottom: '32px'
  },
  categoryFilter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '2px solid #e2e8f0',
    backgroundColor: 'white',
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
    color: 'white'
  },
  comparisonTable: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginBottom: '32px'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr repeat(5, 1fr)',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  featureColumn: {
    padding: '16px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  competitorColumn: {
    padding: '16px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    position: 'relative'
  },
  ourColumn: {
    backgroundColor: '#dbeafe',
    borderLeft: '2px solid #2563eb',
    borderRight: '2px solid #2563eb'
  },
  ourBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '8px',
    fontSize: '0.6rem',
    fontWeight: '600'
  },
  tableBody: {},
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr repeat(5, 1fr)',
    borderBottom: '1px solid #f1f5f9'
  },
  featureName: {
    padding: '12px 16px',
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '500'
  },
  featureValue: {
    padding: '12px 16px',
    fontSize: '0.85rem',
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: '4px',
    margin: '4px'
  },
  ourValue: {
    fontWeight: '600'
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    marginTop: '16px'
  },
  legendTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151'
  },
  legendItems: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    color: '#64748b'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '3px'
  },
  alternatives: {
    padding: '120px 0',
    backgroundColor: '#f8fafc'
  },
  alternativesHeader: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  alternativesTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  alternativesSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto'
  },
  alternativesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px'
  },
  alternativeCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  alternativeName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  },
  alternativeDescription: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '20px'
  },
  prosConsContainer: {
    marginBottom: '20px'
  },
  prosSection: {
    marginBottom: '16px'
  },
  consSection: {},
  prosConsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  prosList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px 0'
  },
  consList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  prosItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
    fontSize: '0.9rem',
    color: '#374151'
  },
  consItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
    fontSize: '0.9rem',
    color: '#374151'
  },
  prosIcon: {
    color: '#10b981',
    fontWeight: '700'
  },
  consIcon: {
    color: '#ef4444',
    fontWeight: '700'
  },
  bestForSection: {
    padding: '12px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px'
  },
  bestForLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151'
  },
  bestForText: {
    fontSize: '0.9rem',
    color: '#64748b'
  },
  decision: {
    padding: '120px 0',
    backgroundColor: 'white'
  },
  decisionContent: {
    textAlign: 'center'
  },
  decisionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  decisionSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto 60px'
  },
  reasonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    marginBottom: '80px'
  },
  reasonCard: {
    textAlign: 'center'
  },
  reasonIcon: {
    fontSize: '3rem',
    marginBottom: '16px'
  },
  reasonTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px'
  },
  reasonDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6'
  },
  decisionCta: {
    backgroundColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    borderRadius: '20px',
    padding: '60px 40px',
    color: 'white'
  },
  ctaTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '16px'
  },
  ctaDescription: {
    fontSize: '1.2rem',
    opacity: 0.9,
    marginBottom: '32px'
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
    display: 'inline-block'
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
    border: '2px solid rgba(255, 255, 255, 0.3)',
    display: 'inline-block'
  },
  secondaryButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.5)'
  }
};

export default ComparePage;