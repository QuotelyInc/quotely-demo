"use client";

import { useState, useEffect } from "react";
import { useOTTOTracking } from "../OTTOProvider";

export default function LiveQuoteDemo() {
  const { trackUserAction } = useOTTOTracking();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    businessType: "Restaurant",
    revenue: "$500,000",
    employees: "15",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (deciseconds: number) => {
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const ds = deciseconds % 10;
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${ds}`;
  };

  const generateQuote = () => {
    setIsRunning(false);
    setShowResult(true);
    trackUserAction("demo_quote_generated", {
      time: formatTime(timer),
      businessType: formData.businessType,
    });
  };

  const resetDemo = () => {
    setTimer(0);
    setIsRunning(true);
    setShowResult(false);
  };

  return (
    <>
      <style jsx>{`
        .quote-demo-container {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          max-width: 500px;
          margin: 0 auto;
        }

        .quote-demo-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #5b3fff 0%, #00d4ff 100%);
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .demo-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
        }

        .demo-timer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 50px;
          color: #00d4ff;
          font-weight: 600;
          font-family: monospace;
          font-size: 1.1rem;
        }

        .demo-timer.stopped {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .demo-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group select {
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #5b3fff;
          box-shadow: 0 0 0 3px rgba(91, 63, 255, 0.1);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-group select option {
          background: #1a1b1f;
          color: #ffffff;
        }

        .demo-button {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #5b3fff 0%, #00d4ff 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .demo-button::before {
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

        .demo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(91, 63, 255, 0.4);
        }

        .demo-button:hover::before {
          left: 100%;
        }

        .demo-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quote-result {
          background: linear-gradient(
            135deg,
            rgba(16, 185, 129, 0.1) 0%,
            rgba(0, 212, 255, 0.1) 100%
          );
          border: 2px solid #10b981;
          border-radius: 15px;
          padding: 1.5rem;
          margin-top: 1.5rem;
          animation: slideUp 0.5s ease;
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

        .quote-amount {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #10b981 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .quote-details {
          color: #9ca3af;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .quote-speed {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ai-factors {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .ai-factor {
          background: rgba(91, 63, 255, 0.2);
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.875rem;
          border: 1px solid rgba(91, 63, 255, 0.3);
        }

        .reset-button {
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #9ca3af;
          border-radius: 50px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .quote-demo-container {
            padding: 1.5rem;
          }

          .demo-title {
            font-size: 1.25rem;
          }

          .quote-amount {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="quote-demo-container ">
        <div className="demo-header">
          <h3 className="demo-title">Live Speed Demo</h3>
          <div className={`demo-timer ${!isRunning ? "stopped" : ""}`}>
            ⏱️ <span>{formatTime(timer)}</span>
          </div>
        </div>

        <form
          className="demo-form"
          onSubmit={(e) => {
            e.preventDefault();
            generateQuote();
          }}
        >
          <div className="form-group">
            <label>Business Type</label>
            <select
              value={formData.businessType}
              onChange={(e) =>
                setFormData({ ...formData, businessType: e.target.value })
              }
              disabled={showResult}
            >
              <option>Restaurant</option>
              <option>Retail Store</option>
              <option>Office Building</option>
              <option>Construction</option>
              <option>Medical Practice</option>
              <option>Auto Repair Shop</option>
            </select>
          </div>

          <div className="form-group">
            <label>Annual Revenue</label>
            <input
              type="text"
              value={formData.revenue}
              onChange={(e) =>
                setFormData({ ...formData, revenue: e.target.value })
              }
              placeholder="$500,000"
              disabled={showResult}
            />
          </div>

          <div className="form-group">
            <label>Number of Employees</label>
            <input
              type="text"
              value={formData.employees}
              onChange={(e) =>
                setFormData({ ...formData, employees: e.target.value })
              }
              placeholder="15"
              disabled={showResult}
            />
          </div>

          {!showResult && (
            <button type="submit" className="demo-button">
              Get Instant Quote →
            </button>
          )}
        </form>

        {showResult && (
          <div className="quote-result">
            <div className="quote-amount">$2,450/year</div>
            <div className="quote-details">General Liability Coverage</div>
            <div className="quote-details">Workers Compensation Included</div>

            <div className="ai-factors">
              <span className="ai-factor">
                Industry: {formData.businessType}
              </span>
              <span className="ai-factor">Revenue: {formData.revenue}</span>
              <span className="ai-factor">Low Risk Profile</span>
              <span className="ai-factor">Multi-Policy Discount</span>
            </div>

            <div className="quote-speed">
              <span>✓</span>
              <span>Quote generated in {formatTime(timer)}</span>
            </div>

            <button onClick={resetDemo} className="reset-button">
              Try Another Quote
            </button>
          </div>
        )}
      </div>
    </>
  );
}
