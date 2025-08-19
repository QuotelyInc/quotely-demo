'use client'

import { useOTTOTracking } from './OTTOProvider'
import Link from 'next/link'

export default function ModernHero() {
  const { trackUserAction } = useOTTOTracking()

  const handleCTAClick = (action: string) => {
    trackUserAction('hero_cta_clicked', {
      action: action,
      location: 'modern_hero'
    })
  }

  return (
    <>
      <style jsx>{`
        .modern-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 6rem 5% 4rem;
          overflow: hidden;
          background: #0A0B0D;
        }

        .modern-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(91, 63, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 63, 126, 0.2) 0%, transparent 50%);
          animation: pulseGradient 15s ease-in-out infinite;
        }

        @keyframes pulseGradient {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% { 
            opacity: 0.5;
            transform: scale(1.1) rotate(180deg);
          }
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #00D4FF;
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s ease;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 0.8s ease;
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #5B3FFF 0%, #00D4FF 50%, #FF3F7E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-subtitle {
          font-size: 1.35rem;
          color: #9CA3AF;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s ease 0.2s both;
          line-height: 1.6;
        }

        .hero-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          animation: fadeInUp 0.8s ease 0.4s both;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #5B3FFF 0%, #00D4FF 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(91, 63, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-hero-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(91, 63, 255, 0.4);
        }

        .btn-hero-primary:hover::before {
          left: 100%;
        }

        .btn-hero-glass {
          padding: 1rem 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-hero-glass:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        .hero-metrics {
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          animation: fadeInUp 0.8s ease 0.6s both;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .metric-item {
          text-align: center;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #5B3FFF 0%, #00D4FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          color: #9CA3AF;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          background: linear-gradient(135deg, rgba(91, 63, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          right: -150px;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          top: 50%;
          left: 50%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% { 
            transform: translate(100px, -100px) rotate(120deg) scale(1.1);
          }
          66% { 
            transform: translate(-100px, 100px) rotate(240deg) scale(0.9);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-cta {
            flex-direction: column;
            width: 100%;
            padding: 0 1rem;
          }

          .btn-hero-primary,
          .btn-hero-glass {
            width: 100%;
            justify-content: center;
          }

          .metric-value {
            font-size: 2rem;
          }
        }
      `}</style>

      <section className="modern-hero">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            ⚡ 60% Faster Than EZLynx
          </div>

          <h1 className="hero-title">
            The <span className="gradient-text">Fastest Insurance Platform</span> <br />
            for Modern Agencies
          </h1>

          <p className="hero-subtitle">
            Quote in under 2 minutes. Compare rates instantly. Close deals faster.
            Quotely outperforms Applied Rater and EZLynx with transparent AI-powered insights.
          </p>

          <div className="hero-cta">
            <Link 
              href="/get-started"
              className="btn-hero-primary"
              onClick={() => handleCTAClick('start_free_trial')}
            >
              Start Free Trial
              <span>→</span>
            </Link>
            <Link 
              href="#demo-video"
              className="btn-hero-glass"
              onClick={() => handleCTAClick('watch_demo')}
            >
              Watch Demo
              <span>▶</span>
            </Link>
          </div>

          <div className="hero-metrics">
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-value">&lt; 2min</div>
                <div className="metric-label">Quote Generation</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">1.2s</div>
                <div className="metric-label">Page Load Speed</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">500+</div>
                <div className="metric-label">Agencies Trust Us</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">45%</div>
                <div className="metric-label">Better Conversions</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}