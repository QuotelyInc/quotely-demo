export default function CalmFeatures() {
  const features = [
    {
      title: 'Fast Quoting',
      description: 'Generate accurate quotes in minutes, not hours. Our streamlined process saves you time.',
      icon: '⚡'
    },
    {
      title: 'Smart Automation',
      description: 'AI-powered recommendations help you find the right coverage for each client.',
      icon: '🤖'
    },
    {
      title: 'Carrier Integration',
      description: 'Connect with multiple carriers through a single, unified platform.',
      icon: '🔗'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track performance, identify trends, and make data-driven decisions.',
      icon: '📊'
    },
    {
      title: 'Mobile Ready',
      description: 'Work from anywhere with our responsive, mobile-optimized platform.',
      icon: '📱'
    },
    {
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with SOC 2 compliance and data encryption.',
      icon: '🔒'
    }
  ]

  return (
    <>
      <style jsx>{`
        .features {
          padding: var(--space-3xl) 0;
          background: var(--surface);
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        .features-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .features h2 {
          font-size: var(--font-size-3xl);
          color: var(--secondary);
          margin-bottom: var(--space-md);
        }

        .features-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-lg);
        }

        .feature-card {
          background: var(--background);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background: var(--surface);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: var(--space-md);
        }

        .feature-card h3 {
          font-size: var(--font-size-xl);
          color: var(--secondary);
          margin-bottom: var(--space-sm);
          font-weight: 600;
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="features" id="features">
        <div className="features-container">
          <div className="features-header">
            <h2>Everything you need to succeed</h2>
            <p className="features-subtitle">
              Built by insurance professionals, for insurance professionals
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}