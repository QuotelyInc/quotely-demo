"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOTTOTracking } from "../OTTOProvider";
import { useState, useEffect } from "react";

export default function HulyNavigation() {
  const pathname = usePathname();
  const { trackUserAction } = useOTTOTracking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav-dropdown")) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const handleNavClick = (page: string) => {
    trackUserAction("navigation_clicked", {
      destination: page,
      source: "huly_navigation",
    });
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <style jsx>{`
        .nav-huly {
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 9999;
          background: rgba(9, 10, 12, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .nav-huly.scrolled {
          background: rgba(9, 10, 12, 0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .logo:hover {
          opacity: 0.8;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #5b3fff 0%, #00d4ff 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          color: white;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: #0057ff;
          border-radius: 2px;
        }

        /* Dropdown Styles */
        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown-toggle {
          padding: 0.5rem 1rem;
          color: #9ca3af;
          background: transparent;
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .nav-dropdown-toggle:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-dropdown-toggle.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .dropdown-arrow {
          font-size: 0.75rem;
          transition: transform 0.2s ease;
        }

        .nav-dropdown-toggle.active .dropdown-arrow {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          min-width: 200px;
          background: rgba(15, 16, 18, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.5rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.875rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 0.5rem 0;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-nav-ghost {
          padding: 0.5rem 1.25rem;
          background: transparent;
          color: #9ca3af;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-nav-ghost:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .btn-nav-primary {
          padding: 0.5rem 1.5rem;
          background: #0057ff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-nav-primary:hover {
          background: #0048dd;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 87, 255, 0.3);
        }

        .mobile-menu-button {
          display: none;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .hamburger {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 12px;
        }

        .hamburger span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: #9ca3af;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger span:nth-child(1) {
          top: 0;
        }

        .hamburger span:nth-child(2) {
          top: 5px;
        }

        .hamburger span:nth-child(3) {
          top: 10px;
        }

        .mobile-menu-button.open .hamburger span:nth-child(1) {
          transform: rotate(45deg);
          top: 5px;
        }

        .mobile-menu-button.open .hamburger span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-button.open .hamburger span:nth-child(3) {
          transform: rotate(-45deg);
          top: 5px;
        }

        .mobile-menu {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(9, 10, 12, 0.98);
          backdrop-filter: blur(20px);
          transform: translateX(100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          padding: 2rem;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0 0 2rem 0;
          padding: 0;
        }

        .mobile-nav-links li {
          margin: 0 0 0.5rem 0;
        }

        .mobile-nav-link {
          display: block;
          padding: 1rem;
          color: #9ca3af;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-actions .btn-nav-ghost,
        .mobile-actions .btn-nav-primary {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.5rem;
          }

          .nav-links {
            gap: 0.25rem;
          }

          .nav-link {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 768px) {
          .nav-left {
            gap: 0;
          }

          .nav-links,
          .nav-right {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .nav-container {
            padding: 0 1rem;
          }
        }
      `}</style>

      <header className={`nav-huly ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-left">
            <Link
              href="/"
              className="logo"
              onClick={() => handleNavClick("home")}
            >
              <div className="logo-icon">Q</div>
              <span className="logo-text">Quotely</span>
            </Link>

            <ul className="nav-links">
              <li>
                <Link
                  href="/features"
                  className={`nav-link ${
                    isActive("/features") ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("features")}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={`nav-link ${isActive("/pricing") ? "active" : ""}`}
                  onClick={() => handleNavClick("pricing")}
                >
                  Pricing
                </Link>
              </li>
              <li className="nav-dropdown">
                <button
                  className={`nav-dropdown-toggle ${
                    activeDropdown === "resources" ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "resources" ? null : "resources"
                    )
                  }
                >
                  Resources
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div
                  className={`dropdown-menu ${
                    activeDropdown === "resources" ? "open" : ""
                  }`}
                >
                  <Link
                    href="/blog"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("blog");
                      setActiveDropdown(null);
                    }}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/industry-insights"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("insights");
                      setActiveDropdown(null);
                    }}
                  >
                    Industry Insights
                  </Link>
                  <Link
                    href="/compare/vs-ezlynx"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("compare");
                      setActiveDropdown(null);
                    }}
                  >
                    Comparisons
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    href="/turborater-demo"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("turborater");
                      setActiveDropdown(null);
                    }}
                  >
                    TurboRater Demo
                  </Link>
                  <Link
                    href="/ai-agents"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("ai-agents");
                      setActiveDropdown(null);
                    }}
                  >
                    AI Agents
                  </Link>
                </div>
              </li>
              <li className="nav-dropdown">
                <button
                  className={`nav-dropdown-toggle ${
                    activeDropdown === "community" ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "community" ? null : "community"
                    )
                  }
                >
                  Community
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div
                  className={`dropdown-menu ${
                    activeDropdown === "community" ? "open" : ""
                  }`}
                >
                  <Link
                    href="/about"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("about");
                      setActiveDropdown(null);
                    }}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/quad"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("quad");
                      setActiveDropdown(null);
                    }}
                  >
                    QUAD Program
                  </Link>
                  <a
                    href="https://github.com/QuotelyInc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    GitHub
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="https://www.xcelsolutions.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    CE Credits
                  </a>
                  <Link
                    href="/get-started"
                    className="dropdown-item"
                    onClick={() => {
                      handleNavClick("contact");
                      setActiveDropdown(null);
                    }}
                  >
                    Contact Sales
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <Link
              href="/login"
              className="btn-nav-ghost"
              onClick={() => handleNavClick("login")}
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="btn-nav-primary cta-button"
              onClick={() => handleNavClick("sign_up")}
            >
              Sign Up
            </Link>
          </div>

          <button
            className={`mobile-menu-button ${mobileMenuOpen ? "open" : ""}`}
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

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-links">
            <li>
              <Link
                href="/"
                className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
                onClick={() => handleNavClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className={`mobile-nav-link ${
                  isActive("/features") ? "active" : ""
                }`}
                onClick={() => handleNavClick("features")}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`mobile-nav-link ${
                  isActive("/pricing") ? "active" : ""
                }`}
                onClick={() => handleNavClick("pricing")}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/compare/vs-ezlynx"
                className={`mobile-nav-link ${
                  isActive("/compare") ? "active" : ""
                }`}
                onClick={() => handleNavClick("compare")}
              >
                Compare
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`mobile-nav-link ${
                  isActive("/blog") ? "active" : ""
                }`}
                onClick={() => handleNavClick("blog")}
              >
                Blog
              </Link>
            </li>
          </ul>

          <div className="mobile-actions">
            <Link
              href="/login"
              className="btn-nav-ghost"
              onClick={() => handleNavClick("login")}
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="btn-nav-primary"
              onClick={() => handleNavClick("get_started")}
            >
              Get Started
              <span>→</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
