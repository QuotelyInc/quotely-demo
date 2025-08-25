"use client";

import { useState, useEffect, useRef } from "react";
import { useOTTOTracking } from "../OTTOProvider";

interface Feature {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  size: "large" | "small";
  icon?: string;
  gradient?: string;
}

export default function AsymmetricFeatureGrid() {
  const { trackUserAction } = useOTTOTracking();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, index * 100);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all feature cards
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // Observe the section header
    const header = gridRef.current?.querySelector(".section-header");
    if (header) observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  const features: Feature[] = [
    {
      id: "instant-quotes",
      title: "Instant Quote Generation",
      description:
        "Generate accurate quotes in under 2 minutes with our AI-powered engine. 60% faster than traditional platforms.",
      videoUrl: "/demos/instant-quote.mp4",
      size: "large",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "ai-recommendations",
      title: "AI-Powered Recommendations",
      description:
        "Get intelligent coverage suggestions based on real-time risk analysis and historical data patterns.",
      imageUrl: "/images/ai-dashboard.png",
      size: "large",
      icon: "🤖",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ];

  const handleFeatureClick = (featureId: string) => {
    trackUserAction("feature_clicked", {
      feature_id: featureId,
      location: "asymmetric_grid",
    });
  };

  return (
    <>
      <style jsx>{`
        .feature-grid-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-header.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: #9ca3af;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .gradient-text {
          background: linear-gradient(135deg, #5b3fff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
          display: inline-block;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(10deg) brightness(1.1);
          }
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 450px;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }

        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:nth-child(1).animate-in {
          transition-delay: 0.1s;
        }

        .feature-card:nth-child(2).animate-in {
          transition-delay: 0.2s;
        }

        .feature-card:nth-child(3).animate-in {
          transition-delay: 0.3s;
        }

        .feature-card:nth-child(4).animate-in {
          transition-delay: 0.4s;
        }

        .feature-card.large {
          grid-column: span 7;
          grid-row: span 1;
        }

        .feature-card.small {
          grid-column: span 5;
          grid-row: span 1;
        }

        .feature-card:nth-child(1) {
          grid-column: 1 / 8;
        }

        .feature-card:nth-child(2) {
          grid-column: 8 / 13;
        }

        .feature-card:nth-child(3) {
          grid-column: 1 / 6;
        }

        .feature-card:nth-child(4) {
          grid-column: 6 / 13;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .feature-card:hover::before {
          opacity: 0.1;
        }

        .feature-card.animate-in:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-content {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .feature-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .feature-icon {
          font-size: 2rem;
          line-height: 1;
          filter: brightness(1.2);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
          flex: 1;
        }

        .feature-card.small .feature-title {
          font-size: 1.25rem;
        }

        .feature-description {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .feature-card.small .feature-description {
          font-size: 0.95rem;
        }

        .feature-media {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          margin-top: auto;
        }

        .feature-card.small .feature-media {
          height: 120px;
        }

        .feature-video,
        .feature-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 0, 0, 0.4) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .media-overlay {
          opacity: 1;
        }

        .play-button {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .play-button:hover {
          transform: scale(1.1);
        }

        .play-icon {
          width: 0;
          height: 0;
          border-left: 20px solid #090a0c;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          margin-left: 4px;
        }

        .feature-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(91, 63, 255, 0.2);
          color: #ffffff;
          padding: 0.375rem 0.875rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(91, 63, 255, 0.3);
          z-index: 2;
          animation: floatBadge 4s ease-in-out infinite;
        }

        @keyframes floatBadge {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        .gradient-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .gradient-border {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .feature-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-auto-rows: 400px;
          }

          .feature-card:nth-child(1),
          .feature-card:nth-child(2) {
            grid-column: span 6;
          }

          .feature-card:nth-child(3),
          .feature-card:nth-child(4) {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .feature-grid-container {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .section-subtitle {
            font-size: 1.125rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            gap: 1rem;
          }

          .feature-card,
          .feature-card.large,
          .feature-card.small,
          .feature-card:nth-child(1),
          .feature-card:nth-child(2),
          .feature-card:nth-child(3),
          .feature-card:nth-child(4) {
            grid-column: span 1;
            min-height: 350px;
          }

          .feature-card {
            padding: 1.5rem;
            border-radius: 16px;
          }

          .feature-media {
            height: 200px;
          }

          .feature-title {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <section className="feature-grid-container border-b-1 border-gray-800" ref={gridRef}>
        <div className="section-header animate">
          <h2 className="section-title">
            Powerful Features,{" "}
            <span className="gradient-text">Simply Delivered</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to modernize your insurance operations in one
            unified platform
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`feature-card ${feature.size} animate`}
              style={{ "--gradient": feature.gradient } as any}
              onClick={() => handleFeatureClick(feature.id)}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="gradient-border"></div>

              {feature.size === "large" && (
                <div className="feature-badge">New</div>
              )}

              <div className="feature-content">
                <div className="feature-header">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                </div>

                <p className="feature-description">{feature.description}</p>

                {feature.size === "large" &&
                  (feature.videoUrl || feature.imageUrl) && (
                    <div className="feature-media">
                      {feature.videoUrl ? (
                        <>
                          <video
                            className="feature-video"
                            src={feature.videoUrl}
                            muted
                            loop
                            autoPlay={hoveredCard === feature.id}
                            playsInline
                          />
                          <div className="media-overlay">
                            <div className="play-button">
                              <div className="play-icon"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className="feature-image"
                          style={{
                            background: feature.gradient,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                            opacity: 0.8,
                          }}
                        >
                          {feature.icon}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
