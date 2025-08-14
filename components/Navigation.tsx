'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOTTOTracking } from './OTTOProvider'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname()
  const { trackUserAction } = useOTTOTracking()

  const handleNavClick = (page: string) => {
    trackUserAction('navigation_clicked', {
      destination: page,
      source: 'main_navigation'
    })
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #4f46e5;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .logo:hover {
          color: #3730a3;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-links li {
          margin: 0;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
          padding: 0.5rem 0;
          position: relative;
        }
        
        .nav-links a:hover {
          color: #4f46e5;
        }
        
        .nav-links a.active {
          color: #4f46e5;
        }
        
        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          right: 0;
          height: 2px;
          background: #4f46e5;
          border-radius: 1px;
        }
        
        .nav-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.6);
        }
        
        .btn-secondary {
          background: transparent;
          color: #4f46e5;
          border: 2px solid #4f46e5;
        }
        
        .btn-secondary:hover {
          background: #4f46e5;
          color: white;
          transform: translateY(-2px);
        }
        
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #333;
        }
        
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          padding: 1rem 0;
        }
        
        .mobile-menu.open {
          display: block;
        }
        
        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .mobile-nav-links li {
          margin: 0;
        }
        
        .mobile-nav-links a {
          display: block;
          padding: 1rem 2rem;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        
        .mobile-nav-links a:hover,
        .mobile-nav-links a.active {
          background-color: #f8fafc;
          color: #4f46e5;
        }
        
        .mobile-buttons {
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nav-links,
          .nav-buttons {
            display: none;
          }
          
          .mobile-menu-button {
            display: block;
          }
        }
      `}</style>

      <header className={`header ${className}`}>
        <nav className="nav">
          <Link 
            href="/" 
            className="logo"
            onClick={() => handleNavClick('home')}
          >
            Quotely
          </Link>
          
          <ul className="nav-links">
            <li>
              <Link 
                href="/" 
                className={isActive('/') ? 'active' : ''}
                onClick={() => handleNavClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/quad" 
                className={isActive('/quad') ? 'active' : ''}
                onClick={() => handleNavClick('quad')}
              >
                QUAD
              </Link>
            </li>
            <li>
              <Link 
                href="/#features" 
                onClick={() => handleNavClick('features')}
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className={isActive('/pricing') ? 'active' : ''}
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/#integrations"
                onClick={() => handleNavClick('integrations')}
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className={isActive('/blog') ? 'active' : ''}
                onClick={() => handleNavClick('blog')}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={() => handleNavClick('about')}
              >
                About
              </Link>
            </li>
          </ul>
          
          <div className="nav-buttons">
            <button 
              onClick={handleLoginClick}
              className="btn btn-secondary"
            >
              Login
            </button>
            <Link 
              href="/demo" 
              className="btn btn-primary"
              onClick={handleTrialClick}
            >
              Free Trial
            </Link>
          </div>
          
          <button className="mobile-menu-button" onClick={() => {
            const menu = document.querySelector('.mobile-menu')
            menu?.classList.toggle('open')
          }}>
            ☰
          </button>
        </nav>
        
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li>
              <Link 
                href="/" 
                className={isActive('/') ? 'active' : ''}
                onClick={() => handleNavClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/quad" 
                className={isActive('/quad') ? 'active' : ''}
                onClick={() => handleNavClick('quad')}
              >
                QUAD
              </Link>
            </li>
            <li>
              <Link 
                href="/#features" 
                onClick={() => handleNavClick('features')}
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className={isActive('/pricing') ? 'active' : ''}
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/#integrations"
                onClick={() => handleNavClick('integrations')}
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className={isActive('/blog') ? 'active' : ''}
                onClick={() => handleNavClick('blog')}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={isActive('/about') ? 'active' : ''}
                onClick={() => handleNavClick('about')}
              >
                About
              </Link>
            </li>
          </ul>
          
          <div className="mobile-buttons">
            <button 
              onClick={handleLoginClick}
              className="btn btn-secondary"
            >
              Login
            </button>
            <Link 
              href="/demo" 
              className="btn btn-primary"
              onClick={handleTrialClick}
            >
              Free Trial
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}