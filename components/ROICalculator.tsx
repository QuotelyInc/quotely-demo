'use client';

export default function ROICalculator() {
  const handleContactClick = () => {
    // Could redirect to contact page or open contact modal
    window.location.href = 'mailto:sales@quotely.com?subject=ROI Analysis Request';
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to See Your ROI?
        </h2>
        
        <p className="text-xl text-gray-600 mb-6">
          Get a personalized ROI analysis tailored to your agency's specific needs
        </p>
        
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-500 mb-8">
          <h3 className="font-semibold text-lg mb-4 text-blue-800">
            Why Choose Quotely?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">60% faster quote generation</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Transparent pricing structure</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">AI-powered insights</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Competitive advantage</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">
            Get Your Custom Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Our team will analyze your current setup and show you exactly how much 
            time and money you can save by switching to Quotely.
          </p>
          <ul className="text-sm text-gray-600 text-left max-w-md mx-auto">
            <li className="mb-2">✓ Personalized cost comparison</li>
            <li className="mb-2">✓ Time savings analysis</li>
            <li className="mb-2">✓ Custom implementation plan</li>
            <li className="mb-2">✓ No obligation consultation</li>
          </ul>
        </div>

        <button 
          onClick={handleContactClick}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
        >
          Contact for Custom ROI Analysis
        </button>
        
        <p className="text-sm text-gray-600 mt-4">
          Schedule a 15-minute consultation to see your potential savings
        </p>
      </div>
    </div>
  );
}