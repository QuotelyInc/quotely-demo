'use client';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    standard: string | boolean;
    premium: string | boolean;
    enterprise: string | boolean;
  }[];
}

export function FeatureComparison() {
  const comparisonData: ComparisonFeature[] = [
    {
      category: 'Core Features',
      features: [
        { name: 'Quote Generation Speed', standard: '60 seconds', premium: '30 seconds', enterprise: '< 15 seconds' },
        { name: 'Carrier Integrations', standard: '10 carriers', premium: '25 carriers', enterprise: '50+ carriers' },
        { name: 'Monthly Quote Volume', standard: '500 quotes', premium: '5,000 quotes', enterprise: 'Unlimited' },
        { name: 'API Access', standard: false, premium: true, enterprise: true },
        { name: 'Mobile App Access', standard: true, premium: true, enterprise: true }
      ]
    },
    {
      category: 'Advanced Capabilities',
      features: [
        { name: 'AI-Powered Recommendations', standard: false, premium: true, enterprise: true },
        { name: 'Custom Workflows', standard: false, premium: '5 workflows', enterprise: 'Unlimited' },
        { name: 'White Label Options', standard: false, premium: false, enterprise: true },
        { name: 'Bulk Processing', standard: false, premium: '100/batch', enterprise: 'Unlimited' },
        { name: 'Advanced Analytics', standard: 'Basic', premium: 'Enhanced', enterprise: 'Full Suite' }
      ]
    },
    {
      category: 'Support & Training',
      features: [
        { name: 'Support Response Time', standard: '48 hours', premium: '4 hours', enterprise: '< 1 hour' },
        { name: 'Dedicated Account Manager', standard: false, premium: false, enterprise: true },
        { name: 'Training Sessions', standard: 'Self-service', premium: '5 hours/month', enterprise: 'Unlimited' },
        { name: 'Priority Updates', standard: false, premium: true, enterprise: true },
        { name: 'Custom Integrations', standard: false, premium: '$$$', enterprise: 'Included' }
      ]
    }
  ];

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }
    return <span className="text-gray-900 font-medium">{value}</span>;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. Every plan includes core features 
            to revolutionize your insurance operations.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Features</th>
                <th className="text-center py-4 px-6">
                  <div className="font-bold text-lg text-gray-900">Standard</div>
                  <div className="text-sm text-gray-600 mt-1">$299/month</div>
                </th>
                <th className="text-center py-4 px-6 bg-blue-50">
                  <div className="font-bold text-lg text-blue-600">Premium</div>
                  <div className="text-sm text-blue-600 mt-1">$599/month</div>
                  <div className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    MOST POPULAR
                  </div>
                </th>
                <th className="text-center py-4 px-6">
                  <div className="font-bold text-lg text-gray-900">Enterprise</div>
                  <div className="text-sm text-gray-600 mt-1">Custom Pricing</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category, categoryIndex) => (
                <>
                  <tr key={`category-${categoryIndex}`} className="bg-gray-50">
                    <td colSpan={4} className="py-3 px-6 font-bold text-gray-800">
                      {category.category}
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-700">
                        {feature.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderValue(feature.standard)}
                      </td>
                      <td className="py-4 px-6 text-center bg-blue-50/50">
                        {renderValue(feature.premium)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderValue(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/pricing"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              View Full Pricing Details
            </a>
            <a 
              href="/demo"
              className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}