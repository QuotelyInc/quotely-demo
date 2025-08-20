import Link from 'next/link'

export default function MinimalFooter() {
  return (
    <>
      <style jsx>{`
        footer {
          background: #FAFAFA;
          border-top: 1px solid #f0f0f0;
          padding: 3rem 2rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-logo {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: none;
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: #999;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-link {
          color: #666;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #0057FF;
        }

        .footer-bottom {
          color: #999;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <footer>
        <div className="footer-container">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              Quotely
            </Link>
            <span className="footer-tagline">Insurance simplified</span>
          </div>
          
          <ul className="footer-links">
            <li><Link href="/privacy" className="footer-link">Privacy</Link></li>
            <li><Link href="/terms" className="footer-link">Terms</Link></li>
            <li><Link href="/contact" className="footer-link">Contact</Link></li>
            <li><Link href="/blog" className="footer-link">Blog</Link></li>
          </ul>

          <div className="footer-bottom">
            © 2024 Quotely. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}