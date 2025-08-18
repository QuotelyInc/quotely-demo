'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  RefreshCw, 
  Database, 
  Upload, 
  Download,
  Shield,
  Link,
  AlertCircle,
  Server,
  Zap
} from 'lucide-react';

export default function TurboRaterLivePage() {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [apiKey, setApiKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [proxyHealth, setProxyHealth] = useState<boolean>(false);
  const [lastSync, setLastSync] = useState<string>('Never');
  const [stats, setStats] = useState({
    total: 0,
    synced: 0,
    pending: 0,
    errors: 0
  });

  // Check proxy server health on mount
  useEffect(() => {
    checkProxyHealth();
    const interval = setInterval(checkProxyHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkProxyHealth = async () => {
    try {
      const response = await fetch('/api/turborater/proxy?action=health');
      const data = await response.json();
      setProxyHealth(data.status === 'healthy');
    } catch (error) {
      setProxyHealth(false);
    }
  };

  const connectToTurboRater = async () => {
    if (!apiKey) {
      alert('Please enter your TurboRater API key');
      return;
    }

    setConnectionStatus('connecting');
    setSyncStatus('Validating credentials...');

    try {
      const response = await fetch('/api/turborater/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'connect',
          data: {
            apiKey,
            accountId
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        setConnectionStatus('connected');
        setSyncStatus('Connected successfully!');
        await fetchQuotes();
      } else {
        setConnectionStatus('error');
        setSyncStatus(result.error || 'Connection failed');
      }
    } catch (error) {
      setConnectionStatus('error');
      setSyncStatus('Failed to connect. Is the proxy server running?');
      console.error('Connection error:', error);
    }
  };

  const fetchQuotes = async () => {
    setSyncStatus('Fetching quotes...');
    
    try {
      const response = await fetch('/api/turborater/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'quotes',
          data: {}
        }),
      });

      const result = await response.json();

      if (result.success) {
        setQuotes(result.quotes || []);
        updateStats(result.quotes || []);
        setLastSync(new Date().toLocaleTimeString());
        setSyncStatus(`Loaded ${result.quotes?.length || 0} quotes`);
      } else {
        setSyncStatus('Failed to fetch quotes');
      }
    } catch (error) {
      setSyncStatus('Error fetching quotes');
      console.error('Fetch error:', error);
    }
  };

  const syncQuotes = async () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect to TurboRater first');
      return;
    }

    setSyncStatus('Syncing quotes...');

    try {
      const response = await fetch('/api/turborater/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sync',
          data: {
            quoteIds: quotes.map(q => q.id)
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSyncStatus(`Synced ${result.syncedCount || 0} quotes`);
        await fetchQuotes();
      } else {
        setSyncStatus('Sync failed');
      }
    } catch (error) {
      setSyncStatus('Error during sync');
      console.error('Sync error:', error);
    }
  };

  const importRates = async () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect to TurboRater first');
      return;
    }

    setSyncStatus('Importing rate tables...');

    try {
      const response = await fetch('/api/turborater/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'rates/import',
          data: {}
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSyncStatus(`Imported ${result.count || 0} rate tables`);
      } else {
        setSyncStatus('Failed to import rates');
      }
    } catch (error) {
      setSyncStatus('Error importing rates');
      console.error('Import error:', error);
    }
  };

  const validateIntegration = async () => {
    if (connectionStatus !== 'connected') {
      alert('Please connect to TurboRater first');
      return;
    }

    setSyncStatus('Running validation tests...');

    try {
      const response = await fetch('/api/turborater/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'validate',
          data: {}
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSyncStatus('All validation tests passed!');
        alert(`Validation Results:\n${result.tests.map((t: any) => `${t.name}: ${t.status}`).join('\n')}`);
      } else {
        setSyncStatus('Some validation tests failed');
      }
    } catch (error) {
      setSyncStatus('Validation error');
      console.error('Validation error:', error);
    }
  };

  const updateStats = (quoteList: any[]) => {
    setStats({
      total: quoteList.length,
      synced: quoteList.filter(q => q.syncStatus === 'synced').length,
      pending: quoteList.filter(q => q.syncStatus === 'pending').length,
      errors: quoteList.filter(q => q.syncStatus === 'error').length,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-4">
            TurboRater Live Integration
          </h1>
          <p className="text-white/80 text-lg">
            Connect your local TurboRater API to tryquotely.com in real-time
          </p>
        </div>

        {/* Proxy Status Alert */}
        <div className={`rounded-lg p-4 mb-6 ${proxyHealth ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
          <div className="flex items-center gap-3">
            {proxyHealth ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300">Local proxy server is running on port 3456</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300">
                  Local proxy server not detected. Please run: <code className="bg-black/30 px-2 py-1 rounded">npm start</code>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Connection Panel */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* API Configuration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              API Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">TurboRater API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Account ID (Optional)</label>
                <input
                  type="text"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Your TurboRater account ID"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                />
              </div>

              <button
                onClick={connectToTurboRater}
                disabled={connectionStatus === 'connecting' || !proxyHealth}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {connectionStatus === 'connecting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connecting...
                  </>
                ) : connectionStatus === 'connected' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Connected
                  </>
                ) : (
                  <>
                    <Link className="w-5 h-5" />
                    Connect to TurboRater
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Connection Status */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5" />
              Connection Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70">API Status</span>
                <span className={`flex items-center gap-2 ${
                  connectionStatus === 'connected' ? 'text-green-400' : 
                  connectionStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {connectionStatus === 'connected' ? <CheckCircle className="w-4 h-4" /> :
                   connectionStatus === 'error' ? <XCircle className="w-4 h-4" /> :
                   <AlertCircle className="w-4 h-4" />}
                  {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70">Proxy Server</span>
                <span className={`flex items-center gap-2 ${proxyHealth ? 'text-green-400' : 'text-red-400'}`}>
                  {proxyHealth ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {proxyHealth ? 'Online' : 'Offline'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70">Last Sync</span>
                <span className="text-white">{lastSync}</span>
              </div>

              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-white/70 text-sm mb-1">Sync Status</div>
                <div className="text-white">{syncStatus || 'Not connected'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-white/70 text-sm">Total Quotes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-green-400">{stats.synced}</div>
            <div className="text-white/70 text-sm">Synced</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-white/70 text-sm">Pending</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-red-400">{stats.errors}</div>
            <div className="text-white/70 text-sm">Errors</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Integration Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={syncQuotes}
              disabled={connectionStatus !== 'connected'}
              className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Sync Quotes
            </button>

            <button
              onClick={importRates}
              disabled={connectionStatus !== 'connected'}
              className="py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Import Rates
            </button>

            <button
              onClick={fetchQuotes}
              disabled={connectionStatus !== 'connected'}
              className="py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              Fetch Quotes
            </button>

            <button
              onClick={validateIntegration}
              disabled={connectionStatus !== 'connected'}
              className="py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Validate
            </button>
          </div>
        </div>

        {/* Quotes Table */}
        {quotes.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Quotes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-4">ID</th>
                    <th className="text-left py-2 px-4">Customer</th>
                    <th className="text-left py-2 px-4">Premium</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Sync Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.slice(0, 5).map((quote, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-2 px-4">{quote.id}</td>
                      <td className="py-2 px-4">{quote.customer}</td>
                      <td className="py-2 px-4">${quote.premium}</td>
                      <td className="py-2 px-4">{quote.status}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          quote.syncStatus === 'synced' ? 'bg-green-500/20 text-green-400' :
                          quote.syncStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {quote.syncStatus || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-500/10 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 mt-8">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Setup Instructions
          </h3>
          <ol className="space-y-2 text-white/80 text-sm">
            <li>1. Save your TurboRater API key in the .env.turborater file</li>
            <li>2. Run <code className="bg-black/30 px-2 py-1 rounded">npm install</code> to install dependencies</li>
            <li>3. Start the proxy server: <code className="bg-black/30 px-2 py-1 rounded">npm start</code></li>
            <li>4. Enter your API key above and click Connect</li>
            <li>5. The integration will now sync data between TurboRater and Quotely</li>
          </ol>
        </div>
      </div>
    </div>
  );
}