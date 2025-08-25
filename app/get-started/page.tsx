'use client'

import { useState, useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/layout/Footer'

function GetStartedPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    agencyName: '',
    fullName: '',
    email: '',
    phone: '',
    agencyType: '',
    monthlyQuotes: '',
    currentSystem: '',
    painPoints: [] as string[]
  })

  useEffect(() => {
    trackPageView('get_started', {
      section: 'onboarding',
      content_type: 'quick_setup'
    })
  }, [trackPageView])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckboxChange = (value: string) => {
    const newPainPoints = formData.painPoints.includes(value)
      ? formData.painPoints.filter(p => p !== value)
      : [...formData.painPoints, value]
    
    setFormData({
      ...formData,
      painPoints: newPainPoints
    })
  }

  const handleNextStep = () => {
    trackUserAction('onboarding_step_completed', {
      step: currentStep,
      step_name: getStepName(currentStep)
    })
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    trackUserAction('onboarding_completed', {
      agency_type: formData.agencyType,
      monthly_quotes: formData.monthlyQuotes,
      current_system: formData.currentSystem,
      pain_points: formData.painPoints
    })
    // Handle form submission
    alert('Welcome to Quotely! Your account is being set up. Check your email for next steps.')
  }

  const getStepName = (step: number) => {
    switch(step) {
      case 1: return 'agency_info'
      case 2: return 'contact_info'
      case 3: return 'business_needs'
      default: return 'unknown'
    }
  }

  return (
    <div>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-section {
          background: var(--gradient-bg);
          color: white;
          padding: 120px 0 60px;
          text-align: center;
        }
        
        .hero-section h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          margin-bottom: 2rem;
        }
        
        .time-badge {
          background: rgba(255, 255, 255, 0.2);
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        /* Progress Bar */
        .progress-container {
          background: white;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 80px;
          z-index: 100;
        }
        
        .progress-bar {
          display: flex;
          justify-content: space-between;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .progress-step {
          flex: 1;
          text-align: center;
          position: relative;
        }
        
        .progress-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 60%;
          width: calc(100% - 20%);
          height: 2px;
          background: #E5E7EB;
        }
        
        .progress-step.completed:not(:last-child)::after {
          background: var(--primary);
        }
        
        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #E5E7EB;
          color: #6B7280;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .progress-step.active .step-circle,
        .progress-step.completed .step-circle {
          background: var(--primary);
          color: white;
        }
        
        .step-label {
          font-size: 0.875rem;
          color: #6B7280;
        }
        
        .progress-step.active .step-label,
        .progress-step.completed .step-label {
          color: var(--text-primary);
          font-weight: 600;
        }
        
        /* Form Section */
        .form-section {
          padding: 4rem 0;
          min-height: 500px;
        }
        
        .form-card {
          background: var(--surface);
          border-radius: 1rem;
          padding: 3rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }
        
        .form-header {
          margin-bottom: 2rem;
        }
        
        .form-header h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .form-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid var(--border);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 2px solid var(--border);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .checkbox-item:hover {
          border-color: var(--primary);
          background: #F8FAFC;
        }
        
        .checkbox-item.selected {
          border-color: var(--primary);
          background: #EFF6FF;
        }
        
        .checkbox-item input {
          margin-right: 0.75rem;
        }
        
        .checkbox-item label {
          cursor: pointer;
          margin: 0;
        }
        
        /* Buttons */
        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .btn-primary {
          background: var(--gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
          background: var(--primary);
          color: white;
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Features List */
        .features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 2rem 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
        }
        
        .feature-item::before {
          content: '✓';
          color: #10B981;
          font-weight: bold;
          font-size: 1.25rem;
        }
        
        /* Value Props */
        .value-props {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .value-prop {
          text-align: center;
        }
        
        .value-icon {
          width: 60px;
          height: 60px;
          background: var(--gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.5rem;
          color: white;
        }
        
        .value-prop h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .value-prop p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }
          
          .progress-bar {
            font-size: 0.875rem;
          }
          
          .form-card {
            padding: 2rem 1.5rem;
          }
          
          .checkbox-group {
            grid-template-columns: 1fr;
          }
          
          .features-list {
            grid-template-columns: 1fr;
          }
          
          .button-group {
            flex-direction: column-reverse;
            gap: 1rem;
          }
          
          .btn {
            width: 100%;
          }
        }
      `}</style>

      <MinimalNav />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Get Started with Quotely</h1>
          <p>Join thousands of agents saving 3+ hours per day</p>
          <div className="time-badge">⏱️ Setup in under 2 minutes</div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-circle">1</div>
            <div className="step-label">Agency Info</div>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-circle">2</div>
            <div className="step-label">Contact Details</div>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            <div className="step-circle">3</div>
            <div className="step-label">Business Needs</div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="form-section">
        <div className="container">
          <div className="form-card">
            {/* Step 1: Agency Info */}
            {currentStep === 1 && (
              <>
                <div className="form-header">
                  <h2>Tell us about your agency</h2>
                  <p>We'll customize Quotely to match your workflow</p>
                </div>
                
                <div className="form-group">
                  <label>Agency Name *</label>
                  <input
                    type="text"
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleInputChange}
                    placeholder="ABC Insurance Agency"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Agency Type *</label>
                  <select
                    name="agencyType"
                    value={formData.agencyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select agency type</option>
                    <option value="independent">Independent Agency</option>
                    <option value="captive">Captive Agency</option>
                    <option value="broker">Insurance Broker</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="mgu">Managing General Underwriter</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Monthly Quote Volume *</label>
                  <select
                    name="monthlyQuotes"
                    value={formData.monthlyQuotes}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select quote volume</option>
                    <option value="0-50">0-50 quotes</option>
                    <option value="51-150">51-150 quotes</option>
                    <option value="151-300">151-300 quotes</option>
                    <option value="301-500">301-500 quotes</option>
                    <option value="500+">500+ quotes</option>
                  </select>
                </div>
                
                <div className="features-list">
                  <div className="feature-item">No credit card required</div>
                  <div className="feature-item">14-day free trial</div>
                  <div className="feature-item">Cancel anytime</div>
                  <div className="feature-item">Free onboarding support</div>
                </div>
                
                <div className="button-group">
                  <span></span>
                  <button 
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!formData.agencyName || !formData.agencyType || !formData.monthlyQuotes}
                  >
                    Continue →
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <>
                <div className="form-header">
                  <h2>Your contact information</h2>
                  <p>We'll use this to set up your account</p>
                </div>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@abcinsurance.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="value-props">
                  <div className="value-prop">
                    <div className="value-icon">🚀</div>
                    <h3>Quick Setup</h3>
                    <p>Import your data in minutes</p>
                  </div>
                  <div className="value-prop">
                    <div className="value-icon">🎯</div>
                    <h3>Personalized</h3>
                    <p>Tailored to your workflow</p>
                  </div>
                  <div className="value-prop">
                    <div className="value-icon">💬</div>
                    <h3>24/7 Support</h3>
                    <p>We're here to help</p>
                  </div>
                </div>
                
                <div className="button-group">
                  <button 
                    className="btn btn-secondary"
                    onClick={handlePreviousStep}
                  >
                    ← Back
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!formData.fullName || !formData.email}
                  >
                    Continue →
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Business Needs */}
            {currentStep === 3 && (
              <>
                <div className="form-header">
                  <h2>How can we help you succeed?</h2>
                  <p>Select your current challenges (optional)</p>
                </div>
                
                <div className="form-group">
                  <label>Current System</label>
                  <select
                    name="currentSystem"
                    value={formData.currentSystem}
                    onChange={handleInputChange}
                  >
                    <option value="">Select current system</option>
                    <option value="competitor">competitor platforms</option>
                    <option value="applied">Applied Epic/TAM</option>
                    <option value="ams360">AMS360</option>
                    <option value="hawksoft">HawkSoft</option>
                    <option value="other">Other</option>
                    <option value="none">No current system</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>What are your biggest pain points?</label>
                  <div className="checkbox-group">
                    <div 
                      className={`checkbox-item ${formData.painPoints.includes('slow-quotes') ? 'selected' : ''}`}
                      onClick={() => handleCheckboxChange('slow-quotes')}
                    >
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes('slow-quotes')}
                        onChange={() => {}}
                      />
                      <label>Slow quote generation</label>
                    </div>
                    <div 
                      className={`checkbox-item ${formData.painPoints.includes('manual-entry') ? 'selected' : ''}`}
                      onClick={() => handleCheckboxChange('manual-entry')}
                    >
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes('manual-entry')}
                        onChange={() => {}}
                      />
                      <label>Too much manual entry</label>
                    </div>
                    <div 
                      className={`checkbox-item ${formData.painPoints.includes('no-transparency') ? 'selected' : ''}`}
                      onClick={() => handleCheckboxChange('no-transparency')}
                    >
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes('no-transparency')}
                        onChange={() => {}}
                      />
                      <label>Lack of transparency</label>
                    </div>
                    <div 
                      className={`checkbox-item ${formData.painPoints.includes('expensive') ? 'selected' : ''}`}
                      onClick={() => handleCheckboxChange('expensive')}
                    >
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes('expensive')}
                        onChange={() => {}}
                      />
                      <label>High software costs</label>
                    </div>
                    <div 
                      className={`checkbox-item ${formData.painPoints.includes('poor-support') ? 'selected' : ''}`}
                      onClick={() => handleCheckboxChange('poor-support')}
                    >
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes('poor-support')}
                        onChange={() => {}}
                      />
                      <label>Poor customer support</label>
                    </div>
                    <div 
                      className={`checkbox-item ${formData.painPoints.includes('integration') ? 'selected' : ''}`}
                      onClick={() => handleCheckboxChange('integration')}
                    >
                      <input
                        type="checkbox"
                        checked={formData.painPoints.includes('integration')}
                        onChange={() => {}}
                      />
                      <label>Limited integrations</label>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  marginTop: '2rem'
                }}>
                  <h3 style={{color: '#065F46', marginBottom: '0.5rem'}}>🎉 You're all set!</h3>
                  <p style={{color: '#047857', margin: 0}}>
                    Click below to create your account and start your 14-day free trial
                  </p>
                </div>
                
                <div className="button-group">
                  <button 
                    className="btn btn-secondary"
                    onClick={handlePreviousStep}
                  >
                    ← Back
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      fontSize: '1.1rem',
                      padding: '1.25rem 2.5rem'
                    }}
                  >
                    Create My Account 🚀
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function GetStarted() {
  return <GetStartedPage />
}