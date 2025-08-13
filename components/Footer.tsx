'use client'

import Link from 'next/link'
import { useOTTOTracking } from './OTTOProvider'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const { trackUserAction } = useOTTOTracking()

  const handleFooterLinkClick = (section: string, link: string) => {
    trackUserAction('footer_link_clicked', {
      section: section,
      link: link
    })
  }

  return (
    <>
      <style jsx>{`
        .footer {
          background: #1f2937;
          color: white;
          padding: 50px 0 20px;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-section h4 {
          margin-bottom: 1rem;
          color: #fbbf24;
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .footer-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .footer-section li {
          margin-bottom: 0.5rem;
        }
        
        .footer-section a {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.3s;
          display: inline-block;
          padding: 0.25rem 0;
        }
        
        .footer-section a:hover {
          color: #fbbf24;
        }
        
        .footer-section p {
          color: #d1d5db;
          margin: 0 0 0.5rem 0;
          line-height: 1.6;
        }
        
        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 2rem;
          text-align: center;
        }
        
        .footer-bottom p {
          margin: 0 0 0.5rem 0;
          color: #d1d5db;
        }
        
        .footer-bottom p:last-child {
          opacity: 0.8;
          font-size: 0.875rem;
        }
        
        .footer-social {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .social-link {
          color: #d1d5db;
          font-size: 1.25rem;
          transition: color 0.3s;
        }
        
        .social-link:hover {
          color: #fbbf24;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .footer {
            padding: 30px 0 20px;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>

      <footer className={`footer ${className}`}>
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li>
                  <Link 
                    href="/#features"
                    onClick={() => handleFooterLinkClick('product', 'features')}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing"
                    onClick={() => handleFooterLinkClick('product', 'pricing')}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#integrations"
                    onClick={() => handleFooterLinkClick('product', 'integrations')}
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <a 
                    href="#security"
                    onClick={() => handleFooterLinkClick('product', 'security')}
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a 
                    href="#api"
                    onClick={() => handleFooterLinkClick('product', 'api')}
                  >
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Solutions</h4>
              <ul>
                <li>
                  <a 
                    href="#auto-insurance"
                    onClick={() => handleFooterLinkClick('solutions', 'auto-insurance')}
                  >
                    Auto Insurance
                  </a>
                </li>
                <li>
                  <a 
                    href="#commercial"
                    onClick={() => handleFooterLinkClick('solutions', 'commercial')}
                  >
                    Commercial Insurance
                  </a>
                </li>
                <li>
                  <a 
                    href="#home-insurance"
                    onClick={() => handleFooterLinkClick('solutions', 'home-insurance')}
                  >
                    Home Insurance
                  </a>
                </li>
                <li>
                  <a 
                    href="#agencies"
                    onClick={() => handleFooterLinkClick('solutions', 'agencies')}
                  >
                    For Agencies
                  </a>
                </li>
                <li>
                  <a 
                    href="#brokers"
                    onClick={() => handleFooterLinkClick('solutions', 'brokers')}
                  >
                    For Brokers
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li>
                  <Link 
                    href="/blog"
                    onClick={() => handleFooterLinkClick('resources', 'blog')}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a 
                    href="#case-studies"
                    onClick={() => handleFooterLinkClick('resources', 'case-studies')}
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a 
                    href="#webinars"
                    onClick={() => handleFooterLinkClick('resources', 'webinars')}
                  >
                    Webinars
                  </a>
                </li>
                <li>
                  <a 
                    href="#training"
                    onClick={() => handleFooterLinkClick('resources', 'training')}
                  >
                    Training
                  </a>
                </li>
                <li>
                  <a 
                    href="#support"
                    onClick={() => handleFooterLinkClick('resources', 'support')}
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link 
                    href="/about"
                    onClick={() => handleFooterLinkClick('company', 'about')}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a 
                    href="#careers"
                    onClick={() => handleFooterLinkClick('company', 'careers')}
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    onClick={() => handleFooterLinkClick('company', 'contact')}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a 
                    href="#press"
                    onClick={() => handleFooterLinkClick('company', 'press')}
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a 
                    href="#partners"
                    onClick={() => handleFooterLinkClick('company', 'partners')}
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Get Started</h4>
              <p>Ready to transform your insurance agency?</p>
              <ul>
                <li>
                  <Link 
                    href="/demo"
                    onClick={() => handleFooterLinkClick('get-started', 'demo')}
                  >
                    Schedule Demo
                  </Link>
                </li>
                <li>
                  <a 
                    href="#trial"
                    onClick={() => handleFooterLinkClick('get-started', 'trial')}
                  >
                    Start Free Trial
                  </a>
                </li>
                <li>
                  <a 
                    href="#migration"
                    onClick={() => handleFooterLinkClick('get-started', 'migration')}
                  >
                    Migration Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 Quotely, Inc. All rights reserved.</p>
            <p>Transforming insurance technology, one agency at a time.</p>
            
            <div className="footer-social">
              <a 
                href="#twitter" 
                className="social-link"
                onClick={() => handleFooterLinkClick('social', 'twitter')}
              >
                📱
              </a>
              <a 
                href="#linkedin" 
                className="social-link"
                onClick={() => handleFooterLinkClick('social', 'linkedin')}
              >
                💼
              </a>
              <a 
                href="#youtube" 
                className="social-link"
                onClick={() => handleFooterLinkClick('social', 'youtube')}
              >
                📺
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}