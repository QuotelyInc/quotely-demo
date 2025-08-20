'use client'

import { useEffect, useRef, useState } from 'react'

export default function SimpleFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      title: 'Fast',
      description: 'Generate quotes in under 2 minutes',
      metric: '1.8 min'
    },
    {
      title: 'Accurate',
      description: 'AI-powered recommendations',
      metric: '94%'
    },
    {
      title: 'Simple',
      description: 'One price for your entire office',
      metric: '$679/mo'
    }
  ]

  return (
    <>
      <style jsx>{`
        .features-section {
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
        }

        .features-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 4rem;
        }

        .feature-card {
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : '20px'});
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:nth-child(1) {
          transition-delay: 0s;
        }

        .feature-card:nth-child(2) {
          transition-delay: 0.1s;
        }

        .feature-card:nth-child(3) {
          transition-delay: 0.2s;
        }

        .feature-metric {
          font-size: 3rem;
          font-weight: 300;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .feature-metric {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <section className="features-section" ref={featuresRef}>
        <div className="features-container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-metric">{feature.metric}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}