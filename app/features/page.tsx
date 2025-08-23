"use client";

import { useEffect } from "react";
import { useOTTOTracking } from "@/components/OTTOProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

function FeaturesPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking();

  useEffect(() => {
    trackPageView("features", {
      section: "features_overview",
      content_type: "product_features",
    });
  }, [trackPageView]);

  const handleFeatureClick = (feature: string) => {
    trackUserAction("feature_clicked", {
      feature_name: feature,
      location: "features_page",
    });
  };

  return (
    <div>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          background: var(--gradient-bg);
          color: white;
          padding: 150px 0 80px;
          text-align: center;
        }

        .hero-section h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 800px;
          margin: 0 auto 2rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 3rem auto 0;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        /* Feature Categories */
        .categories-section {
          padding: 5rem 0;
          background: var(--background);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: var(--surface);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--gradient);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: white;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .feature-link {
          color: var(--primary);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.3s ease;
        }

        .feature-card:hover .feature-link {
          gap: 1rem;
        }

        /* AI Transparency Section */
        .ai-section {
          background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%);
          padding: 5rem 0;
        }

        .ai-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .ai-text h2 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .ai-text p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .ai-features {
          display: grid;
          gap: 1rem;
          margin-top: 2rem;
        }

        .ai-feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .ai-feature-icon {
          width: 40px;
          height: 40px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .ai-visual {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .ai-demo-box {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 2rem;
          border-radius: 0.75rem;
          text-align: center;
        }

        /* Speed Comparison */
        .speed-section {
          padding: 5rem 0;
          background: var(--background);
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .comparison-card {
          text-align: center;
          padding: 2rem;
          background: var(--surface);
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .comparison-card.highlight {
          background: linear-gradient(135deg, #d1fae5 0%, #ffffff 100%);
          border: 2px solid #10b981;
          transform: scale(1.05);
        }

        .comparison-metric {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .comparison-card.highlight .comparison-metric {
          color: #10b981;
        }

        .comparison-label {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .comparison-sublabel {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* CTA Section */
        .cta-section {
          background: var(--gradient-bg);
          color: white;
          padding: 5rem 2rem;
          text-align: center;
          border-radius: 1rem;
          margin: 5rem 0;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          opacity: 0.95;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: var(--primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .ai-content {
            grid-template-columns: 1fr;
          }

          .comparison-card.highlight {
            transform: none;
          }
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Features That Transform Your Business</h1>
          <p>
            The most advanced insurance platform with AI-powered transparency,
            lightning-fast quotes, and seamless integrations
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">60%</div>
              <div className="stat-label">Faster than EZLynx</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3+ hrs</div>
              <div className="stat-label">Saved per day</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">AI Transparency</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">250+</div>
              <div className="stat-label">Integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Succeed</h2>
            <p>
              Comprehensive tools designed for modern insurance professionals
            </p>
          </div>

          <div className="features-grid">
            <Link
              href="/features/ai-transparency"
              className="feature-card"
              onClick={() => handleFeatureClick("ai-transparency")}
            >
              <div className="feature-icon">🤖</div>
              <h3>AI Transparency</h3>
              <p>
                See exactly how AI makes decisions. Full visibility into quote
                calculations, risk assessments, and recommendations. No black
                box algorithms.
              </p>
              <span className="feature-link">Explore AI Features →</span>
            </Link>

            <Link
              href="/features/quote-engine"
              className="feature-card"
              onClick={() => handleFeatureClick("quote-engine")}
            >
              <div className="feature-icon">⚡</div>
              <h3>Lightning Quote Engine</h3>
              <p>
                Generate accurate quotes 60% faster than competitors.
                Multi-carrier comparison in seconds, not minutes.
              </p>
              <span className="feature-link">See Speed Demo →</span>
            </Link>

            <Link
              href="/features/integrations"
              className="feature-card"
              onClick={() => handleFeatureClick("integrations")}
            >
              <div className="feature-icon">🔗</div>
              <h3>Seamless Integrations</h3>
              <p>
                Connect with 250+ carriers, AMS systems, and CRMs. One-click
                data sync with your existing tools.
              </p>
              <span className="feature-link">View Integrations →</span>
            </Link>

            <Link
              href="/features/analytics"
              className="feature-card"
              onClick={() => handleFeatureClick("analytics")}
            >
              <div className="feature-icon">📊</div>
              <h3>Real-Time Analytics</h3>
              <p>
                Track performance, identify opportunities, and optimize your
                agency with actionable insights.
              </p>
              <span className="feature-link">Explore Analytics →</span>
            </Link>

            <Link
              href="/features/mobile"
              className="feature-card"
              onClick={() => handleFeatureClick("mobile")}
            >
              <div className="feature-icon">📱</div>
              <h3>Mobile-First Design</h3>
              <p>
                Work from anywhere with our responsive platform. Quote, bind,
                and manage policies on any device.
              </p>
              <span className="feature-link">Try Mobile App →</span>
            </Link>

            <Link
              href="/features/commission-tracking"
              className="feature-card"
              onClick={() => handleFeatureClick("commission-tracking")}
            >
              <div className="feature-icon">💰</div>
              <h3>Commission Management</h3>
              <p>
                Automated commission tracking, split calculations, and payment
                reconciliation. Never miss a payment.
              </p>
              <span className="feature-link">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Transparency Section */}
      <section className="ai-section">
        <div className="container">
          <div className="ai-content">
            <div className="ai-text">
              <h2>AI You Can Trust</h2>
              <p>
                Unlike competitors who hide their AI logic, Quotely shows you
                exactly how every decision is made. Full transparency means you
                can explain every quote to your clients with confidence.
              </p>
              <p>
                Our explainable AI technology provides clear reasoning for risk
                assessments, pricing decisions, and coverage recommendations.
              </p>

              <div className="ai-features">
                <div className="ai-feature-item">
                  <div className="ai-feature-icon">✓</div>
                  <div>
                    <strong>Decision Explanations</strong>
                    <div>See why each risk factor affects the quote</div>
                  </div>
                </div>
                <div className="ai-feature-item">
                  <div className="ai-feature-icon">✓</div>
                  <div>
                    <strong>Calculation Breakdown</strong>
                    <div>View complete pricing formulas and adjustments</div>
                  </div>
                </div>
                <div className="ai-feature-item">
                  <div className="ai-feature-icon">✓</div>
                  <div>
                    <strong>Compliance Ready</strong>
                    <div>Full audit trail for regulatory requirements</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-visual">
              <div className="ai-demo-box">
                <h3>See AI Transparency in Action</h3>
                <p style={{ marginBottom: "1.5rem" }}>
                  Watch how our AI explains every decision
                </p>
                <Link
                  href="/demo"
                  className="btn btn-primary"
                  onClick={() => handleFeatureClick("ai-demo")}
                >
                  View Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Comparison */}
      <section className="speed-section">
        <div className="container">
          <div className="section-header">
            <h2>Speed That Sets You Apart</h2>
            <p>Real performance metrics from actual agency usage</p>
          </div>

          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="comparison-metric">4.2s</div>
              <div className="comparison-label">Single Quote</div>
              <div className="comparison-sublabel">Industry average: 12s</div>
            </div>

            <div className="comparison-card highlight">
              <div className="comparison-metric">8.7s</div>
              <div className="comparison-label">Multi-Carrier</div>
              <div className="comparison-sublabel">5 carriers compared</div>
            </div>

            <div className="comparison-card">
              <div className="comparison-metric">0.3s</div>
              <div className="comparison-label">Data Prefill</div>
              <div className="comparison-sublabel">From existing client</div>
            </div>

            <div className="comparison-card">
              <div className="comparison-metric">99.9%</div>
              <div className="comparison-label">Uptime</div>
              <div className="comparison-sublabel">Enterprise SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="cta-section">
          <h2>Ready to Transform Your Agency?</h2>
          <p>
            Join thousands of agents who've already made the switch to smarter,
            faster, more transparent insurance technology.
          </p>
          <div className="cta-buttons">
            <Link
              href="/get-started"
              className="btn btn-primary"
              onClick={() => handleFeatureClick("get-started-cta")}
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="btn btn-secondary"
              onClick={() => handleFeatureClick("demo-cta")}
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Features() {
  return <FeaturesPage />;
}
