export default function SpeedFeatures() {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast Quotes',
      description: 'Generate accurate quotes in under 2 minutes with our optimized workflow and smart defaults.',
      metric: 'Optimized for speed'
    },
    {
      icon: '🤖',
      title: 'Transparent AI Decisions',
      description: 'See exactly why AI recommends specific coverages with full decision transparency and audit trails.',
      metric: '100% explainable AI'
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description: 'Quote on the go with our responsive platform that works perfectly on any device.',
      metric: '95/100 mobile score'
    },
    {
      icon: '🔄',
      title: 'Real-Time Sync',
      description: 'Instant synchronization across all carriers and team members with zero lag.',
      metric: '< 100ms sync time'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Track conversion rates, identify bottlenecks, and optimize your sales process.',
      metric: 'Conversion-focused design'
    },
    {
      icon: '🔐',
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SOC 2 compliance, and complete data privacy.',
      metric: '99.99% uptime SLA'
    }
  ]

  return (
    <>
      <style jsx>{`
        .features {
          padding: 6rem 5%;
          background: linear-gradient(180deg, #F9FAFB 0%, white 100%);
        }

        .features-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .features h2 {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-color: #0057FF;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .feature-card p {
          color: #6B7280;
          line-height: 1.8;
        }

        .feature-metric {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #E5E7EB;
          color: #10B981;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .features h2 {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="features" id="features">
        <div className="features-container">
          <h2>Built for Speed & Transparency</h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-metric">
                  <span>{feature.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}