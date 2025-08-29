import React from 'react';
import Calculator from '../../components/Calculator/Calculator';

const CalculatorPage = () => {
  return (
    <div style={styles.calculatorPage}>
      <CalculatorHero />
      <Calculator />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
};

// Calculator Hero Section
const CalculatorHero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Calculate Your ROI with Quotely
          </h1>
          <p style={styles.heroSubtitle}>
            See exactly how much additional revenue Quotely can generate for your insurance agency. 
            Our interactive calculator uses real industry data and customer results to provide 
            accurate projections tailored to your business.
          </p>
          
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <span style={styles.statNumber}>300%</span>
              <span style={styles.statLabel}>Average efficiency gain</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.statNumber}>85%</span>
              <span style={styles.statLabel}>Higher conversion rates</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.statNumber}>6.8x</span>
              <span style={styles.statLabel}>Average ROI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    {
      icon: '⚡',
      title: 'Faster Quote Generation',
      description: 'Reduce quote preparation time by 60% with automated data entry and carrier connections.',
      metric: '60%',
      metricLabel: 'Time Savings'
    },
    {
      icon: '📈',
      title: 'Higher Conversion Rates',
      description: 'Intelligent lead scoring and automated follow-ups increase your quote-to-policy conversion by 40%.',
      metric: '40%',
      metricLabel: 'More Conversions'
    },
    {
      icon: '🎯',
      title: 'Better Targeting',
      description: 'Advanced analytics help you identify and focus on high-value prospects, increasing average premiums.',
      metric: '25%',
      metricLabel: 'Premium Increase'
    },
    {
      icon: '🤖',
      title: 'Automated Follow-ups',
      description: 'Never miss a follow-up with intelligent automation that nurtures leads through the sales funnel.',
      metric: '90%',
      metricLabel: 'Follow-up Rate'
    }
  ];

  return (
    <section style={styles.benefits}>
      <div style={styles.container}>
        <div style={styles.benefitsHeader}>
          <h2 style={styles.benefitsTitle}>How Quotely Drives Your ROI</h2>
          <p style={styles.benefitsSubtitle}>
            Our platform delivers results through proven strategies that have helped thousands 
            of agents grow their business.
          </p>
        </div>

        <div style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.benefitCard}>
              <div style={styles.benefitIcon}>{benefit.icon}</div>
              <h3 style={styles.benefitTitle}>{benefit.title}</h3>
              <p style={styles.benefitDescription}>{benefit.description}</p>
              
              <div style={styles.benefitMetric}>
                <span style={styles.metricNumber}>{benefit.metric}</span>
                <span style={styles.metricLabel}>{benefit.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The ROI calculator was spot on. We've actually exceeded the projected revenue increase by 15% in our first year.",
      author: "Mike Thompson",
      title: "Thompson Insurance Group",
      metric: "250% ROI",
      image: "👨‍💼"
    },
    {
      quote: "Quotely paid for itself in the first month. The time savings alone have been incredible, but the revenue growth has been game-changing.",
      author: "Jennifer Liu",
      title: "Premier Insurance Solutions",
      metric: "400% Growth",
      image: "👩‍💼"
    },
    {
      quote: "I was skeptical of the numbers, but they were conservative. Our conversion rates improved by over 50% in the first quarter.",
      author: "Robert Martinez",
      title: "Martinez Family Insurance",
      metric: "8.2x ROI",
      image: "👨‍💻"
    }
  ];

  return (
    <section style={styles.testimonials}>
      <div style={styles.container}>
        <div style={styles.testimonialsHeader}>
          <h2 style={styles.testimonialsTitle}>Real Results from Real Agents</h2>
          <p style={styles.testimonialsSubtitle}>
            Don't just take our word for it. Here's what agents are saying about their ROI with Quotely.
          </p>
        </div>

        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <div style={styles.testimonialContent}>
                <div style={styles.testimonialQuote}>"{testimonial.quote}"</div>
                
                <div style={styles.testimonialFooter}>
                  <div style={styles.testimonialAuthor}>
                    <div style={styles.authorImage}>{testimonial.image}</div>
                    <div style={styles.authorInfo}>
                      <div style={styles.authorName}>{testimonial.author}</div>
                      <div style={styles.authorTitle}>{testimonial.title}</div>
                    </div>
                  </div>
                  <div style={styles.testimonialMetric}>
                    <span style={styles.metricValue}>{testimonial.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.cta}>
          <div style={styles.ctaContent}>
            <h3 style={styles.ctaTitle}>Ready to See These Results for Yourself?</h3>
            <p style={styles.ctaDescription}>
              Join thousands of agents who've transformed their business with Quotely. 
              Start your free trial today and see the difference.
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
  calculatorPage: {
    paddingTop: '70px'
  },
  hero: {
    padding: '80px 0 40px',
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2563eb'
  },
  statLabel: {
    fontSize: '1rem',
    color: '#64748b',
    textAlign: 'center'
  },
  benefits: {
    padding: '120px 0',
    backgroundColor: 'white'
  },
  benefitsHeader: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  benefitsTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  benefitsSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px'
  },
  benefitCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  benefitIcon: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  benefitTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px'
  },
  benefitDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '24px'
  },
  benefitMetric: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  metricNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#10b981'
  },
  metricLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '500'
  },
  testimonials: {
    padding: '120px 0',
    backgroundColor: '#f8fafc'
  },
  testimonialsHeader: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  testimonialsTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  },
  testimonialsSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '700px',
    margin: '0 auto'
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '32px',
    marginBottom: '80px'
  },
  testimonialCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  testimonialContent: {},
  testimonialQuote: {
    fontSize: '1.1rem',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '24px',
    fontStyle: 'italic'
  },
  testimonialFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  authorImage: {
    fontSize: '2rem'
  },
  authorInfo: {},
  authorName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  authorTitle: {
    fontSize: '0.9rem',
    color: '#64748b'
  },
  testimonialMetric: {
    textAlign: 'right'
  },
  metricValue: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#10b981'
  },
  cta: {
    backgroundColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
    color: 'white'
  },
  ctaContent: {},
  ctaTitle: {
    fontSize: '2.2rem',
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

export default CalculatorPage;