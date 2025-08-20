export default function AITransparency() {
  return (
    <>
      <style jsx>{`
        .ai-section {
          padding: 6rem 5%;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .ai-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: rotate 30s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .ai-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ai-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .ai-text h2 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .ai-text p {
          font-size: 1.25rem;
          opacity: 0.95;
          margin-bottom: 2rem;
          line-height: 1.8;
        }

        .ai-features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ai-feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .ai-feature span:first-child {
          color: #10B981;
          font-size: 1.5rem;
        }

        .ai-demo {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 2rem;
          color: #111827;
        }

        .ai-demo h4 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: #374151;
        }

        .ai-decision-box {
          background: #F0F9FF;
          border-left: 4px solid #0057FF;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .ai-decision-box strong {
          color: #111827;
          display: block;
          margin-bottom: 0.5rem;
        }

        .ai-decision-box p {
          font-size: 0.95rem;
          color: #6B7280;
          line-height: 1.6;
        }

        .ai-factors {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .ai-factor {
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.875rem;
        }

        .ai-demo .btn {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ai-demo .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 87, 255, 0.3);
        }

        @media (max-width: 768px) {
          .ai-content {
            grid-template-columns: 1fr;
          }

          .ai-text h2 {
            font-size: 2rem;
          }

          .ai-text p {
            font-size: 1rem;
          }
        }
      `}</style>

      <section className="ai-section" id="ai">
        <div className="ai-container">
          <div className="ai-content">
            <div className="ai-text">
              <h2>AI That Explains Every Decision</h2>
              <p>Unlike competitors, Quotely shows you exactly why AI makes recommendations. No black boxes, no guesswork.</p>
              
              <div className="ai-features">
                <div className="ai-feature">
                  <span>✓</span>
                  <span>See all decision factors and weights</span>
                </div>
                <div className="ai-feature">
                  <span>✓</span>
                  <span>Understand risk assessments in plain English</span>
                </div>
                <div className="ai-feature">
                  <span>✓</span>
                  <span>Full audit trail for compliance</span>
                </div>
                <div className="ai-feature">
                  <span>✓</span>
                  <span>Override AI with manual adjustments</span>
                </div>
              </div>
            </div>
            
            <div className="ai-demo">
              <h4>AI Recommendation Example:</h4>
              <div className="ai-decision-box">
                <strong>Recommended: Increase liability coverage to $2M</strong>
                <p>
                  Based on business type (restaurant) and revenue ($500k+), higher liability provides better protection.
                </p>
                <div className="ai-factors">
                  <span className="ai-factor">Industry Risk: High</span>
                  <span className="ai-factor">Revenue: $500k+</span>
                  <span className="ai-factor">Location: Urban</span>
                  <span className="ai-factor">Claims History: Clean</span>
                </div>
              </div>
              <button className="btn">
                Accept AI Recommendation
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}