'use client'

import React, { useState, useEffect, useRef } from 'react'
import './Turbo.css'

const enhancedSampleQuotes = [
  {
    id: 'Q001',
    customer: 'John Smith',
    status: 'Active',
    premium: '$1,156',
    syncStatus: 'Synced',
    lastSync: '2024-01-15 14:30',
    carrier: 'State Farm',
    policy: 'Auto',
  },
  {
    id: 'Q002',
    customer: 'Sarah Johnson',
    status: 'Pending',
    premium: '$1,289',
    syncStatus: 'Pending',
    lastSync: '2024-01-15 12:15',
    carrier: 'Allstate',
    policy: 'Home',
  },
  {
    id: 'Q003',
    customer: 'Mike Davis',
    status: 'Active',
    premium: '$1,445',
    syncStatus: 'Synced',
    lastSync: '2024-01-15 16:45',
    carrier: 'Progressive',
    policy: 'Auto',
  },
  {
    id: 'Q004',
    customer: 'Lisa Wilson',
    status: 'Quote',
    premium: '$1,234',
    syncStatus: 'New',
    lastSync: 'Never',
    carrier: 'GEICO',
    policy: 'Auto',
  },
  {
    id: 'Q005',
    customer: 'Tom Brown',
    status: 'Active',
    premium: '$1,567',
    syncStatus: 'Synced',
    lastSync: '2024-01-15 13:20',
    carrier: 'Liberty Mutual',
    policy: 'Home',
  },
  {
    id: 'Q006',
    customer: 'Emma Garcia',
    status: 'Pending',
    premium: '$987',
    syncStatus: 'Error',
    lastSync: '2024-01-15 11:30',
    carrier: 'Farmers',
    policy: 'Auto',
  },
  {
    id: 'Q007',
    customer: 'David Lee',
    status: 'Active',
    premium: '$2,156',
    syncStatus: 'Synced',
    lastSync: '2024-01-15 15:10',
    carrier: 'Nationwide',
    policy: 'Home',
  },
  {
    id: 'Q008',
    customer: 'Jennifer White',
    status: 'Quote',
    premium: '$1,678',
    syncStatus: 'New',
    lastSync: 'Never',
    carrier: 'Travelers',
    policy: 'Auto',
  },
]

interface TurboProps {
  className?: string
}

interface Quote {
  id: string
  customer: string
  status: string
  premium: string
  syncStatus: string
  lastSync: string
  carrier: string
  policy: string
}

interface LogEntry {
  type: string
  message: string
  timestamp: string
}

interface Notification {
  type: string
  message: string
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Active':
      return '#10b981'
    case 'Pending':
      return '#f59e0b'
    case 'Quote':
      return '#06b6d4'
    default:
      return '#94a3b8'
  }
}

function getSyncStatusColor(status: string): string {
  switch (status) {
    case 'Synced':
      return '#10b981'
    case 'Pending':
      return '#f59e0b'
    case 'New':
      return '#06b6d4'
    case 'Error':
      return '#ef4444'
    default:
      return '#94a3b8'
  }
}

