import type { Metadata } from 'next'
import { OTTOProvider } from "../components/OTTOProvider"
import OTTOScript from "../components/OTTOScript"
import { ThemeProvider } from "../components/ThemeProvider"
import ClientThemeSwitcher from "../components/ClientThemeSwitcher"
import PreLaunchNotice from "../components/PreLaunchNotice"
import { AnalyticsProvider } from "../lib/analytics/analytics-provider"
import ErrorBoundary from "../components/ErrorBoundary"
import "./globals.css"

export const metadata: Metadata = {
  title: 'Quotely - Get real quotes from real carriers',
  description: 'AI-powered insights and personalized recommendations. We guide you to your best insurance options 60% faster than Applied Rater.',
  keywords: 'insurance quoting, AI insurance, real carriers, Applied Rater alternative',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  )
}
