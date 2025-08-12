'use client'

import Script from 'next/script'

// This component provides the exact OTTO script implementation
// as provided by SearchAtlas with base64 encoding
export default function OTTOScript() {
  return (
    <>
      {/* Method 1: Using the base64-encoded loader (Most secure) */}
      <Script
        id="sa-dynamic-optimization"
        strategy="afterInteractive"
        type="text/javascript"
        data-uuid="93fecead-4a44-4a94-8620-c45564441a5b"
        src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjkzZmVjZWFkLTRhNDQtNGE5NC04NjIwLWM0NTU2NDQ0MWE1YiI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
      />
      
      {/* Alternative Method 2: Direct script tag (if needed for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <Script
          id="sa-dynamic-optimization-debug"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('OTTO SEO script loaded successfully')
          }}
          onError={() => {
            console.error('Failed to load OTTO SEO script')
          }}
        >
          {`
            console.log('OTTO Debug: Initializing with UUID: 93fecead-4a44-4a94-8620-c45564441a5b');
          `}
        </Script>
      )}
    </>
  )
}

// For vanilla HTML implementation (reference)
export const getOTTOScriptHTML = () => {
  return `<script nowprocket nitro-exclude type="text/javascript" id="sa-dynamic-optimization" data-uuid="93fecead-4a44-4a94-8620-c45564441a5b" src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gIjkzZmVjZWFkLTRhNDQtNGE5NC04NjIwLWM0NTU2NDQ0MWE1YiI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="></script>`;
}