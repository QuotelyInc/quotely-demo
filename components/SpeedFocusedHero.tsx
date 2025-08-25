'use client'

import { useState, useEffect, useRef } from 'react'
import { useOTTOTracking } from './OTTOProvider'

export default function SpeedFocusedHero() {
  const { trackUserAction } = useOTTOTracking()
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(true)
  const [quoteGenerated, setQuoteGenerated] = useState(false)
  const [formData, setFormData] = useState({
    businessType: 'Restaurant',
    revenue: '$500,000',
    employees: '15'
  })

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const generateQuote = () => {
    setTimerActive(false)
    setQuoteGenerated(true)
    trackUserAction('quote_generated', {
      time_taken: seconds,
      business_type: formData.businessType
    })
  }

  return (
    <>
      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 6rem 5% 3rem;
          background: linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 100%);
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .hero {
            padding: 8rem 5% 4rem;
          }
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 60%;
          height: 150%;
          background: radial-gradient(circle, rgba(0, 87, 255, 0.08) 0%, transparent 70%);
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-text {
          animation: fadeInLeft 0.8s ease;
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
          margin-bottom: 1rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #111827;
        }

        .hero h1 span {
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #6B7280;
          margin-bottom: 2rem;
          line-height: 1.8;
        }

        .hero-cta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 640px) {
          .hero-cta {
            flex-direction: row;
          }
        }

        .btn {
          padding: 0.75rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          border: none;
          font-size: 0.95rem;
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

        .btn-outline {
          border: 2px solid #0057FF;
          color: #0057FF;
          background: transparent;
        }

        .btn-outline:hover {
          background: #0057FF;
          color: white;
        }

        .trust-badges {
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        @media (min-width: 640px) {
          .trust-badges {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            display: flex;
          }
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .trust-badge strong {
          color: #111827;
          font-size: 1.25rem;
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

        /* Quote Demo */
        .quote-demo {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          animation: fadeInRight 0.8s ease;
          position: relative;
          overflow: hidden;
        }

        .quote-demo::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
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

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .demo-header h3 {
          font-size: 1.25rem;
          color: #111827;
        }

        .demo-timer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10B981;
          font-weight: 600;
        }

        .demo-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .form-group input, .form-group select {
          padding: 0.75rem;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: #0057FF;
          box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.1);
        }

        .quote-result {
          background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1rem;
          border: 2px solid #0057FF;
          animation: fadeInUp 0.5s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .quote-amount {
          font-size: 2rem;
          font-weight: 800;
          color: #0057FF;
          margin-bottom: 0.5rem;
        }

        .quote-result div {
          color: #374151;
          font-weight: 600;
        }

        .quote-result small {
          color: #10B981;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .hero-cta {
            flex-direction: column;
          }

          .trust-badges {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="speed-badge">
              ⚡ 60% Faster Than EZLynx
            </div>
            <h1>
              The <span>Fastest Insurance Platform</span> 
              <br />for Modern Agencies
            </h1>
            <p className="hero-subtitle">
              Quote in under 2 minutes. Compare rates instantly. Close deals faster. 
              Quotely outperforms Applied Rater and EZLynx with transparent AI-powered insights.
            </p>
            <div className="hero-cta">
              <button 
                className="btn btn-primary"
                onClick={() => trackUserAction('demo_clicked', { location: 'hero' })}
              >
                Get Instant Demo
                <span>→</span>
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => trackUserAction('speed_test_clicked', { location: 'hero' })}
              >
                See Speed Test
              </button>
            </div>
            <div className="trust-badges">
              <div className="trust-badge">
                <strong>500+</strong>
                Agencies Trust Us
              </div>
              <div className="trust-badge">
                <strong>2M+</strong>
                Quotes Processed
              </div>
              <div className="trust-badge">
                <strong>45%</strong>
                Faster Conversions
              </div>
            </div>
          </div>
          
          <div className="quote-demo">
            <div className="demo-header">
              <h3>Live Quote Demo</h3>
              <div className="demo-timer">
                ⏱️ <span>{formatTime(seconds)}</span>
              </div>
            </div>
            <div className="demo-form">
              <div className="form-group">
                <label>Business Type</label>
                <select 
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                  <option>Restaurant</option>
                  <option>Retail Store</option>
                  <option>Office</option>
                  <option>Construction</option>
                </select>
              </div>
              <div className="form-group">
                <label>Annual Revenue</label>
                <input 
                  type="text" 
                  placeholder="$500,000"
                  value={formData.revenue}
                  onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Employees</label>
                <input 
                  type="number" 
                  placeholder="15"
                  value={formData.employees}
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                />
              </div>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={generateQuote}
                style={{ width: '100%' }}
              >
                Get Instant Quote
              </button>
            </div>
            {quoteGenerated && (
              <div className="quote-result">
                <div className="quote-amount">$2,450/year</div>
                <div>General Liability Coverage</div>
                <small>Quote generated in {formatTime(seconds)}</small>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}