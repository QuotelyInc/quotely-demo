import React, { useState, useEffect } from 'react';
import Sparkline from './Sparkline';
import './KPIDashboard.css';

interface KPIMetric {
  id: string;
  name: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparklineData: number[];
  unit?: string;
  target?: number;
  status: 'good' | 'warning' | 'critical';
  icon: string;
}

interface KPIDashboardProps {
  quotesFound?: number;
  providersScraped?: number;
  avgPrice?: number;
  lastUpdateTime?: string;
}

const KPIDashboard: React.FC<KPIDashboardProps> = ({
  quotesFound = 0,
  providersScraped = 0,
  avgPrice = 0
}) => {
  const [metrics, setMetrics] = useState<KPIMetric[]>([]);
  const [isRealtime, setIsRealtime] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  // Generate initial metrics
  const generateMetrics = (): KPIMetric[] => {
    const baseMetrics: KPIMetric[] = [
      {
        id: 'quote-speed',
        name: 'Quote Generation Speed',
        value: '0.8',
        change: -15.2,
        trend: 'up',
        sparklineData: [1.2, 1.1, 0.9, 0.85, 0.8, 0.82, 0.8],
        unit: 's',
        target: 1.0,
        status: 'good',
        icon: '⚡'
      },
      {
        id: 'conversion-rate',
        name: 'Conversion Rate',
        value: '24.5',
        change: 3.2,
        trend: 'up',
        sparklineData: [21.3, 22.1, 23.0, 22.8, 23.5, 24.1, 24.5],
        unit: '%',
        target: 25.0,
        status: 'good',
        icon: '📈'
      },
      {
        id: 'active-quotes',
        name: 'Active Quotes',
        value: quotesFound || '1,247',
        change: 12.4,
        trend: 'up',
        sparklineData: [1050, 1100, 1120, 1180, 1200, 1230, 1247],
        target: 1500,
        status: 'good',
        icon: '📋'
      },
      {
        id: 'api-latency',
        name: 'API Response Time',
        value: '142',
        change: -8.3,
        trend: 'up',
        sparklineData: [180, 170, 160, 155, 150, 145, 142],
        unit: 'ms',
        target: 150,
        status: 'good',
        icon: '🚀'
      },
      {
        id: 'accuracy-rate',
        name: 'QUAD AI Accuracy',
        value: '96.3',
        change: 1.1,
        trend: 'up',
        sparklineData: [94.5, 95.0, 95.2, 95.8, 96.0, 96.2, 96.3],
        unit: '%',
        target: 95.0,
        status: 'good',
        icon: '🎯'
      },
      {
        id: 'customer-savings',
        name: 'Avg Customer Savings',
        value: avgPrice ? `$${Math.round(avgPrice * 0.15)}` : '$287',
        change: 18.5,
        trend: 'up',
        sparklineData: [220, 235, 250, 265, 270, 280, 287],
        unit: '/mo',
        status: 'good',
        icon: '💰'
      }
    ];

    return baseMetrics;
  };

  useEffect(() => {
    setMetrics(generateMetrics());

    if (isRealtime) {
      const interval = setInterval(() => {
        setMetrics(prevMetrics => 
          prevMetrics.map(metric => {
            // Simulate real-time updates
            const change = (Math.random() - 0.5) * 2;
            const lastValue = metric.sparklineData[metric.sparklineData.length - 1];
            const newValue = Math.max(0, lastValue + (lastValue * change * 0.01));
            
            const newSparklineData = [...metric.sparklineData.slice(1), newValue];
            const percentChange = ((newValue - metric.sparklineData[0]) / metric.sparklineData[0]) * 100;
            
            return {
              ...metric,
              value: metric.unit === '%' ? newValue.toFixed(1) : 
                     metric.id === 'active-quotes' ? Math.floor(newValue).toLocaleString() :
                     metric.id === 'customer-savings' ? `$${Math.floor(newValue)}` :
                     newValue.toFixed(metric.unit === 's' ? 1 : 0),
              change: percentChange,
              trend: percentChange > 0 ? 'up' : percentChange < 0 ? 'down' : 'neutral',
              sparklineData: newSparklineData,
              status: metric.target ? 
                (metric.id === 'api-latency' ? 
                  (newValue <= metric.target ? 'good' : newValue <= metric.target * 1.2 ? 'warning' : 'critical') :
                  (newValue >= metric.target * 0.9 ? 'good' : newValue >= metric.target * 0.7 ? 'warning' : 'critical')
                ) : 'good'
            };
          })
        );
        setLastUpdate(new Date());
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRealtime, quotesFound, avgPrice]);

  const getStatusColor = (status: KPIMetric['status']) => {
    switch (status) {
      case 'good': return 'var(--success-color)';
      case 'warning': return 'var(--warning-color)';
      case 'critical': return 'var(--error-color)';
    }
  };

  const formatValue = (metric: KPIMetric) => {
    return `${metric.value}${metric.unit || ''}`;
  };

  return (
    <div className="kpi-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Performance Dashboard</h2>
          <p className="dashboard-subtitle">Real-time system metrics powered by QUAD AI</p>
        </div>
        <div className="dashboard-controls">
          <div className="time-range-selector">
            {(['day', 'week', 'month'] as const).map(range => (
              <button
                key={range}
                className={`range-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <button 
            className={`realtime-toggle ${isRealtime ? 'active' : ''}`}
            onClick={() => setIsRealtime(!isRealtime)}
          >
            <span className="status-dot"></span>
            {isRealtime ? 'Live' : 'Paused'}
          </button>
          <div className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map(metric => (
          <div key={metric.id} className="metric-card">
            <div className="metric-header">
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-info">
                <h3 className="metric-name">{metric.name}</h3>
                <div className={`metric-change ${metric.trend}`}>
                  <span className="change-icon">
                    {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                  </span>
                  <span className="change-value">
                    {Math.abs(metric.change).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div 
                className="metric-status"
                style={{ backgroundColor: getStatusColor(metric.status) }}
              />
            </div>
            
            <div className="metric-content">
              <div className="metric-value">{formatValue(metric)}</div>
              
              <div className="metric-sparkline">
                <Sparkline 
                  data={metric.sparklineData}
                  width={200}
                  height={50}
                  showArea
                  trend={metric.trend}
                />
              </div>
            </div>
            
            {metric.target && (
              <div className="metric-target">
                <div className="target-info">
                  <span className="target-label">Target</span>
                  <span className="target-value">{metric.target}{metric.unit || ''}</span>
                </div>
                <div className="target-progress">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${Math.min(100, (parseFloat(metric.value.toString().replace(/[^0-9.-]/g, '')) / metric.target) * 100)}%`,
                      backgroundColor: getStatusColor(metric.status)
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="dashboard-footer">
        <div className="performance-summary">
          <div className="summary-item">
            <span className="summary-icon">🏆</span>
            <span className="summary-label">Overall Performance</span>
            <span className="summary-value good">Excellent</span>
          </div>
          <div className="summary-item">
            <span className="summary-icon">📊</span>
            <span className="summary-label">Quotes Analyzed</span>
            <span className="summary-value">{quotesFound || '1,247'} today</span>
          </div>
          <div className="summary-item">
            <span className="summary-icon">💪</span>
            <span className="summary-label">Competitors Outperformed</span>
            <span className="summary-value">{providersScraped || 12} providers</span>
          </div>
          <div className="summary-item">
            <span className="summary-icon">✅</span>
            <span className="summary-label">System Uptime</span>
            <span className="summary-value">99.98%</span>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="action-btn primary">
            <span>📥</span> Export Report
          </button>
          <button className="action-btn">
            <span>🔔</span> Configure Alerts
          </button>
          <button className="action-btn">
            <span>⚙️</span> Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;