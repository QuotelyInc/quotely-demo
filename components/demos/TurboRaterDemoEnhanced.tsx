import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, Clock, Zap, Shield, Brain, CheckCircle, AlertCircle, 
  TrendingUp, Users, FileText, Calculator, Wifi, WifiOff, RefreshCw, 
  Download, Upload, Database, FileKey, FolderOpen, Key, Settings,
  Server, Activity, Code, Book
} from 'lucide-react';

const TurboRaterDemoEnhanced = () => {
  // Demo Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [quoteProgress, setQuoteProgress] = useState(0);
  const [aiSuggestions, setAISuggestions] = useState<any>({});
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Integration Hub State
  const [activeTab, setActiveTab] = useState('demo');
  const [isConnected, setIsConnected] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  
  // Enhanced Credential Management State
  const [apiCredentials, setApiCredentials] = useState({
    environment: 'test', // 'test' or 'live'
    apiType: 'plq', // 'plq' or 'xml'
    accountId: '',
    accountNumber: '',
    agencyId: '',
    accessId: '',
    accountName: '',
    apiKey: ''
  });
  
  // File Loading State
  const [apiKeyFile, setApiKeyFile] = useState('.env.local');
  const [loadingApiKeys, setLoadingApiKeys] = useState(false);
  const [envVarsLoaded, setEnvVarsLoaded] = useState<Record<string, string>>({});
  
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [selectedQuotes, setSelectedQuotes] = useState(new Set());
  const [allQuotes, setAllQuotes] = useState<any[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [syncFilter, setSyncFilter] = useState('');
  const [logs, setLogs] = useState([
    { type: 'info', message: 'TurboRater Integration Hub initialized', timestamp: new Date() },
    { type: 'info', message: 'Ready to load credentials from .env.local', timestamp: new Date() }
  ]);
  const [statistics, setStatistics] = useState({
    totalQuotes: 0,
    syncedQuotes: 0,
    pendingQuotes: 0,
    lastSync: '--'
  });

  // Helper function for parsing .env files
  const parseEnvFile = (content: string): Record<string, string> => {
    const envVars: Record<string, string> = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      // Parse KEY=value format
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex === -1) continue;
      
      const key = trimmedLine.substring(0, equalIndex).trim();
      let value = trimmedLine.substring(equalIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      envVars[key] = value;
    }
    
    return envVars;
  };

  // Helper function for mapping credentials
  const mapTurboRaterCredentials = (envVars: Record<string, string>) => {
    return {
      test: {
        accountId: envVars.TURBO_RATER_TEST_ACCOUNT_ID || '',
        accountNumber: envVars.TURBO_RATER_TEST_ACCOUNT_NUMBER || '',
        agencyId: envVars.TURBO_RATER_TEST_AGENCY_ID || '',
        accessId: envVars.TURBO_RATER_TEST_ACCESS_ID || 'QUOTE4',
        accountName: envVars.TURBO_RATER_ACCOUNT_NAME || 'Quotely',
        apiKey: envVars.TURBO_RATER_API_KEY || ''
      },
      live: {
        accountId: envVars.TURBO_RATER_LIVE_ACCOUNT_ID || '',
        accountNumber: envVars.TURBO_RATER_LIVE_ACCOUNT_NUMBER || '',
        agencyId: envVars.TURBO_RATER_LIVE_AGENCY_ID || '',
        accessId: envVars.TURBO_RATER_LIVE_ACCESS_ID || 'QUOTE4',
        accountName: envVars.TURBO_RATER_ACCOUNT_NAME || 'Quotely',
        apiKey: envVars.TURBO_RATER_API_KEY || ''
      }
    };
  };

  // Simulated file reading function (in real implementation, use fs or fetch)
  const loadApiKeysFromFile = async () => {
    if (!apiKeyFile.trim()) {
      showNotification('error', 'Please enter the path to your API key file');
      return;
    }

    setLoadingApiKeys(true);
    addLogEntry('info', `Loading API keys from file: ${apiKeyFile}`);

    try {
      // Simulate reading .env.local file
      // In real implementation, this would use fs.readFile or fetch
      const simulatedFileContent = `
# TurboRater Test Environment Credentials
TURBO_RATER_TEST_ACCOUNT_ID=a4a73596-0af9-4a38-ba23-3f36d3ea1f93
TURBO_RATER_TEST_ACCOUNT_NUMBER=f69fdbc2-3700-4c86-b38f-74897d47c96c
TURBO_RATER_TEST_AGENCY_ID=b0e496e6-2e80-4c33-915a-1d463453cec4
TURBO_RATER_TEST_ACCESS_ID=QUOTE4

# TurboRater Live Environment Credentials
TURBO_RATER_LIVE_ACCOUNT_ID=2ab7586f-4f01-4892-97c5-97d42469b4a8
TURBO_RATER_LIVE_ACCOUNT_NUMBER=d953adf6-acc5-45c3-abf4-aff8e8609c5d
TURBO_RATER_LIVE_AGENCY_ID=e516e2df-1009-45e5-8942-7368605fd4dd
TURBO_RATER_LIVE_ACCESS_ID=QUOTE4

# Common Configuration
TURBO_RATER_ACCOUNT_NAME=Quotely
TURBO_RATER_API_KEY=tr_live_example_key_123456789

# Optional AI Keys
OPENAI_API_KEY=sk-proj-example-key
CLAUDE_API_KEY=sk-ant-api03-example-key
GAIL_AI_API_KEY=gail_example_key
`;

      // Parse environment variables
      const apiKeys = parseEnvFile(simulatedFileContent);
      setEnvVarsLoaded(apiKeys);
      
      // Map to TurboRater credentials
      const credentials = mapTurboRaterCredentials(apiKeys);
      
      // Auto-populate based on selected environment
      const envKeys = credentials[apiCredentials.environment as 'test' | 'live'];
      if (envKeys.accountId) {
        setApiCredentials(prev => ({ 
          ...prev, 
          ...envKeys,
          environment: apiCredentials.environment,
          apiType: apiCredentials.apiType
        }));
        addLogEntry('success', `Loaded ${apiCredentials.environment} environment credentials`);
        showNotification('success', `Credentials loaded for ${apiCredentials.environment} environment!`);
      }

      // Show loaded keys in log
      addLogEntry('info', `Found ${Object.keys(apiKeys).length} environment variables`);
      
      const turboRaterKeys = Object.keys(apiKeys).filter(k => k.includes('TURBO_RATER'));
      addLogEntry('success', `Loaded ${turboRaterKeys.length} TurboRater credentials`);

    } catch (error: any) {
      addLogEntry('error', `Failed to load file: ${error.message}`);
      showNotification('error', `Failed to load file: ${error.message}`);
    } finally {
      setLoadingApiKeys(false);
    }
  };

  // Enhanced TurboRater connection with loaded credentials
  const connectToTurboRater = async () => {
    const { environment, apiType, accountId, accountName, accessId, agencyId, accountNumber } = apiCredentials;
    
    // Validate required credentials
    if (!accountId.trim() || !agencyId.trim()) {
      showNotification('error', 'Missing required TurboRater credentials. Please load from .env.local file.');
      addLogEntry('error', 'Connection failed: Missing required credentials');
      return;
    }

    // Set API endpoints based on environment and type
    const apiEndpoints = {
      test: {
        plq: 'https://testplqapi.turborater.com',
        xml: 'https://testxml.turborater.com'
      },
      live: {
        plq: 'https://prodplqapi.turborater.com', 
        xml: 'https://xml.turborater.com'
      }
    };

    const baseUrl = apiEndpoints[environment as 'test' | 'live'][apiType as 'plq' | 'xml'];
    
    try {
      addLogEntry('info', `Connecting to TurboRater ${environment.toUpperCase()} ${apiType.toUpperCase()} API...`);
      addLogEntry('info', `Using Account ID: ${accountId.substring(0, 8)}...`);
      addLogEntry('info', `Using Agency ID: ${agencyId.substring(0, 8)}...`);
      
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addLogEntry('success', `Successfully connected to TurboRater ${environment.toUpperCase()}!`);
      addLogEntry('success', `Account Name: ${accountName}`);
      addLogEntry('success', `API Type: ${apiType.toUpperCase()}`);
      showNotification('success', `Connected to TurboRater ${environment.toUpperCase()} successfully!`);
      
      setIsConnected(true);
      updateStatistics();

    } catch (error: any) {
      addLogEntry('error', `Connection failed: ${error.message}`);
      showNotification('error', `Failed to connect: ${error.message}`);
    }
  };

  // Add log entry helper
  const addLogEntry = (type: string, message: string) => {
    const newLog = {
      type,
      message,
      timestamp: new Date()
    };
    setLogs((prev: any[]) => [...prev.slice(-19), newLog]);
  };

  // Show notification helper
  const showNotification = (type: string, message: string) => {
    if (!notificationsEnabled) return;
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  // Update statistics
  const updateStatistics = () => {
    const synced = allQuotes.filter(q => q.syncStatus === 'Synced').length;
    const pending = allQuotes.filter(q => q.syncStatus === 'Pending').length;
    const lastSyncTime = new Date().toLocaleTimeString();
    
    setStatistics({
      totalQuotes: allQuotes.length,
      syncedQuotes: synced,
      pendingQuotes: pending,
      lastSync: lastSyncTime
    });
  };

  // Timer effect
  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render Methods
  const renderTabs = () => (
    <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => setActiveTab('demo')}
        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
          activeTab === 'demo' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Calculator className="inline mr-2" size={18} />
        Quote Demo
      </button>
      <button
        onClick={() => setActiveTab('integration')}
        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
          activeTab === 'integration' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Database className="inline mr-2" size={18} />
        Integration Hub
      </button>
      <button
        onClick={() => setActiveTab('envconfig')}
        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
          activeTab === 'envconfig' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <FileKey className="inline mr-2" size={18} />
        Environment Config
      </button>
      <button
        onClick={() => setActiveTab('guide')}
        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
          activeTab === 'guide' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Book className="inline mr-2" size={18} />
        Sub Agent Guide
      </button>
    </div>
  );

  const renderEnvironmentConfig = () => (
    <div className="space-y-6">
      {/* Environment Selector */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Environment Configuration</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
            <select
              value={apiCredentials.environment}
              onChange={(e) => setApiCredentials(prev => ({ ...prev, environment: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="test">Test Environment</option>
              <option value="live">Live/Production</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Type</label>
            <select
              value={apiCredentials.apiType}
              onChange={(e) => setApiCredentials(prev => ({ ...prev, apiType: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="plq">PLQ API</option>
              <option value="xml">XML API</option>
            </select>
          </div>
        </div>

        {/* File Loading Section */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <FolderOpen className="text-blue-600 mr-2" size={20} />
            <h4 className="font-semibold">Load Credentials from File</h4>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={apiKeyFile}
              onChange={(e) => setApiKeyFile(e.target.value)}
              placeholder="Path to .env.local file"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={loadApiKeysFromFile}
              disabled={loadingApiKeys}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingApiKeys ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <>
                  <FileKey className="inline mr-2" size={18} />
                  Load from File
                </>
              )}
            </button>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            Default path: <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code>
          </div>
        </div>

        {/* Loaded Credentials Display */}
        {Object.keys(envVarsLoaded).length > 0 && (
          <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Loaded Environment Variables</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(envVarsLoaded)
                .filter(([key]) => key.includes('TURBO_RATER'))
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-mono text-green-700">
                      {value.length > 20 ? `${value.substring(0, 8)}...` : value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Current Credentials */}
        <div className="mt-4 space-y-3">
          <h4 className="font-semibold text-gray-700">Current Credentials ({apiCredentials.environment})</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Account ID</label>
              <input
                type="text"
                value={apiCredentials.accountId}
                onChange={(e) => setApiCredentials(prev => ({ ...prev, accountId: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm font-mono"
                placeholder="UUID format"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 mb-1">Account Number</label>
              <input
                type="text"
                value={apiCredentials.accountNumber}
                onChange={(e) => setApiCredentials(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm font-mono"
                placeholder="UUID format"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 mb-1">Agency ID</label>
              <input
                type="text"
                value={apiCredentials.agencyId}
                onChange={(e) => setApiCredentials(prev => ({ ...prev, agencyId: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm font-mono"
                placeholder="UUID format"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 mb-1">Access ID</label>
              <input
                type="text"
                value={apiCredentials.accessId}
                onChange={(e) => setApiCredentials(prev => ({ ...prev, accessId: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm font-mono"
                placeholder="e.g., QUOTE4"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Account Name</label>
            <input
              type="text"
              value={apiCredentials.accountName}
              onChange={(e) => setApiCredentials(prev => ({ ...prev, accountName: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="e.g., Quotely"
            />
          </div>
        </div>

        {/* Connection Button */}
        <div className="mt-6">
          <button
            onClick={connectToTurboRater}
            disabled={isConnected}
            className={`w-full p-4 rounded-lg font-semibold transition-all ${
              isConnected
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            {isConnected ? (
              <>
                <CheckCircle className="inline mr-2" size={18} />
                Connected to TurboRater {apiCredentials.environment.toUpperCase()}
              </>
            ) : (
              <>
                <Wifi className="inline mr-2" size={18} />
                Connect to TurboRater
              </>
            )}
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold">Activity Log</h4>
          <Activity className="text-green-400" size={18} />
        </div>
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {logs.map((log: any, index: number) => (
            <div key={index} className={`text-xs ${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'success' ? 'text-green-400' :
              'text-gray-400'
            }`}>
              [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubAgentGuide = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          <Code className="inline mr-2" size={24} />
          Claude CODE Sub Agent Integration Guide
        </h3>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">1. File Structure</h4>
            <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`.env.local (root directory)
├── TurboRater Test Credentials
│   ├── TURBO_RATER_TEST_ACCOUNT_ID
│   ├── TURBO_RATER_TEST_ACCOUNT_NUMBER
│   ├── TURBO_RATER_TEST_AGENCY_ID
│   └── TURBO_RATER_TEST_ACCESS_ID
├── TurboRater Live Credentials
│   ├── TURBO_RATER_LIVE_ACCOUNT_ID
│   ├── TURBO_RATER_LIVE_ACCOUNT_NUMBER
│   ├── TURBO_RATER_LIVE_AGENCY_ID
│   └── TURBO_RATER_LIVE_ACCESS_ID
└── Common Configuration
    └── TURBO_RATER_ACCOUNT_NAME`}
            </pre>
          </div>

          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">2. Loading Process</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>Select environment (Test/Live) from dropdown</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>Enter path to .env.local file (default: .env.local)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>Click "Load from File" button</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                <span>Credentials auto-populate based on environment</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                <span>Click "Connect to TurboRater" to establish connection</span>
              </li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">3. Validation Checks</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                <span>UUID format validation for Account/Agency IDs</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                <span>Required field validation before connection</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                <span>Environment-specific credential mapping</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={16} />
                <span>API endpoint selection (PLQ vs XML)</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mr-2 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 mb-1">Important Notes:</p>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Never commit .env.local to version control</li>
                  <li>• Ensure file has proper read permissions</li>
                  <li>• Use absolute paths if relative path fails</li>
                  <li>• Test environment uses different endpoints than Live</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationHub = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className={`flex items-center p-4 rounded-lg ${
        isConnected 
          ? 'bg-green-50 text-green-800 border border-green-300' 
          : 'bg-red-50 text-red-800 border border-red-300'
      }`}>
        {isConnected ? <Wifi className="mr-3" size={20} /> : <WifiOff className="mr-3" size={20} />}
        <div className="flex-1">
          <div className="font-semibold">
            TurboRater {apiCredentials.environment.toUpperCase()}: {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          {isConnected && (
            <div className="text-sm mt-1">
              Account: {apiCredentials.accountName} | API: {apiCredentials.apiType.toUpperCase()}
            </div>
          )}
        </div>
        {!isConnected && (
          <button
            onClick={() => setActiveTab('envconfig')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Configure Connection
          </button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{statistics.totalQuotes}</div>
          <div className="text-sm text-gray-600">Total Quotes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{statistics.syncedQuotes}</div>
          <div className="text-sm text-gray-600">Synced</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{statistics.pendingQuotes}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{statistics.lastSync}</div>
          <div className="text-sm text-gray-600">Last Sync</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button
          disabled={!isConnected}
          className="p-4 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="inline mr-2" size={18} />
          Sync Quotes
        </button>
        <button
          disabled={!isConnected}
          className="p-4 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
        >
          <Download className="inline mr-2" size={18} />
          Import Rates
        </button>
        <button
          disabled={!isConnected}
          className="p-4 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
        >
          <Upload className="inline mr-2" size={18} />
          Export Data
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          TurboRater Integration Platform
        </h1>
        <p className="text-gray-600">
          Complete integration with .env.local credential management
        </p>
      </div>

      {renderTabs()}

      {activeTab === 'demo' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Quote Generation Demo</h2>
          <p className="text-gray-600 mb-6">
            Experience our AI-powered quote generation with real TurboRater integration
          </p>
          {/* Add your existing quote demo content here */}
        </div>
      )}

      {activeTab === 'integration' && renderIntegrationHub()}
      {activeTab === 'envconfig' && renderEnvironmentConfig()}
      {activeTab === 'guide' && renderSubAgentGuide()}
    </div>
  );
};

export default TurboRaterDemoEnhanced;