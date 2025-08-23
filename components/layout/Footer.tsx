"use client";

import Link from "next/link";
import { useOTTOTracking } from "../OTTOProvider";
import { Linkedin, Twitter, Youtube } from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const { trackUserAction } = useOTTOTracking();

  const handleFooterLinkClick = (section: string, link: string) => {
    trackUserAction("footer_link_clicked", {
      section: section,
      link: link,
    });
  };

  return (
    <footer className={`bg-gray-800 text-white py-12 px-5 ${className}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 lg:gap-12">
          {/* Brand & CTA */}
          <div>
            <h4 className="mb-6 text-amber-400 text-lg font-semibold">
              Quotely
            </h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-md">
              <span className="text-amber-400">
                {" "}
                "Transforming insurance technology, one agency at a time."{" "}
              </span>
              {/* Streamline quotes, automate workflows, and grow your business with
              our AI-powered platform. */}
            </p>
            <div className="flex flex-row gap-4 max-w-xs mb-4 items-center">
              <Link
                href="/demo"
                className="bg-gray-800 text-amber-400 px-6 h-14 flex items-center justify-center rounded-full text-base font-semibold text-center transition-all duration-300 border-2 border-amber-400 hover:bg-amber-500 hover:text-yellow-50"
                onClick={() => handleFooterLinkClick("primary-cta", "demo")}
              >
                Schedule Demo
              </Link>
              <Link
                href="/pricing"
                className="bg-gray-800 text-amber-400 px-6 h-14 flex items-center justify-center rounded-full text-base font-semibold text-center transition-all duration-300 border-2 border-amber-400 hover:bg-amber-500 hover:text-yellow-50"
                onClick={() => handleFooterLinkClick("primary-cta", "pricing")}
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-6 text-amber-400 text-lg font-semibold">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#features"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("product", "features")}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#integrations"
                  className="footer-link"
                  onClick={() =>
                    handleFooterLinkClick("product", "integrations")
                  }
                >
                  Integrations
                </Link>
              </li>
              <li>
                <a
                  href="/features#security"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("product", "security")}
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="/features#api"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("product", "api")}
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-6 text-amber-400 text-lg font-semibold">
              Solutions
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#agencies"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("solutions", "agencies")}
                >
                  For Agencies
                </a>
              </li>
              <li>
                <a
                  href="#brokers"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("solutions", "brokers")}
                >
                  For Brokers
                </a>
              </li>
              <li>
                <a
                  href="#auto-insurance"
                  className="footer-link"
                  onClick={() =>
                    handleFooterLinkClick("solutions", "auto-insurance")
                  }
                >
                  Auto Insurance
                </a>
              </li>
              <li>
                <a
                  href="#commercial"
                  className="footer-link"
                  onClick={() =>
                    handleFooterLinkClick("solutions", "commercial")
                  }
                >
                  Commercial
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 text-amber-400 text-lg font-semibold">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#support"
                  className="footer-link"
                  onClick={() =>
                    handleFooterLinkClick("support", "help-center")
                  }
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#training"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("support", "training")}
                >
                  Training
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("support", "blog")}
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://www.xcelsolutions.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("support", "ce-credits")}
                >
                  CE Credits ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-amber-400 text-lg font-semibold">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("company", "about")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("company", "contact")}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("company", "careers")}
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  className="footer-link"
                  onClick={() => handleFooterLinkClick("company", "partners")}
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left">
            <p className="text-gray-300 mb-1">
              © 2025 Quotely, Inc. All rights reserved.
            </p>
            <p className="text-gray-400 opacity-80 text-sm">
              Privacy Policy • Terms of Service • Cookie Policy
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm mr-2">Follow us:</span>
            <a
              href="https://www.linkedin.com/company/quotely"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 text-xl p-2 rounded transition-all duration-300 hover:text-amber-400 hover:bg-amber-400/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => handleFooterLinkClick("social", "linkedin")}
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href="https://twitter.com/quotely"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 text-xl p-2 rounded transition-all duration-300 hover:text-amber-400 hover:bg-amber-400/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => handleFooterLinkClick("social", "twitter")}
              aria-label="Follow us on Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://www.youtube.com/@quotely"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 text-xl p-2 rounded transition-all duration-300 hover:text-amber-400 hover:bg-amber-400/10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => handleFooterLinkClick("social", "youtube")}
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-link {
          @apply text-gray-300 text-sm leading-6 inline-block py-1 transition-colors duration-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded;
        }
      `}</style>
    </footer>
  );
}
