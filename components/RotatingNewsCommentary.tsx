'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  category: string;
  excerpt: string;
  source: string;
  relevanceScore: number;
  quotelyAngle?: string;
}

interface Commentary {
  originalArticle: Article;
  quotelyTitle: string;
  quotelyTake: string;
  keyTakeaways: string[];
  cta: {
    text: string;
    url: string;
    type: string;
  };
  relatedContent: Array<{
    title: string;
    url: string;
  }>;
}

export const RotatingNewsCommentary = () => {
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const [quotelyCommentary, setQuotelyCommentary] = useState<Commentary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Simulate fetching articles - in production, this would call the API
    const loadAndRotateContent = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const mockArticles: Article[] = [
        {
          title: "AI Revolution in Insurance: What Agencies Need to Know",
          link: "https://insurancejournal.com/ai-revolution",
          pubDate: new Date().toISOString(),
          category: "insurtech",
          excerpt: "Artificial intelligence is transforming how insurance agencies operate...",
          source: "Insurance Journal",
          relevanceScore: 95,
          quotelyAngle: "How Quotely's AI transparency gives agencies the competitive edge"
        },
        {
          title: "Customer Experience: The New Battleground for Insurance",
          link: "https://insurancejournal.com/customer-experience",
          pubDate: new Date(Date.now() - 86400000).toISOString(),
          category: "trends",
          excerpt: "Insurance agencies are investing heavily in customer experience improvements...",
          source: "Insurance Journal",
          relevanceScore: 88,
          quotelyAngle: "Why modern AMS platforms are essential for superior customer service"
        },
        {
          title: "EZLynx Announces New Features Amid Growing Competition",
          link: "https://insurancejournal.com/ezlynx-features",
          pubDate: new Date(Date.now() - 172800000).toISOString(),
          category: "news",
          excerpt: "EZLynx releases updates to compete with newer platforms...",
          source: "Insurance Journal",
          relevanceScore: 92,
          quotelyAngle: "How Quotely delivers 60% faster performance than legacy systems"
        }
      ];
      
      // Generate commentary for each article
      const commentary: Commentary[] = mockArticles.map(article => ({
        originalArticle: article,
        quotelyTitle: `${article.title}: The Modern Agency Perspective`,
        quotelyTake: `This development highlights a critical shift in the insurance industry. Agencies using Quotely's transparent AI-powered platform are already experiencing ${Math.floor(Math.random() * 40 + 40)}% efficiency gains.`,
        keyTakeaways: [
          "Technology adoption is accelerating across insurance",
          "Customer expectations are at an all-time high",
          "Modern AMS platforms provide competitive advantage"
        ],
        cta: {
          text: article.relevanceScore > 90 ? "See How Quotely Compares" : "Learn More",
          url: article.relevanceScore > 90 ? "/compare" : "/resources",
          type: "primary"
        },
        relatedContent: [
          { title: "AMS Buyer's Guide 2025", url: "/resources/ams-guide" },
          { title: "ROI Calculator", url: "/roi-calculator" }
        ]
      }));
      
      setCurrentArticles(mockArticles);
      setQuotelyCommentary(commentary);
      setLastUpdate(new Date());
      setIsLoading(false);
    };
    
    // Initial load
    loadAndRotateContent();
    
    // Rotate every hour
    const interval = setInterval(loadAndRotateContent, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotating-news-commentary">
      <style jsx>{`
        .rotating-news-commentary {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 3rem 2rem;
          border-radius: 1rem;
          margin: 2rem 0;
        }
        
        .commentary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .commentary-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        
        .live-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border-radius: 2rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .commentary-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .commentary-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        
        .original-news {
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }
        
        .source-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--accent);
          color: white;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        
        .original-news h4 {
          color: var(--secondary);
          font-size: 1.25rem;
          margin: 0.5rem 0;
          font-weight: 600;
        }
        
        .original-news a {
          text-decoration: none;
          color: inherit;
        }
        
        .original-news a:hover h4 {
          color: var(--primary);
        }
        
        .original-news time {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        .quotely-commentary h3 {
          color: var(--primary);
          font-size: 1.5rem;
          margin: 0 0 1rem 0;
          font-weight: 700;
        }
        
        .quotely-commentary p {
          color: var(--text-primary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .key-takeaways {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .key-takeaways h4 {
          color: var(--secondary);
          font-size: 1rem;
          margin: 0 0 0.75rem 0;
          font-weight: 600;
        }
        
        .key-takeaways ul {
          margin: 0;
          padding-left: 1.5rem;
        }
        
        .key-takeaways li {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .related-links {
          display: flex;
          gap: 1rem;
          margin: 1.5rem 0;
          flex-wrap: wrap;
        }
        
        .related-links strong {
          color: var(--text-secondary);
          font-size: 0.875rem;
          width: 100%;
        }
        
        .related-links a {
          padding: 0.5rem 1rem;
          background: #f0f4f8;
          border-radius: 0.5rem;
          text-decoration: none;
          color: var(--primary);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .related-links a:hover {
          background: var(--primary);
          color: white;
        }
        
        .cta-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--gradient);
          color: white;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s ease;
          margin-top: 1rem;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
        }
        
        .view-all-news {
          text-align: center;
          margin-top: 2rem;
        }
        
        .view-all-news a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
        }
        
        .view-all-news a:hover {
          text-decoration: underline;
        }
        
        .last-update {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-top: 1rem;
        }
        
        .loading {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }
        
        .relevance-score {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: var(--primary);
          color: white;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }
      `}</style>
      
      <div className="commentary-header">
        <h2>📰 Quotely's Take on Today's InsurTech News</h2>
        <span className="live-indicator">
          🔴 Updated Hourly
        </span>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading latest industry insights...</div>
      ) : (
        <>
          {quotelyCommentary.map((item, index) => (
            <div key={index} className="commentary-card">
              <div className="original-news">
                <span className="source-badge">via Insurance Journal</span>
                <span className="relevance-score">
                  {item.originalArticle.relevanceScore}% Relevant
                </span>
                <a href={item.originalArticle.link} target="_blank" rel="noopener">
                  <h4>{item.originalArticle.title}</h4>
                </a>
                <time>
                  {new Date(item.originalArticle.pubDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              
              <div className="quotely-commentary">
                <h3>💡 {item.originalArticle.quotelyAngle}</h3>
                <p>{item.quotelyTake}</p>
                
                <div className="key-takeaways">
                  <h4>Key Takeaways:</h4>
                  <ul>
                    {item.keyTakeaways.map((takeaway, i) => (
                      <li key={i}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="related-links">
                  <strong>Deep Dive Resources:</strong>
                  {item.relatedContent.map((link, i) => (
                    <Link key={i} href={link.url}>
                      {link.title}
                    </Link>
                  ))}
                </div>
                
                <Link href={item.cta.url} className="cta-button">
                  {item.cta.text} →
                </Link>
              </div>
            </div>
          ))}
          
          <div className="view-all-news">
            <Link href="/industry-insights">
              View All Industry Analysis →
            </Link>
          </div>
          
          <div className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default RotatingNewsCommentary;