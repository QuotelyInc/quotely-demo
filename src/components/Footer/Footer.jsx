import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Calculator', href: '/calculator' },
        { name: 'Compare', href: '/compare' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'API', href: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Partners', href: '/partners' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Community', href: '/community' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Status', href: '/status' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Security', href: '/security' },
        { name: 'Compliance', href: '/compliance' }
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/quotely',
      icon: '🐦'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/quotely',
      icon: '💼'
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/quotely',
      icon: '📘'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/quotely',
      icon: '🎥'
    }
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Main Footer Content */}
        <div style={styles.mainContent}>
          {/* Company Info */}
          <div style={styles.companySection}>
            <div style={styles.logo}>
              <span style={styles.logoText}>Quotely</span>
            </div>
            <p style={styles.companyDescription}>
              Empowering insurance agents with intelligent technology to streamline quotes, 
              increase conversions, and grow their business. Join thousands of agents who 
              trust Quotely to transform their workflow.
            </p>
            
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📧</span>
                <span style={styles.contactText}>hello@quotely.com</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <span style={styles.contactText}>1-800-QUOTELY</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <span style={styles.contactText}>San Francisco, CA</span>
              </div>
            </div>

            <div style={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  style={styles.socialLink}
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = styles.socialLinkHover.backgroundColor;
                    e.target.style.transform = styles.socialLinkHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = styles.socialLink.backgroundColor;
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div style={styles.linksSection}>
            {footerSections.map((section, index) => (
              <div key={index} style={styles.linkColumn}>
                <h3 style={styles.columnTitle}>{section.title}</h3>
                <ul style={styles.linkList}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} style={styles.linkItem}>
                      <a 
                        href={link.href} 
                        style={styles.link}
                        onMouseEnter={(e) => {
                          e.target.style.color = styles.linkHover.color;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = styles.link.color;
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div style={styles.newsletterSection}>
          <div style={styles.newsletterContent}>
            <h3 style={styles.newsletterTitle}>Stay Updated</h3>
            <p style={styles.newsletterDescription}>
              Get the latest insurance industry insights, product updates, and tips 
              delivered to your inbox monthly.
            </p>
          </div>
          <div style={styles.newsletterForm}>
            <div style={styles.emailInputContainer}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={styles.emailInput}
                onFocus={(e) => {
                  e.target.style.borderColor = styles.emailInputFocus.borderColor;
                  e.target.style.boxShadow = styles.emailInputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = styles.emailInput.borderColor;
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button 
                style={styles.subscribeButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.subscribeButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.subscribeButton.backgroundColor;
                }}
              >
                Subscribe
              </button>
            </div>
            <p style={styles.privacyNote}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={styles.trustSection}>
          <div style={styles.trustIndicators}>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🔒</span>
              <span style={styles.trustText}>SOC 2 Certified</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🛡️</span>
              <span style={styles.trustText}>GDPR Compliant</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>⚡</span>
              <span style={styles.trustText}>99.9% Uptime</span>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🏆</span>
              <span style={styles.trustText}>Award-Winning</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <div style={styles.copyright}>
            <p style={styles.copyrightText}>
              © {currentYear} Quotely, Inc. All rights reserved.
            </p>
          </div>
          <div style={styles.bottomLinks}>
            <a 
              href="/privacy" 
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.bottomLinkHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.bottomLink.color;
              }}
            >
              Privacy
            </a>
            <span style={styles.separator}>•</span>
            <a 
              href="/terms" 
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.bottomLinkHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.bottomLink.color;
              }}
            >
              Terms
            </a>
            <span style={styles.separator}>•</span>
            <a 
              href="/cookies" 
              style={styles.bottomLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.bottomLinkHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.bottomLink.color;
              }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1e293b',
    color: '#e2e8f0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '80px',
    paddingTop: '80px',
    paddingBottom: '60px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '60px'
    }
  },
  companySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  logo: {
    marginBottom: '8px'
  },
  logoText: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#60a5fa'
  },
  companyDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#94a3b8',
    margin: 0
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  contactIcon: {
    fontSize: '1.1rem'
  },
  contactText: {
    fontSize: '0.95rem',
    color: '#94a3b8'
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    backgroundColor: '#334155',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'all 0.2s ease'
  },
  socialLinkHover: {
    backgroundColor: '#475569',
    transform: 'translateY(-2px)'
  },
  linksSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '32px'
    }
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  columnTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '16px'
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  linkItem: {
    margin: 0
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s ease'
  },
  linkHover: {
    color: '#e2e8f0'
  },
  newsletterSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#334155',
    borderRadius: '12px',
    margin: '0 0 60px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '24px',
      padding: '32px',
      textAlign: 'center'
    }
  },
  newsletterContent: {},
  newsletterTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '8px'
  },
  newsletterDescription: {
    fontSize: '1rem',
    color: '#94a3b8',
    lineHeight: '1.5',
    margin: 0
  },
  newsletterForm: {},
  emailInputContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    '@media (max-width: 640px)': {
      flexDirection: 'column'
    }
  },
  emailInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #475569',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  emailInputFocus: {
    borderColor: '#60a5fa',
    boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.1)'
  },
  subscribeButton: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    flexShrink: 0
  },
  subscribeButtonHover: {
    backgroundColor: '#1d4ed8'
  },
  privacyNote: {
    fontSize: '0.8rem',
    color: '#64748b',
    margin: 0
  },
  trustSection: {
    borderTop: '1px solid #334155',
    borderBottom: '1px solid #334155',
    padding: '32px 0'
  },
  trustIndicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    flexWrap: 'wrap'
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  trustIcon: {
    fontSize: '1.2rem'
  },
  trustText: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    fontWeight: '500'
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '32px',
    paddingBottom: '40px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '16px',
      textAlign: 'center'
    }
  },
  copyright: {},
  copyrightText: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: 0
  },
  bottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  bottomLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease'
  },
  bottomLinkHover: {
    color: '#e2e8f0'
  },
  separator: {
    color: '#64748b',
    fontSize: '0.8rem'
  }
};

export default Footer;