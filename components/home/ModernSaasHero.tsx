"use client";

import { useState, useEffect } from "react";
import { useOTTOTracking } from "../OTTOProvider";

export default function ModernSaasHero() {
  const { trackUserAction } = useOTTOTracking();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCTAClick = (action: string) => {
    trackUserAction("hero_cta_clicked", {
      action: action,
      location: "modern_saas_hero",
    });
  };

  return (
    <>
      <style jsx>{`
        .modern-hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #090a0c 0%, #1a1b1f 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.6;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #5b3fff 0%, transparent 70%);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
          bottom: -150px;
          right: -150px;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #ff3f7e 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5%;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(91, 63, 255, 0.1);
          border: 1px solid rgba(91, 63, 255, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.875rem;
          color: #00d4ff;
          margin-bottom: 2rem;
          animation: slideDown 0.8s ease-out;
        }

        .hero-badge .badge-icon {
          width: 16px;
          height: 16px;
          background: #00d4ff;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #5b3fff 0%,
            #00d4ff 50%,
            #ff3f7e 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 4s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #9ca3af;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: slideUp 0.8s ease-out 0.4s both;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
          animation: slideUp 0.8s ease-out 0.6s both;
        }

        .btn-primary {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #5b3fff 0%, #00d4ff 100%);
          color: white;
          border: none;
          border-radius: 100px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(91, 63, 255, 0.4);
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-secondary {
          padding: 1rem 2.5rem;
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          animation: fadeIn 1s ease-out 0.8s both;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #9ca3af;
        }

        .feature-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #5b3fff, #00d4ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon::after {
          content: "✓";
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .dashboard-preview {
          position: relative;
          max-width: 1000px;
          margin: 4rem auto 0;
          animation: slideUp 1s ease-out 1s both;
        }

        .dashboard-window {
          background: rgba(17, 17, 17, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
        }

        .window-header {
          background: rgba(17, 17, 17, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .window-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #6b7280;
        }

        .window-dot.red {
          background: #ef4444;
        }

        .window-dot.yellow {
          background: #f59e0b;
        }

        .window-dot.green {
          background: #10b981;
        }

        .dashboard-content {
          padding: 2rem;
          background: linear-gradient(
            135deg,
            rgba(91, 63, 255, 0.05) 0%,
            rgba(0, 212, 255, 0.05) 100%
          );
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .dashboard-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .card-value {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .card-label {
          font-size: 0.875rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 300px;
          }

          .hero-features {
            flex-direction: column;
            gap: 1rem;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-icon"></div>
            <span>New: AI-Powered Quote Engine</span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">Everything Your Team Needs</span>
            <br />
            To Quote Smarter
          </h1>

          <p className="hero-subtitle">
            The modern insurance platform that replaces EZLynx, Applied, and
            legacy systems with AI-powered efficiency.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => handleCTAClick("start_free_trial")}
            >
              Start Free Trial
            </button>
            <button
              className="btn-secondary"
              onClick={() => handleCTAClick("watch_demo")}
            >
              Watch Demo
            </button>
          </div>

          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon"></div>
              <span>No credit card required</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"></div>
              <span>14-day free trial</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"></div>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* card */}
          <div
            className=" mt-4 relative max-w-7xl mx-auto animate-[slideUp_1s_ease-out_1s_both]"
            style={{
              transform: `perspective(1000px) rotateX(${
                mousePosition.y * 0.1
              }deg) rotateY(${mousePosition.x * 0.1}deg)`,
            }}
          >
            <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {/* circle*/}
              <div className="bg-gray-900/90 border-b border-white/10 p-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* end circle */}

              <div className="p-16 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 ">
                <div className="grid grid-cols-4 gap-4 mt-1 mb-1">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
                    <div className="text-3xl font-bold text-white mb-2">
                      1.8min
                    </div>
                    <div className="text-base text-gray-400 uppercase tracking-wider">
                      Avg Quote Time
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
                    <div className="text-3xl font-bold text-white mb-2">
                      94%
                    </div>
                    <div className="text-base text-gray-400 uppercase tracking-wider">
                      Accuracy Rate
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl sition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
                    <div className="text-3xl font-bold text-white mb-2">
                      50+
                    </div>
                    <div className="text-base text-gray-400 uppercase tracking-wider">
                      Carriers
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
                    <div className="text-3xl font-bold text-white mb-2">
                      $679
                    </div>
                    <div className="text-base text-gray-400 uppercase tracking-wider">
                      Per Office
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end */}
        </div>
      </section>
    </>
  );
}