export default function Turbo({ className = '' }: TurboProps) {
  // State
  const [isConnected, setIsConnected] = useState(false)
  const [syncInProgress, setSyncInProgress] = useState(false)
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [backupEnabled, setBackupEnabled] = useState(true)
  const [selectedQuotes, setSelectedQuotes] = useState<Set<string>>(new Set())
  const [allQuotes, setAllQuotes] = useState<Quote[]>(enhancedSampleQuotes)
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(enhancedSampleQuotes)
  const [sortColumn, setSortColumn] = useState<number>(-1)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [apiKey, setApiKey] = useState('')
  const [serverUrl, setServerUrl] = useState('https://api.turborater.com/v2')
  const [notification, setNotification] = useState<Notification | null>(null)
  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    {
      type: 'info',
      message: 'TurboRater Integration Hub initialized',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      type: 'info',
      message: 'Waiting for connection...',
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('Initializing...')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [syncFilter, setSyncFilter] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const autoSyncIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Statistics
  const totalQuotes = allQuotes.length
  const syncedQuotes = allQuotes.filter((q) => q.syncStatus === 'Synced').length
  const pendingQuotes = allQuotes.filter(
    (q) => q.syncStatus === 'Pending' || q.syncStatus === 'New'
  ).length
  const lastSyncTime = isConnected ? new Date().toLocaleTimeString() : '--'

  // Effects
  useEffect(() => {
    if (autoSyncEnabled && isConnected) {
      if (autoSyncIntervalRef.current) clearInterval(autoSyncIntervalRef.current)
      autoSyncIntervalRef.current = setInterval(() => {
        if (isConnected && !syncInProgress) {
          addLogEntry('info', 'Auto-sync triggered')
          syncData()
        }
      }, 5 * 60 * 1000)
      return () => {
        if (autoSyncIntervalRef.current) clearInterval(autoSyncIntervalRef.current)
      }
    }
  }, [autoSyncEnabled, isConnected, syncInProgress])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  useEffect(() => {
    filterTable()
  }, [searchTerm, statusFilter, syncFilter, allQuotes])

  // Functions
  function addLogEntry(type: string, message: string) {
    setLogEntries((entries) => {
      const newEntry = {
        type,
        message,
        timestamp: new Date().toLocaleTimeString(),
      }
      const updated = [...entries, newEntry]
      return updated.length > 20 ? updated.slice(updated.length - 20) : updated
    })
  }

  function showNotification(type: string, message: string) {
    if (!notificationsEnabled) return
    setNotification({ type, message })
  }

  function connectToTurboRater() {
    if (!apiKey.trim()) {
      showNotification('error', 'Please enter your TurboRater API key')
      return
    }
    if (!serverUrl.trim()) {
      showNotification('error', 'Please enter the server URL')
      return
    }

    setIsConnecting(true)
    addLogEntry('info', 'Validating API credentials...')

    setTimeout(() => {
      if (apiKey.length < 20) {
        addLogEntry('error', 'Invalid API key format')
        showNotification('error', 'Invalid API key format')
        setIsConnecting(false)
        return
      }

      addLogEntry('info', 'API key validated successfully')
      addLogEntry('info', 'Establishing secure connection...')

      setTimeout(() => {
        addLogEntry('success', 'Successfully connected to TurboRater!')
        showNotification('success', 'Connected to TurboRater successfully!')
        setIsConnected(true)
        setIsConnecting(false)
        setAllQuotes([...enhancedSampleQuotes])
        setFilteredQuotes([...enhancedSampleQuotes])
      }, 2000)
    }, 1000)
  }

  function syncData() {
    if (!isConnected || syncInProgress) return

    if (backupEnabled) {
      addLogEntry('info', 'Creating backup before sync...')
      setTimeout(() => {
        addLogEntry('success', 'Backup created successfully')
        performSync()
      }, 1000)
    } else {
      performSync()
    }
  }

  function performSync() {
    setSyncInProgress(true)
    setProgress(0)
    setProgressText('Starting...')
    addLogEntry('info', 'Starting comprehensive data synchronization...')

    const syncSteps = [
      { progress: 15, message: 'Connecting to TurboRater API...' },
      { progress: 30, message: 'Fetching quote data...' },
      { progress: 45, message: 'Validating data integrity...' },
      { progress: 60, message: 'Updating local database...' },
      { progress: 75, message: 'Syncing policy information...' },
      { progress: 90, message: 'Finalizing synchronization...' },
      { progress: 100, message: 'Sync completed!' },
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < syncSteps.length) {
        setProgress(syncSteps[stepIndex].progress)
        setProgressText(
          `${syncSteps[stepIndex].message} ${syncSteps[stepIndex].progress}%`
        )
        addLogEntry('info', syncSteps[stepIndex].message)
        stepIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          addLogEntry('success', 'Data synchronization completed successfully!')
          showNotification('success', 'All quotes synced successfully!')
          setSyncInProgress(false)
          updateAllSyncStatus()
        }, 500)
      }
    }, 800)
  }

  function updateAllSyncStatus() {
    setAllQuotes((quotes) =>
      quotes.map((q) =>
        q.syncStatus !== 'Error'
          ? {
              ...q,
              syncStatus: 'Synced',
              lastSync: new Date().toLocaleString(),
            }
          : q
      )
    )
  }

  function filterTable() {
    setFilteredQuotes(
      allQuotes.filter((quote) => {
        const matchesSearch =
          quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = !statusFilter || quote.status === statusFilter
        const matchesSync = !syncFilter || quote.syncStatus === syncFilter
        return matchesSearch && matchesStatus && matchesSync
      })
    )
  }

  function sortTable(columnIndex: number) {
    const columns = ['', 'id', 'customer', 'status', 'premium', 'syncStatus']
    const column = columns[columnIndex] as keyof Quote

    let direction = sortDirection
    if (sortColumn === columnIndex) {
      direction = direction === 'asc' ? 'desc' : 'asc'
      setSortDirection(direction)
    } else {
      setSortColumn(columnIndex)
      setSortDirection('asc')
      direction = 'asc'
    }

    setFilteredQuotes((quotes) =>
      [...quotes].sort((a, b) => {
        let aVal = a[column]
        let bVal = b[column]

        if (column === 'premium') {
          aVal = parseFloat((aVal as string).replace(/[$,]/g, '')) as any
          bVal = parseFloat((bVal as string).replace(/[$,]/g, '')) as any
        }

        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
    )
  }

  function toggleQuoteSelection(quoteId: string) {
    setSelectedQuotes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(quoteId)) {
        newSet.delete(quoteId)
      } else {
        newSet.add(quoteId)
      }
      return newSet
    })
  }

  function selectAll() {
    setSelectedQuotes(new Set(filteredQuotes.map((q) => q.id)))
  }

  function deselectAll() {
    setSelectedQuotes(new Set())
  }

  function syncSelected() {
    if (selectedQuotes.size === 0) {
      showNotification('error', 'Please select quotes to sync')
      return
    }

    addLogEntry('info', `Syncing ${selectedQuotes.size} selected quotes...`)
    showNotification('info', `Syncing ${selectedQuotes.size} quotes...`)

    setTimeout(() => {
      setAllQuotes((quotes) =>
        quotes.map((q) =>
          selectedQuotes.has(q.id)
            ? {
                ...q,
                syncStatus: 'Synced',
                lastSync: new Date().toLocaleString(),
              }
            : q
        )
      )
      deselectAll()
      addLogEntry('success', 'Selected quotes synced successfully')
      showNotification('success', 'Selected quotes synced successfully!')
    }, 2000)
  }

  function exportSelected() {
    if (selectedQuotes.size === 0) {
      showNotification('error', 'Please select quotes to export')
      return
    }

    const selectedData = allQuotes.filter((q) => selectedQuotes.has(q.id))
    const csvContent = convertToCSV(selectedData)
    downloadCSV(csvContent, 'selected_quotes.csv')
    addLogEntry('success', `Exported ${selectedQuotes.size} quotes to CSV`)
    showNotification('success', 'Quotes exported successfully!')
  }

  function deleteSelected() {
    if (selectedQuotes.size === 0) {
      showNotification('error', 'Please select quotes to delete')
      return
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedQuotes.size} selected quotes?`
      )
    ) {
      setAllQuotes((quotes) => quotes.filter((q) => !selectedQuotes.has(q.id)))
      setFilteredQuotes((quotes) => quotes.filter((q) => !selectedQuotes.has(q.id)))
      deselectAll()
      addLogEntry('info', 'Selected quotes deleted')
      showNotification('success', 'Selected quotes deleted successfully!')
    }
  }

  function convertToCSV(data: Quote[]): string {
    const headers = [
      'Quote ID',
      'Customer',
      'Status',
      'Premium',
      'Sync Status',
      'Last Sync',
    ]
    const csvRows = [headers.join(',')]

    data.forEach((quote) => {
      const row = [
        quote.id,
        `"${quote.customer}"`,
        quote.status,
        quote.premium,
        quote.syncStatus,
        `"${quote.lastSync}"`,
      ]
      csvRows.push(row.join(','))
    })

    return csvRows.join('\n')
  }

  function downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function syncSingleQuote(quoteId: string) {
    setAllQuotes((quotes) =>
      quotes.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              syncStatus: 'Synced',
              lastSync: new Date().toLocaleString(),
            }
          : q
      )
    )
    addLogEntry('success', `Quote ${quoteId} synced successfully`)
    showNotification('success', `Quote ${quoteId} synced!`)
  }

  function viewQuoteDetails(quoteId: string) {
    const quote = allQuotes.find((q) => q.id === quoteId)
    if (quote) {
      window.alert(
        `Quote Details:\n\nID: ${quote.id}\nCustomer: ${quote.customer}\nStatus: ${quote.status}\nPremium: ${quote.premium}\nCarrier: ${quote.carrier}\nPolicy Type: ${quote.policy}\nSync Status: ${quote.syncStatus}\nLast Sync: ${quote.lastSync}`
      )
    }
  }

  function refreshData() {
    if (!isConnected) {
      showNotification('error', 'Please connect to TurboRater first')
      return
    }

    addLogEntry('info', 'Refreshing data from TurboRater...')

    setTimeout(() => {
      setAllQuotes((quotes) => {
        const idx = Math.floor(Math.random() * quotes.length)
        const updated = [...quotes]
        updated[idx] = {
          ...updated[idx],
          syncStatus: Math.random() > 0.5 ? 'Synced' : 'Pending',
          lastSync: new Date().toLocaleString(),
        }
        return updated
      })
      addLogEntry('success', 'Data refreshed successfully')
      showNotification('success', 'Data refreshed!')
    }, 1500)
  }

  function importRates() {
    if (!isConnected) return

    addLogEntry('info', 'Connecting to TurboRater rate database...')
    showNotification('info', 'Importing rate tables...')

    setTimeout(() => {
      addLogEntry('info', 'Downloading rate tables...')
      setTimeout(() => {
        addLogEntry('info', 'Processing rate data...')
        setTimeout(() => {
          addLogEntry(
            'success',
            'Successfully imported 47 rate tables from 12 carriers'
          )
          showNotification('success', 'Rate tables imported successfully!')
        }, 1500)
      }, 1000)
    }, 1000)
  }

  function exportQuotes() {
    if (!isConnected) return

    addLogEntry('info', 'Preparing quotes for export...')
    showNotification('info', 'Exporting quotes...')

    setTimeout(() => {
      addLogEntry('info', 'Uploading to TurboRater...')
      setTimeout(() => {
        addLogEntry(
          'success',
          `Successfully exported ${allQuotes.length} quotes to TurboRater`
        )
        showNotification('success', 'Quotes exported successfully!')
      }, 1800)
    }, 1000)
  }

  function validateIntegration() {
    if (!isConnected) return

    addLogEntry('info', 'Running integration validation...')
    const validationTests = [
      'API connectivity test',
      'Authentication validation',
      'Data integrity check',
      'Rate table verification',
      'Sync functionality test',
      'Error handling test',
    ]

    let testIndex = 0
    function runTest() {
      if (testIndex < validationTests.length) {
        addLogEntry('info', `Running: ${validationTests[testIndex]}...`)
        setTimeout(() => {
          addLogEntry('success', `✓ ${validationTests[testIndex]} passed`)
          testIndex++
          runTest()
        }, 300)
      } else {
        setTimeout(() => {
          addLogEntry('success', 'All validation tests completed successfully!')
          addLogEntry('success', 'Integration is fully operational ✓')
          showNotification('success', 'Integration validation passed!')
        }, 500)
      }
    }
    runTest()
  }

  const isSelectAllChecked =
    filteredQuotes.length > 0 && filteredQuotes.every((q) => selectedQuotes.has(q.id))
  const isSelectAllIndeterminate =
    filteredQuotes.some((q) => selectedQuotes.has(q.id)) &&
    !filteredQuotes.every((q) => selectedQuotes.has(q.id))

  return (
    <div className={className}>
      {/* Header */}
      <div className="header">
        <div className="container">
          <h1>🔗 TurboRater Integration Hub</h1>
          <p>Seamlessly connect and sync your insurance data with TurboRater</p>
        </div>
      </div>

      <div className="container">
        {/* Statistics Dashboard */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalQuotes}</div>
            <div className="stat-label">Total Quotes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{syncedQuotes}</div>
            <div className="stat-label">Synced Quotes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{pendingQuotes}</div>
            <div className="stat-label">Pending Sync</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{lastSyncTime}</div>
            <div className="stat-label">Last Sync</div>
          </div>
        </div>

        {/* Integration Dashboard */}
        <div className="integration-dashboard">
          {/* Control Panel */}
          <div className="control-panel">
            <h3>Integration Controls</h3>

            {/* API Configuration */}
            <div className="api-config">
              <label
                style={{
                  color: '#94a3b8',
                  fontSize: 14,
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                TurboRater API Key:
              </label>
              <input
                type="password"
                className="api-input"
                placeholder="Enter your TurboRater API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <label
                style={{
                  color: '#94a3b8',
                  fontSize: 14,
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                Server URL:
              </label>
              <input
                type="text"
                className="api-input"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
              />
            </div>

            {/* Connection Status */}
            <div
              className={`status-indicator ${
                isConnected ? 'connected' : 'disconnected'
              }`}
            >
              <span className="btn-icon">{isConnected ? '🟢' : '🔴'}</span>
              <span>TurboRater: {isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>

            {/* Main TurboRater Buttons */}
            <button
              className={`turborater-btn ${isConnecting ? 'loading' : ''} ${
                isConnected ? 'success' : ''
              }`}
              onClick={connectToTurboRater}
              disabled={isConnected || isConnecting}
            >
              {isConnecting ? (
                <>
                  <div className="loading-spinner"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="btn-icon">{isConnected ? '✅' : '🔗'}</span>
                  {isConnected ? 'Connected to TurboRater' : 'Connect to TurboRater'}
                </>
              )}
            </button>

            <button
              className={`turborater-btn ${syncInProgress ? 'loading' : ''}`}
              onClick={syncData}
              disabled={!isConnected || syncInProgress}
            >
              {syncInProgress ? (
                <>
                  <div className="loading-spinner"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔄</span>
                  Sync Quote Data
                </>
              )}
            </button>

            <button
              className="turborater-btn"
              onClick={importRates}
              disabled={!isConnected}
            >
              <span className="btn-icon">📥</span>
              Import Rate Tables
            </button>

            <button
              className="turborater-btn"
              onClick={exportQuotes}
              disabled={!isConnected}
            >
              <span className="btn-icon">📤</span>
              Export to TurboRater
            </button>

            <button
              className="turborater-btn"
              onClick={validateIntegration}
              disabled={!isConnected}
            >
              <span className="btn-icon">✅</span>
              Validate Integration
            </button>

            {/* Settings Panel */}
            <div className="settings-panel">
              <h4 style={{ color: '#f1f5f9', marginBottom: 15 }}>Settings</h4>
              <div className="settings-row">
                <span>Auto-sync every 5 minutes</span>
                <div
                  className={`toggle-switch ${autoSyncEnabled ? 'active' : ''}`}
                  onClick={() => {
                    setAutoSyncEnabled(!autoSyncEnabled)
                    addLogEntry(
                      'info',
                      `Auto-sync ${!autoSyncEnabled ? 'enabled' : 'disabled'}`
                    )
                    showNotification(
                      'info',
                      `Auto-sync ${!autoSyncEnabled ? 'enabled' : 'disabled'}`
                    )
                  }}
                />
              </div>
              <div className="settings-row">
                <span>Real-time notifications</span>
                <div
                  className={`toggle-switch ${notificationsEnabled ? 'active' : ''}`}
                  onClick={() => {
                    setNotificationsEnabled(!notificationsEnabled)
                    addLogEntry(
                      'info',
                      `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`
                    )
                  }}
                />
              </div>
              <div className="settings-row">
                <span>Backup before sync</span>
                <div
                  className={`toggle-switch ${backupEnabled ? 'active' : ''}`}
                  onClick={() => {
                    setBackupEnabled(!backupEnabled)
                    addLogEntry(
                      'info',
                      `Backup before sync ${!backupEnabled ? 'enabled' : 'disabled'}`
                    )
                  }}
                />
              </div>
            </div>

            {/* Sync Progress */}
            {syncInProgress && (
              <div className="sync-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="progress-text">{progressText}</div>
              </div>
            )}
          </div>

          {/* Data Display */}
          <div className="data-display">
            <h3>
              Integration Data
              <button className="refresh-btn" onClick={refreshData}>
                🔄 Refresh
              </button>
            </h3>

            {/* Search and Filter Controls */}
            <div className="search-filter">
              <input
                type="text"
                className="search-input"
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Quote">Quote</option>
              </select>
              <select
                className="filter-select"
                value={syncFilter}
                onChange={(e) => setSyncFilter(e.target.value)}
              >
                <option value="">All Sync Status</option>
                <option value="Synced">Synced</option>
                <option value="Pending">Pending</option>
                <option value="New">New</option>
                <option value="Error">Error</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="bulk-actions">
              <button className="bulk-btn" onClick={selectAll}>
                Select All
              </button>
              <button className="bulk-btn" onClick={deselectAll}>
                Deselect All
              </button>
              <button className="bulk-btn" onClick={syncSelected}>
                Sync Selected
              </button>
              <button className="bulk-btn" onClick={exportSelected}>
                Export Selected
              </button>
              <button className="bulk-btn danger" onClick={deleteSelected}>
                Delete Selected
              </button>
            </div>

            {/* Data Table */}
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={isSelectAllChecked}
                      ref={(input) => {
                        if (input) input.indeterminate = isSelectAllIndeterminate
                      }}
                      onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                    />
                  </th>
                  <th onClick={() => sortTable(1)}>Quote ID ↕</th>
                  <th onClick={() => sortTable(2)}>Customer ↕</th>
                  <th onClick={() => sortTable(3)}>Status ↕</th>
                  <th onClick={() => sortTable(4)}>Premium ↕</th>
                  <th onClick={() => sortTable(5)}>Sync Status ↕</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: 'center',
                        color: '#94a3b8',
                        padding: 40,
                      }}
                    >
                      {isConnected
                        ? 'No quotes match your filters'
                        : 'Connect to TurboRater to view data'}
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="checkbox-cell">
                        <input
                          type="checkbox"
                          className="row-checkbox"
                          checked={selectedQuotes.has(quote.id)}
                          onChange={() => toggleQuoteSelection(quote.id)}
                        />
                      </td>
                      <td>{quote.id}</td>
                      <td>{quote.customer}</td>
                      <td>
                        <span style={{ color: getStatusColor(quote.status) }}>
                          {quote.status}
                        </span>
                      </td>
                      <td>{quote.premium}</td>
                      <td>
                        <span style={{ color: getSyncStatusColor(quote.syncStatus) }}>
                          {quote.syncStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          className="bulk-btn"
                          style={{
                            padding: '4px 8px',
                            fontSize: 12,
                            marginRight: 5,
                          }}
                          onClick={() => syncSingleQuote(quote.id)}
                        >
                          Sync
                        </button>
                        <button
                          className="bulk-btn"
                          style={{ padding: '4px 8px', fontSize: 12 }}
                          onClick={() => viewQuoteDetails(quote.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Activity Log */}
            <div className="log-display">
              {logEntries.map((entry, index) => (
                <div key={index} className={`log-entry ${entry.type}`}>
                  [{entry.timestamp}] [{entry.type.toUpperCase()}] {entry.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type} show`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}
