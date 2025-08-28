interface QuoteCardProps {
  name: string
  company: string
  initials: string
  bgColor: string
  quoteType?: string
  amount?: string
  description?: string
  comparison?: string
}

export default function QuoteCard({ 
  name, 
  company, 
  initials, 
  bgColor, 
  quoteType, 
  amount, 
  description, 
  comparison 
}: QuoteCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
        <div 
          className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}
        >
          {initials}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{company}</p>
        </div>
      </div>

      {quoteType && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-700 font-medium">{quoteType}</span>
            {amount && <span className="font-bold text-lg text-gray-900">{amount}</span>}
          </div>
          {description && (
            <p className="text-sm text-gray-600 mb-2">{description}</p>
          )}
          {comparison && (
            <p className="text-sm text-green-600 font-medium">{comparison}</p>
          )}
        </div>
      )}
    </div>
  )
}