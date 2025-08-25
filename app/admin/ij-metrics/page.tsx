'use client'

import { useState, useEffect } from 'react'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/layout/Footer'
import { useOTTOTracking } from '@/components/OTTOProvider'

interface MetricData {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  unit?: string
}

interface ArticleMetric {
  title: string
  source: string
  relevanceScore: number
  engagement: number
  conversions: number
  bridges: string[]
  publishDate: string
}

interface CompetitorMention {
  competitor: string
  mentions: number
  sentiment: 'positive' | 'negative' | 'neutral'
  context: string[]
}

export default function IJMetricsDashboard() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [timeRange, setTimeRange] = useState('24h')
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [topArticles, setTopArticles] = useState<ArticleMetric[]>([])
  const [competitorMentions, setCompetitorMentions] = useState<CompetitorMention[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    trackPageView('admin_ij_metrics', {
      section: 'admin',
      feature: 'insurance_journal_integration'
    })
    loadMetrics()
  }, [trackPageView])

  const loadMetrics = () => {
    setIsLoading(true)
    
    // Simulated metrics data
    setMetrics([
      { label: 'Articles Syndicated', value: 147, change: 12, trend: 'up', unit: 'articles' },
      { label: 'Average Relevance Score', value: 82, change: 5, trend: 'up', unit: '%' },
      { label: 'Topic Bridges Created', value: 423, change: 34, trend: 'up', unit: 'bridges' },
      { label: 'Click-Through Rate', value: 3.8, change: 0.4, trend: 'up', unit: '%' },
      { label: 'Conversions from IJ', value: 28, change: 7, trend: 'up', unit: 'leads' },
      { label: 'SEO Impact Score', value: 94, change: 8, trend: 'up', unit: 'points' }
    ])

    setTopArticles([
      {
        title: 'AI Revolution in Insurance: What Agencies Need to Know',
        source: 'Insurance Journal',
        relevanceScore: 95,
        engagement: 324,
        conversions: 12,
        bridges: ['AI Transparency', 'Automation', 'Competitive Intelligence'],
        publishDate: new Date().toISOString()
      },
      {
        title: 'Customer Experience: The New Battleground',
        source: 'Insurance Journal',
        relevanceScore: 88,
        engagement: 256,
        conversions: 8,
        bridges: ['Customer Support', 'Mobile Technology'],
        publishDate: new Date(Date.now() - 86400000).toISOString()
      },
      {
        title: 'competitor platforms Announces New Features Amid Competition',
        source: 'Insurance Journal',
        relevanceScore: 92,
        engagement: 412,
        conversions: 15,
        bridges: ['Competitive Analysis', 'Performance'],
        publishDate: new Date(Date.now() - 172800000).toISOString()
      }
    ])

    setCompetitorMentions([
      { 
        competitor: 'competitor platforms', 
        mentions: 23, 
        sentiment: 'negative',
        context: ['performance issues', 'customer complaints', 'missing features']
      },
      { 
        competitor: 'Applied Epic', 
        mentions: 18, 
        sentiment: 'neutral',
        context: ['market share', 'legacy system', 'enterprise focus']
      },
      { 
        competitor: 'AMS360', 
        mentions: 15, 
        sentiment: 'negative',
        context: ['outdated interface', 'slow updates', 'integration problems']
      },
      { 
        competitor: 'HawkSoft', 
        mentions: 8, 
        sentiment: 'neutral',
        context: ['small agency focus', 'limited features']
      }
    ])

    setIsLoading(false)
  }

  const handleExport = () => {
    trackUserAction('export_metrics', {
      type: 'ij_metrics',
      timeRange
    })
    // Export functionality
    console.log('Exporting metrics...')
  }

  return (
    <div>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--background);
          color: var(--text-primary);
        }
        
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 100px 20px 40px;
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .dashboard-subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        
        .controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .time-selector {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
          font-size: 0.875rem;
        }
        
        .export-btn {
          padding: 0.5rem 1.5rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 70, 85, 0.3);
        }
        
        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .metric-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        
        .metric-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        
        .metric-unit {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }
        
        .metric-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }
        
        .metric-change.up {
          color: var(--success);
        }
        
        .metric-change.down {
          color: var(--error);
        }
        
        .metric-change.stable {
          color: var(--text-secondary);
        }
        
        /* Charts Section */
        .charts-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .chart-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        /* Articles Table */
        .articles-section {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 3rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .articles-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .articles-table th {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 2px solid var(--border);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .articles-table td {
          padding: 1rem 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        
        .article-title {
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .article-source {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .relevance-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .relevance-high {
          background: #dcfce7;
          color: #16a34a;
        }
        
        .relevance-medium {
          background: #fef3c7;
          color: #d97706;
        }
        
        .bridge-tag {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: var(--background);
          border-radius: 0.25rem;
          font-size: 0.75rem;
          margin-right: 0.25rem;
          margin-bottom: 0.25rem;
        }
        
        /* Competitor Analysis */
        .competitor-section {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .competitor-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .competitor-card {
          padding: 1.5rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .competitor-card:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .competitor-name {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .competitor-mentions {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        
        .sentiment-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        
        .sentiment-positive {
          background: #dcfce7;
          color: #16a34a;
        }
        
        .sentiment-negative {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .sentiment-neutral {
          background: #f3f4f6;
          color: #6b7280;
        }
        
        .context-list {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .loading {
          text-align: center;
          padding: 4rem;
          color: var(--text-secondary);
        }
        
        /* Engagement Chart Placeholder */
        .chart-placeholder {
          height: 300px;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .charts-section {
            grid-template-columns: 1fr;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <MinimalNav />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Insurance Journal Integration Metrics</h1>
            <p className="dashboard-subtitle">Track performance and impact of syndicated content</p>
          </div>
          <div className="controls">
            <select 
              className="time-selector" 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="export-btn" onClick={handleExport}>
              📊 Export Report
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="loading">Loading metrics...</div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-value">
                    {metric.value}
                    {metric.unit && <span className="metric-unit">{metric.unit}</span>}
                  </div>
                  <div className={`metric-change ${metric.trend}`}>
                    {metric.trend === 'up' && '↑'}
                    {metric.trend === 'down' && '↓'}
                    {metric.trend === 'stable' && '→'}
                    {Math.abs(metric.change)} {metric.unit || 'points'}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="charts-section">
              <div className="chart-card">
                <h3 className="chart-title">Engagement Over Time</h3>
                <div className="chart-placeholder">
                  📈 Engagement Chart
                </div>
              </div>
              <div className="chart-card">
                <h3 className="chart-title">Topic Distribution</h3>
                <div className="chart-placeholder">
                  🎯 Topic Breakdown
                </div>
              </div>
            </div>

            {/* Top Articles */}
            <div className="articles-section">
              <h2 className="section-title">Top Performing Articles</h2>
              <table className="articles-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Relevance</th>
                    <th>Engagement</th>
                    <th>Conversions</th>
                    <th>Topic Bridges</th>
                  </tr>
                </thead>
                <tbody>
                  {topArticles.map((article, index) => (
                    <tr key={index}>
                      <td>
                        <div className="article-title">{article.title}</div>
                        <div className="article-source">{article.source}</div>
                      </td>
                      <td>
                        <span className={`relevance-badge ${article.relevanceScore > 90 ? 'relevance-high' : 'relevance-medium'}`}>
                          {article.relevanceScore}%
                        </span>
                      </td>
                      <td>{article.engagement}</td>
                      <td>{article.conversions}</td>
                      <td>
                        {article.bridges.map((bridge, i) => (
                          <span key={i} className="bridge-tag">{bridge}</span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Competitor Analysis */}
            <div className="competitor-section">
              <h2 className="section-title">Competitor Mention Analysis</h2>
              <div className="competitor-grid">
                {competitorMentions.map((competitor, index) => (
                  <div key={index} className="competitor-card">
                    <div className="competitor-name">{competitor.competitor}</div>
                    <div className="competitor-mentions">{competitor.mentions}</div>
                    <span className={`sentiment-badge sentiment-${competitor.sentiment}`}>
                      {competitor.sentiment.toUpperCase()} SENTIMENT
                    </span>
                    <div className="context-list">
                      <strong>Context:</strong> {competitor.context.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}