// Blog posts data structure
// In production, this would come from a CMS or API

export const blogPosts = [
  {
    id: 'insurance-technology-2024',
    slug: 'insurance-technology-trends-2024',
    title: 'Top Insurance Technology Trends for 2024',
    excerpt: 'Discover how AI, automation, and digital transformation are reshaping the insurance industry in 2024.',
    content: `
      <h2>The Future of Insurance is Digital</h2>
      <p>The insurance industry is undergoing a massive digital transformation. From AI-powered underwriting to automated claims processing, technology is revolutionizing how insurance agencies operate.</p>
      
      <h3>1. Artificial Intelligence in Underwriting</h3>
      <p>AI algorithms are now capable of assessing risk more accurately than ever before, leading to faster quote generation and more competitive pricing.</p>
      
      <h3>2. Automated Quote Generation</h3>
      <p>Platforms like Quotely are enabling agents to generate quotes 300% faster through intelligent automation and carrier integrations.</p>
      
      <h3>3. Customer Self-Service Portals</h3>
      <p>Modern customers expect 24/7 access to their policies, claims, and account information through user-friendly digital portals.</p>
      
      <h3>4. Data Analytics for Risk Assessment</h3>
      <p>Advanced analytics tools are helping insurers better understand and price risk, leading to more personalized coverage options.</p>
      
      <h3>5. Digital Distribution Channels</h3>
      <p>Online quote comparison tools and digital marketplaces are changing how customers shop for insurance.</p>
    `,
    author: 'Sarah Johnson',
    authorRole: 'Insurance Technology Expert',
    publishDate: '2024-01-15',
    category: 'Technology',
    tags: ['InsurTech', 'AI', 'Automation', 'Digital Transformation'],
    readTime: '5 min read',
    featured: true,
    image: '/images/blog/insurance-tech-2024.jpg',
    seo: {
      title: 'Top Insurance Technology Trends 2024 | Quotely Blog',
      description: 'Explore the latest insurance technology trends including AI, automation, and digital transformation shaping the industry in 2024.',
      keywords: 'insurance technology, insurtech, AI insurance, automated quotes, digital transformation'
    }
  },
  {
    id: 'increase-agency-revenue',
    slug: 'how-to-increase-insurance-agency-revenue',
    title: 'How to Increase Your Insurance Agency Revenue by 40%',
    excerpt: 'Learn proven strategies to boost your agency revenue through technology adoption and process optimization.',
    content: `
      <h2>Revenue Growth Strategies for Modern Agencies</h2>
      <p>Growing your insurance agency revenue doesn't have to be complicated. By implementing the right strategies and leveraging modern technology, you can see significant growth within months.</p>
      
      <h3>1. Streamline Your Quote Process</h3>
      <p>Reducing quote generation time from hours to minutes can dramatically increase your conversion rates. Tools like Quotely's automated quoting system can help you respond to leads faster.</p>
      
      <h3>2. Implement Cross-Selling Strategies</h3>
      <p>Use data analytics to identify cross-selling opportunities within your existing client base. Bundling policies can increase revenue per customer by 25-30%.</p>
      
      <h3>3. Focus on Client Retention</h3>
      <p>It costs 5x more to acquire a new customer than to retain an existing one. Implement automated renewal reminders and personalized communication strategies.</p>
      
      <h3>4. Expand Your Digital Presence</h3>
      <p>Invest in SEO, content marketing, and social media to generate organic leads. Agencies with strong digital presence see 3x more inbound leads.</p>
      
      <h3>5. Leverage Referral Programs</h3>
      <p>Happy clients are your best marketers. Implement a structured referral program with incentives to turn customers into advocates.</p>
    `,
    author: 'Michael Chen',
    authorRole: 'Agency Growth Consultant',
    publishDate: '2024-01-10',
    category: 'Business Growth',
    tags: ['Revenue Growth', 'Agency Management', 'Sales Strategy', 'Business Development'],
    readTime: '7 min read',
    featured: true,
    image: '/images/blog/revenue-growth.jpg',
    seo: {
      title: 'Increase Insurance Agency Revenue by 40% | Growth Strategies',
      description: 'Discover proven strategies to boost your insurance agency revenue through technology, process optimization, and smart growth tactics.',
      keywords: 'insurance agency revenue, agency growth, insurance sales, revenue strategies'
    }
  },
  {
    id: 'commercial-insurance-guide',
    slug: 'complete-guide-commercial-insurance-quoting',
    title: 'The Complete Guide to Commercial Insurance Quoting',
    excerpt: 'Master the art of commercial insurance quoting with our comprehensive guide covering all lines of business.',
    content: `
      <h2>Understanding Commercial Insurance Quoting</h2>
      <p>Commercial insurance quoting requires a different approach than personal lines. This guide will walk you through everything you need to know.</p>
      
      <h3>Types of Commercial Coverage</h3>
      <ul>
        <li>General Liability</li>
        <li>Commercial Property</li>
        <li>Workers' Compensation</li>
        <li>Commercial Auto</li>
        <li>Professional Liability</li>
        <li>Cyber Liability</li>
      </ul>
      
      <h3>Key Factors in Commercial Quoting</h3>
      <p>Understanding risk factors, industry classifications, and coverage limits is crucial for accurate commercial quotes.</p>
      
      <h3>Using Technology for Faster Quotes</h3>
      <p>Modern platforms like Quotely can reduce commercial quote time from days to hours through automated carrier connections and smart form filling.</p>
    `,
    author: 'David Martinez',
    authorRole: 'Commercial Lines Specialist',
    publishDate: '2024-01-05',
    category: 'Commercial Insurance',
    tags: ['Commercial Insurance', 'Quoting', 'Business Insurance', 'Risk Management'],
    readTime: '10 min read',
    featured: false,
    image: '/images/blog/commercial-insurance.jpg',
    seo: {
      title: 'Complete Guide to Commercial Insurance Quoting | Quotely',
      description: 'Learn everything about commercial insurance quoting including coverage types, risk assessment, and technology solutions.',
      keywords: 'commercial insurance, business insurance, commercial quotes, liability insurance'
    }
  }
];

// Function to get all blog posts
export const getAllPosts = () => {
  return blogPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
};

// Function to get featured posts
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

// Function to get post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get posts by category
export const getPostsByCategory = (category) => {
  return blogPosts.filter(post => post.category === category);
};

// Function to get posts by tag
export const getPostsByTag = (tag) => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

// Function to get related posts
export const getRelatedPosts = (currentPostId, limit = 3) => {
  const currentPost = blogPosts.find(post => post.id === currentPostId);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
};

// Categories for navigation
export const categories = [
  'Technology',
  'Business Growth',
  'Commercial Insurance',
  'Personal Lines',
  'Industry News',
  'Best Practices'
];

// Popular tags
export const popularTags = [
  'InsurTech',
  'AI',
  'Automation',
  'Digital Transformation',
  'Revenue Growth',
  'Agency Management',
  'Commercial Insurance',
  'Risk Management'
];