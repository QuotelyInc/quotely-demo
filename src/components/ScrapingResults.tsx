import React, { useState } from 'react';
import { ScrapingResult, ScrapingStatus } from '../types/insurance';

interface ScrapingResultsProps {
  results: ScrapingResult[];
  onExport: (format: 'json' | 'csv' | 'excel') => void;
  isLoading: boolean;
}

const ScrapingResults: React.FC<ScrapingResultsProps> = ({ results, onExport, isLoading }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'provider' | 'coverage'>('price');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const allQuotes = results.flatMap(result => result.quotes);
  const filteredQuotes = selectedProvider === 'all' 
    ? allQuotes 
    : allQuotes.filter(quote => quote.provider === selectedProvider);

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.totalPrice - b.totalPrice;
      case 'provider':
        return a.provider.localeCompare(b.provider);
      case 'coverage':
        return b.coverageOptions.length - a.coverageOptions.length;
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: ScrapingStatus) => {
    switch (status) {
      case ScrapingStatus.SUCCESS: return '✅';
      case ScrapingStatus.ERROR: return '❌';
      case ScrapingStatus.LOADING: return '⏳';
      default: return '⭕';
    }
  };

  const getStatusColor = (status: ScrapingStatus) => {
    switch (status) {
      case ScrapingStatus.SUCCESS: return 'var(--success-color)';
      case ScrapingStatus.ERROR: return 'var(--error-color)';
      case ScrapingStatus.LOADING: return 'var(--warning-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="scraping-results">
      <div className="results-header">
        <div className="glass-card results-controls">
          <h2 className="section-title">
            <i className="icon-results"></i>
            Scraping Results
          </h2>
          
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label">Filter by Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="control-select"
              >
                <option value="all">All Providers</option>
                {results.map(result => (
                  <option key={result.provider} value={result.provider}>
                    {result.provider}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'provider' | 'coverage')}
                className="control-select"
              >
                <option value="price">Price (Low to High)</option>
                <option value="provider">Provider Name</option>
                <option value="coverage">Coverage Options</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">View Mode</label>
              <div className="view-toggle">
                <button
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <i className="icon-grid"></i>
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  <i className="icon-table"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="export-controls">
            <div className="export-buttons">
              <button
                onClick={() => onExport('json')}
                disabled={isLoading}
                className="btn btn-export"
              >
                <i className="icon-json"></i>
                Export JSON
              </button>
              <button
                onClick={() => onExport('csv')}
                disabled={isLoading}
                className="btn btn-export"
              >
                <i className="icon-csv"></i>
                Export CSV
              </button>
              <button
                onClick={() => onExport('excel')}
                disabled={isLoading}
                className="btn btn-export"
              >
                <i className="icon-excel"></i>
                Export Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="provider-status">
        <div className="glass-card status-grid">
          {results.map(result => (
            <div key={result.provider} className="status-item">
              <div className="status-provider">
                <span 
                  className="status-indicator"
                  style={{ color: getStatusColor(result.status) }}
                >
                  {getStatusIcon(result.status)}
                </span>
                <span className="provider-name">{result.provider}</span>
              </div>
              <div className="status-details">
                <span className="quote-count">{result.quotes.length} quotes</span>
                {result.error && (
                  <span className="error-message" title={result.error}>
                    Error occurred
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="quotes-grid">
          {sortedQuotes.map(quote => (
            <div key={quote.id} className="glass-card quote-card">
              <div className="quote-header">
                <div className="provider-info">
                  <h3 className="provider-name">{quote.provider}</h3>
                  <p className="plan-name">{quote.metadata?.planName || 'Standard Plan'}</p>
                </div>
                <div className="price-info">
                  <div className="total-price">${quote.totalPrice}</div>
                  <div className="billing-period">/{quote.billingPeriod}</div>
                </div>
              </div>

              <div className="quote-details">
                <div className="detail-row">
                  <span className="detail-label">Base Price:</span>
                  <span className="detail-value">${quote.basePrice}</span>
                </div>
                {quote.deductible && (
                  <div className="detail-row">
                    <span className="detail-label">Deductible:</span>
                    <span className="detail-value">${quote.deductible}</span>
                  </div>
                )}
                {quote.coverageLimit && (
                  <div className="detail-row">
                    <span className="detail-label">Coverage Limit:</span>
                    <span className="detail-value">${quote.coverageLimit.toLocaleString()}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Coverage Options:</span>
                  <span className="detail-value">{quote.coverageOptions.length} items</span>
                </div>
              </div>

              <div className="coverage-preview">
                <h4 className="coverage-title">Coverage Highlights</h4>
                <div className="coverage-list">
                  {quote.coverageOptions.slice(0, 3).map((option, index) => (
                    <div key={index} className="coverage-item">
                      <span className={`coverage-status ${option.included ? 'included' : 'optional'}`}>
                        {option.included ? '✓' : '○'}
                      </span>
                      <span className="coverage-name">{option.name}</span>
                    </div>
                  ))}
                  {quote.coverageOptions.length > 3 && (
                    <div className="coverage-more">
                      +{quote.coverageOptions.length - 3} more options
                    </div>
                  )}
                </div>
              </div>

              {quote.metadata?.rating && (
                <div className="quote-rating">
                  <span className="rating-label">Rating:</span>
                  <span className="rating-value">⭐ {quote.metadata.rating}/5.0</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card quotes-table">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Plan</th>
                  <th>Total Price</th>
                  <th>Base Price</th>
                  <th>Deductible</th>
                  <th>Coverage</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {sortedQuotes.map(quote => (
                  <tr key={quote.id}>
                    <td className="provider-cell">{quote.provider}</td>
                    <td className="plan-cell">{quote.metadata?.planName || 'Standard'}</td>
                    <td className="price-cell">
                      <strong>${quote.totalPrice}</strong>
                      <small>/{quote.billingPeriod}</small>
                    </td>
                    <td className="price-cell">${quote.basePrice}</td>
                    <td className="deductible-cell">
                      {quote.deductible ? `$${quote.deductible}` : 'N/A'}
                    </td>
                    <td className="coverage-cell">
                      <span className="coverage-count">
                        {quote.coverageOptions.length} options
                      </span>
                    </td>
                    <td className="rating-cell">
                      {quote.metadata?.rating ? `⭐ ${quote.metadata.rating}` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {sortedQuotes.length === 0 && (
        <div className="glass-card no-results">
          <div className="no-results-content">
            <i className="icon-empty"></i>
            <h3>No Results Found</h3>
            <p>Try adjusting your filters or run a new scraping session.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapingResults;