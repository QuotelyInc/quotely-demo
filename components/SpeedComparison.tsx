export default function SpeedComparison() {
  return (
    <>
      <style jsx>{`
        .comparison {
          padding: 6rem 5%;
          background: white;
        }

        .comparison-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .comparison h2 {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .comparison-subtitle {
          text-align: center;
          color: #6B7280;
          margin-bottom: 3rem;
          font-size: 1.25rem;
        }

        .comparison-table {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .comparison-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          background: linear-gradient(135deg, #0057FF 0%, #00C851 100%);
          color: white;
          padding: 1.5rem;
          font-weight: 600;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 1.5rem;
          border-bottom: 1px solid #E5E7EB;
          align-items: center;
        }

        .comparison-row:hover {
          background: #F9FAFB;
        }

        .comparison-feature {
          font-weight: 600;
          color: #111827;
        }

        .comparison-value {
          text-align: center;
        }

        .comparison-value.quotely {
          color: #10B981;
          font-weight: 600;
        }

        .comparison-value.competitor {
          color: #6B7280;
        }

        @media (max-width: 768px) {
          .comparison h2 {
            font-size: 2rem;
          }

          .comparison-header,
          .comparison-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .comparison-header {
            display: none;
          }

          .comparison-row {
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            margin-bottom: 1rem;
          }

          .comparison-feature {
            border-bottom: 1px solid #E5E7EB;
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .comparison-value::before {
            content: attr(data-label) ": ";
            font-weight: 600;
          }
        }
      `}</style>

      <section className="comparison" id="comparison">
        <div className="comparison-container">
          <h2>Why Agencies Switch to Quotely</h2>
          <p className="comparison-subtitle">See how we outperform the competition</p>
          
          <div className="comparison-table">
            <div className="comparison-header">
              <div>Feature</div>
              <div>Quotely</div>
              <div>EZLynx</div>
              <div>Applied</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Quote Generation Speed</div>
              <div className="comparison-value quotely" data-label="Quotely">&lt; 2 min</div>
              <div className="comparison-value competitor" data-label="EZLynx">5 min</div>
              <div className="comparison-value competitor" data-label="Applied">4 min</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Page Load Speed</div>
              <div className="comparison-value quotely" data-label="Quotely">1.2s</div>
              <div className="comparison-value competitor" data-label="EZLynx">3.4s</div>
              <div className="comparison-value competitor" data-label="Applied">2.9s</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">AI Transparency</div>
              <div className="comparison-value quotely" data-label="Quotely">✓ Full</div>
              <div className="comparison-value competitor" data-label="EZLynx">Limited</div>
              <div className="comparison-value competitor" data-label="Applied">None</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Mobile Experience</div>
              <div className="comparison-value quotely" data-label="Quotely">95/100</div>
              <div className="comparison-value competitor" data-label="EZLynx">72/100</div>
              <div className="comparison-value competitor" data-label="Applied">68/100</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Setup Time</div>
              <div className="comparison-value quotely" data-label="Quotely">3 days</div>
              <div className="comparison-value competitor" data-label="EZLynx">2 weeks</div>
              <div className="comparison-value competitor" data-label="Applied">3 weeks</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}