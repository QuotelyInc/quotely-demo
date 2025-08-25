'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useOTTOTracking } from '@/components/OTTOProvider'
import MinimalNav from '@/components/MinimalNav'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { getPostBySlug, getRecentPosts, type BlogPost } from '@/lib/blog'

function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { trackPageView, trackUserAction } = useOTTOTracking()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      loadPost(params.slug as string)
    }
  }, [params.slug])

  const loadPost = async (slug: string) => {
    try {
      const postData = await getPostBySlug(slug)
      const recent = await getRecentPosts(3)
      
      if (postData) {
        setPost(postData)
        setRecentPosts(recent.filter(p => p.slug !== slug))
        
        trackPageView('blog_post', {
          section: 'blog',
          content_type: 'article',
          post_slug: slug,
          post_title: postData.title,
          post_category: postData.category
        })
      } else {
        router.push('/blog')
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading blog post:', error)
      router.push('/blog')
    }
  }

  const handleShare = (platform: string) => {
    if (!post) return
    
    trackUserAction('blog_post_shared', {
      platform: platform,
      post_slug: post.slug
    })
    
    const url = `https://tryquotely.com/blog/${post.slug}`
    const text = `${post.title} - Quotely Blog`
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}` 
        break
    }
  }

  if (loading) {
    return (
      <>
        <MinimalNav />
        <div style={{ padding: '200px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Loading post...</h2>
        </div>
        <Footer />
      </>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div>
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--background);
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .wide-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .hero-section {
          background: var(--gradient-bg);
          color: white;
          padding: 150px 0 60px;
        }
        
        .breadcrumb {
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .breadcrumb a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        
        .breadcrumb a:hover {
          opacity: 1;
        }
        
        .breadcrumb span {
          margin: 0 0.5rem;
          opacity: 0.6;
        }
        
        .post-header h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
        }
        
        .post-meta {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.95;
        }
        
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .post-category {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 500;
        }
        
        /* Content Section */
        .content-section {
          padding: 4rem 0;
          background: var(--surface);
        }
        
        .post-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-primary);
        }
        
        .post-content h1,
        .post-content h2,
        .post-content h3 {
          margin: 2rem 0 1rem;
          font-weight: 600;
          line-height: 1.3;
          color: var(--text-primary);
        }
        
        .post-content h1 { font-size: 2rem; }
        .post-content h2 { font-size: 1.75rem; }
        .post-content h3 { font-size: 1.5rem; }
        
        .post-content p {
          margin-bottom: 1.5rem;
        }
        
        .post-content ul,
        .post-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .post-content li {
          margin-bottom: 0.75rem;
        }
        
        .post-content strong {
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .post-content em {
          font-style: italic;
          color: var(--text-secondary);
        }
        
        .post-content a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        
        .post-content a:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        
        .post-content blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }
        
        .post-content code {
          background: #f4f4f4;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        
        .post-content pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
        }
        
        .post-content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        
        /* Share Section */
        .share-section {
          padding: 3rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-top: 3rem;
        }
        
        .share-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }
        
        .share-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .share-button {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          border: 2px solid var(--border);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }
        
        .share-button:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .tags-list {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .tag {
          background: #f0f4f8;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          text-align: center;
          margin: 4rem 0;
        }
        
        .cta-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
        }
        
        .btn-primary {
          background: white;
          color: #667eea;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-secondary:hover {
          background: white;
          color: #667eea;
        }
        
        /* Related Posts */
        .related-section {
          padding: 4rem 0;
          background: var(--background);
        }
        
        .related-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .related-header h2 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .related-card {
          background: var(--surface);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .related-category {
          color: var(--primary);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .related-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        
        .related-meta {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .post-header h1 {
            font-size: 2rem;
          }
          
          .post-meta {
            gap: 1rem;
          }
          
          .share-container {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <MinimalNav />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>
          
          <div className="post-header">
            <h1>{post.title}</h1>
            
            <div className="post-meta">
              <div className="meta-item">
                <div className="author-avatar">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span>{post.author}</span>
              </div>
              
              <div className="meta-item">
                📅 {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              
              <div className="meta-item">
                📖 {post.readTime} read
              </div>
              
              <div className="post-category">
                {post.category}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="container">
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />').replace(/#{1,6}\s(.+)/g, '<h2>$1</h2>') }}
          />
          
          {/* Share Section */}
          <div className="share-section">
            <div className="share-container">
              <div>
                <h3>Share this article</h3>
                <div className="share-buttons">
                  <button className="share-button" onClick={() => handleShare('twitter')}>
                    𝕏
                  </button>
                  <button className="share-button" onClick={() => handleShare('linkedin')}>
                    in
                  </button>
                  <button className="share-button" onClick={() => handleShare('email')}>
                    ✉
                  </button>
                </div>
              </div>
              
              <div className="tags-list">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="cta-section">
            <h2>Ready to Transform Your Agency?</h2>
            <p>Experience the power of transparent AI and lightning-fast quotes</p>
            <div className="cta-buttons">
              <Link href="/get-started" className="btn btn-primary">
                Start Free Trial
              </Link>
              <Link href="/demo" className="btn btn-secondary">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="related-section">
          <div className="wide-container">
            <div className="related-header">
              <h2>Related Articles</h2>
            </div>
            
            <div className="related-grid">
              {recentPosts.map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="related-card"
                  onClick={() => trackUserAction('related_post_clicked', {
                    from_slug: post.slug,
                    to_slug: relatedPost.slug
                  })}
                >
                  <div className="related-category">{relatedPost.category}</div>
                  <h3 className="related-title">{relatedPost.title}</h3>
                  <div className="related-meta">
                    {relatedPost.author} • {relatedPost.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default function BlogPost() {
  return <BlogPostPage />
}