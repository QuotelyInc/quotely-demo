import React from 'react';
import { CompetitiveAnalysis as AnalysisType } from '../types/insurance';

interface CompetitiveAnalysisProps {
  analysis: AnalysisType;
}

const CompetitiveAnalysis: React.FC<CompetitiveAnalysisProps> = ({ analysis }) => {
  const getMarketPositionColor = (position: string) => {
    switch (position) {
      case 'budget': return 'var(--success-color)';
      case 'premium': return 'var(--warning-color)';
      default: return 'var(--primary-color)';
    }
  };

  const getMarketPositionIcon = (position: string) => {
    switch (position) {
      case 'budget': return '💰';
      case 'premium': return '⭐';
      default: return '🎯';
    }
  };

  return (
    <div className="competitive-analysis">
      <div className="glass-card analysis-header">
        <h2 className="section-title">
          <i className="icon-analytics"></i>
          Competitive Analysis Results
        </h2>
        <p className="analysis-summary">
          Market intelligence based on {analysis.totalQuotes} quotes from competing providers
        </p>
      </div>

      <div className="analysis-grid">
        <div className="glass-card metric-card primary">
          <div className="metric-icon">
            <i className="icon-dollar"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">${analysis.averagePrice}</div>
            <div className="metric-label">Market Average</div>
            <div className="metric-insight">
              Industry benchmark pricing
            </div>
          </div>
        </div>

        <div className="glass-card metric-card success">
          <div className="metric-icon">
            <i className="icon-trending-down"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">${analysis.lowestPrice.price}</div>
            <div className="metric-label">Lowest Price</div>
            <div className="metric-insight">
              {analysis.lowestPrice.provider} leads on price
            </div>
          </div>
        </div>

        <div className="glass-card metric-card warning">
          <div className="metric-icon">
            <i className="icon-trending-up"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">${analysis.highestPrice.price}</div>
            <div className="metric-label">Highest Price</div>
            <div className="metric-insight">
              {analysis.highestPrice.provider} premium positioning
            </div>
          </div>
        </div>

        <div className="glass-card metric-card info">
          <div className="metric-icon">
            <i className="icon-range"></i>
          </div>
          <div className="metric-content">
            <div className="metric-value">${analysis.priceRange}</div>
            <div className="metric-label">Price Range</div>
            <div className="metric-insight">
              Market price variation
            </div>
          </div>
        </div>
      </div>

      <div className="analysis-insights">
        <div className="glass-card market-position">
          <h3 className="insight-title">
            {getMarketPositionIcon(analysis.marketPosition)}
            Market Position Analysis
          </h3>
          <div className="position-indicator">
            <div 
              className="position-badge"
              style={{ backgroundColor: getMarketPositionColor(analysis.marketPosition) }}
            >
              {analysis.marketPosition.toUpperCase()}
            </div>
          </div>
          <p className="position-description">
            {analysis.marketPosition === 'budget' && 
              'You\'re positioned as a cost-effective option in the market. Consider highlighting value propositions.'}
            {analysis.marketPosition === 'premium' && 
              'You\'re positioned in the premium segment. Emphasize superior coverage and service quality.'}
            {analysis.marketPosition === 'competitive' && 
              'You\'re competitively positioned in the middle market. Focus on unique differentiators.'}
          </p>
        </div>

        {analysis.savings && (
          <div className="glass-card savings-opportunity">
            <h3 className="insight-title">
              💡 Pricing Opportunity
            </h3>
            <div className="savings-highlight">
              <div className="savings-amount">${analysis.savings}</div>
              <div className="savings-label">Potential Customer Savings</div>
            </div>
            <p className="savings-description">
              Customers could save an average of ${analysis.savings} by choosing the lowest-priced option. 
              Consider how your value proposition justifies any price premium.
            </p>
          </div>
        )}

        <div className="glass-card recommendations">
          <h3 className="insight-title">
            🎯 Strategic Recommendations
          </h3>
          <div className="recommendation-list">
            <div className="recommendation-item">
              <i className="icon-check"></i>
              <div>
                <strong>Price Competitiveness:</strong> 
                {analysis.averagePrice > analysis.lowestPrice.price 
                  ? ' Consider adjusting pricing to improve market position'
                  : ' Your pricing is competitive in the current market'
                }
              </div>
            </div>
            <div className="recommendation-item">
              <i className="icon-check"></i>
              <div>
                <strong>Market Coverage:</strong> 
                Analyzed {analysis.totalQuotes} quotes to ensure comprehensive competitive intelligence
              </div>
            </div>
            <div className="recommendation-item">
              <i className="icon-check"></i>
              <div>
                <strong>Differentiation:</strong> 
                Focus on unique value propositions beyond price to stand out from competitors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;