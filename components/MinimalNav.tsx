'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MinimalNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: ${isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
          backdrop-filter: ${isScrolled ? 'blur(10px)' : 'none'};
          transition: all 0.3s ease;
          padding: 1.5rem 2rem;
          border-bottom: ${isScrolled ? '1px solid #f0f0f0' : 'none'};
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo img {
          height: 36px;
          width: auto;
          object-fit: contain;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links li:nth-last-child(2) {
          margin-left: 1rem;
        }

        .nav-link {
          color: #6B7280;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #0057FF;
        }

        .btn {
          padding: 0.625rem 1.25rem;
          text-decoration: none;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 87, 255, 0.3);
        }

        .btn-outline {
          border: 1.5px solid #E5E7EB;
          color: #6B7280;
          background: transparent;
        }

        .btn-outline:hover {
          border-color: #0057FF;
          color: #0057FF;
          background: rgba(0, 87, 255, 0.05);
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-menu span {
          width: 20px;
          height: 1.5px;
          background: #1a1a1a;
          transition: all 0.3s ease;
        }

        .mobile-menu.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }

        .mobile-menu.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu.open span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: ${mobileMenuOpen ? 'flex' : 'none'};
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .mobile-menu {
            display: flex;
          }
        }
      `}</style>

      <nav>
        <div className="nav-container">
          <Link href="/" className="logo">
            <img 
              src="/images/quotely-logos/logo-variant-40.jpg" 
              alt="Quotely"
            />
          </Link>
          
          <ul className="nav-links">
            <li><Link href="/features" className="nav-link">Features</Link></li>
            <li><Link href="/compare/vs-ezlynx" className="nav-link">Compare</Link></li>
            <li><Link href="/details#ai" className="nav-link">AI Transparency</Link></li>
            <li><Link href="/details#integrations" className="nav-link">Integrations</Link></li>
            <li><Link href="/pricing" className="nav-link">Pricing</Link></li>
            <li><Link href="/login" className="btn btn-outline">Agent Login</Link></li>
            <li><Link href="/get-started" className="btn btn-primary">Start Free Trial</Link></li>
          </ul>

          <div 
            className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </>
  )
}