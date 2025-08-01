import React, { useState } from 'react';
import { InsuranceType } from '../types/insurance';
import { useInsuranceScraper, useScraperConfigs } from '../hooks/useInsuranceScraper';
import CompetitiveAnalysis from './CompetitiveAnalysis';
import ScrapingResults from './ScrapingResults';
import './ScraperDashboard.css';

const ScraperDashboard: React.FC = () => {
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<InsuranceType>(InsuranceType.AUTO);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  
  const {
    isLoading,
    currentSession,
    results,
    analysis,
    error,
    startScraping,
    clearResults,
    exportData,
    successfulScrapesCount,
    totalQuotesFound
  } = useInsuranceScraper();

  const { configs } = useScraperConfigs();

  const handleStartScraping = async () => {
    await startScraping(selectedInsuranceType, selectedProviders.length > 0 ? selectedProviders : undefined);
  };

  const handleProviderToggle = (provider: string) => {
    setSelectedProviders(prev => 
      prev.includes(provider)
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const availableProviders = configs
    .filter(config => config.insuranceTypes.includes(selectedInsuranceType))
    .map(config => config.provider);

  return (
    <div className="scraper-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <i className="icon-competitive"></i>
            Competitive Analysis Engine
          </h1>
          <p className="dashboard-subtitle">
            Real-time insurance pricing intelligence to stay ahead of the competition
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{totalQuotesFound}</div>
            <div className="stat-label">Quotes Found</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{successfulScrapesCount}</div>
            <div className="stat-label">Providers Scraped</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{analysis?.averagePrice ? `$${analysis.averagePrice}` : '$0'}</div>
            <div className="stat-label">Avg Price</div>
          </div>
        </div>
      </div>

      <div className="scraping-controls">
        <div className="glass-card control-panel">
          <h3 className="section-title">
            <i className="icon-settings"></i>
            Scraping Configuration
          </h3>
          
          <div className="control-group">
            <label className="control-label">Insurance Type</label>
            <select
              value={selectedInsuranceType}
              onChange={(e) => setSelectedInsuranceType(e.target.value as InsuranceType)}
              className="control-select"
              disabled={isLoading}
            >
              <option value={InsuranceType.AUTO}>Auto Insurance</option>
              <option value={InsuranceType.HOME}>Home Insurance</option>
              <option value={InsuranceType.LIFE}>Life Insurance</option>
              <option value={InsuranceType.HEALTH}>Health Insurance</option>
              <option value={InsuranceType.BUSINESS}>Business Insurance</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Select Providers (Optional)</label>
            <div className="provider-grid">
              {availableProviders.map(provider => (
                <label key={provider} className="provider-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedProviders.includes(provider)}
                    onChange={() => handleProviderToggle(provider)}
                    disabled={isLoading}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="provider-name">{provider}</span>
                </label>
              ))}
            </div>
            {selectedProviders.length === 0 && (
              <p className="help-text">Leave empty to scrape all available providers</p>
            )}
          </div>

          <div className="control-actions">
            <button
              onClick={handleStartScraping}
              disabled={isLoading}
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Scraping...
                </>
              ) : (
                <>
                  <i className="icon-search"></i>
                  Start Competitive Analysis
                </>
              )}
            </button>
            
            {results.length > 0 && (
              <button
                onClick={clearResults}
                disabled={isLoading}
                className="btn btn-secondary"
              >
                <i className="icon-clear"></i>
                Clear Results
              </button>
            )}
          </div>
        </div>

        {currentSession && (
          <div className="glass-card session-info">
            <h3 className="section-title">
              <i className="icon-clock"></i>
              Current Session
            </h3>
            <div className="session-details">
              <div className="session-item">
                <span className="session-label">Type:</span>
                <span className="session-value">{currentSession.insuranceType}</span>
              </div>
              <div className="session-item">
                <span className="session-label">Started:</span>
                <span className="session-value">
                  {new Date(currentSession.startedAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="session-item">
                <span className="session-label">Status:</span>
                <span className={`session-status ${currentSession.status}`}>
                  {currentSession.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error-card">
          <i className="icon-error"></i>
          <div className="error-content">
            <h4>Scraping Error</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {analysis && <CompetitiveAnalysis analysis={analysis} />}

      {results.length > 0 && (
        <ScrapingResults 
          results={results} 
          onExport={exportData}
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-animation">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
            </div>
            <h3>Analyzing Competitive Pricing...</h3>
            <p>Gathering intelligence from insurance providers</p>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScraperDashboard;