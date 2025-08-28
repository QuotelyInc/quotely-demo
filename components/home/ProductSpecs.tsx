"use client";

interface SpecCategory {
  title: string;
  icon: string;
  specs: { label: string; value: string }[];
}

export function ProductSpecs() {
  const specifications: SpecCategory[] = [
    {
      title: "Performance",
      icon: "⚡",
      specs: [
        { label: "Quote Generation", value: "< 30 seconds" },
        { label: "API Response Time", value: "< 200ms" },
        { label: "Concurrent Users", value: "Unlimited" },
        { label: "Data Processing", value: "1M+ quotes/day" },
        { label: "Uptime SLA", value: "99.99%" },
      ],
    },
    {
      title: "Integration Capabilities",
      icon: "🔗",
      specs: [
        { label: "Carrier Connections", value: "50+ carriers" },
        { label: "API Standards", value: "REST & GraphQL" },
        { label: "Webhook Support", value: "Real-time events" },
        { label: "Data Formats", value: "JSON, XML, CSV" },
        { label: "Authentication", value: "OAuth 2.0, API Keys" },
      ],
    },
    {
      title: "Security & Compliance",
      icon: "🔒",
      specs: [
        { label: "Encryption", value: "AES-256 at rest" },
        { label: "Data Transit", value: "TLS 1.3" },
        { label: "Compliance", value: "SOC 2, HIPAA, GDPR" },
        { label: "Backup Frequency", value: "Real-time replication" },
        { label: "Access Control", value: "Role-based (RBAC)" },
      ],
    },
    {
      title: "Platform Features",
      icon: "🚀",
      specs: [
        { label: "Mobile App", value: "iOS & Android" },
        { label: "Offline Mode", value: "Full functionality" },
        { label: "Browser Support", value: "All modern browsers" },
        { label: "API Rate Limits", value: "10,000 req/hour" },
        { label: "Data Export", value: "Unlimited" },
      ],
    },
  ];

  return (
    <section className="bg-[#E4E4E4]">
      {/* Specifications Grid */}
      <div className="grid grid-cols-1 grid-rows-2 gap-4">
        {/* 1 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#29274C]">
              Technical Specifications
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-[#555E88]">
              Built for enterprise-scale operations with the reliability and
              performance modern insurance agencies demand.
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 ">
            {specifications.map((category, index) => (
              //  container
              <div
                key={index}
                className="bg-[#ffffff] border-[#555E88] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
              >
                {/* Category Header */}
                <div className="flex items-center mb-6 p-2">
                  {/* Icon */}
                  <span className="p-2 text-4xl mr-4">{category.icon}</span>
                  {/* Title */}
                  <h3 className="gap-2 text-2xl font-bold text-[#E4E4E4]">
                    {category.title}
                  </h3>
                </div>

                {/* Specifications List */}
                <div className="space-y-4 p-4 justify-between">
                  {category.specs.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex justify-between items-center  border-b last:border-0"
                    >
                      <span className="font-medium text-[#BEBEBE]">
                        {spec.label}
                      </span>
                      <span className="font-bold text-right text-[#F26D00]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features Banner */}
        <div className="max-w mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-br from-[#F26D00] to-[#555E88] p-6 md:p-8 rounded-2xl shadow-lg">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                24/7
              </div>
              <div className="text-white/80 font-medium text-sm md:text-base">
                Support Available
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                5 min
              </div>
              <div className="text-white/80 font-medium text-sm md:text-base">
                Average Setup Time
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                Zero
              </div>
              <div className="text-white/80 font-medium text-sm md:text-base">
                Setup & Training Fees
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
