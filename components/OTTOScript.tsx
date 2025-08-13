"use client"

import Script from "next/script"

export default function OTTOScript() {
  return (
    <Script
      id="sa-dynamic-optimization"
      strategy="afterInteractive"
      src="https://dashboard.searchatlas.com/scripts/dynamic_optimization.js"
      data-uuid="93fecead-4a44-4a94-8620-c45564441a5b"
    />
  )
}