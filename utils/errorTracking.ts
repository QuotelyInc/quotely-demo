interface ViewportInfo {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

interface ResponsiveError {
  message: string;
  viewport: ViewportInfo;
  timestamp: number;
  userAgent: string;
  url: string;
}

class ResponsiveErrorTracker {
  private errors: ResponsiveError[] = [];
  private resizeThrottle: NodeJS.Timeout | null = null;
  private lastViewport: ViewportInfo | null = null;

  private getViewportInfo(): ViewportInfo {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      width,
      height,
      orientation: width > height ? 'landscape' : 'portrait',
      deviceType: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
    };
  }

  private logError(error: Error | ErrorEvent, context?: string) {
    const errorInfo: ResponsiveError = {
      message: error instanceof Error ? error.message : error.message || 'Unknown error',
      viewport: this.getViewportInfo(),
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.errors.push(errorInfo);

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'responsive_error', {
        error_message: errorInfo.message,
        viewport_width: errorInfo.viewport.width,
        device_type: errorInfo.viewport.deviceType,
        context
      });
    }

    console.error('Responsive Error:', errorInfo);
  }

  public init() {
    if (typeof window === 'undefined') return;

    // Track JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError(event, 'javascript_error');
    });

    // Track promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(new Error(event.reason), 'promise_rejection');
    });

    // Track viewport changes with throttling
    window.addEventListener('resize', () => {
      if (this.resizeThrottle) clearTimeout(this.resizeThrottle);
      
      this.resizeThrottle = setTimeout(() => {
        const currentViewport = this.getViewportInfo();
        
        // Only log significant changes
        if (this.lastViewport && 
            this.lastViewport.deviceType !== currentViewport.deviceType) {
          console.log('Device type changed:', {
            from: this.lastViewport.deviceType,
            to: currentViewport.deviceType,
            viewport: currentViewport
          });
        }
        
        this.lastViewport = currentViewport;
      }, 250);
    });

    // Track orientation changes
    window.addEventListener('orientationchange', () => {
      const viewport = this.getViewportInfo();
      console.log('Orientation changed:', viewport.orientation, viewport);
    });

    // Monitor performance issues
    if ('PerformanceObserver' in window) {
      this.initPerformanceMonitoring();
    }

    // Initial viewport log
    this.lastViewport = this.getViewportInfo();
    console.log('Initial viewport:', this.lastViewport);
  }

  private initPerformanceMonitoring() {
    // Monitor layout shifts (CLS)
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).value > 0.1) {
          console.warn('Layout shift detected:', {
            value: (entry as any).value,
            viewport: this.getViewportInfo()
          });
        }
      }
    });

    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // Fallback for browsers that don't support layout-shift
    }

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', {
            duration: entry.duration,
            viewport: this.getViewportInfo()
          });
        }
      }
    });

    try {
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      // Fallback for browsers that don't support longtask
    }
  }

  public getErrors(): ResponsiveError[] {
    return this.errors;
  }

  public clearErrors(): void {
    this.errors = [];
  }
}

// Export singleton instance
const tracker = new ResponsiveErrorTracker();

export const trackResponsiveErrors = () => {
  tracker.init();
};

export const getResponsiveErrors = () => tracker.getErrors();
export const clearResponsiveErrors = () => tracker.clearErrors();