import React from 'react';
import '../LoadingSkeleton.css';

interface FormSkeletonProps {
  fields?: number;
  showButtons?: boolean;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ fields = 4, showButtons = true }) => {
  return (
    <div className="form-skeleton">
      <div className="skeleton-form-header">
        <div className="skeleton-line" style={{ width: '200px', height: '28px' }} />
        <div className="skeleton-line" style={{ width: '300px', height: '16px', marginTop: '8px' }} />
      </div>

      <div className="skeleton-form-fields">
        {[...Array(fields)].map((_, index) => (
          <div key={index} className="skeleton-field" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="skeleton-label">
              <div className="skeleton-line" style={{ width: '100px', height: '14px' }} />
            </div>
            <div className="skeleton-input">
              <div className="skeleton-line" style={{ width: '100%', height: '40px', borderRadius: '8px' }} />
            </div>
          </div>
        ))}

        {/* Dropdown field */}
        <div className="skeleton-field" style={{ animationDelay: `${fields * 0.1}s` }}>
          <div className="skeleton-label">
            <div className="skeleton-line" style={{ width: '80px', height: '14px' }} />
          </div>
          <div className="skeleton-dropdown">
            <div className="skeleton-line" style={{ width: '100%', height: '40px', borderRadius: '8px' }} />
            <div className="skeleton-dropdown-arrow" />
          </div>
        </div>

        {/* Checkbox group */}
        <div className="skeleton-field checkbox-group" style={{ animationDelay: `${(fields + 1) * 0.1}s` }}>
          <div className="skeleton-label">
            <div className="skeleton-line" style={{ width: '120px', height: '14px' }} />
          </div>
          <div className="skeleton-checkboxes">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-checkbox-item">
                <div className="skeleton-checkbox" />
                <div className="skeleton-line" style={{ width: '80px', height: '14px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="skeleton-form-footer">
          <div className="skeleton-line" style={{ width: '100px', height: '40px', borderRadius: '8px' }} />
          <div className="skeleton-line" style={{ width: '120px', height: '40px', borderRadius: '8px' }} />
        </div>
      )}

      <style>{`
        .form-skeleton {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
        }

        .skeleton-form-header {
          margin-bottom: var(--spacing-xl);
        }

        .skeleton-form-fields {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .skeleton-field {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .skeleton-dropdown {
          position: relative;
        }

        .skeleton-dropdown-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #e0e0e0;
        }

        .skeleton-checkboxes {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-xs);
        }

        .skeleton-checkbox-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .skeleton-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: #f0f0f0;
          flex-shrink: 0;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .skeleton-form-footer {
          display: flex;
          gap: var(--spacing-md);
          justify-content: flex-end;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border);
        }

        .skeleton-line {
          animation: shimmer 1.5s ease-in-out infinite;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
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

export default FormSkeleton;