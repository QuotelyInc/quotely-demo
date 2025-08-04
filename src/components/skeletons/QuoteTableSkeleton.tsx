import React from 'react';
import '../LoadingSkeleton.css';

const QuoteTableSkeleton: React.FC = () => {
  return (
    <div className="quote-table-skeleton">
      {/* Table Header */}
      <div className="skeleton-table-header">
        <div className="skeleton-row">
          <div className="skeleton-cell header">
            <div className="skeleton-line" style={{ width: '100px', height: '20px' }} />
          </div>
          <div className="skeleton-cell header">
            <div className="skeleton-line" style={{ width: '120px', height: '20px' }} />
          </div>
          <div className="skeleton-cell header">
            <div className="skeleton-line" style={{ width: '80px', height: '20px' }} />
          </div>
          <div className="skeleton-cell header">
            <div className="skeleton-line" style={{ width: '100px', height: '20px' }} />
          </div>
          <div className="skeleton-cell header">
            <div className="skeleton-line" style={{ width: '140px', height: '20px' }} />
          </div>
          <div className="skeleton-cell header">
            <div className="skeleton-line" style={{ width: '60px', height: '20px' }} />
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="skeleton-table-body">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="skeleton-row" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="skeleton-cell">
              <div className="skeleton-company">
                <div className="skeleton-circle small" />
                <div className="skeleton-text-group">
                  <div className="skeleton-line" style={{ width: '120px' }} />
                  <div className="skeleton-line" style={{ width: '80px', height: '14px' }} />
                </div>
              </div>
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-line" style={{ width: '100px' }} />
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-line" style={{ width: '60px', height: '24px' }} />
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-line" style={{ width: '80px' }} />
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-tags">
                <div className="skeleton-line" style={{ width: '60px', height: '24px', borderRadius: '12px' }} />
                <div className="skeleton-line" style={{ width: '70px', height: '24px', borderRadius: '12px' }} />
              </div>
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-line" style={{ width: '80px', height: '32px', borderRadius: '6px' }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .quote-table-skeleton {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .skeleton-table-header {
          background: var(--surface);
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--border);
        }

        .skeleton-table-body {
          padding: 0;
        }

        .skeleton-row {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1.5fr 2fr 1fr;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--border);
          align-items: center;
        }

        .skeleton-row:last-child {
          border-bottom: none;
        }

        .skeleton-cell {
          display: flex;
          align-items: center;
        }

        .skeleton-cell.header {
          font-weight: 600;
        }

        .skeleton-company {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .skeleton-tags {
          display: flex;
          gap: var(--spacing-xs);
        }

        .skeleton-text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .skeleton-line,
        .skeleton-circle {
          animation: shimmer 1.5s ease-in-out infinite;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
        }

        .skeleton-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .skeleton-circle.small {
          width: 32px;
          height: 32px;
        }

        .skeleton-line {
          height: 16px;
          border-radius: 4px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteTableSkeleton;