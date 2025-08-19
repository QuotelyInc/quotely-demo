'use client'

import { useOTTOTracking } from './OTTOProvider'
import Link from 'next/link'

export default function HulyHero() {
  const { trackUserAction } = useOTTOTracking()

  const handleCTAClick = (action: string) => {
    trackUserAction('hero_cta_clicked', {
      action: action,
      location: 'huly_hero'
    })
  }

  return (
    <>
      <style jsx>{`
        .huly-hero {
          min-height: 100vh;
          background: #090A0C;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }

        .huly-hero::before {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          top: -25%;
          left: -25%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(91, 63, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 63, 126, 0.1) 0%, transparent 50%);
          animation: floatGradient 25s ease-in-out infinite;
        }

        @keyframes floatGradient {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: rotate(180deg) scale(1.1);
            opacity: 1;
          }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
          animation: fadeInLeft 0.8s ease-out;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 87, 255, 0.1);
          border: 1px solid rgba(0, 87, 255, 0.3);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #00D4FF;
          margin-bottom: 2rem;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
          }
          50% { 
            opacity: 0.9;
            box-shadow: 0 0 20px 5px rgba(0, 212, 255, 0.3);
          }
        }

        .hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1.05;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #5B3FFF 0%, #FF3F7E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #9CA3AF;
          margin-bottom: 2.5rem;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .btn-huly-primary {
          padding: 1rem 2rem;
          background: #0057FF;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-huly-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-huly-primary:hover {
          background: #0048DD;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 87, 255, 0.3);
        }

        .btn-huly-primary:hover::before {
          left: 100%;
        }

        .btn-huly-secondary {
          padding: 1rem 2rem;
          background: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .btn-huly-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #5B3FFF 0%, #00D4FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-visual {
          position: relative;
          animation: fadeInRight 0.8s ease-out;
        }

        .dashboard-preview {
          background: #0F1012;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .dashboard-title {
          color: #FFFFFF;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .dashboard-actions {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #6B7280;
        }

        .dot.green {
          background: #10B981;
        }

        .dot.yellow {
          background: #F59E0B;
        }

        .dot.red {
          background: #EF4444;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.2s ease;
        }

        .metric-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 87, 255, 0.3);
          transform: translateY(-2px);
        }

        .metric-card-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .metric-card-label {
          font-size: 0.75rem;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .chart-placeholder {
          background: linear-gradient(135deg, rgba(91, 63, 255, 0.1) 0%, rgba(255, 63, 126, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          height: 100px;
        }

        .bar {
          width: 20px;
          background: linear-gradient(180deg, #0057FF, #00D4FF);
          border-radius: 4px 4px 0 0;
          animation: growBar 1s ease-out forwards;
        }

        @keyframes growBar {
          from {
            height: 0;
          }
          to {
            height: var(--bar-height);
          }
        }

        .floating-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: linear-gradient(135deg, #5B3FFF, #FF3F7E);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-visual {
            max-width: 600px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .huly-hero {
            padding-top: 60px;
          }

          .hero-container {
            padding: 0 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-huly-primary,
          .btn-huly-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .metric-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="huly-hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                ⚡ 60% Faster Than Legacy Platforms
              </div>

              <h1 className="hero-title">
                Modern Insurance Platform
                <br />
                <span className="gradient-text">Built for Speed</span>
              </h1>

              <p className="hero-subtitle">
                Quote in under 2 minutes. AI-powered recommendations. 
                Real-time carrier integrations. The future of insurance is here.
              </p>

              <div className="hero-buttons">
                <Link 
                  href="/get-started"
                  className="btn-huly-primary"
                  onClick={() => handleCTAClick('start_free_trial')}
                >
                  Start Free Trial
                  <span>→</span>
                </Link>
                <Link 
                  href="#demo"
                  className="btn-huly-secondary"
                  onClick={() => handleCTAClick('watch_demo')}
                >
                  Watch Demo
                  <span>▶</span>
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-value">1.8min</span>
                  <span className="stat-label">Avg Quote Time</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">500+</span>
                  <span className="stat-label">Agencies</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">45%</span>
                  <span className="stat-label">Better Conversion</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="floating-badge">LIVE DEMO</div>
                
                <div className="dashboard-header">
                  <div className="dashboard-title">Quote Dashboard</div>
                  <div className="dashboard-actions">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                </div>

                <div className="metric-grid">
                  <div className="metric-card">
                    <div className="metric-card-value">$2,450</div>
                    <div className="metric-card-label">Monthly Premium</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-card-value">94%</div>
                    <div className="metric-card-label">Match Score</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-card-value">1.2s</div>
                    <div className="metric-card-label">Generation Time</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-card-value">12</div>
                    <div className="metric-card-label">Carriers Quoted</div>
                  </div>
                </div>

                <div className="chart-placeholder">
                  <div className="chart-bars">
                    <div className="bar" style={{'--bar-height': '60px'} as any}></div>
                    <div className="bar" style={{'--bar-height': '80px'} as any}></div>
                    <div className="bar" style={{'--bar-height': '45px'} as any}></div>
                    <div className="bar" style={{'--bar-height': '100px'} as any}></div>
                    <div className="bar" style={{'--bar-height': '75px'} as any}></div>
                    <div className="bar" style={{'--bar-height': '90px'} as any}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}