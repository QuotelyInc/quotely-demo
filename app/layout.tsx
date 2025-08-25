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
  title: 'Quotely - AI-Powered Insurance Platform | Quote 10x Faster',
  description: 'Modern insurance technology platform for independent agents. Generate quotes 10x faster with AI-powered insights, seamless integrations, and real-time analytics. Start your free trial today.',
  keywords: 'insurance quotes, insurance technology, AI insurance platform, insurance agents, auto insurance quotes, commercial insurance, insurance software',
  authors: [{ name: 'Quotely, Inc.' }],
  creator: 'Quotely, Inc.',
  publisher: 'Quotely, Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tryquotely.com',
    siteName: 'Quotely',
    title: 'Quotely - AI-Powered Insurance Platform | Quote 10x Faster',
    description: 'Modern insurance technology platform for independent agents. Generate quotes 10x faster with AI-powered insights.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Quotely - Insurance Technology Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quotely - AI-Powered Insurance Platform',
    description: 'Generate insurance quotes 10x faster with AI-powered insights',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <OTTOScript />
        <link rel="canonical" href="https://tryquotely.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0057FF" />
        
        {/* Initialize responsive error tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                import('/utils/errorTracking.js').then(module => {
                  module.trackResponsiveErrors();
                }).catch(console.error);
              }
            `,
          }}
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-28RBK32B5C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-28RBK32B5C', {
                page_path: window.location.pathname,
                stream_id: '12013408617',
                stream_name: 'Quotely Platform'
              });
            `,
          }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <AnalyticsProvider>
              <OTTOProvider>
                {children}
                <ClientThemeSwitcher />
              </OTTOProvider>
            </AnalyticsProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
