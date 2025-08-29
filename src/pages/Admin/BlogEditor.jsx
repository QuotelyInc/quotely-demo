import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogEditor = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [post, setPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: '',
    author: '',
    authorRole: '',
    featured: false,
    publishDate: new Date().toISOString().split('T')[0],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  const [preview, setPreview] = useState(false);
  const [seoScore, setSeoScore] = useState(0);

  useEffect(() => {
    // Check if admin is authenticated
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'QuotelyAdmin2024!';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      
      // Track admin login with SearchAtlas
      if (window.SearchAtlasTrack) {
        window.SearchAtlasTrack.event('admin_login', {
          timestamp: new Date().toISOString()
        });
      }
    } else {
      alert('Invalid password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setPost(prev => ({ ...prev, slug }));
    }

    // Calculate SEO score
    if (name === 'content' || name === 'seoTitle' || name === 'seoDescription') {
      calculateSeoScore();
    }
  };

  const calculateSeoScore = () => {
    let score = 0;
    
    // Check title length (50-60 chars ideal)
    if (post.seoTitle.length >= 50 && post.seoTitle.length <= 60) score += 25;
    else if (post.seoTitle.length > 30 && post.seoTitle.length < 70) score += 15;
    
    // Check description length (150-160 chars ideal)
    if (post.seoDescription.length >= 150 && post.seoDescription.length <= 160) score += 25;
    else if (post.seoDescription.length > 100 && post.seoDescription.length < 200) score += 15;
    
    // Check content length (min 300 words)
    const wordCount = post.content.split(' ').length;
    if (wordCount >= 1000) score += 25;
    else if (wordCount >= 500) score += 15;
    else if (wordCount >= 300) score += 10;
    
    // Check for keywords in content
    if (post.seoKeywords && post.content.toLowerCase().includes(post.seoKeywords.split(',')[0].toLowerCase())) {
      score += 25;
    }
    
    setSeoScore(score);
    
    // Track SEO optimization with SearchAtlas
    if (window.SearchAtlasTrack && score > 75) {
      window.SearchAtlasTrack.event('seo_optimization', {
        score: score,
        post_title: post.title
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In production, upload to CDN or storage service
      const reader = new FileReader();
      reader.onload = (e) => {
        // Store base64 image or upload to server
        console.log('Image uploaded:', file.name);
        
        // Track image upload
        if (window.SearchAtlasTrack) {
          window.SearchAtlasTrack.event('blog_image_upload', {
            filename: file.name,
            size: file.size
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validate required fields
    if (!post.title || !post.content || !post.excerpt) {
      alert('Please fill in all required fields');
      return;
    }

    // In production, save to backend API
    const blogPost = {
      ...post,
      id: Date.now().toString(),
      tags: post.tags.split(',').map(tag => tag.trim()),
      readTime: `${Math.ceil(post.content.split(' ').length / 200)} min read`,
      seo: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        keywords: post.seoKeywords
      }
    };

    // Save to localStorage for demo
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    existingPosts.push(blogPost);
    localStorage.setItem('blogPosts', JSON.stringify(existingPosts));

    // Track blog post creation
    if (window.SearchAtlasTrack) {
      window.SearchAtlasTrack.event('blog_post_created', {
        post_id: blogPost.id,
        post_title: blogPost.title,
        post_category: blogPost.category,
        seo_score: seoScore
      });
    }

    alert('Blog post saved successfully!');
    navigate('/blog');
  };

  const handleSchedule = () => {
    const scheduledPost = {
      ...post,
      scheduled: true,
      scheduledDate: post.publishDate
    };
    
    // Save scheduled post
    console.log('Post scheduled for:', post.publishDate);
    
    // Track scheduling
    if (window.SearchAtlasTrack) {
      window.SearchAtlasTrack.event('blog_post_scheduled', {
        post_title: post.title,
        scheduled_date: post.publishDate
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <form onSubmit={handleLogin} style={styles.loginForm}>
          <h2 style={styles.loginTitle}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.passwordInput}
          />
          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Blog Content Editor</h1>
        <div style={styles.headerActions}>
          <button
            onClick={() => setPreview(!preview)}
            style={styles.previewButton}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handleSave} style={styles.saveButton}>
            Save Post
          </button>
          <button onClick={handleSchedule} style={styles.scheduleButton}>
            Schedule
          </button>
        </div>
      </div>

      {preview ? (
        <div style={styles.preview}>
          <h1>{post.title}</h1>
          <p style={styles.previewMeta}>
            By {post.author || 'Author'} • {post.publishDate} • {post.category}
          </p>
          <p style={styles.previewExcerpt}>{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        </div>
      ) : (
        <div style={styles.editorGrid}>
          <div style={styles.mainEditor}>
            {/* Basic Info */}
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Basic Information</h3>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter blog post title"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={post.slug}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  rows="3"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    name="category"
                    value={post.category}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business Growth">Business Growth</option>
                    <option value="Commercial Insurance">Commercial Insurance</option>
                    <option value="Personal Lines">Personal Lines</option>
                    <option value="Industry News">Industry News</option>
                    <option value="Best Practices">Best Practices</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Publish Date</label>
                  <input
                    type="date"
                    name="publishDate"
                    value={post.publishDate}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={post.tags}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="InsurTech, AI, Automation"
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Author Name</label>
                  <input
                    type="text"
                    name="author"
                    value={post.author}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="John Doe"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Author Role</label>
                  <input
                    type="text"
                    name="authorRole"
                    value={post.authorRole}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Insurance Expert"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={post.featured}
                    onChange={handleInputChange}
                    style={styles.checkbox}
                  />
                  Featured Post
                </label>
              </div>
            </section>

            {/* Content Editor */}
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Content *</h3>
              <div style={styles.editorToolbar}>
                <button style={styles.toolbarButton}>B</button>
                <button style={styles.toolbarButton}>I</button>
                <button style={styles.toolbarButton}>U</button>
                <button style={styles.toolbarButton}>H1</button>
                <button style={styles.toolbarButton}>H2</button>
                <button style={styles.toolbarButton}>Link</button>
                <button style={styles.toolbarButton}>Image</button>
                <button style={styles.toolbarButton}>List</button>
                <button style={styles.toolbarButton}>Quote</button>
              </div>
              <textarea
                name="content"
                value={post.content}
                onChange={handleInputChange}
                style={styles.contentEditor}
                rows="20"
                placeholder="Write your blog post content here... (supports basic HTML)"
              />
              
              <div style={styles.imageUpload}>
                <label style={styles.label}>Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.fileInput}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* SEO Section */}
            <section style={styles.sidebarSection}>
              <h3 style={styles.sidebarTitle}>SEO Optimization</h3>
              
              <div style={styles.seoScore}>
                <div style={styles.seoScoreLabel}>SEO Score</div>
                <div style={styles.seoScoreValue}>{seoScore}%</div>
                <div style={styles.seoScoreBar}>
                  <div 
                    style={{
                      ...styles.seoScoreProgress,
                      width: `${seoScore}%`,
                      backgroundColor: seoScore > 75 ? '#28a745' : seoScore > 50 ? '#ffc107' : '#dc3545'
                    }}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={post.seoTitle}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="SEO optimized title (50-60 chars)"
                />
                <small style={styles.charCount}>
                  {post.seoTitle.length}/60 characters
                </small>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Meta Description</label>
                <textarea
                  name="seoDescription"
                  value={post.seoDescription}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  rows="3"
                  placeholder="Meta description (150-160 chars)"
                />
                <small style={styles.charCount}>
                  {post.seoDescription.length}/160 characters
                </small>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Keywords</label>
                <input
                  type="text"
                  name="seoKeywords"
                  value={post.seoKeywords}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="insurance, technology, automation"
                />
              </div>
            </section>

            {/* SearchAtlas Integration */}
            <section style={styles.sidebarSection}>
              <h3 style={styles.sidebarTitle}>SearchAtlas Tracking</h3>
              <p style={styles.sidebarText}>
                This post will be automatically tracked by SearchAtlas for performance metrics.
              </p>
              <button style={styles.analyzeButton}>
                Analyze Content
              </button>
            </section>

            {/* Publishing Options */}
            <section style={styles.sidebarSection}>
              <h3 style={styles.sidebarTitle}>Publishing Options</h3>
              <div style={styles.publishOptions}>
                <button style={styles.draftButton}>Save as Draft</button>
                <button style={styles.publishButton}>Publish Now</button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    paddingTop: '70px',
    backgroundColor: '#f8f9fa'
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  loginForm: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '400px'
  },
  loginTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '24px',
    textAlign: 'center'
  },
  passwordInput: {
    width: '100%',
    padding: '12px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '20px'
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6600',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  header: {
    backgroundColor: 'white',
    padding: '20px',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#212529'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  previewButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  scheduleButton: {
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  editorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '20px',
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  mainEditor: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px'
  },
  sidebar: {
    height: 'fit-content',
    position: 'sticky',
    top: '90px'
  },
  section: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '16px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '16px',
    resize: 'vertical'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '16px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    color: '#495057'
  },
  checkbox: {
    marginRight: '8px'
  },
  editorToolbar: {
    display: 'flex',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px 6px 0 0',
    border: '2px solid #dee2e6',
    borderBottom: 'none'
  },
  toolbarButton: {
    padding: '6px 12px',
    backgroundColor: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  contentEditor: {
    width: '100%',
    padding: '12px',
    border: '2px solid #dee2e6',
    borderTop: 'none',
    borderRadius: '0 0 6px 6px',
    fontSize: '16px',
    fontFamily: 'monospace',
    resize: 'vertical'
  },
  imageUpload: {
    marginTop: '20px'
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    border: '2px solid #dee2e6',
    borderRadius: '6px'
  },
  sidebarSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px'
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '16px'
  },
  sidebarText: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '12px'
  },
  seoScore: {
    marginBottom: '20px'
  },
  seoScoreLabel: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '4px'
  },
  seoScoreValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '8px'
  },
  seoScoreBar: {
    height: '8px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  seoScoreProgress: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  charCount: {
    fontSize: '12px',
    color: '#6c757d',
    marginTop: '4px',
    display: 'block'
  },
  analyzeButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  publishOptions: {
    display: 'flex',
    gap: '10px'
  },
  draftButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  publishButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  preview: {
    backgroundColor: 'white',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '40px',
    borderRadius: '12px'
  },
  previewMeta: {
    color: '#6c757d',
    marginBottom: '20px'
  },
  previewExcerpt: {
    fontSize: '18px',
    color: '#495057',
    fontStyle: 'italic',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #dee2e6'
  }
};

export default BlogEditor;