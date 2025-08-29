import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../../content/blogPosts';
import { EarlySignupButton } from '../../components/EarlySignupForm/EarlySignupForm';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      const foundPost = getPostBySlug(slug);
      
      if (!foundPost) {
        navigate('/blog');
        return;
      }

      setPost(foundPost);
      setRelatedPosts(getRelatedPosts(foundPost.id));
      setLoading(false);

      // Update document title for SEO
      document.title = foundPost.seo.title;
      
      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = foundPost.seo.description;
      }

      // Track post view with SearchAtlas
      if (window.SearchAtlasTrack) {
        window.SearchAtlasTrack.contentEngagement('blog_post', foundPost.id, 'view');
        window.SearchAtlasTrack.event('blog_post_view', {
          post_id: foundPost.id,
          post_title: foundPost.title,
          post_category: foundPost.category,
          post_tags: foundPost.tags
        });
      }
    };

    loadPost();
  }, [slug, navigate]);

  // Track time on page
  useEffect(() => {
    if (!post) return;

    const startTime = Date.now();

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (window.SearchAtlasTrack && timeSpent > 10) {
        window.SearchAtlasTrack.contentEngagement('blog_post', post.id, 'read');
        window.SearchAtlasTrack.event('blog_post_read', {
          post_id: post.id,
          time_spent: timeSpent
        });
      }
    };
  }, [post]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    // Track share event
    if (window.SearchAtlasTrack) {
      window.SearchAtlasTrack.event('blog_post_share', {
        post_id: post.id,
        platform: platform
      });
    }
  };

  return (
    <div style={styles.container}>
      <article style={styles.article}>
        {/* Breadcrumb */}
        <nav style={styles.breadcrumb}>
          <Link to="/" style={styles.breadcrumbLink}>Home</Link>
          <span style={styles.breadcrumbSeparator}>/</span>
          <Link to="/blog" style={styles.breadcrumbLink}>Blog</Link>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbCurrent}>{post.category}</span>
        </nav>

        {/* Article Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>{post.title}</h1>
          
          <div style={styles.meta}>
            <div style={styles.author}>
              <div style={styles.authorAvatar}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={styles.authorName}>{post.author}</div>
                <div style={styles.authorRole}>{post.authorRole}</div>
              </div>
            </div>
            
            <div style={styles.metaRight}>
              <span style={styles.date}>{post.publishDate}</span>
              <span style={styles.readTime}>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div style={styles.tags}>
            {post.tags.map(tag => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div 
          style={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <h3 style={styles.ctaTitle}>Ready to Transform Your Insurance Agency?</h3>
          <p style={styles.ctaText}>
            Join thousands of agents using Quotely to streamline their operations and grow revenue.
          </p>
          <EarlySignupButton>Get Early Access (50% Off)</EarlySignupButton>
        </div>

        {/* Share Section */}
        <div style={styles.shareSection}>
          <h4 style={styles.shareTitle}>Share this article:</h4>
          <div style={styles.shareButtons}>
            <button 
              onClick={() => handleShare('linkedin')}
              style={styles.shareButton}
            >
              LinkedIn
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              style={styles.shareButton}
            >
              Twitter
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              style={styles.shareButton}
            >
              Facebook
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div style={styles.authorBio}>
          <div style={styles.authorBioAvatar}>
            {post.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 style={styles.authorBioName}>{post.author}</h4>
            <p style={styles.authorBioRole}>{post.authorRole}</p>
            <p style={styles.authorBioText}>
              Expert in insurance technology and digital transformation. Helping agencies 
              leverage technology to improve efficiency and grow their business.
            </p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={styles.relatedSection}>
          <h3 style={styles.relatedTitle}>Related Articles</h3>
          <div style={styles.relatedGrid}>
            {relatedPosts.map(relatedPost => (
              <Link 
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                style={styles.relatedCard}
              >
                <h4 style={styles.relatedPostTitle}>{relatedPost.title}</h4>
                <p style={styles.relatedPostExcerpt}>{relatedPost.excerpt}</p>
                <span style={styles.relatedPostLink}>Read More →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '100px 20px 40px'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff6600',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  article: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginBottom: '40px'
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    fontSize: '14px',
    color: '#6c757d'
  },
  breadcrumbLink: {
    color: '#0077cc',
    textDecoration: 'none'
  },
  breadcrumbSeparator: {
    margin: '0 8px',
    opacity: 0.5
  },
  breadcrumbCurrent: {
    color: '#6c757d'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '20px',
    lineHeight: '1.2'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e2e8f0'
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  authorAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#1a3a6e',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '18px'
  },
  authorName: {
    fontWeight: '600',
    color: '#212529'
  },
  authorRole: {
    fontSize: '14px',
    color: '#6c757d'
  },
  metaRight: {
    display: 'flex',
    gap: '16px',
    fontSize: '14px',
    color: '#6c757d'
  },
  date: {},
  readTime: {},
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '6px 12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#6c757d'
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#495057',
    marginBottom: '40px',
    '& h2': {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#212529',
      marginTop: '40px',
      marginBottom: '20px'
    },
    '& h3': {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#212529',
      marginTop: '30px',
      marginBottom: '16px'
    },
    '& p': {
      marginBottom: '20px'
    },
    '& ul, & ol': {
      marginBottom: '20px',
      paddingLeft: '30px'
    },
    '& li': {
      marginBottom: '10px'
    }
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    marginBottom: '40px'
  },
  ctaTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '12px'
  },
  ctaText: {
    color: '#6c757d',
    marginBottom: '20px'
  },
  shareSection: {
    padding: '20px 0',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '40px'
  },
  shareTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '12px'
  },
  shareButtons: {
    display: 'flex',
    gap: '12px'
  },
  shareButton: {
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    color: '#495057',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500'
  },
  authorBio: {
    display: 'flex',
    gap: '20px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px'
  },
  authorBioAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1a3a6e',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '24px',
    flexShrink: 0
  },
  authorBioName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '4px'
  },
  authorBioRole: {
    color: '#6c757d',
    marginBottom: '12px'
  },
  authorBioText: {
    color: '#495057',
    lineHeight: '1.6'
  },
  relatedSection: {
    marginTop: '60px'
  },
  relatedTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '24px'
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  relatedCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'block'
  },
  relatedPostTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '12px',
    lineHeight: '1.3'
  },
  relatedPostExcerpt: {
    color: '#6c757d',
    fontSize: '15px',
    lineHeight: '1.5',
    marginBottom: '12px'
  },
  relatedPostLink: {
    color: '#ff6600',
    fontWeight: '600',
    fontSize: '14px'
  }
};

// Add keyframe animation for spinner
if (typeof document !== 'undefined' && !document.getElementById('blog-post-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'blog-post-styles';
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .blog-content h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #212529;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    
    .blog-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #212529;
      margin-top: 30px;
      margin-bottom: 16px;
    }
    
    .blog-content p {
      margin-bottom: 20px;
    }
    
    .blog-content ul, .blog-content ol {
      margin-bottom: 20px;
      padding-left: 30px;
    }
    
    .blog-content li {
      margin-bottom: 10px;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default BlogPost;