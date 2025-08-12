import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quotely - Revolutionary Insurance Platform",
  description: "Transform your insurance agency with Quotely's AI-powered platform. Get instant quotes, automate workflows, and outperform the competition.",
  keywords: "insurance quotes, auto insurance, commercial insurance, insurance agents, insurance platform, insurtech",
  openGraph: {
    title: "Quotely - Revolutionary Insurance Platform",
    description: "Transform your insurance agency with Quotely's AI-powered platform",
    url: "https://tryquotely.com",
    siteName: "Quotely",
    images: [
      {
        url: "https://tryquotely.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Quotely provides AI-powered insurance quoting and policy management for agents and brokers." />
        <meta name="keywords" content="insurance technology, insurance quotes, policy management, insurance agents, insurance brokers, insurtech" />
        <meta property="og:title" content="Quotely - Insurance Technology Platform" />
        <meta property="og:description" content="Transform your insurance agency with AI-powered quoting and management tools" />
        <meta property="og:url" content="https://tryquotely.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Method 1: Direct Script Loading */}
        <Script
          id="sa-dynamic-optimization"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement("script");
              script.setAttribute("nowprocket", "");
              script.setAttribute("nitro-exclude", "");
              script.src = "https://dashboard.searchatlas.com/scripts/dynamic_optimization.js";
              script.dataset.uuid = "93fecead-4a44-4a94-8620-c45564441a5b";
              script.id = "sa-dynamic-optimization-loader";
              document.head.appendChild(script);
            `
          }}
        />

        {/* Method 2: Alternative External Script */}
        <Script
          id="otto-backup"
          strategy="afterInteractive"
          src="https://dashboard.searchatlas.com/scripts/dynamic_optimization.js"
          data-uuid="93fecead-4a44-4a94-8620-c45564441a5b"
          onLoad={() => {
            console.log('OTTO script loaded successfully')
          }}
          onError={() => {
            console.error('OTTO script failed to load')
          }}
        />

        {children}

        {/* Verification Script */}
        <Script
          id="otto-verification"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.debugOTTO = function() {
                console.log('=== OTTO Debug Information ===');
                console.log('OTTO Script Elements:', document.querySelectorAll('[id*="sa-dynamic"]'));
                console.log('OTTO UUID:', '93fecead-4a44-4a94-8620-c45564441a5b');
                console.log('Scripts in head:', document.head.querySelectorAll('script'));
                console.log('Current URL:', window.location.href);
                console.log('User Agent:', navigator.userAgent);
                console.log('Environment:', '${process.env.NODE_ENV}');
                
                // Check if OTTO loaded
                const ottoScript = document.getElementById('sa-dynamic-optimization-loader');
                const backupScript = document.getElementById('otto-backup');
                if (ottoScript) {
                  console.log('✅ OTTO primary script element found');
                } else {
                  console.log('❌ OTTO primary script element not found');
                }
                if (backupScript) {
                  console.log('✅ OTTO backup script element found');
                } else {
                  console.log('❌ OTTO backup script element not found');
                }
                
                // Check for SearchAtlas object
                if (typeof window.searchAtlas !== 'undefined') {
                  console.log('✅ SearchAtlas object is available');
                } else {
                  console.log('⏳ SearchAtlas object not yet available');
                }
                
                // Check network requests
                console.log('Check Network tab for requests to dashboard.searchatlas.com');
                
                return {
                  primaryScript: !!ottoScript,
                  backupScript: !!backupScript,
                  searchAtlasReady: typeof window.searchAtlas !== 'undefined',
                  uuid: '93fecead-4a44-4a94-8620-c45564441a5b'
                };
              };
              
              // Auto-run verification after 3 seconds
              setTimeout(() => {
                console.log('🔍 OTTO Auto-Verification Running...');
                window.debugOTTO();
              }, 3000);
            `
          }}
        />
      </body>
    </html>
  );
}
