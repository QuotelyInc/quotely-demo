// app/layout.tsx - Simplified version
import OTTOScript from "../components/OTTOScript"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Quotely - Insurance Technology Platform</title>
        <meta name="description" content="AI-powered insurance quoting platform for agents and brokers" />
      </head>
      <body>
        <OTTOScript />
        {children}
      </body>
    </html>
  )
}
