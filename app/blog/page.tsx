'use client'

import { useEffect, useState } from 'react'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { getAllPosts, getAllCategories, type BlogPost } from '@/lib/blog'

function BlogPage() {
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    trackPageView('blog', {
      section: 'blog',
      content_type: 'article_listing'
    })
    loadBlogData()
  }, [trackPageView])

  const loadBlogData = async () => {
    try {
      const allPosts = await getAllPosts()
      const allCategories = await getAllCategories()
      setPosts(allPosts)
      setCategories(['All', ...allCategories])
      setLoading(false)
    } catch (error) {
      console.error('Error loading blog posts:', error)
      setLoading(false)
    }
  }

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackUserAction('newsletter_subscribed', {
      source: 'blog_page'
    })
    alert('Thank you for subscribing! You will receive our latest insights soon.')
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    trackUserAction('category_filtered', {
      category: category,
      location: 'blog_categories'
    })
  }

  const handlePostClick = (slug: string) => {
    trackUserAction('blog_post_clicked', {
      post_slug: slug,
      location: 'blog_listing'
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-section {
          background: var(--gradient-bg);
          color: white;
          padding: 150px 0 80px;
          text-align: center;
        }
        
        .hero-section h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-section p {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Newsletter Section */
        .newsletter-section {
          background: white;
          padding: 3rem 0;
          border-bottom: 1px solid var(--border);
        }
        
        .newsletter-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2.5rem;
          border-radius: 1rem;
          color: white;
          text-align: center;
        }
        
        .newsletter-container h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .newsletter-container p {
          margin-bottom: 2rem;
          opacity: 0.95;
        }
        
        .newsletter-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
        }
        
        .newsletter-form button {
          padding: 1rem 2rem;
          background: white;
          color: #667eea;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .newsletter-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        /* Categories */
        .categories-section {
          padding: 3rem 0 2rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        
        .categories-list {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .category-btn {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid var(--border);
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .category-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        
        .category-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        /* Blog Grid */
        .blog-section {
          padding: 4rem 0;
          background: var(--background);
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .blog-card {
          background: var(--surface);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .blog-image {
          width: 100%;
          height: 200px;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }
        
        .blog-content {
          padding: 1.5rem;
        }
        
        .blog-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .blog-category {
          background: #f0f4f8;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-weight: 500;
          color: var(--primary);
        }
        
        .blog-date {
          opacity: 0.8;
        }
        
        .blog-readtime {
          margin-left: auto;
          opacity: 0.8;
        }
        
        .blog-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
          font-weight: 600;
          line-height: 1.3;
        }
        
        .blog-excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .blog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .blog-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .author-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .author-name {
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .read-more {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.3s ease;
        }
        
        .blog-card:hover .read-more {
          gap: 1rem;
        }
        
        /* Loading State */
        .loading {
          text-align: center;
          padding: 4rem;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem;
        }
        
        .empty-state h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .empty-state p {
          color: var(--text-secondary);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .categories-list {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 1rem;
          }
        }
      `}</style>

      <MinimalNav />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Quotely Blog</h1>
          <p>
            Insights, tips, and industry news to help you grow your insurance business
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <h2>Stay Updated</h2>
            <p>Get the latest insurance technology insights delivered to your inbox</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-list">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-section">
        <div className="container">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <h3>No posts found</h3>
              <p>Check back soon for new content!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="blog-image">
                    {post.category === 'Technology' ? '🚀' : 
                     post.category === 'Case Studies' ? '📊' :
                     post.category === 'Industry Trends' ? '📈' : '📰'}
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-category">{post.category}</span>
                      <span className="blog-date">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="blog-readtime">📖 {post.readTime}</span>
                    </div>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-footer">
                      <div className="blog-author">
                        <div className="author-avatar">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="author-name">{post.author}</span>
                      </div>
                      <span className="read-more">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function Blog() {
  return <BlogPage />
}