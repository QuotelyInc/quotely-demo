'use client'

import { useEffect, useState } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

function DemoPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agency: '',
    phone: '',
    currentPlatform: '',
    agencySize: ''
  })

  useEffect(() => {
    trackPageView('demo', {
      section: 'demo',
      content_type: 'demo_request'
    })
  }, [trackPageView])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackUserAction('demo_requested', {
      agency_size: formData.agencySize,
      current_platform: formData.currentPlatform,
      source: 'demo_page'
    })
    alert('Thank you! We will contact you within 24 hours to schedule your personalized demo.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      agency: '',
      phone: '',
      currentPlatform: '',
      agencySize: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleQuickDemo = () => {
    trackUserAction('quick_demo_clicked', {
      location: 'demo_page'
    })
  }

  const handleScheduleCall = () => {
    trackUserAction('schedule_call_clicked', {
      location: 'demo_page'
    })
  }

  return (
    <div>
      <style jsx>{`
        :root {
          --primary: #0057FF;
          --primary-dark: #0041CC;
          --secondary: #2E2E2E;
          --accent: #00C851;
          --warning: #FF6B35;
          --surface: #FFFFFF;
          --background: #F8FAFC;
          --text-primary: #1F2937;
          --text-secondary: #6B7280;
          --border: #E5E7EB;
          --gradient: linear-gradient(135deg, #0057FF 0%, #0041CC 100%);
          --gradient-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #4f46e5;
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .nav-links a:hover,
        .nav-links a.active {
          color: #4f46e5;
        }
        
        .nav-buttons {
          display: flex;
          gap: 1rem;
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
          background: var(--gradient);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 87, 255, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 87, 255, 0.5);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }
        
        /* Hero Section */
        .demo-hero {
          background: var(--gradient-bg);
          padding: 150px 0 80px;
          text-align: center;
          color: white;
        }
        
        .demo-hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .demo-hero p {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto 2rem;
        }
        
        .demo-options {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        /* Demo Content */
        .demo-content {
          padding: 4rem 2rem;
          background: white;
        }
        
        .demo-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .demo-form {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        
        .demo-form h2 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .demo-form p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--border);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
        }
        
        .form-submit {
          width: 100%;
          padding: 1rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 87, 255, 0.5);
        }
        
        /* Demo Features */
        .demo-features {
          padding: 2rem;
        }
        
        .demo-features h2 {
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .feature-list {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }
        
        .feature-list li {
          padding: 1rem;
          margin-bottom: 1rem;
          background: var(--background);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .feature-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          background: var(--gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .feature-content h3 {
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }
        
        .feature-content p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* Video Section */
        .video-section {
          padding: 4rem 2rem;
          background: var(--background);
          text-align: center;
        }
        
        .video-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        
        .video-placeholder {
          width: 100%;
          height: 400px;
          background: linear-gradient(45deg, #f0f2f5, #e4e7ea);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        
        .play-button {
          width: 80px;
          height: 80px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
        }
        
        .play-button:hover {
          transform: scale(1.1);
          background: var(--primary-dark);
        }
        
        /* Stats */
        .demo-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .stat-item {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        /* Footer */
        .footer {
          background: #1f2937;
          color: white;
          padding: 50px 0;
        }
        
        .footer-content {
          text-align: center;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .demo-hero h1 {
            font-size: 2rem;
          }
          
          .demo-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .demo-options {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <Navigation />

      {/* Demo Hero */}
      <section className="demo-hero">
        <div className="container">
          <h1>Experience Quotely in Action</h1>
          <p>See how our AI-powered platform transforms insurance quoting. Book a personalized demo or watch our quick overview.</p>
          <div className="demo-options">
            <button onClick={handleQuickDemo} className="btn btn-primary">
              ▶️ Watch 3-Minute Demo
            </button>
            <button onClick={handleScheduleCall} className="btn btn-secondary">
              📞 Schedule Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="demo-content">
        <div className="demo-grid">
          {/* Demo Request Form */}
          <div className="demo-form">
            <h2>Request Your Personal Demo</h2>
            <p>Get a customized walkthrough tailored to your agency's needs and current workflow.</p>
            
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Business Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="agency">Agency Name *</label>
                <input 
                  type="text" 
                  id="agency" 
                  name="agency"
                  value={formData.agency}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="currentPlatform">Current Platform</label>
                <select 
                  id="currentPlatform" 
                  name="currentPlatform"
                  value={formData.currentPlatform}
                  onChange={handleInputChange}
                >
                  <option value="">Select your current system</option>
                  <option value="ezlynx">EZLynx</option>
                  <option value="applied">Applied Systems</option>
                  <option value="vertafore">Vertafore</option>
                  <option value="nowcerts">NowCerts</option>
                  <option value="hawksoft">HawkSoft</option>
                  <option value="other">Other</option>
                  <option value="none">No current system</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="agencySize">Agency Size</label>
                <select 
                  id="agencySize" 
                  name="agencySize"
                  value={formData.agencySize}
                  onChange={handleInputChange}
                >
                  <option value="">Select agency size</option>
                  <option value="1-2">1-2 agents</option>
                  <option value="3-5">3-5 agents</option>
                  <option value="6-10">6-10 agents</option>
                  <option value="11-25">11-25 agents</option>
                  <option value="25+">25+ agents</option>
                </select>
              </div>
              
              <button type="submit" className="form-submit">
                Schedule My Demo
              </button>
            </form>
          </div>

          {/* Demo Features */}
          <div className="demo-features">
            <h2>What You'll See in Your Demo</h2>
            
            <ul className="feature-list">
              <li>
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h3>Lightning-Fast Quote Generation</h3>
                  <p>Watch us generate a complete auto insurance quote in under 2 minutes</p>
                </div>
              </li>
              
              <li>
                <div className="feature-icon">🤖</div>
                <div className="feature-content">
                  <h3>AI-Powered Recommendations</h3>
                  <p>See how QUAD analyzes risk factors and suggests optimal coverage</p>
                </div>
              </li>
              
              <li>
                <div className="feature-icon">📊</div>
                <div className="feature-content">
                  <h3>Analytics Dashboard</h3>
                  <p>Explore real-time insights into your agency's performance metrics</p>
                </div>
              </li>
              
              <li>
                <div className="feature-icon">🔗</div>
                <div className="feature-content">
                  <h3>Seamless Integrations</h3>
                  <p>Live demonstration of carrier connections and data synchronization</p>
                </div>
              </li>
              
              <li>
                <div className="feature-icon">💰</div>
                <div className="feature-content">
                  <h3>ROI Calculator</h3>
                  <p>See your potential savings and revenue increase with Quotely</p>
                </div>
              </li>
            </ul>

            <div style={{background: 'var(--background)', padding: '1.5rem', borderRadius: '0.75rem', marginTop: '1.5rem'}}>
              <h3 style={{margin: '0 0 0.5rem 0', color: 'var(--text-primary)'}}>Demo Guarantee</h3>
              <p style={{margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem'}}>
                <strong>30-minute personalized demo</strong> · <strong>No sales pressure</strong> · <strong>Custom setup for your agency</strong> · <strong>Q&A with our experts</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="container">
          <div className="video-container">
            <h2 style={{marginBottom: '1rem'}}>Quick Platform Overview</h2>
            <p style={{marginBottom: '2rem', color: 'var(--text-secondary)'}}>
              Get a 3-minute overview of Quotely's key features and see why 1000+ agencies have made the switch.
            </p>
            
            <div className="video-placeholder">
              <div className="play-button" onClick={handleQuickDemo}>▶</div>
              {/* Simulated dashboard preview */}
              <div style={{position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', opacity: 0.1}}></div>
              <div style={{position: 'absolute', top: '30px', left: '30px', right: '30px', height: '20px', background: 'white', borderRadius: '4px', opacity: 0.3}}></div>
              <div style={{position: 'absolute', top: '60px', left: '30px', right: '30px', height: '100px', background: 'white', borderRadius: '8px', opacity: 0.4}}></div>
            </div>
            
            <p style={{color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0}}>
              🚀 Watch how quotes that take 5+ minutes elsewhere happen in under 2 minutes with Quotely
            </p>
          </div>
        </div>
      </section>

      {/* Demo Stats */}
      <section className="demo-content">
        <div className="container">
          <div className="demo-stats">
            <div className="stat-item">
              <div className="stat-number">2,400+</div>
              <div className="stat-label">Demos completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">94%</div>
              <div className="stat-label">Choose to implement</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">30 min</div>
              <div className="stat-label">Average demo length</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24 hrs</div>
              <div className="stat-label">Response time</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Demo() {
  return <DemoPage />
}