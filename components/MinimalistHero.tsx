'use client'

import { useState, useEffect } from 'react'
import { useOTTOTracking } from './OTTOProvider'

export default function MinimalistHero() {
  const { trackUserAction } = useOTTOTracking()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    trackUserAction('cta_clicked', {
      action: 'get_started',
      location: 'minimalist_hero'
    })
    window.location.href = '/get-started'
  }

  const handleWatchDemo = () => {
    trackUserAction('cta_clicked', {
      action: 'watch_demo',
      location: 'minimalist_hero'
    })
    window.location.href = '/demo'
  }

  return (
    <>
      <style jsx>{`
        .minimalist-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 100%);
          position: relative;
          padding: 2rem;
          overflow: hidden;
        }

        .hero-content {
          max-width: 800px;
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? 0 : '20px'});
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .speed-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF5F0B 0%, #F59E0B 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
        }

        .hero-title strong {
          font-weight: 600;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 300;
          color: #666;
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .btn {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 87, 255, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #e0e0e0;
        }

        .btn-secondary:hover {
          border-color: #0057FF;
          color: #0057FF;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
        }

        .circle-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #0057FF 0%, transparent 70%);
          top: -300px;
          right: -200px;
          animation: float1 20s ease-in-out infinite;
        }

        .circle-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #00C851 0%, transparent 70%);
          bottom: -200px;
          left: -100px;
          animation: float2 25s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -50px) scale(0.9); }
        }

        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }

          .btn {
            width: 100%;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }
        }
      `}</style>

      <section className="minimalist-hero">
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
        </div>
        
        <div className="hero-content">
          <div className="speed-badge">
            ⚡ 60% faster than competitors
          </div>
          
          <h1 className="hero-title">
            Insurance quoting<br />
            <strong>simplified</strong>
          </h1>
          
          <p className="hero-subtitle">
            Generate accurate quotes in under 2 minutes.
            No complexity. No confusion. Just results.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleWatchDemo}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </>
  )
}