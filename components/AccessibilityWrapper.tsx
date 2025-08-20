'use client';

import React from 'react';

/**
 * AccessibilityWrapper - Ensures WCAG AA compliance for common UI patterns
 */

// Checkmark with screen reader text
export const CheckmarkIncluded: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className="text-green-600 font-bold">✓</span>
      <span>{text}</span>
      <span className="sr-only">(Included)</span>
    </div>
  );
};

// X mark with screen reader text
export const CrossNotIncluded: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className="text-red-600 font-bold">✗</span>
      <span>{text}</span>
      <span className="sr-only">(Not included)</span>
    </div>
  );
};

// Status indicator with text
export const StatusIndicator: React.FC<{ 
  status: 'success' | 'error' | 'warning' | 'info';
  text: string;
  className?: string;
}> = ({ status, text, className = '' }) => {
  const icons = {
    success: { symbol: '✓', color: 'text-green-600', label: 'Success' },
    error: { symbol: '✕', color: 'text-red-600', label: 'Error' },
    warning: { symbol: '⚠', color: 'text-yellow-600', label: 'Warning' },
    info: { symbol: 'ⓘ', color: 'text-blue-600', label: 'Information' }
  };

  const { symbol, color, label } = icons[status];

  return (
    <div className={`flex items-center gap-2 ${className}`} role="status">
      <span aria-hidden="true" className={`${color} font-bold`}>{symbol}</span>
      <span>{text}</span>
      <span className="sr-only">({label})</span>
    </div>
  );
};

// Accessible button with proper focus states
export const AccessibleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '',
  ariaLabel
}) => {
  const baseStyles = 'min-h-[44px] px-6 py-3 font-semibold rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#003DB8] text-white hover:bg-[#002A80] focus:ring-[#003DB8]',
    secondary: 'bg-gray-200 text-[#1A1A1A] hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border-2 border-[#003DB8] text-[#003DB8] hover:bg-[#003DB8] hover:text-white focus:ring-[#003DB8]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

// Accessible link with proper underline and focus
export const AccessibleLink: React.FC<{
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}> = ({ href, children, external = false, className = '' }) => {
  const linkStyles = 'text-[#0050E6] underline underline-offset-2 hover:text-[#003DB8] hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-[#003DB8] focus:ring-offset-2 rounded';
  
  return (
    <a
      href={href}
      className={`${linkStyles} ${className}`}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${children} (opens in new tab)`
      })}
    >
      {children}
      {external && <span className="sr-only">(opens in new tab)</span>}
    </a>
  );
};

// Skip to main content link
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#003DB8] text-white px-4 py-2 z-50 rounded-br-lg"
    >
      Skip to main content
    </a>
  );
};

// Screen reader only text
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="sr-only">{children}</span>;
};

// Focus trap for modals and dialogs
export const FocusTrap: React.FC<{ 
  children: React.ReactNode;
  active: boolean;
}> = ({ children, active }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
};

// Announce component for screen readers
export const Announce: React.FC<{ 
  message: string;
  priority?: 'polite' | 'assertive';
}> = ({ message, priority = 'polite' }) => {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

export default {
  CheckmarkIncluded,
  CrossNotIncluded,
  StatusIndicator,
  AccessibleButton,
  AccessibleLink,
  SkipToContent,
  ScreenReaderOnly,
  FocusTrap,
  Announce
};