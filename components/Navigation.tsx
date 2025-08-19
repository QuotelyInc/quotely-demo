'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOTTOTracking } from './OTTOProvider'
import { useState, useEffect } from 'react'
import SecurityBadges from './SecurityBadges'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname()
  const { trackUserAction } = useOTTOTracking()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (page: string) => {
    trackUserAction('navigation_clicked', {
      destination: page,
      source: 'main_navigation'
    })
    setMobileMenuOpen(false)
  }

  const handleLoginClick = () => {
    trackUserAction('login_clicked', {
      source: 'main_navigation'
    })
  }

  const handleTrialClick = () => {
    trackUserAction('trial_clicked', {
      source: 'main_navigation'
    })
  }

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      <style jsx>{`
        /* Modern Glass Morphism Navigation */
        .header {
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 9999;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(10, 11, 13, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .header.scrolled {
          background: rgba(10, 11, 13, 0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scrolled .nav-container {
          height: 64px;
        }
        
        /* Logo */
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #2A4365 0%, #3A5883 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          color: white;
          box-shadow: 0 2px 8px rgba(42, 67, 101, 0.15);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .logo:hover .logo-icon {
          transform: rotate(-5deg) scale(1.05);
          box-shadow: 0 4px 12px rgba(42, 67, 101, 0.25);
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          color: #2A4365;
          letter-spacing: -0.02em;
        }

        /* Trust Badge Next to Logo */
        .trust-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: #EBF4FF;
          border: 1px solid #38B2AC;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #2A4365;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .trust-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        /* Main Navigation */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-links li {
          margin: 0;
        }
        
        .nav-link {
          position: relative;
          padding: 10px 18px;
          text-decoration: none;
          color: #1F2937;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid transparent;
        }
        
        .nav-link:hover {
          color: #2A4365;
          background: rgba(42, 67, 101, 0.08);
          border-color: rgba(42, 67, 101, 0.15);
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          color: #2A4365;
          background: rgba(42, 67, 101, 0.12);
          border-color: #38B2AC;
          font-weight: 700;
        }

        /* QUAD Special Badge */
        .quad-badge {
          background: linear-gradient(135deg, #FFB800 0%, #FF6B35 100%);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-left: 4px;
          box-shadow: 0 2px 4px rgba(255, 107, 53, 0.2);
        }
        
        /* Right Section - Auth Buttons */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Login Button - More Visible */
        .btn-login {
          padding: 11px 22px;
          background: white;
          color: #1F2937;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-login:hover {
          color: #2A4365;
          background: rgba(42, 67, 101, 0.05);
          border-color: #2A4365;
          transform: translateY(-1px);
        }

        /* Get Started - Premium CTA with Enhanced Visibility */
        .btn-get-started {
          position: relative;
          padding: 12px 28px;
          background: linear-gradient(135deg, #2A4365 0%, #3A5883 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 14px rgba(42, 67, 101, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .btn-get-started::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-get-started:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(42, 67, 101, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .btn-get-started:hover::before {
          left: 100%;
        }

        .btn-get-started:active {
          transform: translateY(0);
        }

        /* Arrow Animation */
        .arrow-icon {
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .btn-get-started:hover .arrow-icon {
          transform: translateX(3px);
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: none;
          width: 48px;
          height: 48px;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .mobile-menu-button:hover {
          background: rgba(42, 67, 101, 0.04);
          border-color: rgba(42, 67, 101, 0.2);
        }

        .hamburger {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 14px;
        }

        .hamburger span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: #4B5563;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .hamburger span:nth-child(1) {
          top: 0;
        }

        .hamburger span:nth-child(2) {
          top: 6px;
        }

        .hamburger span:nth-child(3) {
          top: 12px;
        }

        .mobile-menu-button.open .hamburger span:nth-child(1) {
          transform: rotate(45deg);
          top: 6px;
        }

        .mobile-menu-button.open .hamburger span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-button.open .hamburger span:nth-child(3) {
          transform: rotate(-45deg);
          top: 6px;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          padding: 24px;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0 0 24px 0;
          padding: 0;
        }

        .mobile-nav-links li {
          margin: 0 0 8px 0;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          text-decoration: none;
          color: #4B5563;
          font-size: 16px;
          font-weight: 500;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: rgba(0, 82, 204, 0.08);
          color: #0052CC;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .mobile-actions .btn-login,
        .mobile-actions .btn-get-started {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 24px;
          }

          .trust-indicator {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .nav-links,
          .nav-actions {
            display: none;
          }
          
          .mobile-menu-button {
            display: block;
          }

          .nav-container {
            padding: 0 16px;
          }
        }
      `}</style>

      <header className={`header ${scrolled ? 'scrolled' : ''} ${className}`}>
        <div className="nav-container">
          <div className="logo-section">
            <Link 
              href="/" 
              className="logo"
              onClick={() => handleNavClick('home')}
            >
              <div className="logo-icon">Q</div>
              <span className="logo-text">Quotely</span>
            </Link>
            <SecurityBadges />
          </div>
          
          <ul className="nav-links">
            <li>
              <Link 
                href="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/quad" 
                className={`nav-link ${isActive('/quad') ? 'active' : ''}`}
                onClick={() => handleNavClick('quad')}
              >
                QUAD
                <span className="quad-badge">NEW</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/#features" 
                className="nav-link"
                onClick={() => handleNavClick('features')}
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/#integrations"
                className="nav-link"
                onClick={() => handleNavClick('integrations')}
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link 
                href="/turborater-demo"
                className={`nav-link ${isActive('/turborater-demo') ? 'active' : ''}`}
                onClick={() => handleNavClick('turborater-demo')}
              >
                TurboRater
                <span className="quad-badge">DEMO</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/turborater-hub"
                className={`nav-link ${isActive('/turborater-hub') ? 'active' : ''}`}
                onClick={() => handleNavClick('turborater-hub')}
              >
                Hub
                <span className="quad-badge">LIVE</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                onClick={() => handleNavClick('blog')}
              >
                Blog
              </Link>
            </li>
            <li>
              <a 
                href="https://www.xcelsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                onClick={() => handleNavClick('ce-credits')}
                style={{display: 'flex', alignItems: 'center', gap: '4px'}}
              >
                CE Credits
                <span style={{fontSize: '12px', opacity: 0.8}}>↗</span>
              </a>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </Link>
            </li>
          </ul>
          
          <div className="nav-actions">
            <button 
              onClick={handleLoginClick}
              className="btn-login"
            >
              Login
            </button>
            <Link 
              href="/get-started" 
              className="btn-get-started"
              onClick={handleTrialClick}
            >
              Get Started
              <span className="arrow-icon">→</span>
            </Link>
          </div>
          
          <button 
            className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <Link 
                href="/" 
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/quad" 
                className={`mobile-nav-link ${isActive('/quad') ? 'active' : ''}`}
                onClick={() => handleNavClick('quad')}
              >
                QUAD
                <span className="quad-badge">NEW</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/#features" 
                className="mobile-nav-link"
                onClick={() => handleNavClick('features')}
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className={`mobile-nav-link ${isActive('/pricing') ? 'active' : ''}`}
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/#integrations"
                className="mobile-nav-link"
                onClick={() => handleNavClick('integrations')}
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className={`mobile-nav-link ${isActive('/blog') ? 'active' : ''}`}
                onClick={() => handleNavClick('blog')}
              >
                Blog
              </Link>
            </li>
            <li>
              <a 
                href="https://www.xcelsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-link"
                onClick={() => handleNavClick('ce-credits')}
                style={{display: 'flex', alignItems: 'center', gap: '4px'}}
              >
                CE Credits
                <span style={{fontSize: '12px', opacity: 0.8}}>↗</span>
              </a>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </Link>
            </li>
          </ul>
          
          <div className="mobile-actions">
            <button 
              onClick={handleLoginClick}
              className="btn-login"
            >
              Login
            </button>
            <Link 
              href="/get-started" 
              className="btn-get-started"
              onClick={handleTrialClick}
            >
              Get Started
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}