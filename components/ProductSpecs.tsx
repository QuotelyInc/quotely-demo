'use client';

interface SpecCategory {
  title: string;
  icon: string;
  specs: { label: string; value: string }[];
}

export function ProductSpecs() {
  const specifications: SpecCategory[] = [
    {
      title: 'Performance',
      icon: '⚡',
      specs: [
        { label: 'Quote Generation', value: '< 30 seconds' },
        { label: 'API Response Time', value: '< 200ms' },
        { label: 'Concurrent Users', value: 'Unlimited' },
        { label: 'Data Processing', value: '1M+ quotes/day' },
        { label: 'Uptime SLA', value: '99.99%' }
      ]
    },
    {
      title: 'Integration Capabilities',
      icon: '🔗',
      specs: [
        { label: 'Carrier Connections', value: '50+ carriers' },
        { label: 'API Standards', value: 'REST & GraphQL' },
        { label: 'Webhook Support', value: 'Real-time events' },
        { label: 'Data Formats', value: 'JSON, XML, CSV' },
        { label: 'Authentication', value: 'OAuth 2.0, API Keys' }
      ]
    },
    {
      title: 'Security & Compliance',
      icon: '🔒',
      specs: [
        { label: 'Encryption', value: 'AES-256 at rest' },
        { label: 'Data Transit', value: 'TLS 1.3' },
        { label: 'Compliance', value: 'SOC 2, HIPAA, GDPR' },
        { label: 'Backup Frequency', value: 'Real-time replication' },
        { label: 'Access Control', value: 'Role-based (RBAC)' }
      ]
    },
    {
      title: 'Platform Features',
      icon: '🚀',
      specs: [
        { label: 'Mobile App', value: 'iOS & Android' },
        { label: 'Offline Mode', value: 'Full functionality' },
        { label: 'Browser Support', value: 'All modern browsers' },
        { label: 'API Rate Limits', value: '10,000 req/hour' },
        { label: 'Data Export', value: 'Unlimited' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for enterprise-scale operations with the reliability and performance 
            modern insurance agencies demand.
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specifications.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">{category.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h3>
              </div>

              {/* Specifications List */}
              <div className="space-y-4">
                {category.specs.map((spec, specIndex) => (
                  <div 
                    key={specIndex}
                    className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600 font-medium">
                      {spec.label}
                    </span>
                    <span className="text-gray-900 font-bold text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5 min</div>
              <div className="text-blue-100">Average Setup Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Zero</div>
              <div className="text-blue-100">Setup & Training Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}