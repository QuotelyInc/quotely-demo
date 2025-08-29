import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, categories, popularTags } from '../../content/blogPosts';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allPosts = getAllPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);

    // Track page view with SearchAtlas
    if (window.SearchAtlasTrack) {
      window.SearchAtlasTrack.event('blog_page_view', {
        page: 'blog_list',
        total_posts: allPosts.length
      });
    }
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm, posts]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    
    // Track category filter with SearchAtlas
    if (window.SearchAtlasTrack) {
      window.SearchAtlasTrack.event('blog_category_filter', {
        category: category
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Insurance Industry Insights</h1>
        <p style={styles.subtitle}>
          Expert advice, industry trends, and growth strategies for modern insurance agencies
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          {/* Search */}
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Categories */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Categories</h3>
            <ul style={styles.categoryList}>
              <li>
                <button
                  onClick={() => handleCategoryClick('All')}
                  style={{
                    ...styles.categoryButton,
                    ...(selectedCategory === 'All' ? styles.categoryButtonActive : {})
                  }}
                >
                  All Posts
                </button>
              </li>
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      ...styles.categoryButton,
                      ...(selectedCategory === category ? styles.categoryButtonActive : {})
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Popular Tags</h3>
            <div style={styles.tagCloud}>
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  style={styles.tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div style={styles.newsletterBox}>
            <h3 style={styles.newsletterTitle}>Stay Updated</h3>
            <p style={styles.newsletterText}>
              Get the latest insurance insights delivered to your inbox
            </p>
            <input
              type="email"
              placeholder="Your email"
              style={styles.newsletterInput}
            />
            <button style={styles.newsletterButton}>Subscribe</button>
          </div>
        </div>

        <div style={styles.mainContent}>
          {filteredPosts.length === 0 ? (
            <div style={styles.noResults}>
              <p>No articles found matching your criteria.</p>
            </div>
          ) : (
            <div style={styles.postGrid}>
              {filteredPosts.map(post => (
                <article key={post.id} style={styles.postCard}>
                  {post.featured && (
                    <span style={styles.featuredBadge}>Featured</span>
                  )}
                  
                  <Link to={`/blog/${post.slug}`} style={styles.postLink}>
                    <h2 style={styles.postTitle}>{post.title}</h2>
                  </Link>
                  
                  <div style={styles.postMeta}>
                    <span style={styles.postDate}>{post.publishDate}</span>
                    <span style={styles.postDivider}>•</span>
                    <span style={styles.postCategory}>{post.category}</span>
                    <span style={styles.postDivider}>•</span>
                    <span style={styles.postReadTime}>{post.readTime}</span>
                  </div>
                  
                  <p style={styles.postExcerpt}>{post.excerpt}</p>
                  
                  <div style={styles.postFooter}>
                    <div style={styles.postTags}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={styles.postTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} style={styles.readMore}>
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    paddingTop: '70px'
  },
  hero: {
    background: 'linear-gradient(135deg, #1a3a6e 0%, #112b50 100%)',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '40px',
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr'
    }
  },
  sidebar: {
    position: 'sticky',
    top: '90px',
    height: 'fit-content'
  },
  searchBox: {
    marginBottom: '30px'
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none'
  },
  sidebarSection: {
    marginBottom: '30px'
  },
  sidebarTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '12px'
  },
  categoryList: {
    listStyle: 'none',
    padding: 0
  },
  categoryButton: {
    width: '100%',
    textAlign: 'left',
    padding: '10px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    color: '#6c757d',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  categoryButtonActive: {
    backgroundColor: '#ff6600',
    color: 'white'
  },
  tagCloud: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    padding: '6px 12px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#6c757d',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  newsletterBox: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '30px'
  },
  newsletterTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '8px'
  },
  newsletterText: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '16px'
  },
  newsletterInput: {
    width: '100%',
    padding: '10px',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    marginBottom: '12px',
    fontSize: '16px'
  },
  newsletterButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff6600',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  mainContent: {
    minHeight: '400px'
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6c757d'
  },
  postGrid: {
    display: 'grid',
    gap: '30px'
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    position: 'relative',
    transition: 'all 0.3s ease'
  },
  featuredBadge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  postTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '12px',
    lineHeight: '1.3'
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#6c757d'
  },
  postDate: {},
  postDivider: {
    opacity: 0.5
  },
  postCategory: {
    color: '#0077cc'
  },
  postReadTime: {},
  postExcerpt: {
    fontSize: '16px',
    color: '#6c757d',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  postTags: {
    display: 'flex',
    gap: '8px'
  },
  postTag: {
    padding: '4px 10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#6c757d'
  },
  readMore: {
    color: '#ff6600',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s ease'
  }
};

export default BlogList;