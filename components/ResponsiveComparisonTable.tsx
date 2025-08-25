'use client';

interface ComparisonRow {
  feature: string;
  appliedRater: string | boolean;
  ezlynx: string | boolean;
  quotely: string | boolean;
}

interface ResponsiveComparisonTableProps {
  title: string;
  data: ComparisonRow[];
}

export function ResponsiveComparisonTable({ title, data }: ResponsiveComparisonTableProps) {
  const renderCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-green-600 font-semibold">✓</span>
      ) : (
        <span className="text-red-600 font-semibold">✗</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          {title}
        </h2>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Feature</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Applied Rater</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">EZLynx</th>
                <th className="text-center py-4 px-6 font-semibold text-blue-600">Quotely</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{row.feature}</td>
                  <td className="py-4 px-6 text-center">{renderCell(row.appliedRater)}</td>
                  <td className="py-4 px-6 text-center">{renderCell(row.ezlynx)}</td>
                  <td className="py-4 px-6 text-center bg-blue-50">{renderCell(row.quotely)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {data.map((row, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">{row.feature}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Applied Rater:</span>
                  <span className="font-medium">{renderCell(row.appliedRater)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">EZLynx:</span>
                  <span className="font-medium">{renderCell(row.ezlynx)}</span>
                </div>
                <div className="flex justify-between items-center bg-blue-50 -mx-4 px-4 py-2 rounded">
                  <span className="text-blue-600 font-medium">Quotely:</span>
                  <span className="font-medium">{renderCell(row.quotely)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}