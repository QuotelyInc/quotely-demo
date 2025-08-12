'use client'

import { useEffect, useState } from 'react'
import { useOTTO } from '@/hooks/useOTTO'

export default function OTTOTestPage() {
  const { isEnabled, uuid, status, verify } = useOTTO()
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [scriptElements, setScriptElements] = useState<number>(0)

  useEffect(() => {
    // Check for script elements
    const checkScripts = () => {
      const scripts = document.querySelectorAll('[id*="sa-dynamic"], [id*="otto"]')
      setScriptElements(scripts.length)
      console.log('Found OTTO-related scripts:', scripts)
    }

    checkScripts()
    const interval = setInterval(checkScripts, 2000)
    
    // Listen for OTTO ready event
    const handleOTTOReady = () => {
      console.log('🎉 OTTO Ready Event Fired!')
      runVerification()
    }
    
    window.addEventListener('otto-ready', handleOTTOReady)
    
    // Auto-verify after 3 seconds
    setTimeout(() => {
      runVerification()
    }, 3000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('otto-ready', handleOTTOReady)
    }
  }, [])

  const runVerification = () => {
    const result = verify()
    setVerificationResult(result)
  }

  const manualCheck = () => {
    // Direct check
    const checks = {
      primaryScript: !!document.getElementById('sa-dynamic-optimization-loader'),
      backupScript: !!document.getElementById('otto-backup'),
      scriptInHead: document.head.querySelectorAll('script[src*="searchatlas"]').length,
      searchAtlasAvailable: typeof (window as any).searchAtlas !== 'undefined',
      uuid: uuid,
      timestamp: new Date().toISOString()
    }
    
    console.log('Manual OTTO Check:', checks)
    setVerificationResult(checks)
    
    // Also run built-in debug
    if ((window as any).debugOTTO) {
      (window as any).debugOTTO()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OTTO SEO Test Page</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-4 rounded-lg ${isEnabled ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-semibold mb-2">OTTO Enabled</h3>
            <p className="text-2xl">{isEnabled ? '✅' : '❌'}</p>
            <p className="text-sm text-gray-600">{isEnabled ? 'Active' : 'Disabled'}</p>
          </div>
          
          <div className={`p-4 rounded-lg ${status.isLoaded ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <h3 className="font-semibold mb-2">Script Loaded</h3>
            <p className="text-2xl">{status.isLoaded ? '✅' : '⏳'}</p>
            <p className="text-sm text-gray-600">{status.isLoaded ? 'Loaded' : 'Loading...'}</p>
          </div>
          
          <div className={`p-4 rounded-lg ${status.isReady ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <h3 className="font-semibold mb-2">SearchAtlas Ready</h3>
            <p className="text-2xl">{status.isReady ? '✅' : '⏳'}</p>
            <p className="text-sm text-gray-600">{status.isReady ? 'Ready' : 'Waiting...'}</p>
          </div>
        </div>

        {/* UUID Display */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">UUID:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{uuid}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Script Elements Found:</span>
              <span className="font-semibold">{scriptElements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environment:</span>
              <span>{process.env.NODE_ENV}</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {status.hasError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            <p className="font-bold">Error Loading OTTO</p>
            <p>{status.errorMessage}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={runVerification}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Run Verification
          </button>
          
          <button
            onClick={manualCheck}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Manual Check
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Reload Page
          </button>
        </div>

        {/* Verification Results */}
        {verificationResult && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Verification Results</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(verificationResult, null, 2)}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open DevTools (F12) and check the Console tab</li>
            <li>Look for OTTO loading messages</li>
            <li>Check Network tab for requests to dashboard.searchatlas.com</li>
            <li>Click "Run Verification" to check current status</li>
            <li>Click "Manual Check" for direct DOM inspection</li>
            <li>Wait 3 seconds for auto-verification to run</li>
          </ol>
          
          <div className="mt-4 p-4 bg-white rounded">
            <p className="font-semibold mb-2">Console Command:</p>
            <code className="bg-gray-100 px-2 py-1 rounded">debugOTTO()</code>
          </div>
        </div>
      </div>
    </div>
  )
}