'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Track error with OTTO if available
    if (typeof window !== 'undefined' && (window as any).otto) {
      (window as any).otto.track('error_boundary_triggered', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '3rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.5rem'
            }}>
              ⚠️
            </div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem'
            }}>
              Something went wrong
            </h1>
            <p style={{
              color: '#6B7280',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: 'linear-gradient(135deg, #0057FF 0%, #00C851 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 87, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '2rem',
                padding: '1rem',
                background: '#FEF2F2',
                borderRadius: '8px',
                border: '1px solid #FCA5A5'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#DC2626'
                }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  marginTop: '1rem',
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  color: '#7F1D1D'
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}