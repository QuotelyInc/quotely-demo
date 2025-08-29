import React, { useState } from 'react';

const EarlySignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    agencySize: '',
    currentSoftware: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email body with form data
      const emailBody = `
New Early Signup Registration:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Phone: ${formData.phone}
Agency Size: ${formData.agencySize}
Current Software: ${formData.currentSoftware}

Timestamp: ${new Date().toISOString()}
Source: Quotely Website Early Signup
      `;

      // Method 1: Formspree (recommended)
      const response = await fetch('https://formspree.io/f/xzzbgqka', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          agencySize: formData.agencySize,
          currentSoftware: formData.currentSoftware,
          _subject: `Early Signup: ${formData.name} - ${formData.company}`,
          message: emailBody
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Track conversion
        if (window.gtag) {
          window.gtag('event', 'early_signup_submit', {
            event_category: 'conversion',
            event_label: formData.company || 'Unknown Company',
            value: 1
          });
        }
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Fallback: Open email client
      const subject = encodeURIComponent(`Early Signup: ${formData.name} - ${formData.company}`);
      const body = encodeURIComponent(emailBody);
      window.location.href = `mailto:signup@tryquotely.com?subject=${subject}&body=${body}`;
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successIcon}>✓</div>
        <h3 style={styles.successTitle}>Thank You!</h3>
        <p style={styles.successText}>
          We've received your early signup request. You'll hear from us soon with exclusive early access details.
        </p>
        <p style={styles.confirmationEmail}>
          Confirmation sent to: <strong>{formData.email}</strong>
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              phone: '',
              agencySize: '',
              currentSoftware: ''
            });
          }}
          style={styles.resetButton}
        >
          Submit Another Signup
        </button>
      </div>
    );
  }

  return (
    <div style={styles.formContainer}>
      <div style={styles.formHeader}>
        <h3 style={styles.formTitle}>
          🚀 Join Our Early Access Program
        </h3>
        <p style={styles.formSubtitle}>
          Get exclusive early access and save <strong style={styles.highlight}>50% on your first year</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.gridRow}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
              placeholder="John Smith"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Business Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={styles.input}
              placeholder="john@agency.com"
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="company" style={styles.label}>
            Agency/Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
            style={styles.input}
            placeholder="ABC Insurance Agency"
          />
        </div>

        <div style={styles.gridRow}>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="(555) 123-4567"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="agencySize" style={styles.label}>
              Agency Size
            </label>
            <select
              id="agencySize"
              name="agencySize"
              value={formData.agencySize}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="">Select size</option>
              <option value="1-5">1-5 agents</option>
              <option value="6-15">6-15 agents</option>
              <option value="16-50">16-50 agents</option>
              <option value="51+">51+ agents</option>
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="currentSoftware" style={styles.label}>
            Current Quoting Software
          </label>
          <select
            id="currentSoftware"
            name="currentSoftware"
            value={formData.currentSoftware}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="">Select current software</option>
            <option value="Applied Rater">Applied Rater</option>
            <option value="EZLynx">EZLynx</option>
            <option value="AMS360">AMS360</option>
            <option value="HawkSoft">HawkSoft</option>
            <option value="Agency Management System">Other AMS</option>
            <option value="Manual Process">Manual Process</option>
            <option value="None">No current software</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
          style={{
            ...styles.submitButton,
            ...(isSubmitting || !formData.name || !formData.email || !formData.company ? styles.submitButtonDisabled : {})
          }}
        >
          {isSubmitting ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              Submitting...
            </div>
          ) : (
            '🎯 Get Early Access (50% Off First Year)'
          )}
        </button>

        <div style={styles.disclaimer}>
          <p style={styles.disclaimerText}>
            By submitting, you agree to receive updates about Quotely's early access program.
          </p>
          <p style={styles.disclaimerSubtext}>
            We respect your privacy and won't spam you. Unsubscribe anytime.
          </p>
        </div>
      </form>

      {/* Social Proof */}
      <div style={styles.socialProof}>
        <div style={styles.socialProofContent}>
          <div style={styles.avatarGroup}>
            <div style={{ ...styles.avatar, backgroundColor: '#ff6600' }}>J</div>
            <div style={{ ...styles.avatar, backgroundColor: '#0077cc' }}>M</div>
            <div style={{ ...styles.avatar, backgroundColor: '#28a745' }}>S</div>
            <div style={{ ...styles.avatar, backgroundColor: '#8b5cf6' }}>+</div>
          </div>
          <span style={styles.socialProofText}>
            <strong>247</strong> agencies already signed up this week
          </span>
        </div>
      </div>
    </div>
  );
};

// Early Signup Button Component (for placing anywhere on site)
export const EarlySignupButton = ({ className = "", children = "Get Early Access", buttonStyle = {} }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{ ...styles.earlyAccessButton, ...buttonStyle }}
        className={className}
      >
        {children}
      </button>

      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              style={styles.closeButton}
            >
              ×
            </button>
            <EarlySignupForm />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  formContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    padding: '32px'
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '8px'
  },
  formSubtitle: {
    color: '#6c757d',
    fontSize: '16px'
  },
  highlight: {
    color: '#ff6600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '4px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  submitButton: {
    width: '100%',
    padding: '14px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#ff6600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(255, 102, 0, 0.25)'
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    marginRight: '8px',
    animation: 'spin 1s linear infinite'
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: '16px'
  },
  disclaimerText: {
    fontSize: '12px',
    color: '#6c757d',
    marginBottom: '4px'
  },
  disclaimerSubtext: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  socialProof: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  socialProofContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  avatarGroup: {
    display: 'flex',
    marginRight: '8px'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: '700',
    marginLeft: '-8px',
    border: '2px solid white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  socialProofText: {
    fontSize: '14px',
    color: '#6c757d'
  },
  successContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    textAlign: 'center'
  },
  successIcon: {
    fontSize: '60px',
    color: '#28a745',
    marginBottom: '16px'
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '8px'
  },
  successText: {
    color: '#6c757d',
    marginBottom: '16px'
  },
  confirmationEmail: {
    fontSize: '14px',
    color: '#6c757d'
  },
  resetButton: {
    marginTop: '16px',
    color: '#ff6600',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 1000
  },
  modalContent: {
    position: 'relative',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#6c757d',
    border: '1px solid #dee2e6',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  earlyAccessButton: {
    backgroundColor: '#ff6600',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(255, 102, 0, 0.25)'
  }
};

// Add keyframe animation for spinner
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    input:focus, select:focus {
      border-color: #ff6600 !important;
      box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1) !important;
    }
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(255, 102, 0, 0.35) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default EarlySignupForm;