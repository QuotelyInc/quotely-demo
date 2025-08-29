import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [inputs, setInputs] = useState({
    numberOfAgents: 5,
    quotesPerAgent: 100,
    conversionRate: 15,
    averagePremium: 1200,
    commissionRate: 12
  });

  const [results, setResults] = useState({
    monthlyQuotes: 0,
    monthlyPolicies: 0,
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    roiMultiplier: 0,
    additionalRevenue: 0
  });

  // Calculate results whenever inputs change
  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    const monthlyQuotes = inputs.numberOfAgents * inputs.quotesPerAgent;
    const monthlyPolicies = Math.floor((monthlyQuotes * inputs.conversionRate) / 100);
    const monthlyRevenue = monthlyPolicies * inputs.averagePremium * (inputs.commissionRate / 100);
    const yearlyRevenue = monthlyRevenue * 12;
    
    // Assume 25% improvement with Quotely
    const improvementRate = 0.25;
    const additionalRevenue = yearlyRevenue * improvementRate;
    
    // ROI calculation (assuming $799/month Professional plan)
    const quotelyCost = 799 * 12;
    const roiMultiplier = additionalRevenue / quotelyCost;

    setResults({
      monthlyQuotes,
      monthlyPolicies,
      monthlyRevenue: Math.floor(monthlyRevenue),
      yearlyRevenue: Math.floor(yearlyRevenue),
      roiMultiplier: Math.max(roiMultiplier, 0),
      additionalRevenue: Math.floor(additionalRevenue)
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const inputFields = [
    {
      key: 'numberOfAgents',
      label: 'Number of Agents',
      min: 1,
      max: 100,
      step: 1,
      suffix: 'agents'
    },
    {
      key: 'quotesPerAgent',
      label: 'Quotes per Agent per Month',
      min: 1,
      max: 1000,
      step: 10,
      suffix: 'quotes'
    },
    {
      key: 'conversionRate',
      label: 'Conversion Rate',
      min: 1,
      max: 50,
      step: 1,
      suffix: '%'
    },
    {
      key: 'averagePremium',
      label: 'Average Premium',
      min: 100,
      max: 10000,
      step: 100,
      prefix: '$',
      suffix: '/year'
    },
    {
      key: 'commissionRate',
      label: 'Commission Rate',
      min: 1,
      max: 30,
      step: 1,
      suffix: '%'
    }
  ];

  return (
    <section style={styles.calculator}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>ROI Calculator</h2>
          <p style={styles.subtitle}>
            See how much additional revenue Quotely can generate for your insurance agency. 
            Adjust the parameters below to match your current business.
          </p>
        </div>

        <div style={styles.calculatorContainer}>
          <div style={styles.inputsSection}>
            <h3 style={styles.sectionTitle}>Your Current Business</h3>
            
            <div style={styles.inputsGrid}>
              {inputFields.map(field => (
                <div key={field.key} style={styles.inputGroup}>
                  <label style={styles.label}>
                    {field.label}
                  </label>
                  <div style={styles.inputContainer}>
                    {field.prefix && (
                      <span style={styles.inputPrefix}>{field.prefix}</span>
                    )}
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={inputs[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      style={styles.slider}
                    />
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={inputs[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      style={styles.numberInput}
                    />
                    {field.suffix && (
                      <span style={styles.inputSuffix}>{field.suffix}</span>
                    )}
                  </div>
                  <div style={styles.inputRange}>
                    {field.prefix && field.prefix}{field.min}{field.suffix} - {field.prefix && field.prefix}{field.max}{field.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.resultsSection}>
            <h3 style={styles.sectionTitle}>Your Potential with Quotely</h3>
            
            <div style={styles.resultsGrid}>
              <div style={styles.resultCard}>
                <div style={styles.resultIcon}>📊</div>
                <div style={styles.resultValue}>
                  {results.monthlyQuotes.toLocaleString()}
                </div>
                <div style={styles.resultLabel}>Quotes per Month</div>
              </div>

              <div style={styles.resultCard}>
                <div style={styles.resultIcon}>✅</div>
                <div style={styles.resultValue}>
                  {results.monthlyPolicies.toLocaleString()}
                </div>
                <div style={styles.resultLabel}>Policies per Month</div>
              </div>

              <div style={styles.resultCard}>
                <div style={styles.resultIcon}>💰</div>
                <div style={styles.resultValue}>
                  ${results.monthlyRevenue.toLocaleString()}
                </div>
                <div style={styles.resultLabel}>Monthly Commission</div>
              </div>

              <div style={styles.resultCard}>
                <div style={styles.resultIcon}>📈</div>
                <div style={styles.resultValue}>
                  ${results.yearlyRevenue.toLocaleString()}
                </div>
                <div style={styles.resultLabel}>Annual Commission</div>
              </div>
            </div>

            <div style={styles.impactSection}>
              <h4 style={styles.impactTitle}>Quotely Impact Analysis</h4>
              
              <div style={styles.impactCards}>
                <div style={styles.impactCard}>
                  <div style={styles.impactHeader}>
                    <span style={styles.impactIcon}>🚀</span>
                    <span style={styles.impactCardTitle}>Additional Revenue</span>
                  </div>
                  <div style={styles.impactValue}>
                    ${results.additionalRevenue.toLocaleString()}
                  </div>
                  <div style={styles.impactDescription}>
                    With 25% improvement in efficiency
                  </div>
                </div>

                <div style={styles.impactCard}>
                  <div style={styles.impactHeader}>
                    <span style={styles.impactIcon}>📊</span>
                    <span style={styles.impactCardTitle}>ROI Multiplier</span>
                  </div>
                  <div style={styles.impactValue}>
                    {results.roiMultiplier.toFixed(1)}x
                  </div>
                  <div style={styles.impactDescription}>
                    Return on Quotely investment
                  </div>
                </div>
              </div>

              <div style={styles.breakdownSection}>
                <h5 style={styles.breakdownTitle}>How We Calculate This:</h5>
                <ul style={styles.breakdownList}>
                  <li>25% increase in quote conversion rates</li>
                  <li>40% reduction in quote preparation time</li>
                  <li>15% increase in average premium through better targeting</li>
                  <li>30% improvement in follow-up efficiency</li>
                </ul>
              </div>
            </div>

            <div style={styles.ctaSection}>
              <div style={styles.ctaContent}>
                <h4 style={styles.ctaTitle}>Ready to unlock this potential?</h4>
                <p style={styles.ctaDescription}>
                  Start your 14-day free trial and see these results in your own agency.
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
        </div>

        <div style={styles.disclaimer}>
          <p style={styles.disclaimerText}>
            * Results are estimates based on industry averages and Quotely customer data. 
            Actual results may vary depending on your specific business circumstances, 
            market conditions, and implementation approach.
          </p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  calculator: {
    padding: '120px 0',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto'
  },
  calculatorContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    marginBottom: '60px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '32px'
    }
  },
  inputsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0'
  },
  resultsSection: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '24px'
  },
  inputsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  inputGroup: {
    marginBottom: '8px'
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '4px'
  },
  inputPrefix: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    minWidth: '20px'
  },
  inputSuffix: {
    fontSize: '0.9rem',
    color: '#64748b',
    minWidth: '40px'
  },
  slider: {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    background: '#e2e8f0',
    outline: 'none',
    cursor: 'pointer'
  },
  numberInput: {
    width: '80px',
    padding: '8px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  inputRange: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    textAlign: 'center'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '32px'
  },
  resultCard: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #e2e8f0'
  },
  resultIcon: {
    fontSize: '2rem',
    marginBottom: '8px'
  },
  resultValue: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '4px'
  },
  resultLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500'
  },
  impactSection: {
    marginBottom: '32px'
  },
  impactTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  impactCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  impactCard: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: 'white',
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center'
  },
  impactHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  impactIcon: {
    fontSize: '1.5rem'
  },
  impactCardTitle: {
    fontSize: '1rem',
    fontWeight: '600'
  },
  impactValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '8px'
  },
  impactDescription: {
    fontSize: '0.9rem',
    opacity: 0.9
  },
  breakdownSection: {
    backgroundColor: '#f1f5f9',
    padding: '20px',
    borderRadius: '12px'
  },
  breakdownTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '12px'
  },
  breakdownList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  ctaSection: {
    backgroundColor: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center'
  },
  ctaContent: {},
  ctaTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px'
  },
  ctaDescription: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '24px'
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    '@media (max-width: 640px)': {
      flexDirection: 'column'
    }
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'inline-block'
  },
  primaryButtonHover: {
    backgroundColor: '#1d4ed8',
    transform: 'translateY(-1px)'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#2563eb',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    border: '2px solid #2563eb',
    display: 'inline-block'
  },
  secondaryButtonHover: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb'
  },
  disclaimer: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  },
  disclaimerText: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontStyle: 'italic',
    lineHeight: '1.5'
  }
};

export default Calculator;