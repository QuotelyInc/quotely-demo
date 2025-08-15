export default function CompetitorComparisonTable() {
  const competitors = [
    {
      name: 'Quotely',
      logo: 'Q',
      pricing: {
        5: '$679',
        10: '$679',
        20: '$979',
        50: '$1,529'
      },
      features: {
        setupFee: '$1,500',
        quoteTime: '1.8 min',
        aiPowered: true,
        stateExclusivity: true,
        perAgentFees: false,
        mobileScore: 98,
        support: '24/7',
        dataSync: 'Real-time'
      },
      highlighted: true
    },
    {
      name: 'EZLynx',
      logo: 'E',
      pricing: {
        5: '$644',
        10: '$1,089',
        20: '$1,979',
        50: '$4,649'
      },
      features: {
        setupFee: '$2,500',
        quoteTime: '4.2 min',
        aiPowered: false,
        stateExclusivity: false,
        perAgentFees: true,
        mobileScore: 72,
        support: 'Business hours',
        dataSync: '15 min delay'
      }
    },
    {
      name: 'Applied Systems',
      logo: 'A',
      pricing: {
        5: '$725',
        10: '$1,200',
        20: '$2,150',
        50: '$5,000'
      },
      features: {
        setupFee: '$3,000',
        quoteTime: '3.8 min',
        aiPowered: false,
        stateExclusivity: false,
        perAgentFees: true,
        mobileScore: 68,
        support: 'Business hours',
        dataSync: 'Hourly'
      }
    },
    {
      name: 'Vertafore',
      logo: 'V',
      pricing: {
        5: '$825',
        10: '$1,375',
        20: '$2,475',
        50: '$5,775'
      },
      features: {
        setupFee: '$3,500',
        quoteTime: '4.5 min',
        aiPowered: false,
        stateExclusivity: false,
        perAgentFees: true,
        mobileScore: 65,
        support: 'Business hours',
        dataSync: 'Daily batch'
      }
    }
  ];

  const agentCounts = [5, 10, 20, 50];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold">Transparent Pricing Comparison</h2>
        <p className="mt-2 text-blue-100">See exactly how much you'll save with Quotely</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              {agentCounts.map(count => (
                <th key={count} className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {count} Agents
                </th>
              ))}
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Setup Fee
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quote Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {competitors.map((company) => (
              <tr 
                key={company.name}
                className={company.highlighted ? 'bg-blue-50' : 'hover:bg-gray-50'}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white mr-3 ${
                      company.highlighted ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gray-400'
                    }`}>
                      {company.logo}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {company.name}
                        {company.highlighted && (
                          <span className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded-full">
                            BEST VALUE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                {agentCounts.map(count => {
                  const companyPrice = parseInt(company.pricing[count as keyof typeof company.pricing].replace(/[^0-9]/g, ''));
                  const ezlynxPrice = parseInt(competitors[1].pricing[count as keyof typeof competitors[1].pricing].replace(/[^0-9]/g, ''));
                  const savings = ezlynxPrice - companyPrice;
                  
                  return (
                    <td key={count} className="px-6 py-4 text-center">
                      <div className={`text-lg font-semibold ${
                        company.highlighted ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {company.pricing[count as keyof typeof company.pricing]}
                      </div>
                      {company.highlighted && company.name === 'Quotely' && savings > 0 && (
                        <div className="text-xs text-green-600 mt-1">
                          Save ${savings}
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="px-6 py-4 text-center">
                  <span className={`font-medium ${
                    company.highlighted ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {company.features.setupFee}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.features.quoteTime === '1.8 min' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {company.features.quoteTime}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Features Comparison */}
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Comparison</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {competitors.map(company => (
            <div key={company.name} className={`p-4 rounded-lg ${
              company.highlighted ? 'bg-white border-2 border-blue-500' : 'bg-white border border-gray-200'
            }`}>
              <h4 className="font-semibold text-sm mb-3">{company.name}</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  {company.features.aiPowered ? (
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center">
                  {!company.features.perAgentFees ? (
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>No Agent Fees</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-1">Mobile:</span>
                  <span className={company.features.mobileScore >= 90 ? 'text-green-600 font-semibold' : ''}>
                    {company.features.mobileScore}/100
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-1">Support:</span>
                  <span className="text-gray-900">{company.features.support}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center">
        <p className="text-lg font-semibold mb-4">
          Save up to $4,246/month compared to competitors
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Calculate Your Exact Savings
        </button>
      </div>
    </div>
  );
}