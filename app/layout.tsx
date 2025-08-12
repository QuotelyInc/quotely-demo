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
        {/* OTTO SEO Dynamic Optimization Script - Base64 Loader */}
        <Script
          id="sa-dynamic-optimization"
          strategy="afterInteractive"
          data-uuid="93fecead-4a44-4a94-8620-c45564441a5b"
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
