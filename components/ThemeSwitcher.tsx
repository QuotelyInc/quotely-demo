'use client'

import { useTheme, Theme } from './ThemeProvider'
import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes: { value: Theme; label: string; description: string; colors: string[] }[] = [
    { 
      value: 'corporate-blue', 
      label: 'Corporate Blue', 
      description: 'Professional, trustworthy',
      colors: ['#2563EB', '#1E40AF', '#06B6D4']
    },
    { 
      value: 'financial-navy', 
      label: 'Financial Navy', 
      description: 'Banking-inspired, authoritative',
      colors: ['#1E3A8A', '#1E40AF', '#059669']
    },
    { 
      value: 'modern-teal', 
      label: 'Modern Teal', 
      description: 'Fresh, innovative',
      colors: ['#0D9488', '#0F766E', '#3B82F6']
    },
    { 
      value: 'premium-indigo', 
      label: 'Premium Indigo', 
      description: 'Luxury, sophisticated',
      colors: ['#4F46E5', '#3730A3', '#06B6D4']
    },
    { 
      value: 'trust-slate', 
      label: 'Trust Slate', 
      description: 'Conservative, reliable',
      colors: ['#475569', '#334155', '#0EA5E9']
    }
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 1000
    }}>
      <style jsx>{`
        .theme-switcher-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .theme-switcher-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }
        
        .theme-menu {
          position: absolute;
          bottom: 60px;
          right: 0;
          background: var(--surface);
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          min-width: 180px;
          border: 1px solid var(--border);
        }
        
        .theme-option {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          width: 100%;
          color: var(--text-primary);
        }
        
        .theme-option:hover {
          background: var(--background);
        }
        
        .theme-option.active {
          background: var(--background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .theme-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .theme-label {
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .theme-description {
          text-align: left;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .theme-colors {
          display: flex;
          gap: 4px;
        }
        
        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .theme-header {
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      <button
        className="theme-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch theme"
      >
        🎨
      </button>

      {isOpen && (
        <div className="theme-menu">
          <div className="theme-header">Professional Themes</div>
          {themes.map((t) => (
            <button
              key={t.value}
              className={`theme-option ${theme === t.value ? 'active' : ''}`}
              onClick={() => {
                setTheme(t.value)
                setIsOpen(false)
              }}
            >
              <div className="theme-colors">
                {t.colors.map((color, i) => (
                  <div
                    key={i}
                    className="color-dot"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="theme-info">
                <span className="theme-label">{t.label}</span>
                <span className="theme-description">{t.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}