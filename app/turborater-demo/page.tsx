'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with client-side state
const TurboRaterDemo = dynamic(() => import('@/components/TurboRaterDemo'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading TurboRater Integration Hub...</p>
      </div>
    </div>
  ),
});

export default function TurboRaterDemoPage() {
  return <TurboRaterDemo />;
}