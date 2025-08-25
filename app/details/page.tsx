import ComparisonSection from '@/components/ComparisonSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import TrustSection from '@/components/TrustSection'
import StatisticsSection from '@/components/StatisticsSection'
import AITransparencyDashboard from '@/components/AITransparencyDashboard'
import Footer from '@/components/Footer'
import MinimalNav from '@/components/MinimalNav'

export const metadata = {
  title: 'Detailed Platform Comparison - Quotely vs EZLynx & Applied',
  description: 'In-depth comparison of Quotely against legacy insurance platforms. See detailed metrics, testimonials, and platform capabilities.',
}

export default function DetailsPage() {
  return (
    <div style={{ background: '#090A0C', minHeight: '100vh' }}>
      <MinimalNav />
      
      <div style={{ paddingTop: '80px' }}>
        {/* Page Header */}
        <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            Platform Deep Dive
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#9CA3AF',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Detailed comparisons, metrics, and testimonials
          </p>
        </section>

        {/* Statistics Section */}
        <StatisticsSection />
        
        {/* Comparison Section */}
        <ComparisonSection />
        
        {/* AI Transparency Dashboard */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Real-Time AI Intelligence
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Full transparency into our neural networks processing 10,000+ decisions per second
              </p>
            </div>
            <AITransparencyDashboard />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Trust Section */}
        <TrustSection />
      </div>
      
      <Footer />
    </div>
  )
}