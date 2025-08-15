'use client';

import { useEffect, useState } from 'react';
import { requirementTracker, type Requirement } from '../lib/RequirementTracker';
import { 
  initializeQuotelyRequirements, 
  checkRequirementStatus,
  getUrgentRequirements,
  markRequirementCompleted 
} from '../lib/QuotelyRequirements';

export default function RequirementDashboard() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [report, setReport] = useState<any>(null);
  const [urgentItems, setUrgentItems] = useState<Requirement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    // Initialize requirements
    initializeQuotelyRequirements();
    requirementTracker.loadRequirements();
    
    // Load data
    updateDashboard();
    
    // Set up auto-refresh
    const interval = setInterval(updateDashboard, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const updateDashboard = () => {
    const allReqs = Array.from((requirementTracker as any).requirements.values());
    setRequirements(allReqs);
    setReport(requirementTracker.generateReport());
    setUrgentItems(getUrgentRequirements());
  };

  const handleMarkComplete = (requirementId: string) => {
    markRequirementCompleted(requirementId);
    updateDashboard();
  };

  const handleUpdateStatus = (requirementId: string, status: Requirement['status']) => {
    requirementTracker.updateStatus(requirementId, status);
    updateDashboard();
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
      BLOCKED: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      CRITICAL: 'bg-red-600 text-white',
      HIGH: 'bg-orange-500 text-white',
      MEDIUM: 'bg-yellow-500 text-white',
      LOW: 'bg-gray-400 text-white'
    };
    return colors[priority] || 'bg-gray-400 text-white';
  };

  const filteredRequirements = selectedCategory === 'ALL' 
    ? requirements 
    : requirements.filter(r => r.category === selectedCategory);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading requirements...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quotely Requirements Tracker
        </h1>
        <p className="text-gray-600">
          Real-time tracking of all platform requirements and implementation status
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">{report.total}</div>
          <div className="text-sm text-gray-600">Total Requirements</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {report.completionRate.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-orange-600">
            {report.byStatus?.IN_PROGRESS || 0}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-red-600">
            {report.criticalPending?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Critical Pending</div>
        </div>
      </div>

      {/* Urgent Requirements Alert */}
      {urgentItems.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {urgentItems.length} Urgent Requirements Need Attention
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside">
                  {urgentItems.slice(0, 3).map(item => (
                    <li key={item.id}>
                      {item.id}: {item.description}
                      {item.deadline && (
                        <span className="ml-2 text-xs">
                          (Due: {new Date(item.deadline).toLocaleDateString()})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Categories</option>
            <option value="SEO">SEO</option>
            <option value="CONVERSION">Conversion</option>
            <option value="PERFORMANCE">Performance</option>
            <option value="SECURITY">Security</option>
            <option value="COMPETITIVE">Competitive</option>
            <option value="USER_EXPERIENCE">User Experience</option>
            <option value="INFRASTRUCTURE">Infrastructure</option>
            <option value="COMPLIANCE">Compliance</option>
          </select>
        </div>
      </div>

      {/* Requirements Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequirements.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {req.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <div>{req.description}</div>
                    {req.businessImpact && (
                      <div className="text-xs text-gray-500 mt-1">
                        Impact: {req.businessImpact}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {req.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {req.deadline ? new Date(req.deadline).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    {req.status === 'PENDING' && (
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'IN_PROGRESS')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Start
                      </button>
                    )}
                    {req.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleMarkComplete(req.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Complete
                      </button>
                    )}
                    {(req.status === 'PENDING' || req.status === 'IN_PROGRESS') && (
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'BLOCKED')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Block
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Progress by Category */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Progress by Category</h2>
        <div className="space-y-3">
          {Object.entries(report.byCategory || {}).map(([category, count]) => {
            const categoryReqs = requirements.filter(r => r.category === category);
            const completed = categoryReqs.filter(r => r.status === 'COMPLETED').length;
            const percentage = categoryReqs.length > 0 ? (completed / categoryReqs.length) * 100 : 0;
            
            return (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{category}</span>
                  <span className="text-gray-600">
                    {completed} / {count as number} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}