'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, Clock, Zap, Shield, Brain, CheckCircle, AlertCircle, 
  TrendingUp, Users, FileText, Calculator, Wifi, WifiOff, RefreshCw, 
  Download, Upload, Database, FileKey, FolderOpen, Key, Settings,
  Server, Activity, Code, Book
} from 'lucide-react';

const TurboRaterDemoWithAPI = () => {
  // State management
  const [activeTab, setActiveTab] = useState('envconfig');
  const [isConnected, setIsConnected] = useState(false);
  
  // Credential Management State
  const [apiCredentials, setApiCredentials] = useState({
    environment: 'test',
    apiType: 'plq',
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
  
  const [logs, setLogs] = useState([
    { type: 'info', message: 'TurboRater Integration initialized', timestamp: new Date() },
    { type: 'info', message: 'Ready to load credentials from .env.local', timestamp: new Date() }
  ]);

  // Load credentials from server API
  const loadApiKeysFromFile = async () => {
    if (!apiKeyFile.trim()) {
      addLogEntry('error', 'Please enter the path to your API key file');
      return;
    }

    setLoadingApiKeys(true);
    addLogEntry('info', `Loading API keys from file: ${apiKeyFile}`);

    try {
      // Call the API to load credentials
      const response = await fetch('/api/env/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: apiKeyFile,
          environment: apiCredentials.environment
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to load credentials');
      }

      // Update credentials with loaded data
      setApiCredentials(prev => ({
        ...prev,
        ...data.credentials,
        environment: apiCredentials.environment,
        apiType: apiCredentials.apiType
      }));

      addLogEntry('success', `Loaded ${data.turboRaterVars} TurboRater variables`);
      addLogEntry('success', `Environment: ${apiCredentials.environment.toUpperCase()}`);
      
      if (data.credentials.accountId) {
        addLogEntry('success', `Account ID: ${data.credentials.accountId.substring(0, 8)}...`);
      }
      if (data.credentials.agencyId) {
        addLogEntry('success', `Agency ID: ${data.credentials.agencyId.substring(0, 8)}...`);
      }

    } catch (error: any) {
      addLogEntry('error', `Failed to load file: ${error.message}`);
    } finally {
      setLoadingApiKeys(false);
    }
  };

  // Connect to TurboRater
  const connectToTurboRater = async () => {
    const { environment, apiType, accountId, agencyId, accountNumber, accessId, accountName } = apiCredentials;
    
    if (!accountId.trim() || !agencyId.trim()) {
      addLogEntry('error', 'Missing required credentials. Please load from .env.local first.');
      return;
    }

    addLogEntry('info', `Connecting to TurboRater ${environment.toUpperCase()} ${apiType.toUpperCase()} API...`);
    
    // Simulate connection (in production, this would make actual API calls)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnected(true);
    addLogEntry('success', `Connected to TurboRater ${environment.toUpperCase()} successfully!`);
    addLogEntry('info', `Account: ${accountName} | API Type: ${apiType.toUpperCase()}`);
  };

  // Disconnect from TurboRater
  const disconnectFromTurboRater = () => {
    setIsConnected(false);
    addLogEntry('info', 'Disconnected from TurboRater');
  };

  // Add log entry
  const addLogEntry = (type: string, message: string) => {
    const newLog = {
      type,
      message,
      timestamp: new Date()
    };
    setLogs((prev: any[]) => [...prev.slice(-19), newLog]);
  };

  // Test connection
  const testConnection = async () => {
    if (!isConnected) {
      addLogEntry('error', 'Please connect to TurboRater first');
      return;
    }

    addLogEntry('info', 'Testing API connection...');
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addLogEntry('success', 'API connection test successful');
    addLogEntry('info', `Response time: ${Math.floor(Math.random() * 100 + 50)}ms`);
  };

  // Generate sample quote
  const generateSampleQuote = async () => {
    if (!isConnected) {
      addLogEntry('error', 'Please connect to TurboRater first');
      return;
    }

    addLogEntry('info', 'Generating sample quote...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const quoteId = `Q-${Date.now().toString().slice(-6)}`;
    addLogEntry('success', `Quote generated: ${quoteId}`);
    addLogEntry('info', `Premium: $${Math.floor(Math.random() * 500 + 1000)}/6mo`);
    addLogEntry('info', `Carrier: ${['State Farm', 'GEICO', 'Progressive'][Math.floor(Math.random() * 3)]}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          TurboRater Integration with .env.local
        </h1>
        <p className="text-gray-600">
          Load credentials from your .env.local file and connect to TurboRater API
        </p>
      </div>

      {/* Main Configuration Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Settings className="mr-2" size={24} />
          Configuration Panel
        </h2>

        {/* Environment Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment
            </label>
            <select
              value={apiCredentials.environment}
              onChange={(e) => setApiCredentials(prev => ({ ...prev, environment: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isConnected}
            >
              <option value="test">Test Environment</option>
              <option value="live">Live/Production</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Type
            </label>
            <select
              value={apiCredentials.apiType}
              onChange={(e) => setApiCredentials(prev => ({ ...prev, apiType: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isConnected}
            >
              <option value="plq">PLQ API</option>
              <option value="xml">XML API</option>
            </select>
          </div>
        </div>

        {/* File Loading Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-3">
            <FileKey className="text-blue-600 mr-2" size={20} />
            <h3 className="font-semibold">Load Credentials from File</h3>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={apiKeyFile}
              onChange={(e) => setApiKeyFile(e.target.value)}
              placeholder="Path to .env.local file"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              disabled={isConnected}
            />
            <button
              onClick={loadApiKeysFromFile}
              disabled={loadingApiKeys || isConnected}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loadingApiKeys ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                'Load Credentials'
              )}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-600">
            Default: <code className="bg-gray-200 px-1 rounded">.env.local</code> in project root
          </div>
        </div>

        {/* Loaded Credentials Display */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Account ID</label>
              <input
                type="text"
                value={apiCredentials.accountId}
                readOnly
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-sm font-mono"
                placeholder="Not loaded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Agency ID</label>
              <input
                type="text"
                value={apiCredentials.agencyId}
                readOnly
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-sm font-mono"
                placeholder="Not loaded"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Account Number</label>
              <input
                type="text"
                value={apiCredentials.accountNumber}
                readOnly
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-sm font-mono"
                placeholder="Not loaded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Access ID</label>
              <input
                type="text"
                value={apiCredentials.accessId}
                readOnly
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-sm font-mono"
                placeholder="Not loaded"
              />
            </div>
          </div>
        </div>

        {/* Connection Controls */}
        <div className="flex space-x-3">
          {!isConnected ? (
            <button
              onClick={connectToTurboRater}
              disabled={!apiCredentials.accountId || !apiCredentials.agencyId}
              className="flex-1 p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Wifi className="inline mr-2" size={18} />
              Connect to TurboRater
            </button>
          ) : (
            <>
              <button
                onClick={disconnectFromTurboRater}
                className="flex-1 p-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <WifiOff className="inline mr-2" size={18} />
                Disconnect
              </button>
              <button
                onClick={testConnection}
                className="flex-1 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Activity className="inline mr-2" size={18} />
                Test Connection
              </button>
              <button
                onClick={generateSampleQuote}
                className="flex-1 p-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                <Calculator className="inline mr-2" size={18} />
                Generate Quote
              </button>
            </>
          )}
        </div>

        {/* Connection Status */}
        {isConnected && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-800">
              <CheckCircle className="mr-2" size={20} />
              <span className="font-semibold">
                Connected to TurboRater {apiCredentials.environment.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-green-700 mt-1">
              Account: {apiCredentials.accountName} | API: {apiCredentials.apiType.toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold flex items-center">
            <Server className="mr-2" size={20} />
            Activity Log
          </h3>
          <button
            onClick={() => setLogs([])}
            className="text-gray-400 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>
        
        <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-xs">
          {logs.map((log: any, index: number) => (
            <div 
              key={index} 
              className={`${
                log.type === 'error' ? 'text-red-400' :
                log.type === 'success' ? 'text-green-400' :
                log.type === 'info' ? 'text-blue-400' :
                'text-gray-400'
              }`}
            >
              <span className="text-gray-500">
                [{new Date(log.timestamp).toLocaleTimeString()}]
              </span>{' '}
              <span className={`${
                log.type === 'error' ? 'text-red-500' :
                log.type === 'success' ? 'text-green-500' :
                'text-blue-500'
              }`}>
                {log.type.toUpperCase()}:
              </span>{' '}
              {log.message}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <Book className="mr-2" size={20} />
          Quick Start Guide
        </h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Select your environment (Test or Live)</li>
          <li>Click "Load Credentials" to load from .env.local</li>
          <li>Verify credentials are loaded (shown in input fields)</li>
          <li>Click "Connect to TurboRater" to establish connection</li>
          <li>Use Test Connection or Generate Quote to verify integration</li>
        </ol>
      </div>
    </div>
  );
};

export default TurboRaterDemoWithAPI;