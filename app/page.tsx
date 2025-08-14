'use client'

import { useEffect, useState } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RotatingNewsCommentary from '@/components/RotatingNewsCommentary'

function HomePage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [engagementScore, setEngagementScore] = useState(0)

  useEffect(() => {
    trackPageView('home', {
      section: 'landing',
      product: 'quotely-platform'
    })
  }, [trackPageView])

  useEffect(() => {
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]')
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href')!)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 25 && engagementScore < 1) setEngagementScore(1)
      if (scrollPercent > 50 && engagementScore < 2) setEngagementScore(2)
      if (scrollPercent > 75 && engagementScore < 3) setEngagementScore(3)
    }
    
    window.addEventListener('scroll', handleScroll)

    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setEngagementScore(prev => prev + 2)
        console.log('User engagement score:', engagementScore)
      })
    })

    // Performance monitoring
    const handleLoad = () => {
      if ('performance' in window) {
        const timing = performance.timing
        const loadTime = timing.loadEventEnd - timing.navigationStart
        console.log(`Page load time: ${loadTime}ms`)
        
        // Track Core Web Vitals
        if ('PerformanceObserver' in window) {
          // LCP
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log('LCP:', lastEntry.startTime)
          }).observe({entryTypes: ['largest-contentful-paint']})
          
          // FID
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            entries.forEach(entry => {
              console.log('FID:', (entry as any).processingStart - entry.startTime)
            })
          }).observe({entryTypes: ['first-input']})
        }
      }
    }

    if (document.readyState === 'loading') {
      window.addEventListener('load', handleLoad)
    } else {
      handleLoad()
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', handleLoad)
    }
  }, [engagementScore])

  const handleWatchDemo = () => {
    trackUserAction('cta_clicked', {
      button: 'watch_demo',
      location: 'hero'
    })
  }

  const handleCompare = () => {
    trackUserAction('cta_clicked', {
      button: 'compare_platforms',
      location: 'hero'
    })
    const element = document.getElementById('comparison')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleStartTrial = () => {
    trackUserAction('cta_clicked', {
      button: 'start_trial',
      location: 'cta_section'
    })
  }

  const handleScheduleDemo = () => {
    trackUserAction('cta_clicked', {
      button: 'schedule_demo',
      location: 'cta_section'
    })
  }

  const playDemo = () => {
    const demoContainer = document.querySelector('.demo-video')
    const playButton = document.querySelector('.play-button') as HTMLElement
    
    if (demoContainer && playButton) {
      // Simulate video playing
      (playButton as HTMLElement).style.display = 'none'
      demoContainer.innerHTML = `
        <div style="width: 100%; height: 100%; background: #000; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; flex-direction: column;">
          🎬 Demo Video Playing...
          <br><small style="opacity: 0.7;">See how quotes go from 5min → 30sec</small>
        </div>
      `
      
      // Reset after 10 seconds (in real implementation, this would be the actual video)
      setTimeout(() => {
        if (demoContainer) {
          demoContainer.innerHTML = `
            <div class="play-button" onclick="playDemo()" style="position: relative; z-index: 2;">▶</div>
            <div style="position: absolute; top: 10px; left: 10px; right: 10px; bottom: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; opacity: 0.1;"></div>
            <div style="position: absolute; top: 30px; left: 30px; right: 30px; height: 20px; background: white; border-radius: 4px; opacity: 0.3;"></div>
            <div style="position: absolute; top: 60px; left: 30px; right: 30px; height: 100px; background: white; border-radius: 8px; opacity: 0.4;"></div>
          `
        }
      }, 10000)
    }
  }

  // Make playDemo available globally for onclick
  useEffect(() => {
    (window as any).playDemo = playDemo
  }, [])

  return (
    <>
      {/* Critical CSS inline for sub-2s load */}
      <style jsx>{`
        :root {
          --primary: #0057FF;
          --primary-dark: #0041CC;
          --secondary: #1B2951;
          --accent: #00B8A3;
          --warning: #FF6B35;
          --surface: #FFFFFF;
          --background: #F8FAFC;
          --text-primary: #1F2937;
          --text-secondary: #6B7280;
          --border: #E5E7EB;
          --gradient: linear-gradient(135deg, #0057FF 0%, #0041CC 100%);
          --gradient-bg: linear-gradient(135deg, #1B2951 0%, #0F1729 100%);
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          overflow-x: hidden;
        }
        
        /* HERO SECTION - Critical above fold */
        .hero {
          min-height: 100vh;
          background: var(--gradient-bg);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(27, 41, 81, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 184, 163, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 87, 255, 0.1) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .hero-text h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: slideInLeft 1s ease-out;
        }
        
        .hero-text .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          animation: slideInLeft 1s ease-out 0.2s both;
        }
        
        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          animation: slideInLeft 1s ease-out 0.4s both;
        }
        
        .stat {
          text-align: center;
          color: white;
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          display: block;
        }
        
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        
        .hero-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          animation: slideInLeft 1s ease-out 0.6s both;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .hero-visual {
          position: relative;
          animation: slideInRight 1s ease-out 0.8s both;
        }
        
        .demo-preview {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          padding: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transform: rotateY(-5deg) rotateX(5deg);
          transition: transform 0.3s ease;
        }
        
        .demo-preview:hover {
          transform: rotateY(0deg) rotateX(0deg);
        }
        
        .demo-video {
          width: 100%;
          height: 300px;
          background: linear-gradient(45deg, #f0f2f5, #e4e7ea);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .play-button {
          width: 60px;
          height: 60px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
        }
        
        .play-button:hover {
          transform: scale(1.1);
          background: var(--primary-dark);
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        /* STATS SECTION */
        .stats-section {
          padding: 4rem 2rem;
          background: white;
          position: relative;
          z-index: 3;
          margin-top: -100px;
          border-radius: 2rem 2rem 0 0;
        }
        
        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .stat-card {
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background: var(--surface);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #0057FF 0%, #0041CC 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        
        .stat-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* COMPARISON TABLE */
        .comparison-section {
          padding: 4rem 2rem;
          background: var(--background);
        }
        
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }
        
        .comparison-table {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          background: var(--gradient);
          color: white;
          font-weight: 600;
          padding: 1rem;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 1rem;
          border-bottom: 1px solid var(--border);
          align-items: center;
        }
        
        .table-row:nth-child(even) {
          background: #F8FAFC;
        }
        
        .feature-name {
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .check-mark {
          color: #00B8A3;
          font-weight: 700;
        }
        
        .x-mark {
          color: var(--warning);
          font-weight: 700;
        }
        
        .quotely-highlight {
          background: rgba(0, 87, 255, 0.05);
          border-left: 3px solid var(--primary);
          padding-left: calc(1rem - 3px);
        }
        
        /* TESTIMONIALS */
        .testimonials-section {
          padding: 4rem 2rem;
          background: white;
        }
        
        .testimonials-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .testimonial-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
        }
        
        .testimonial-quote {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }
        
        .author-info h4 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .author-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* CTA SECTION */
        .industry-insights-section {
          padding: 4rem 2rem;
          background: var(--background);
        }
        
        .insights-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .cta-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #1B2951 0%, #0F1729 100%);
          color: white;
          text-align: center;
        }
        
        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .cta-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
          .hero-stats {
            justify-content: center;
          }
          
          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          
          .table-header {
            display: none;
          }
          
          .table-row {
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            padding: 1.5rem;
          }
          
          .feature-name {
            font-size: 1.125rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
          }
        }
        
        /* SCROLL ANIMATIONS */
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* FLOATING CTA */
        .floating-cta {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          background: #00B8A3;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          box-shadow: 0 8px 30px rgba(0, 184, 163, 0.3);
          animation: pulse 2s infinite;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .floating-cta:hover {
          background: #009589;
          transform: scale(1.05);
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 8px 30px rgba(0, 184, 163, 0.3); }
          50% { box-shadow: 0 8px 30px rgba(0, 184, 163, 0.6); }
          100% { box-shadow: 0 8px 30px rgba(0, 184, 163, 0.3); }
        }
      `}</style>

      <div>
        <Navigation />
        
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Quote insurance <span style={{color: '#00B8A3'}}>10x faster</span></h1>
              <p className="subtitle">The modern alternative to EZLynx and Applied Rater. Built for independent agents who demand speed, transparency, and results.</p>
              
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">60%</span>
                  <span className="stat-label">Faster quotes</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Agencies switched</span>
                </div>
                <div className="stat">
                  <span className="stat-number">$2.4M</span>
                  <span className="stat-label">Avg. revenue boost</span>
                </div>
              </div>
              
              <div className="hero-ctas">
                <button onClick={handleWatchDemo} className="btn btn-primary">
                  ▶️ Watch 30s Demo
                </button>
                <button onClick={handleCompare} className="btn btn-secondary">
                  📊 Compare Platforms
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="demo-preview">
                <div className="demo-video" id="demo">
                  <div className="play-button" onClick={playDemo}>▶</div>
                  {/* Simulated dashboard preview */}
                  <div style={{position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '60px', background: 'linear-gradient(135deg, #1B2951 0%, #0F1729 100%)', borderRadius: '8px', opacity: 0.4}}></div>
                  <div style={{position: 'absolute', top: '30px', left: '30px', right: '30px', height: '20px', background: 'white', borderRadius: '4px', opacity: 0.3}}></div>
                  <div style={{position: 'absolute', top: '60px', left: '30px', right: '30px', height: '100px', background: 'white', borderRadius: '8px', opacity: 0.4}}></div>
                </div>
                <div style={{textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>
                  🚀 See how quotes that used to take 5 minutes now take 30 seconds
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="stats-section fade-in">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">1.8 min</div>
              <div className="stat-description">Average quote time vs 5 min industry standard</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">94%</div>
              <div className="stat-description">Quote accuracy with AI recommendations</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">31%</div>
              <div className="stat-description">Average increase in closed deals</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">9.2/10</div>
              <div className="stat-description">User satisfaction score</div>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="comparison-section fade-in" id="comparison">
          <div className="section-header">
            <h2 className="section-title">Why agencies choose Quotely</h2>
            <p className="section-subtitle">See how we stack up against legacy platforms</p>
          </div>
          
          <div className="comparison-table">
            <div className="table-header">
              <div>Feature</div>
              <div>Quotely</div>
              <div>EZLynx</div>
              <div>Applied Rater</div>
            </div>
            
            <div className="table-row quotely-highlight">
              <div className="feature-name">⚡ Quote Generation Speed</div>
              <div className="check-mark">1.8 min</div>
              <div className="x-mark">4.2 min</div>
              <div className="x-mark">3.8 min</div>
            </div>
            
            <div className="table-row">
              <div className="feature-name">🤖 AI-Powered Recommendations</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">✗</div>
              <div className="x-mark">✗</div>
            </div>
            
            <div className="table-row quotely-highlight">
              <div className="feature-name">📱 Mobile-First Design</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">✗</div>
              <div className="x-mark">✗</div>
            </div>
            
            <div className="table-row">
              <div className="feature-name">🔍 Transparent Pricing</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">✗</div>
              <div className="x-mark">✗</div>
            </div>
            
            <div className="table-row quotely-highlight">
              <div className="feature-name">🔧 API-First Integration</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">Limited</div>
              <div className="x-mark">Limited</div>
            </div>
            
            <div className="table-row">
              <div className="feature-name">📊 Real-time Analytics</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">Basic</div>
              <div className="x-mark">Basic</div>
            </div>
            
            <div className="table-row quotely-highlight">
              <div className="feature-name">💰 Pricing (per agent/month)</div>
              <div className="check-mark">$49</div>
              <div className="x-mark">$89</div>
              <div className="x-mark">$95</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="testimonials-section fade-in">
          <div className="section-header">
            <h2 className="section-title">Trusted by 1000+ agencies</h2>
            <p className="section-subtitle">See what agents are saying about their switch to Quotely</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">"We cut our quote time from 6 minutes to under 2 minutes. Our close rate increased by 40% in the first quarter alone."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MJ</div>
                <div className="author-info">
                  <h4>Mike Johnson</h4>
                  <p>Owner, Johnson Insurance Group</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-quote">"The AI recommendations are spot-on. We're writing better policies and clients love how fast we can get them quotes."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SC</div>
                <div className="author-info">
                  <h4>Sarah Chen</h4>
                  <p>Agent, Metro Insurance Partners</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-quote">"Finally, a platform that works on mobile. I can quote clients while I'm out in the field. Game changer."</p>
              <div className="testimonial-author">
                <div className="author-avatar">DR</div>
                <div className="author-info">
                  <h4>David Rodriguez</h4>
                  <p>Senior Agent, Southwest Insurance Co</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INSURANCE JOURNAL INSIGHTS */}
        <section className="industry-insights-section fade-in">
          <div className="section-header">
            <h2 className="section-title">Industry Intelligence Hub</h2>
            <p className="section-subtitle">Real-time insights from Insurance Journal with Quotely's expert perspective</p>
          </div>
          <div className="insights-container">
            <RotatingNewsCommentary />
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to quote 10x faster?</h2>
            <p className="cta-subtitle">Join 1000+ agencies who've already made the switch. Start your free trial today.</p>
            <div className="cta-buttons">
              <button onClick={handleStartTrial} className="btn btn-primary" style={{background: 'white', color: 'var(--primary)'}}>
                🚀 Start Free Trial
              </button>
              <button onClick={handleScheduleDemo} className="btn btn-secondary">
                📞 Schedule Demo Call
              </button>
            </div>
          </div>
        </section>

        {/* FLOATING CTA */}
        <button className="floating-cta" onClick={handleStartTrial}>
          Try Quote Builder 🚀
        </button>
        
        <Footer />
      </div>
    </>
  )
}

export default function Home() {
  return <HomePage />
}