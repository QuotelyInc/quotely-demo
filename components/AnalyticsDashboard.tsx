'use client';

import { useState, useEffect } from 'react';
import AccessReporter from '@/lib/analytics/access-reporter';

interface AccessData {
  userEmail: string;
  accessTime: Date;
  accessCount: number;
  accessMechanism?: string;
  userIP?: string;
}

export default function AnalyticsDashboard() {
  const [accessData, setAccessData] = useState<AccessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);
  const [viewType, setViewType] = useState<'recent' | 'mechanism' | 'frequency'>('recent');

  const reporter = new AccessReporter();

  useEffect(() => {
    loadAccessData();
  }, [timeRange, viewType]);

  const loadAccessData = async () => {
    setLoading(true);
    try {
      const propertyId = process.env.NEXT_PUBLIC_GA_PROPERTY_ID || '';
      let data: AccessData[] = [];

      switch (viewType) {
        case 'recent':
          data = await reporter.getMostRecentAccess(propertyId, timeRange);
          break;
        case 'mechanism':
          data = await reporter.getAccessByMechanism(propertyId, timeRange);
          break;
        case 'frequency':
          data = await reporter.getHighFrequencyUsers(propertyId, 100);
          break;
      }

      setAccessData(data);
    } catch (error) {
      console.error('Failed to load access data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h2>Analytics Access Report</h2>
        <div className="controls">
          <select 
            value={viewType} 
            onChange={(e) => setViewType(e.target.value as any)}
            className="view-selector"
          >
            <option value="recent">Most Recent Access</option>
            <option value="mechanism">Access by Mechanism</option>
            <option value="frequency">High Frequency Users</option>
          </select>
          
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="time-selector"
          >
            <option value={1}>Last 24 Hours</option>
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
          
          <button onClick={loadAccessData} className="refresh-btn">
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading access data...</p>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>User Email</th>
                <th>Last Access</th>
                <th>Access Count</th>
                {viewType === 'mechanism' && <th>Mechanism</th>}
                {viewType === 'recent' && <th>IP Address</th>}
              </tr>
            </thead>
            <tbody>
              {accessData.map((row, index) => (
                <tr key={index}>
                  <td>{row.userEmail}</td>
                  <td>{row.accessTime?.toLocaleString()}</td>
                  <td className="access-count">{row.accessCount}</td>
                  {viewType === 'mechanism' && <td>{row.accessMechanism}</td>}
                  {viewType === 'recent' && <td>{row.userIP || 'N/A'}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          
          {accessData.length === 0 && (
            <div className="no-data">
              No access data available for the selected time range.
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .analytics-dashboard {
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .dashboard-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .controls {
          display: flex;
          gap: 1rem;
        }

        .view-selector,
        .time-selector {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          font-size: 0.875rem;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .view-selector:hover,
        .time-selector:hover {
          border-color: #0057ff;
        }

        .refresh-btn {
          padding: 0.5rem 1.5rem;
          background: linear-gradient(135deg, #0057ff 0%, #003acc 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .refresh-btn:hover {
          transform: translateY(-1px);
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #0057ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .data-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #f9fafb;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #4b5563;
          border-bottom: 2px solid #e5e7eb;
        }

        td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          color: #1f2937;
        }

        tr:hover {
          background: #f9fafb;
        }

        .access-count {
          font-weight: 600;
          color: #0057ff;
        }

        .no-data {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}