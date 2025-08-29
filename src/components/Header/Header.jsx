import React, { useState } from 'react';
import { EarlySignupButton } from '../EarlySignupForm/EarlySignupForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Compare', path: '/compare' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.navContent}>
            {/* Logo */}
            <div style={styles.logo}>
              <a href="/" style={styles.logoLink}>
                <span style={styles.logoText}>Quotely</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div style={styles.desktopNav}>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    e.target.style.color = styles.navLinkHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = styles.navLink.color;
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div style={styles.ctaContainer}>
              <EarlySignupButton 
                buttonStyle={styles.ctaButton}
              >
                Get Started
              </EarlySignupButton>
            </div>

            {/* Mobile Menu Button */}
            <button 
              style={styles.mobileMenuButton}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div style={{
                ...styles.hamburgerLine,
                ...(isMenuOpen ? styles.hamburgerLineOpen1 : {})
              }}></div>
              <div style={{
                ...styles.hamburgerLine,
                ...(isMenuOpen ? styles.hamburgerLineOpen2 : {})
              }}></div>
              <div style={{
                ...styles.hamburgerLine,
                ...(isMenuOpen ? styles.hamburgerLineOpen3 : {})
              }}></div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div style={{
            ...styles.mobileNav,
            ...(isMenuOpen ? styles.mobileNavOpen : {})
          }}>
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                style={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/pricing"
              style={styles.mobileCtaButton}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: '#1a3a6e',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #112b50',
    transition: 'all 0.3s ease'
  },
  nav: {
    width: '100%'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.5px'
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    position: 'relative',
    opacity: 0.9
  },
  navLinkHover: {
    color: '#ffd700',
    opacity: 1
  },
  ctaContainer: {
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  ctaButton: {
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(255, 102, 0, 0.25)'
  },
  ctaButtonHover: {
    backgroundColor: '#ff8533',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(255, 102, 0, 0.35)'
  },
  mobileMenuButton: {
    display: 'none',
    flexDirection: 'column',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    '@media (max-width: 768px)': {
      display: 'flex'
    }
  },
  hamburgerLine: {
    width: '24px',
    height: '3px',
    backgroundColor: '#ffffff',
    margin: '2px 0',
    transition: 'all 0.3s ease',
    borderRadius: '2px'
  },
  hamburgerLineOpen1: {
    transform: 'rotate(45deg) translate(5px, 5px)'
  },
  hamburgerLineOpen2: {
    opacity: 0
  },
  hamburgerLineOpen3: {
    transform: 'rotate(-45deg) translate(7px, -6px)'
  },
  mobileNav: {
    display: 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#1a3a6e',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  mobileNavOpen: {
    display: 'flex'
  },
  mobileNavLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.2s ease'
  },
  mobileCtaButton: {
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '16px 20px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    transition: 'background-color 0.2s ease'
  }
};

// Add responsive styles using CSS-in-JS media queries
if (typeof window !== 'undefined' && window.innerWidth <= 768) {
  styles.desktopNav.display = 'none';
  styles.ctaContainer.display = 'none';
  styles.mobileMenuButton.display = 'flex';
}

export default Header;