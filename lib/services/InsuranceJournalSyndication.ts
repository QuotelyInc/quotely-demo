import Parser from 'rss-parser';

interface ArticleData {
  title: string;
  link: string;
  pubDate: string;
  category: string;
  excerpt: string;
  guid: string;
  source: string;
  relevanceScore: number;
  quotelyAngle?: string;
  competitorMentions?: string[];
}

interface RelevanceFactors {
  amsKeywords: number;
  customerSupport: number;
  insurtech: number;
  competitorMentions: string[];
  trendingTopics: number;
}

export class InsuranceJournalSyndication {
  private parser: Parser;
  private feedUrls: Record<string, string>;
  private updateInterval: number;

  constructor() {
    this.parser = new Parser();
    this.feedUrls = {
      insurtech: 'https://www.insurancejournal.com/insurtech/feed/',
      national: 'https://www.insurancejournal.com/news/national/feed/',
      aiNews: 'https://www.insurancejournal.com/ai/feed/',
      datadriven: 'https://www.insurancejournal.com/data-driven/feed/'
    };
    this.updateInterval = 3600000; // 1 hour
  }
  
  async fetchLatestArticles(): Promise<ArticleData[]> {
    const articles: ArticleData[] = [];
    
    for (const [category, url] of Object.entries(this.feedUrls)) {
      try {
        const feed = await this.parser.parseURL(url);
        
        articles.push(...feed.items.map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          category,
          excerpt: item.contentSnippet || '',
          guid: item.guid || '',
          source: 'Insurance Journal',
          relevanceScore: 0
        })));
      } catch (error) {
        console.error(`Error fetching ${category} feed:`, error);
      }
    }
    
    return this.analyzeRelevance(articles);
  }
  
  async analyzeRelevance(articles: ArticleData[]): Promise<ArticleData[]> {
    const scoredArticles = await Promise.all(
      articles.map(async (article) => {
        const relevanceFactors: RelevanceFactors = {
          amsKeywords: this.checkAMSRelevance(article),
          customerSupport: this.checkSupportRelevance(article),
          insurtech: this.checkInsurtechRelevance(article),
          competitorMentions: this.checkCompetitors(article),
          trendingTopics: await this.checkTrendingRelevance(article)
        };
        
        article.relevanceScore = this.calculateRelevanceScore(relevanceFactors);
        article.quotelyAngle = this.generateQuotelyAngle(article, relevanceFactors);
        article.competitorMentions = relevanceFactors.competitorMentions;
        
        return article;
      })
    );
    
    return scoredArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  checkAMSRelevance(article: ArticleData): number {
    const amsKeywords = [
      'agency management', 'AMS', 'customer support', 'ticket system',
      'client experience', 'agency technology', 'insurance automation',
      'workflow', 'efficiency', 'productivity', 'integration'
    ];
    
    const content = `${article.title} ${article.excerpt}`.toLowerCase();
    return amsKeywords.filter(keyword => content.includes(keyword.toLowerCase())).length;
  }
  
  checkSupportRelevance(article: ArticleData): number {
    const supportKeywords = [
      'customer service', 'client support', 'help desk', 'ticketing',
      'response time', 'satisfaction', 'customer experience', 'support team'
    ];
    
    const content = `${article.title} ${article.excerpt}`.toLowerCase();
    return supportKeywords.filter(keyword => content.includes(keyword.toLowerCase())).length;
  }
  
  checkInsurtechRelevance(article: ArticleData): number {
    const insurtechKeywords = [
      'insurtech', 'digital transformation', 'AI', 'artificial intelligence',
      'automation', 'innovation', 'technology', 'startup', 'disruption'
    ];
    
    const content = `${article.title} ${article.excerpt}`.toLowerCase();
    return insurtechKeywords.filter(keyword => content.includes(keyword.toLowerCase())).length;
  }
  
  checkCompetitors(article: ArticleData): string[] {
    const competitors = ['Applied Epic', 'competitor platforms', 'AMS360', 'Vertafore', 'HawkSoft', 'AgencyBloc'];
    const content = `${article.title} ${article.excerpt}`;
    
    return competitors.filter(comp => 
      content.includes(comp) || content.includes(comp.toLowerCase())
    );
  }
  
  async checkTrendingRelevance(article: ArticleData): Promise<number> {
    // Simplified trending check - in production, this would connect to trending APIs
    const trendingTopics = ['AI transparency', 'cyber insurance', 'embedded insurance', 'climate risk'];
    const content = `${article.title} ${article.excerpt}`.toLowerCase();
    
    return trendingTopics.filter(topic => content.includes(topic.toLowerCase())).length;
  }
  
  calculateRelevanceScore(factors: RelevanceFactors): number {
    const weights = {
      amsKeywords: 3,
      customerSupport: 2.5,
      insurtech: 2,
      competitorMentions: 1.5,
      trendingTopics: 1
    };
    
    let score = 0;
    score += factors.amsKeywords * weights.amsKeywords;
    score += factors.customerSupport * weights.customerSupport;
    score += factors.insurtech * weights.insurtech;
    score += factors.competitorMentions.length * weights.competitorMentions;
    score += factors.trendingTopics * weights.trendingTopics;
    
    return Math.min(100, score * 10); // Normalize to 0-100
  }
  
  generateQuotelyAngle(article: ArticleData, factors: RelevanceFactors): string {
    const angles: string[] = [];
    
    if (factors.competitorMentions.length > 0) {
      angles.push(`How Quotely's AI-powered AMS outperforms ${factors.competitorMentions.join(', ')}`);
    }
    
    if (factors.amsKeywords > 2) {
      angles.push(`Why modern AMS solutions are critical for this trend`);
    }
    
    if (factors.customerSupport > 2) {
      angles.push(`The customer support revolution: What agencies need to know`);
    }
    
    if (article.category === 'insurtech') {
      angles.push(`Quotely's take: The future of insurance technology`);
    }
    
    if (factors.insurtech > 3) {
      angles.push(`How AI transparency changes the game for insurance agencies`);
    }
    
    return angles[0] || `Industry implications for independent agencies`;
  }
  
  async generateCommentary(article: ArticleData): Promise<any> {
    // Generate expert commentary for the article
    return {
      title: `${article.title}: A Modern AMS Perspective`,
      analysis: this.generateAnalysis(article),
      keyTakeaways: this.generateTakeaways(article),
      callToAction: this.generateCTA(article),
      relatedContent: this.getRelatedContent(article)
    };
  }
  
  private generateAnalysis(article: ArticleData): string {
    if (article.competitorMentions && article.competitorMentions.length > 0) {
      return `While ${article.competitorMentions[0]} offers traditional solutions, modern agencies need transparency and speed. This news highlights the growing demand for AI-powered AMS platforms that prioritize customer experience.`;
    }
    
    if (article.relevanceScore > 70) {
      return `This development represents a significant shift in the insurance technology landscape. Agencies using modern AMS platforms like Quotely are already ahead of this curve, with 60% faster processing and complete AI transparency.`;
    }
    
    return `The insurance industry continues to evolve rapidly. This news underscores the importance of choosing an AMS platform that can adapt quickly while maintaining transparency and efficiency.`;
  }
  
  private generateTakeaways(article: ArticleData): string[] {
    const takeaways: string[] = [];
    
    if (article.category === 'insurtech') {
      takeaways.push('Technology adoption is accelerating across the insurance industry');
      takeaways.push('Agencies need platforms that can integrate with emerging tech');
    }
    
    if (article.quotelyAngle?.includes('AI')) {
      takeaways.push('AI transparency is becoming a competitive advantage');
      takeaways.push('Automated processes must maintain human oversight');
    }
    
    takeaways.push('Modern AMS platforms are essential for staying competitive');
    takeaways.push('Customer experience remains the key differentiator');
    
    return takeaways.slice(0, 3);
  }
  
  private generateCTA(article: ArticleData): any {
    const ctas = {
      comparison: {
        text: 'See How Quotely Compares',
        url: '/compare',
        type: 'primary'
      },
      demo: {
        text: 'Watch 5-Minute Demo',
        url: '/demo',
        type: 'primary'
      },
      assessment: {
        text: 'Get Free AMS Assessment',
        url: '/get-started',
        type: 'secondary'
      }
    };
    
    if (article.competitorMentions && article.competitorMentions.length > 0) {
      return ctas.comparison;
    }
    
    if (article.relevanceScore > 70) {
      return ctas.demo;
    }
    
    return ctas.assessment;
  }
  
  private getRelatedContent(article: ArticleData): any[] {
    const related = [];
    
    if (article.quotelyAngle?.includes('AMS')) {
      related.push({
        title: 'Complete Guide to Modern AMS',
        url: '/resources/ams-guide'
      });
    }
    
    if (article.competitorMentions?.includes('competitor platforms')) {
      related.push({
        title: 'Quotely vs competitor platforms: Detailed Comparison',
        url: '/compare/vs-competitor'
      });
    }
    
    related.push({
      title: 'ROI Calculator: Switch to Quotely',
      url: '/roi-calculator'
    });
    
    return related.slice(0, 2);
  }
}

export default InsuranceJournalSyndication;