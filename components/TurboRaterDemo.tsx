import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Clock, Zap, Shield, Brain, CheckCircle, AlertCircle, TrendingUp, Users, FileText, Calculator, Wifi, WifiOff, RefreshCw, Download, Upload, Database } from 'lucide-react';

const TurboRaterDemo = () => {
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
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'integration'
  const [isConnected, setIsConnected] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [serverUrl, setServerUrl] = useState('https://api.turborater.com/v2');
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
    { type: 'info', message: 'Waiting for connection...', timestamp: new Date() }
  ]);
  const [statistics, setStatistics] = useState({
    totalQuotes: 0,
    syncedQuotes: 0,
    pendingQuotes: 0,
    lastSync: '--'
  });

  const enhancedSampleQuotes = [
    { id: 'Q001', customer: 'John Smith', status: 'Active', premium: '$1,156', syncStatus: 'Synced', lastSync: '2024-01-15 14:30', carrier: 'State Farm', policy: 'Auto' },
    { id: 'Q002', customer: 'Sarah Johnson', status: 'Pending', premium: '$1,289', syncStatus: 'Pending', lastSync: '2024-01-15 12:15', carrier: 'Allstate', policy: 'Home' },
    { id: 'Q003', customer: 'Mike Davis', status: 'Active', premium: '$1,445', syncStatus: 'Synced', lastSync: '2024-01-15 16:45', carrier: 'Progressive', policy: 'Auto' },
    { id: 'Q004', customer: 'Lisa Wilson', status: 'Quote', premium: '$1,234', syncStatus: 'New', lastSync: 'Never', carrier: 'GEICO', policy: 'Auto' },
    { id: 'Q005', customer: 'Tom Brown', status: 'Active', premium: '$1,567', syncStatus: 'Synced', lastSync: '2024-01-15 13:20', carrier: 'Liberty Mutual', policy: 'Home' },
    { id: 'Q006', customer: 'Emma Garcia', status: 'Pending', premium: '$987', syncStatus: 'Error', lastSync: '2024-01-15 11:30', carrier: 'Farmers', policy: 'Auto' },
    { id: 'Q007', customer: 'David Lee', status: 'Active', premium: '$2,156', syncStatus: 'Synced', lastSync: '2024-01-15 15:10', carrier: 'Nationwide', policy: 'Home' },
    { id: 'Q008', customer: 'Jennifer White', status: 'Quote', premium: '$1,678', syncStatus: 'New', lastSync: 'Never', carrier: 'Travelers', policy: 'Auto' }
  ];

  // Demo Functions
  useEffect(() => {
    if (currentStep === 1 && !startTime) {
      setStartTime(Date.now());
    }
  }, [currentStep, startTime]);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const getAISuggestions = useCallback((field: string, value: any) => {
    const suggestions: Record<string, string[]> = {
      vehicleYear: value > '2020' ? ['Higher safety rating detected', 'Potential discount available'] : ['Consider safety features'],
      drivingRecord: value === 'clean' ? ['Excellent! Qualify for preferred rates'] : ['We can still find competitive rates'],
      coverage: value === 'full' ? ['Comprehensive protection recommended'] : ['Consider umbrella policy']
    };
    return suggestions[field] || [];
  }, []);

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    const suggestions = getAISuggestions(field, value);
    setAISuggestions((prev: any) => ({ ...prev, [field]: suggestions }));
  };

  const generateQuotes = async () => {
    setIsLoading(true);
    setQuoteProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setQuoteProgress(i);
    }

    const mockQuotes = [
      {
        id: 1,
        carrier: 'State Farm',
        premium: 1247,
        coverage: 'Full Coverage',
        confidence: 92,
        savings: 234,
        factors: ['Clean driving record', 'Multi-policy discount', 'Good student discount'],
        recommended: true
      },
      {
        id: 2,
        carrier: 'Geico',
        premium: 1189,
        coverage: 'Full Coverage', 
        confidence: 88,
        savings: 292,
        factors: ['Safe driver discount', 'Vehicle safety features'],
        recommended: false
      },
      {
        id: 3,
        carrier: 'Progressive',
        premium: 1356,
        coverage: 'Full Coverage',
        confidence: 85,
        savings: 125,
        factors: ['Snapshot discount eligible', 'Multi-vehicle discount'],
        recommended: false
      }
    ];

    setQuotes(mockQuotes);
    setIsLoading(false);
    setCurrentStep(4);
  };

  // Integration Hub Functions
  const addLogEntry = (type: string, message: string) => {
    const newLog = {
      type,
      message,
      timestamp: new Date()
    };
    setLogs((prev: any[]) => [...prev.slice(-19), newLog]); // Keep last 20 entries
  };

  const showNotification = (type: string, message: string) => {
    if (!notificationsEnabled) return;
    // You can implement toast notifications here
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const connectToTurboRater = async () => {
    if (!apiKey.trim()) {
      showNotification('error', 'Please enter your TurboRater API key');
      return;
    }

    if (!serverUrl.trim()) {
      showNotification('error', 'Please enter the server URL');
      return;
    }

    addLogEntry('info', 'Validating API credentials...');

    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (apiKey.length < 20) {
      addLogEntry('error', 'Invalid API key format');
      showNotification('error', 'Invalid API key format');
      return;
    }

    addLogEntry('info', 'API key validated successfully');
    addLogEntry('info', 'Establishing secure connection...');

    await new Promise(resolve => setTimeout(resolve, 2000));

    addLogEntry('success', 'Successfully connected to TurboRater!');
    showNotification('success', 'Connected to TurboRater successfully!');

    setIsConnected(true);
    setAllQuotes([...enhancedSampleQuotes]);
    setFilteredQuotes([...enhancedSampleQuotes]);
    updateStatistics();
  };

  const syncData = async () => {
    if (!isConnected || syncInProgress) return;

    setSyncInProgress(true);
    
    if (backupEnabled) {
      addLogEntry('info', 'Creating backup before sync...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addLogEntry('success', 'Backup created successfully');
    }

    const syncSteps = [
      { progress: 15, message: 'Connecting to TurboRater API...' },
      { progress: 30, message: 'Fetching quote data...' },
      { progress: 45, message: 'Validating data integrity...' },
      { progress: 60, message: 'Updating local database...' },
      { progress: 75, message: 'Syncing policy information...' },
      { progress: 90, message: 'Finalizing synchronization...' },
      { progress: 100, message: 'Sync completed!' }
    ];

    for (const step of syncSteps) {
      addLogEntry('info', step.message);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    addLogEntry('success', 'Data synchronization completed successfully!');
    showNotification('success', 'All quotes synced successfully!');

    // Update all quotes to synced status
    setAllQuotes((prev: any[]) => prev.map(quote => ({
      ...quote,
      syncStatus: quote.syncStatus !== 'Error' ? 'Synced' : quote.syncStatus,
      lastSync: new Date().toLocaleString()
    })));

    setSyncInProgress(false);
    updateStatistics();
  };

  const updateStatistics = () => {
    const totalQuotes = allQuotes.length;
    const syncedQuotes = allQuotes.filter(q => q.syncStatus === 'Synced').length;
    const pendingQuotes = allQuotes.filter(q => q.syncStatus === 'Pending' || q.syncStatus === 'New').length;
    const lastSyncTime = new Date().toLocaleTimeString();

    setStatistics({
      totalQuotes,
      syncedQuotes,
      pendingQuotes,
      lastSync: lastSyncTime
    });
  };

  const filterQuotes = () => {
    const filtered = allQuotes.filter(quote => {
      const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          quote.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || quote.status === statusFilter;
      const matchesSync = !syncFilter || quote.syncStatus === syncFilter;
      
      return matchesSearch && matchesStatus && matchesSync;
    });
    
    setFilteredQuotes(filtered);
  };

  useEffect(() => {
    filterQuotes();
  }, [searchTerm, statusFilter, syncFilter, allQuotes]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'Quote': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch(status) {
      case 'Synced': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'New': return 'text-blue-500';
      case 'Error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const toggleQuoteSelection = (quoteId: string) => {
    const newSelected = new Set(selectedQuotes);
    if (newSelected.has(quoteId)) {
      newSelected.delete(quoteId);
    } else {
      newSelected.add(quoteId);
    }
    setSelectedQuotes(newSelected);
  };

  const selectAllQuotes = () => {
    setSelectedQuotes(new Set(filteredQuotes.map((q: any) => q.id)));
  };

  const deselectAllQuotes = () => {
    setSelectedQuotes(new Set());
  };

  const syncSelectedQuotes = async () => {
    if (selectedQuotes.size === 0) {
      showNotification('error', 'Please select quotes to sync');
      return;
    }

    addLogEntry('info', `Syncing ${selectedQuotes.size} selected quotes...`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setAllQuotes((prev: any[]) => prev.map(quote => 
      selectedQuotes.has(quote.id) 
        ? { ...quote, syncStatus: 'Synced', lastSync: new Date().toLocaleString() }
        : quote
    ));

    setSelectedQuotes(new Set());
    updateStatistics();
    addLogEntry('success', 'Selected quotes synced successfully');
    showNotification('success', 'Selected quotes synced successfully!');
  };

  // Render Functions
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
    </div>
  );

  const renderStatistics = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-slate-800 text-white p-4 rounded-lg border border-slate-600">
        <div className="text-2xl font-bold text-blue-400">{statistics.totalQuotes}</div>
        <div className="text-sm text-slate-300">Total Quotes</div>
      </div>
      <div className="bg-slate-800 text-white p-4 rounded-lg border border-slate-600">
        <div className="text-2xl font-bold text-green-400">{statistics.syncedQuotes}</div>
        <div className="text-sm text-slate-300">Synced Quotes</div>
      </div>
      <div className="bg-slate-800 text-white p-4 rounded-lg border border-slate-600">
        <div className="text-2xl font-bold text-yellow-400">{statistics.pendingQuotes}</div>
        <div className="text-sm text-slate-300">Pending Sync</div>
      </div>
      <div className="bg-slate-800 text-white p-4 rounded-lg border border-slate-600">
        <div className="text-2xl font-bold text-blue-400">{statistics.lastSync}</div>
        <div className="text-sm text-slate-300">Last Sync</div>
      </div>
    </div>
  );

  const renderIntegrationControls = () => (
    <div className="bg-slate-800 text-white p-6 rounded-lg border border-slate-600 mb-6">
      <h3 className="text-xl font-semibold mb-4 border-b border-slate-600 pb-2">Integration Controls</h3>
      
      {/* API Configuration */}
      <div className="bg-slate-900 p-4 rounded-lg mb-4">
        <label className="block text-sm text-slate-300 mb-2">TurboRater API Key:</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white font-mono mb-2"
          placeholder="Enter your TurboRater API key..."
        />
        <label className="block text-sm text-slate-300 mb-2">Server URL:</label>
        <input
          type="text"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white font-mono"
        />
      </div>

      {/* Connection Status */}
      <div className={`flex items-center p-3 rounded-lg mb-4 ${
        isConnected 
          ? 'bg-green-900 text-green-200 border-l-4 border-green-500' 
          : 'bg-red-900 text-red-200 border-l-4 border-red-500'
      }`}>
        {isConnected ? <Wifi className="mr-2" size={18} /> : <WifiOff className="mr-2" size={18} />}
        <span>TurboRater: {isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {/* Control Buttons */}
      <div className="space-y-3">
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
              Connected to TurboRater
            </>
          ) : (
            <>
              <Wifi className="inline mr-2" size={18} />
              Connect to TurboRater
            </>
          )}
        </button>

        <button
          onClick={syncData}
          disabled={!isConnected || syncInProgress}
          className="w-full p-4 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {syncInProgress ? (
            <>
              <RefreshCw className="inline mr-2 animate-spin" size={18} />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="inline mr-2" size={18} />
              Sync Quote Data
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={!isConnected}
            className="p-3 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            <Download className="inline mr-2" size={16} />
            Import Rates
          </button>
          <button
            disabled={!isConnected}
            className="p-3 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            <Upload className="inline mr-2" size={16} />
            Export Quotes
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-slate-700 p-4 rounded-lg mt-4">
        <h4 className="font-semibold mb-3">Settings</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto-sync every 5 minutes</span>
            <button
              onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                autoSyncEnabled ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                autoSyncEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Real-time notifications</span>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Backup before sync</span>
            <button
              onClick={() => setBackupEnabled(!backupEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                backupEnabled ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                backupEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuoteTable = () => (
    <div className="bg-slate-800 text-white p-6 rounded-lg border border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Integration Data</h3>
        <button
          onClick={() => updateStatistics()}
          className="p-2 bg-slate-600 rounded hover:bg-slate-500 transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search quotes..."
          className="p-2 bg-slate-700 border border-slate-600 rounded text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 bg-slate-700 border border-slate-600 rounded text-white"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Quote">Quote</option>
        </select>
        <select
          value={syncFilter}
          onChange={(e) => setSyncFilter(e.target.value)}
          className="p-2 bg-slate-700 border border-slate-600 rounded text-white"
        >
          <option value="">All Sync Status</option>
          <option value="Synced">Synced</option>
          <option value="Pending">Pending</option>
          <option value="New">New</option>
          <option value="Error">Error</option>
        </select>
      </div>

      {/* Bulk Actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={selectAllQuotes}
          className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500 transition-colors"
        >
          Select All
        </button>
        <button
          onClick={deselectAllQuotes}
          className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500 transition-colors"
        >
          Deselect All
        </button>
        <button
          onClick={syncSelectedQuotes}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Sync Selected
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left p-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedQuotes.size === filteredQuotes.length && filteredQuotes.length > 0}
                  onChange={() => selectedQuotes.size === filteredQuotes.length ? deselectAllQuotes() : selectAllQuotes()}
                  className="accent-blue-500"
                />
              </th>
              <th className="text-left p-3">Quote ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Premium</th>
              <th className="text-left p-3">Sync Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-400">
                  {isConnected ? 'No quotes match your filters' : 'Connect to TurboRater to view data'}
                </td>
              </tr>
            ) : (
              filteredQuotes.map((quote: any) => (
                <tr key={quote.id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedQuotes.has(quote.id)}
                      onChange={() => toggleQuoteSelection(quote.id)}
                      className="accent-blue-500"
                    />
                  </td>
                  <td className="p-3">{quote.id}</td>
                  <td className="p-3">{quote.customer}</td>
                  <td className="p-3">
                    <span className={getStatusColor(quote.status)}>{quote.status}</span>
                  </td>
                  <td className="p-3">{quote.premium}</td>
                  <td className="p-3">
                    <span className={getSyncStatusColor(quote.syncStatus)}>{quote.syncStatus}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                        Sync
                      </button>
                      <button className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Activity Log */}
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Activity Log</h4>
        <div className="bg-slate-900 p-4 rounded-lg h-48 overflow-y-auto font-mono text-sm">
          {logs.map((log: any, index: number) => (
            <div
              key={index}
              className={`mb-1 ${
                log.type === 'success' ? 'text-green-400' :
                log.type === 'error' ? 'text-red-400' :
                log.type === 'info' ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              [{log.timestamp.toLocaleTimeString()}] [{log.type.toUpperCase()}] {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Demo Components (existing components from previous implementation)
  const CompetitiveComparison = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" size={20} />
        Speed Advantage
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="text-gray-600">
          <div className="text-sm">EZLynx</div>
          <div className="text-xl font-bold text-red-500">~5 min</div>
        </div>
        <div className="text-gray-600">
          <div className="text-sm">Applied Rater</div>
          <div className="text-xl font-bold text-orange-500">~4 min</div>
        </div>
        <div className="bg-white rounded-lg p-2 border-2 border-blue-200">
          <div className="text-sm text-blue-600">TurboRater</div>
          <div className="text-xl font-bold text-green-500">~2 min</div>
          <div className="text-xs text-blue-600">⚡ 60% Faster</div>
        </div>
      </div>
    </div>
  );

  const AITransparencyPanel = ({ decision }: { decision: any }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Brain className="text-purple-600 mr-2" size={18} />
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            AI Recommended
          </span>
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-600 mr-2">Confidence:</div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
            {decision.confidence}%
          </div>
        </div>
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{decision.carrier} - Best Value</h4>
      <p className="text-gray-600 text-sm mb-3">
        Based on your profile, this carrier offers the optimal balance of coverage and cost.
      </p>
      <div className="text-xs text-gray-500">
        <strong>Key Factors:</strong> {decision.factors.join(', ')}
      </div>
    </div>
  );

  const ProgressIndicator = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Quote Progress</span>
        <span className="text-sm text-gray-500">
          Target: Under 2 minutes | Current: {formatTime(elapsedTime)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Client Info</span>
        <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Vehicle Details</span>
        <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Coverage</span>
        <span className={currentStep >= 4 ? 'text-green-600 font-medium' : ''}>Quotes</span>
      </div>
    </div>
  );

  const SmartField = ({ label, name, type = "text", value, onChange, suggestions = [], required = false }: { label: string; name: string; type?: string; value: any; onChange: any; suggestions?: string[]; required?: boolean }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {suggestions.length > 0 && (
        <div className="mt-1">
          {suggestions.map((suggestion: string, index: number) => (
            <div key={index} className="text-xs text-green-600 flex items-center">
              <CheckCircle size={12} className="mr-1" />
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const QuoteCard = ({ quote }: { quote: any }) => (
    <div className={`border rounded-lg p-4 ${quote.recommended ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      {quote.recommended && (
        <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mb-3 inline-block">
          ⭐ AI Recommended
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{quote.carrier}</h3>
          <p className="text-sm text-gray-600">{quote.coverage}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">${quote.premium}</div>
          <div className="text-sm text-green-600">Save ${quote.savings}/year</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        <strong>Factors:</strong> {quote.factors.join(', ')}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xs text-gray-600 mr-2">AI Confidence:</div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
            {quote.confidence}%
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
          Select Quote
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SmartField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.firstName}
                required
              />
              <SmartField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.lastName}
                required
              />
              <SmartField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.dateOfBirth}
                required
              />
              <SmartField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.phone}
                required
              />
              <div className="md:col-span-2">
                <SmartField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleFieldChange}
                  suggestions={aiSuggestions.address}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SmartField
                label="Vehicle Year"
                name="vehicleYear"
                value={formData.vehicleYear}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.vehicleYear}
                required
              />
              <SmartField
                label="Make"
                name="vehicleMake"
                value={formData.vehicleMake}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.vehicleMake}
                required
              />
              <SmartField
                label="Model"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.vehicleModel}
                required
              />
              <SmartField
                label="VIN"
                name="vin"
                value={formData.vin}
                onChange={handleFieldChange}
                suggestions={aiSuggestions.vin}
                required
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driving Record <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.drivingRecord || ''}
                  onChange={(e) => handleFieldChange('drivingRecord', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select driving record</option>
                  <option value="clean">Clean (No violations)</option>
                  <option value="minor">Minor violations</option>
                  <option value="major">Major violations</option>
                </select>
                {aiSuggestions.drivingRecord && (
                  <div className="mt-1">
                    {aiSuggestions.drivingRecord.map((suggestion: string, index: number) => (
                      <div key={index} className="text-xs text-green-600 flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Coverage Options</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coverage Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.coverage || ''}
                  onChange={(e) => handleFieldChange('coverage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select coverage type</option>
                  <option value="liability">Liability Only</option>
                  <option value="full">Full Coverage</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
                {aiSuggestions.coverage && (
                  <div className="mt-1">
                    {aiSuggestions.coverage.map((suggestion: string, index: number) => (
                      <div key={index} className="text-xs text-green-600 flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SmartField
                  label="Deductible"
                  name="deductible"
                  value={formData.deductible}
                  onChange={handleFieldChange}
                  suggestions={aiSuggestions.deductible}
                />
                <SmartField
                  label="Annual Mileage"
                  name="annualMileage"
                  value={formData.annualMileage}
                  onChange={handleFieldChange}
                  suggestions={aiSuggestions.annualMileage}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Brain className="text-blue-600 mr-2" size={18} />
                  <span className="font-medium text-blue-900">AI Recommendation</span>
                </div>
                <p className="text-blue-800 text-sm">
                  Based on your vehicle and profile, we recommend Full Coverage with a $500 deductible 
                  for optimal protection and cost balance.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instant Quotes</h2>
            
            {quotes.length > 0 && (
              <AITransparencyPanel decision={quotes[0]} />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {quotes.map((quote: any) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-green-900">Quote Generation Complete!</span>
              </div>
              <p className="text-green-800 text-sm">
                ⚡ Generated in {formatTime(elapsedTime)} - 60% faster than traditional platforms
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Calculator className="text-white mr-3" size={32} />
              <div>
                <h1 className="text-3xl font-bold">TurboRater Integration Hub</h1>
                <p className="text-lg opacity-90">Seamlessly connect and sync your insurance data with TurboRater</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <Clock className="inline mr-1" size={16} />
                {formatTime(elapsedTime)}
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                Demo Mode
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabs()}

        {activeTab === 'demo' ? (
          <>
            <CompetitiveComparison />
            <ProgressIndicator />

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md mx-auto">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Your Quotes</h3>
                  <p className="text-gray-600 text-sm mb-4">AI is analyzing 50+ carriers...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${quoteProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">{quoteProgress}% Complete</div>
                </div>
              </div>
            )}

            {/* Step Content */}
            {!isLoading && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                {renderStep()}
              </div>
            )}

            {/* Navigation */}
            {!isLoading && currentStep < 4 && (
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    Step {currentStep} of 3
                  </div>
                </div>

                {currentStep === 3 ? (
                  <button
                    onClick={generateQuotes}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-md font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center"
                  >
                    Generate Instant Quotes
                    <Zap className="ml-2" size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    Continue
                    <ChevronRight className="ml-1" size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Performance Metrics */}
            {currentStep === 4 && (
              <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-green-600" size={20} />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formatTime(elapsedTime)}</div>
                    <div className="text-sm text-gray-600">Total Time</div>
                    <div className="text-xs text-green-600">60% faster than EZLynx</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{quotes.length}</div>
                    <div className="text-sm text-gray-600">Quotes Generated</div>
                    <div className="text-xs text-blue-600">From 50+ carriers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-gray-600">AI Confidence</div>
                    <div className="text-xs text-purple-600">Transparent scoring</div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {renderStatistics()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderIntegrationControls()}
              {renderQuoteTable()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TurboRaterDemo;