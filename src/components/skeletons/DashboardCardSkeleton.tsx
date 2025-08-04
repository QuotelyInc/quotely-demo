import React from 'react';
import '../LoadingSkeleton.css';

interface DashboardCardSkeletonProps {
  variant?: 'metric' | 'chart' | 'list' | 'ai';
}

const DashboardCardSkeleton: React.FC<DashboardCardSkeletonProps> = ({ variant = 'metric' }) => {
  const renderContent = () => {
    switch (variant) {
      case 'metric':
        return (
          <>
            <div className="skeleton-metric-header">
              <div className="skeleton-icon-wrapper">
                <div className="skeleton-circle small" />
              </div>
              <div className="skeleton-text-group">
                <div className="skeleton-line" style={{ width: '120px', height: '14px' }} />
                <div className="skeleton-line" style={{ width: '80px', height: '32px', marginTop: '8px' }} />
              </div>
              <div className="skeleton-badge">
                <div className="skeleton-line" style={{ width: '60px', height: '24px', borderRadius: '12px' }} />
              </div>
            </div>
            <div className="skeleton-chart-area">
              <svg viewBox="0 0 200 60" className="skeleton-sparkline">
                <path
                  d="M0,40 Q50,20 100,30 T200,25"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                  className="skeleton-path"
                />
              </svg>
            </div>
            <div className="skeleton-footer">
              <div className="skeleton-line" style={{ width: '100px', height: '12px' }} />
              <div className="skeleton-line" style={{ width: '60px', height: '12px' }} />
            </div>
          </>
        );

      case 'chart':
        return (
          <>
            <div className="skeleton-chart-header">
              <div className="skeleton-line" style={{ width: '150px', height: '20px' }} />
              <div className="skeleton-line" style={{ width: '80px', height: '32px', borderRadius: '8px' }} />
            </div>
            <div className="skeleton-chart-main">
              <svg viewBox="0 0 300 200" className="skeleton-chart">
                {[...Array(5)].map((_, i) => (
                  <rect
                    key={i}
                    x={i * 60 + 10}
                    y={180 - (Math.random() * 100 + 50)}
                    width="40"
                    height={Math.random() * 100 + 50}
                    fill="#f0f0f0"
                    className="skeleton-bar"
                  />
                ))}
              </svg>
            </div>
            <div className="skeleton-legend">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton-legend-item">
                  <div className="skeleton-circle tiny" />
                  <div className="skeleton-line" style={{ width: '60px', height: '12px' }} />
                </div>
              ))}
            </div>
          </>
        );

      case 'list':
        return (
          <>
            <div className="skeleton-list-header">
              <div className="skeleton-line" style={{ width: '140px', height: '20px' }} />
              <div className="skeleton-line" style={{ width: '60px', height: '16px' }} />
            </div>
            <div className="skeleton-list-items">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-list-item">
                  <div className="skeleton-circle tiny" />
                  <div className="skeleton-text-group flex-1">
                    <div className="skeleton-line" style={{ width: '100%' }} />
                    <div className="skeleton-line" style={{ width: '60%', height: '12px' }} />
                  </div>
                  <div className="skeleton-line" style={{ width: '40px', height: '20px' }} />
                </div>
              ))}
            </div>
          </>
        );

      case 'ai':
        return (
          <>
            <div className="skeleton-ai-header">
              <div className="skeleton-ai-badge">
                <div className="skeleton-line" style={{ width: '80px', height: '28px', borderRadius: '14px' }} />
              </div>
              <div className="skeleton-line" style={{ width: '120px', height: '16px' }} />
            </div>
            <div className="skeleton-ai-content">
              <div className="skeleton-pulse-wrapper">
                <div className="skeleton-pulse" />
                <div className="skeleton-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="skeleton-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="skeleton-ai-text">
                <div className="skeleton-line" style={{ width: '100%' }} />
                <div className="skeleton-line" style={{ width: '90%' }} />
                <div className="skeleton-line" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="skeleton-ai-footer">
              <div className="skeleton-line" style={{ width: '100px', height: '32px', borderRadius: '6px' }} />
            </div>
          </>
        );
    }
  };

  return (
    <div className={`dashboard-card-skeleton skeleton-${variant}`}>
      {renderContent()}

      <style>{`
        .dashboard-card-skeleton {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        /* Metric variant */
        .skeleton-metric-header {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
        }

        .skeleton-icon-wrapper {
          flex-shrink: 0;
        }

        .skeleton-text-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .skeleton-chart-area {
          flex: 1;
          display: flex;
          align-items: center;
          padding: var(--spacing-md) 0;
        }

        .skeleton-sparkline {
          width: 100%;
          height: 60px;
        }

        .skeleton-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Chart variant */
        .skeleton-chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .skeleton-chart-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-md) 0;
        }

        .skeleton-chart {
          width: 100%;
          max-width: 300px;
        }

        .skeleton-legend {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
        }

        .skeleton-legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        /* List variant */
        .skeleton-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .skeleton-list-items {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .skeleton-list-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) 0;
          border-bottom: 1px solid var(--border);
        }

        .skeleton-list-item:last-child {
          border-bottom: none;
        }

        /* AI variant */
        .skeleton-ai-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          text-align: center;
        }

        .skeleton-ai-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-lg);
        }

        .skeleton-pulse-wrapper {
          display: flex;
          gap: var(--spacing-sm);
        }

        .skeleton-pulse {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e0e0e0;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-ai-text {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .skeleton-ai-footer {
          display: flex;
          justify-content: center;
        }

        /* Common skeleton elements */
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

        .skeleton-circle.tiny {
          width: 16px;
          height: 16px;
        }

        .skeleton-line {
          height: 16px;
          border-radius: 4px;
        }

        .skeleton-path {
          animation: draw 2s ease-in-out infinite;
        }

        .skeleton-bar {
          animation: grow 1.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes draw {
          0% {
            stroke-dasharray: 0 300;
          }
          50% {
            stroke-dasharray: 300 0;
          }
          100% {
            stroke-dasharray: 0 300;
          }
        }

        @keyframes grow {
          0%, 100% {
            transform: scaleY(0.7);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        .flex-1 {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default DashboardCardSkeleton;