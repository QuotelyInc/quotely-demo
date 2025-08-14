'use client'

import { useEffect } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

function BlogPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()

  useEffect(() => {
    trackPageView('blog', {
      section: 'blog',
      content_type: 'article_listing'
    })
  }, [trackPageView])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackUserAction('newsletter_subscribed', {
      source: 'blog_page'
    })
    alert('Thank you for subscribing! You will receive our latest insights soon.')
  }

  const handleCategoryClick = (category: string) => {
    trackUserAction('category_filtered', {
      category: category,
      location: 'blog_categories'
    })
  }

  return (
    <div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f8fafc;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #4f46e5;
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .nav-links a:hover,
        .nav-links a.active {
          color: #4f46e5;
        }
        
        .nav-buttons {
          display: flex;
          gap: 1rem;
        }
        
        /* Buttons */
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 16px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #0057FF 0%, #0041CC 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 87, 255, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 87, 255, 0.6);
        }
        
        .btn-secondary {
          background: transparent;
          color: #4f46e5;
          border: 2px solid #4f46e5;
        }
        
        .btn-secondary:hover {
          background: #4f46e5;
          color: white;
          transform: translateY(-2px);
        }
        
        /* Blog Hero */
        .blog-hero {
          background: linear-gradient(135deg, #1B2951 0%, #0F1729 100%);
          padding: 150px 0 80px;
          text-align: center;
          color: white;
        }
        
        .blog-hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .blog-hero p {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Blog Categories */
        .categories {
          background: white;
          padding: 2rem 0;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 70px;
          z-index: 100;
        }
        
        .category-list {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .category-tag {
          padding: 8px 20px;
          background: #f1f5f9;
          border-radius: 20px;
          color: #64748b;
          text-decoration: none;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        
        .category-tag:hover,
        .category-tag.active {
          background: #00B8A3;
          color: white;
        }
        
        /* Blog Grid */
        .blog-content {
          padding: 60px 0;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          transition: all 0.3s;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .blog-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #1B2951 0%, #0F1729 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
        }
        
        .blog-content-area {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .blog-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #64748b;
        }
        
        .blog-category {
          color: #00B8A3;
          font-weight: 600;
        }
        
        .blog-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        
        .blog-excerpt {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        
        .blog-author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #475569;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }
        
        .author-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #64748b;
          font-size: 0.8rem;
        }
        
        /* Featured Post */
        .featured-post {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          margin-bottom: 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 400px;
        }
        
        .featured-image {
          background: linear-gradient(135deg, #1B2951 0%, #0F1729 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 5rem;
        }
        
        .featured-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .featured-badge {
          display: inline-block;
          background: #00B8A3;
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
          width: fit-content;
        }
        
        .featured-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        
        .featured-excerpt {
          color: #64748b;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        /* Newsletter */
        .newsletter {
          background: linear-gradient(135deg, #1B2951 0%, #0F1729 100%);
          padding: 60px 0;
          text-align: center;
          color: white;
        }
        
        .newsletter h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .newsletter-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 2rem auto 0;
        }
        
        .newsletter-input {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
        }
        
        /* Footer */
        .footer {
          background: #1f2937;
          color: white;
          padding: 50px 0;
        }
        
        .footer-content {
          text-align: center;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .blog-hero h1 {
            font-size: 2rem;
          }
          
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .featured-post {
            grid-template-columns: 1fr;
          }
          
          .featured-image {
            height: 200px;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>

      <Navigation />

      {/* Blog Hero */}
      <section className="blog-hero">
        <div className="container">
          <h1>Quotely Insights Blog</h1>
          <p>Stay ahead with the latest insurance technology trends, platform updates, and success strategies</p>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="container">
          <div className="category-list">
            <button onClick={() => handleCategoryClick('all')} className="category-tag active">All Posts</button>
            <button onClick={() => handleCategoryClick('product-updates')} className="category-tag">Product Updates</button>
            <button onClick={() => handleCategoryClick('industry-insights')} className="category-tag">Industry Insights</button>
            <button onClick={() => handleCategoryClick('success-stories')} className="category-tag">Success Stories</button>
            <button onClick={() => handleCategoryClick('tutorials')} className="category-tag">Tutorials</button>
            <button onClick={() => handleCategoryClick('ai-technology')} className="category-tag">AI & Technology</button>
            <button onClick={() => handleCategoryClick('best-practices')} className="category-tag">Best Practices</button>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content">
        <div className="container">
          {/* Featured Post */}
          <div className="featured-post">
            <div className="featured-image">
              🚀
            </div>
            <div className="featured-content">
              <span className="featured-badge">FEATURED</span>
              <h2 className="featured-title">Introducing QUAD 7.0: The Future of Insurance Intelligence</h2>
              <p className="featured-excerpt">Discover how our latest platform update revolutionizes quote generation with AI-powered insights, achieving sub-2-second processing times and 99.9% accuracy rates.</p>
              <div className="blog-meta">
                <span className="blog-category">Product Updates</span>
                <span>5 min read</span>
                <span>Aug 12, 2025</span>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            <Link href="#post1" className="blog-card">
              <div className="blog-image">📊</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Industry Insights</span>
                  <span>8 min read</span>
                </div>
                <h3 className="blog-title">How AI is Transforming Insurance Quote Generation in 2025</h3>
                <p className="blog-excerpt">Explore the latest AI advancements reshaping the insurance industry and learn how agencies are leveraging machine learning to win more business.</p>
                <div className="blog-author">
                  <div className="author-avatar">JD</div>
                  <span>John Davis, CTO</span>
                </div>
              </div>
            </Link>

            <Link href="#post2" className="blog-card">
              <div className="blog-image">💡</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Best Practices</span>
                  <span>6 min read</span>
                </div>
                <h3 className="blog-title">5 Strategies to Triple Your Quote-to-Bind Ratio</h3>
                <p className="blog-excerpt">Learn proven techniques that top-performing agencies use to convert more quotes into policies using Quotely's advanced analytics dashboard.</p>
                <div className="blog-author">
                  <div className="author-avatar">SM</div>
                  <span>Sarah Mitchell, Success Manager</span>
                </div>
              </div>
            </Link>

            <Link href="#post3" className="blog-card">
              <div className="blog-image">🏆</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Success Stories</span>
                  <span>4 min read</span>
                </div>
                <h3 className="blog-title">Case Study: How ABC Insurance Increased Revenue by 240%</h3>
                <p className="blog-excerpt">Discover how ABC Insurance leveraged Quotely's QUAD platform to streamline operations and achieve unprecedented growth in just 6 months.</p>
                <div className="blog-author">
                  <div className="author-avatar">RC</div>
                  <span>Robert Chen, Customer Success</span>
                </div>
              </div>
            </Link>

            <Link href="#post4" className="blog-card">
              <div className="blog-image">🔧</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Tutorials</span>
                  <span>10 min read</span>
                </div>
                <h3 className="blog-title">Complete Guide: Setting Up Your First Multi-Carrier Quote</h3>
                <p className="blog-excerpt">Step-by-step tutorial on configuring multi-carrier quotes in Quotely, including best practices for optimal performance and accuracy.</p>
                <div className="blog-author">
                  <div className="author-avatar">AT</div>
                  <span>Alex Thompson, Product Team</span>
                </div>
              </div>
            </Link>

            <Link href="#post5" className="blog-card">
              <div className="blog-image">🎯</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Industry Insights</span>
                  <span>7 min read</span>
                </div>
                <h3 className="blog-title">The ROI of Modern Insurance Technology: A Data-Driven Analysis</h3>
                <p className="blog-excerpt">We analyzed data from 500+ agencies to reveal the true financial impact of adopting modern insurance platforms like Quotely.</p>
                <div className="blog-author">
                  <div className="author-avatar">MR</div>
                  <span>Maria Rodriguez, Data Analyst</span>
                </div>
              </div>
            </Link>

            <Link href="#post6" className="blog-card">
              <div className="blog-image">🔄</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Product Updates</span>
                  <span>3 min read</span>
                </div>
                <h3 className="blog-title">New Integration: Seamless QuickBooks Sync Now Available</h3>
                <p className="blog-excerpt">Automatically sync your quotes, policies, and commissions with QuickBooks. Learn how to enable this powerful integration in minutes.</p>
                <div className="blog-author">
                  <div className="author-avatar">KL</div>
                  <span>Kevin Lee, Integration Team</span>
                </div>
              </div>
            </Link>

            <Link href="#post7" className="blog-card">
              <div className="blog-image">📈</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Best Practices</span>
                  <span>5 min read</span>
                </div>
                <h3 className="blog-title">Optimizing Your Agency Workflow with QUAD Analytics</h3>
                <p className="blog-excerpt">Discover how to use Quotely's analytics dashboard to identify bottlenecks, improve efficiency, and boost agency productivity.</p>
                <div className="blog-author">
                  <div className="author-avatar">JW</div>
                  <span>Jennifer Wu, Operations Expert</span>
                </div>
              </div>
            </Link>

            <Link href="#post8" className="blog-card">
              <div className="blog-image">🛡️</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">Industry Insights</span>
                  <span>6 min read</span>
                </div>
                <h3 className="blog-title">Cyber Insurance in 2025: What Agencies Need to Know</h3>
                <p className="blog-excerpt">Stay ahead of the curve with insights into the rapidly evolving cyber insurance market and how to position your agency for success.</p>
                <div className="blog-author">
                  <div className="author-avatar">DP</div>
                  <span>David Park, Industry Analyst</span>
                </div>
              </div>
            </Link>

            <Link href="#post9" className="blog-card">
              <div className="blog-image">🤖</div>
              <div className="blog-content-area">
                <div className="blog-meta">
                  <span className="blog-category">AI & Technology</span>
                  <span>9 min read</span>
                </div>
                <h3 className="blog-title">Machine Learning in Risk Assessment: A Game Changer</h3>
                <p className="blog-excerpt">Learn how Quotely's AI models analyze thousands of data points to provide more accurate risk assessments and competitive pricing.</p>
                <div className="blog-author">
                  <div className="author-avatar">LB</div>
                  <span>Lisa Brown, AI Research</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay Updated with Quotely Insights</h2>
          <p>Get the latest articles, product updates, and industry trends delivered to your inbox</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" className="newsletter-input" placeholder="Enter your email" required />
            <button type="submit" className="btn btn-primary" style={{background: 'white', color: '#0057FF'}}>Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Blog() {
  return <BlogPage />
}