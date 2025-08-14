'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'corporate-blue' | 'financial-navy' | 'modern-teal' | 'premium-indigo' | 'trust-slate'

interface ThemeColors {
  primary: string
  primaryDark: string
  secondary: string
  accent: string
  warning: string
  success: string
  error: string
  surface: string
  background: string
  textPrimary: string
  textSecondary: string
  border: string
  gradient: string
  gradientBg: string
  cardBg: string
}

const themes: Record<Theme, ThemeColors> = {
  'corporate-blue': {
    primary: '#2563EB',
    primaryDark: '#1E40AF',
    secondary: '#1E40AF',
    accent: '#06B6D4',
    warning: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    border: '#E5E7EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    gradientBg: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
    cardBg: '#FFFFFF'
  },
  'financial-navy': {
    primary: '#1E3A8A',
    primaryDark: '#1E40AF',
    secondary: '#1E40AF',
    accent: '#059669',
    warning: '#D97706',
    success: '#10B981',
    error: '#DC2626',
    surface: '#FFFFFF',
    background: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    border: '#E5E7EB',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
    gradientBg: 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)',
    cardBg: '#FFFFFF'
  },
  'modern-teal': {
    primary: '#0D9488',
    primaryDark: '#0F766E',
    secondary: '#0F766E',
    accent: '#3B82F6',
    warning: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    surface: '#FFFFFF',
    background: '#F0FDFA',
    textPrimary: '#134E4A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
    gradientBg: 'linear-gradient(135deg, #0F766E 0%, #134E4A 100%)',
    cardBg: '#FFFFFF'
  },
  'premium-indigo': {
    primary: '#4F46E5',
    primaryDark: '#3730A3',
    secondary: '#3730A3',
    accent: '#06B6D4',
    warning: '#D97706',
    success: '#059669',
    error: '#DC2626',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    textPrimary: '#1E1B4B',
    textSecondary: '#64748B',
    border: '#E5E7EB',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
    gradientBg: 'linear-gradient(135deg, #3730A3 0%, #1E1B4B 100%)',
    cardBg: '#FFFFFF'
  },
  'trust-slate': {
    primary: '#475569',
    primaryDark: '#334155',
    secondary: '#334155',
    accent: '#0EA5E9',
    warning: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    border: '#E5E7EB',
    gradient: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
    gradientBg: 'linear-gradient(135deg, #334155 0%, #1E293B 100%)',
    cardBg: '#FFFFFF'
  }
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('corporate-blue')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('quotely-theme') as Theme
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (themeName: Theme) => {
    const colors = themes[themeName]
    const root = document.documentElement
    
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
    
    // Apply theme class to body for additional styling
    document.body.className = `theme-${themeName}`
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('quotely-theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}