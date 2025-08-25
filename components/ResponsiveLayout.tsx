'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div 
      className={`min-h-screen ${
        isMobile ? 'mobile-view' : isTablet ? 'tablet-view' : 'desktop-view'
      }`}
      data-device={isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}
    >
      <div className="responsive-container">
        {children}
      </div>
      
      <style jsx global>{`
        .responsive-container {
          width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (min-width: 768px) {
          .responsive-container {
            padding: 0 2rem;
          }
        }
        
        @media (min-width: 1024px) {
          .responsive-container {
            max-width: 1440px;
            padding: 0 3rem;
          }
        }
        
        /* Responsive font scaling */
        html {
          font-size: 16px;
        }
        
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
        }
        
        @media (min-width: 1440px) {
          html {
            font-size: 18px;
          }
        }
        
        /* Responsive spacing utilities */
        .mobile-view {
          --spacing-unit: 0.5rem;
        }
        
        .tablet-view {
          --spacing-unit: 0.75rem;
        }
        
        .desktop-view {
          --spacing-unit: 1rem;
        }
      `}</style>
    </div>
  );
}