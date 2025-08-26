'use client';

import { useState, useEffect } from 'react';
import { BotCategory } from '@/lib/bot-analytics';

interface BotAccessRecord {
  bot_name: string;
  category: BotCategory;
  user_agent: string;
  path: string;
  allowed: boolean;
  timestamp: string;
  ip_address?: string;
  country?: string;
}

interface BotStats {
  total_requests: number;
  unique_bots: number;
  blocked_requests: number;
  top_bots: Array<{ name: string; count: number }>;
  top_paths: Array<{ path: string; count: number }>;
  category_breakdown: Record<BotCategory, number>;
  recent_accesses: BotAccessRecord[];
}

export default function BotAnalyticsPage() {
  const [stats, setStats] = useState<BotStats | null>(null);
  const [timeRange, setTimeRange] = useState<'hour' | 'day' | 'week' | 'month'>('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBotStats();
  }, [timeRange]);

  const fetchBotStats = async () => {
    setLoading(true);
    try {
      // In production, this would fetch from your analytics API
      // For now, we'll use mock data
      const mockStats: BotStats = {
        total_requests: 1247,
        unique_bots: 12,
        blocked_requests: 89,
        top_bots: [
          { name: 'Googlebot', count: 523 },
          { name: 'Bingbot', count: 287 },
          { name: 'FacebookBot', count: 156 },
          { name: 'AhrefsBot', count: 89 },
          { name: 'TwitterBot', count: 67 },
        ],
        top_paths: [
          { path: '/robots.txt', count: 412 },
          { path: '/', count: 298 },
          { path: '/sitemap.xml', count: 187 },
          { path: '/pricing', count: 123 },
          { path: '/demo', count: 98 },
        ],
        category_breakdown: {
          [BotCategory.SEARCH_ENGINE]: 810,
          [BotCategory.SOCIAL_MEDIA]: 223,
          [BotCategory.SEO_TOOL]: 89,
          [BotCategory.MONITORING]: 45,
          [BotCategory.SCRAPER]: 12,
          [BotCategory.UNKNOWN]: 68,
        },
        recent_accesses: [
          {
            bot_name: 'Googlebot',
            category: BotCategory.SEARCH_ENGINE,
            user_agent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            path: '/pricing',
            allowed: true,
            timestamp: new Date().toISOString(),
            country: 'US',
          },
          {
            bot_name: 'AhrefsBot',
            category: BotCategory.SEO_TOOL,
            user_agent: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
            path: '/robots.txt',
            allowed: false,
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            country: 'SG',
          },
        ],
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch bot stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: BotCategory) => {
    switch (category) {
      case BotCategory.SEARCH_ENGINE:
        return 'text-green-600 bg-green-50';
      case BotCategory.SOCIAL_MEDIA:
        return 'text-blue-600 bg-blue-50';
      case BotCategory.SEO_TOOL:
        return 'text-yellow-600 bg-yellow-50';
      case BotCategory.MONITORING:
        return 'text-purple-600 bg-purple-50';
      case BotCategory.SCRAPER:
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading bot analytics...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Failed to load bot analytics</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bot Analytics Dashboard</h1>
        <p className="text-gray-600">Track and analyze bot/crawler access patterns</p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          {(['hour', 'day', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold">{stats.total_requests}</div>
          <div className="text-gray-600">Total Requests</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold">{stats.unique_bots}</div>
          <div className="text-gray-600">Unique Bots</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-red-600">{stats.blocked_requests}</div>
          <div className="text-gray-600">Blocked Requests</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {((1 - stats.blocked_requests / stats.total_requests) * 100).toFixed(1)}%
          </div>
          <div className="text-gray-600">Allow Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Bots */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Top Bots</h2>
          <div className="space-y-3">
            {stats.top_bots.map((bot) => (
              <div key={bot.name} className="flex justify-between items-center">
                <span className="font-medium">{bot.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(bot.count / stats.top_bots[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{bot.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Paths */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Top Accessed Paths</h2>
          <div className="space-y-3">
            {stats.top_paths.map((path) => (
              <div key={path.path} className="flex justify-between items-center">
                <span className="font-mono text-sm">{path.path}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(path.count / stats.top_paths[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{path.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Bot Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(stats.category_breakdown).map(([category, count]) => (
            <div key={category} className="text-center">
              <div className={`rounded-lg p-3 ${getCategoryColor(category as BotCategory)}`}>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm capitalize">{category.replace('_', ' ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Access Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Bot Access</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Bot</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Path</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Country</th>
                <th className="text-left py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_accesses.map((access, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium">{access.bot_name}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(access.category)}`}>
                      {access.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2 font-mono text-sm">{access.path}</td>
                  <td className="py-2">
                    {access.allowed ? (
                      <span className="text-green-600">✓ Allowed</span>
                    ) : (
                      <span className="text-red-600">✗ Blocked</span>
                    )}
                  </td>
                  <td className="py-2">{access.country || '-'}</td>
                  <td className="py-2 text-sm text-gray-600">
                    {new Date(access.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}