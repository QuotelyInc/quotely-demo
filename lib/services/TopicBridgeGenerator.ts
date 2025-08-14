import { InsuranceJournalSyndication } from './InsuranceJournalSyndication';

interface AMSPillar {
  id: string;
  name: string;
  keywords: string[];
  relatedTopics: string[];
  contentUrl: string;
}

interface TopicBridge {
  insuranceJournalTopic: string;
  amsPillar: AMSPillar;
  bridgeContent: {
    headline: string;
    connection: string;
    keyPoints: string[];
    cta: string;
    targetUrl: string;
  };
  relevanceScore: number;
}

interface ContentTemplate {
  type: 'comparison' | 'solution' | 'insight' | 'tutorial';
  format: 'article' | 'infographic' | 'video' | 'checklist';
  estimatedReadTime: number;
  seoKeywords: string[];
}

export class TopicBridgeGenerator {
  private amsPillars: AMSPillar[];
  private ijSyndication: InsuranceJournalSyndication;
  private topicMappings: Map<string, string[]>;

  constructor() {
    this.ijSyndication = new InsuranceJournalSyndication();
    this.amsPillars = this.initializeAMSPillars();
    this.topicMappings = this.initializeTopicMappings();
  }

  private initializeAMSPillars(): AMSPillar[] {
    return [
      {
        id: 'customer-support',
        name: 'Customer Support Excellence',
        keywords: ['support', 'ticketing', 'help desk', 'customer service', 'response time', 'satisfaction'],
        relatedTopics: ['client experience', 'retention', 'communication', 'workflow automation'],
        contentUrl: '/solutions/customer-support'
      },
      {
        id: 'automation',
        name: 'Workflow Automation',
        keywords: ['automation', 'workflow', 'efficiency', 'productivity', 'AI', 'machine learning'],
        relatedTopics: ['digital transformation', 'process optimization', 'time savings', 'scalability'],
        contentUrl: '/solutions/automation'
      },
      {
        id: 'integration',
        name: 'Seamless Integrations',
        keywords: ['integration', 'API', 'connectivity', 'ecosystem', 'data sync', 'compatibility'],
        relatedTopics: ['carrier connections', 'third-party tools', 'data management', 'interoperability'],
        contentUrl: '/solutions/integrations'
      },
      {
        id: 'reporting',
        name: 'Advanced Reporting & Analytics',
        keywords: ['reporting', 'analytics', 'insights', 'data', 'metrics', 'dashboard', 'KPI'],
        relatedTopics: ['business intelligence', 'performance tracking', 'forecasting', 'decision making'],
        contentUrl: '/solutions/reporting'
      },
      {
        id: 'compliance',
        name: 'Compliance & Security',
        keywords: ['compliance', 'security', 'regulation', 'privacy', 'GDPR', 'audit', 'protection'],
        relatedTopics: ['risk management', 'data protection', 'regulatory updates', 'cyber security'],
        contentUrl: '/solutions/compliance'
      },
      {
        id: 'mobile',
        name: 'Mobile-First Technology',
        keywords: ['mobile', 'app', 'responsive', 'anywhere', 'remote', 'field', 'device'],
        relatedTopics: ['accessibility', 'remote work', 'agent productivity', 'client convenience'],
        contentUrl: '/solutions/mobile'
      },
      {
        id: 'ai-transparency',
        name: 'Transparent AI Systems',
        keywords: ['AI transparency', 'explainable AI', 'ethical AI', 'machine learning', 'decision logic'],
        relatedTopics: ['trust', 'accountability', 'bias prevention', 'human oversight'],
        contentUrl: '/features/ai-transparency'
      },
      {
        id: 'competitive-intel',
        name: 'Competitive Intelligence (QUAD)',
        keywords: ['QUAD', 'competitive', 'intelligence', 'market analysis', 'benchmarking', 'insights'],
        relatedTopics: ['market trends', 'competitor analysis', 'strategic planning', 'positioning'],
        contentUrl: '/quad'
      }
    ];
  }

  private initializeTopicMappings(): Map<string, string[]> {
    const mappings = new Map<string, string[]>();
    
    // Insurance Journal Topics -> AMS Pillars
    mappings.set('digital transformation', ['automation', 'integration', 'mobile']);
    mappings.set('customer experience', ['customer-support', 'mobile', 'automation']);
    mappings.set('insurtech', ['ai-transparency', 'automation', 'competitive-intel']);
    mappings.set('cyber security', ['compliance', 'integration']);
    mappings.set('agency management', ['reporting', 'automation', 'customer-support']);
    mappings.set('artificial intelligence', ['ai-transparency', 'automation', 'reporting']);
    mappings.set('regulatory changes', ['compliance', 'reporting']);
    mappings.set('market trends', ['competitive-intel', 'reporting']);
    mappings.set('data analytics', ['reporting', 'competitive-intel', 'ai-transparency']);
    mappings.set('remote work', ['mobile', 'integration', 'automation']);
    
    return mappings;
  }

  async generateBridgeContent(ijArticle: any): Promise<TopicBridge[]> {
    const bridges: TopicBridge[] = [];
    const articleTopics = this.extractTopics(ijArticle);
    
    for (const topic of articleTopics) {
      const relevantPillars = this.findRelevantPillars(topic, ijArticle);
      
      for (const pillar of relevantPillars) {
        const bridge = this.createTopicBridge(ijArticle, topic, pillar);
        if (bridge.relevanceScore > 60) {
          bridges.push(bridge);
        }
      }
    }
    
    return bridges.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
  }

  private extractTopics(article: any): string[] {
    const topics: string[] = [];
    const content = `${article.title} ${article.excerpt}`.toLowerCase();
    
    // Check against known topic mappings
    for (const [topic, _] of this.topicMappings) {
      if (content.includes(topic)) {
        topics.push(topic);
      }
    }
    
    // Extract additional topics from category and tags
    if (article.category) {
      topics.push(article.category.toLowerCase());
    }
    
    return [...new Set(topics)]; // Remove duplicates
  }

  private findRelevantPillars(topic: string, article: any): AMSPillar[] {
    const pillars: AMSPillar[] = [];
    const content = `${article.title} ${article.excerpt}`.toLowerCase();
    
    // Get mapped pillars for the topic
    const mappedPillarIds = this.topicMappings.get(topic) || [];
    
    for (const pillarId of mappedPillarIds) {
      const pillar = this.amsPillars.find(p => p.id === pillarId);
      if (pillar) {
        pillars.push(pillar);
      }
    }
    
    // Also check for keyword matches
    for (const pillar of this.amsPillars) {
      const keywordMatches = pillar.keywords.filter(keyword => 
        content.includes(keyword.toLowerCase())
      ).length;
      
      if (keywordMatches > 2 && !pillars.includes(pillar)) {
        pillars.push(pillar);
      }
    }
    
    return pillars;
  }

  private createTopicBridge(ijArticle: any, topic: string, pillar: AMSPillar): TopicBridge {
    const bridgeContent = this.generateBridgeNarrative(ijArticle, topic, pillar);
    const relevanceScore = this.calculateBridgeRelevance(ijArticle, pillar);
    
    return {
      insuranceJournalTopic: topic,
      amsPillar: pillar,
      bridgeContent,
      relevanceScore
    };
  }

  private generateBridgeNarrative(ijArticle: any, topic: string, pillar: AMSPillar): any {
    const narratives = this.getBridgeNarratives(pillar.id);
    const selectedNarrative = narratives[Math.floor(Math.random() * narratives.length)];
    
    return {
      headline: this.generateHeadline(ijArticle, pillar),
      connection: selectedNarrative.connection.replace('{topic}', topic),
      keyPoints: this.generateKeyPoints(ijArticle, pillar),
      cta: selectedNarrative.cta,
      targetUrl: pillar.contentUrl
    };
  }

  private getBridgeNarratives(pillarId: string): any[] {
    const narratives: Record<string, any[]> = {
      'customer-support': [
        {
          connection: 'As {topic} reshapes insurance, agencies need robust support systems to maintain service excellence.',
          cta: 'See How Quotely Enhances Support'
        },
        {
          connection: 'This {topic} trend directly impacts how agencies handle customer inquiries and support tickets.',
          cta: 'Explore Support Solutions'
        }
      ],
      'automation': [
        {
          connection: 'The {topic} developments highlight why automation is no longer optional for competitive agencies.',
          cta: 'Discover Automation Benefits'
        },
        {
          connection: 'Leading agencies are leveraging {topic} through intelligent workflow automation.',
          cta: 'Automate Your Workflows'
        }
      ],
      'ai-transparency': [
        {
          connection: 'While {topic} advances rapidly, transparency in AI decision-making becomes crucial for trust.',
          cta: 'Learn About Transparent AI'
        },
        {
          connection: 'This {topic} news underscores the importance of explainable AI in insurance technology.',
          cta: 'See Our AI Transparency'
        }
      ],
      'competitive-intel': [
        {
          connection: 'Understanding {topic} through competitive intelligence gives agencies the strategic edge.',
          cta: 'Access QUAD Intelligence'
        },
        {
          connection: 'QUAD system analysis reveals how {topic} impacts market positioning.',
          cta: 'Get Competitive Insights'
        }
      ],
      'integration': [
        {
          connection: 'As {topic} evolves, seamless integrations become essential for operational efficiency.',
          cta: 'Explore Integration Options'
        }
      ],
      'reporting': [
        {
          connection: 'Data-driven insights on {topic} help agencies make informed strategic decisions.',
          cta: 'Unlock Advanced Analytics'
        }
      ],
      'compliance': [
        {
          connection: 'The {topic} developments bring new compliance considerations agencies must address.',
          cta: 'Ensure Compliance Ready'
        }
      ],
      'mobile': [
        {
          connection: 'Mobile-first approaches to {topic} enable agencies to serve clients anywhere.',
          cta: 'Go Mobile with Quotely'
        }
      ]
    };
    
    return narratives[pillarId] || [{
      connection: 'This {topic} trend connects directly to modern AMS capabilities.',
      cta: 'Learn More'
    }];
  }

  private generateHeadline(ijArticle: any, pillar: AMSPillar): string {
    const templates = [
      `How ${pillar.name} Addresses "${ijArticle.title}"`,
      `${pillar.name}: Your Answer to ${this.extractKeyPhrase(ijArticle.title)}`,
      `Turn ${this.extractKeyPhrase(ijArticle.title)} Into Competitive Advantage`,
      `Why ${pillar.name} Matters for ${this.extractKeyPhrase(ijArticle.title)}`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private extractKeyPhrase(title: string): string {
    // Extract the most impactful part of the title
    const colonIndex = title.indexOf(':');
    if (colonIndex > 0) {
      return title.substring(colonIndex + 1).trim();
    }
    
    // Remove common prefixes
    const prefixes = ['How', 'Why', 'What', 'When', 'The'];
    for (const prefix of prefixes) {
      if (title.startsWith(prefix + ' ')) {
        return title.substring(prefix.length + 1);
      }
    }
    
    return title;
  }

  private generateKeyPoints(ijArticle: any, pillar: AMSPillar): string[] {
    const points: string[] = [];
    
    // Context-specific points based on pillar
    switch (pillar.id) {
      case 'customer-support':
        points.push('Reduce response times by 73% with intelligent ticket routing');
        points.push('Maintain service excellence during industry changes');
        points.push('Scale support operations without adding headcount');
        break;
      case 'automation':
        points.push('Automate repetitive tasks affected by this trend');
        points.push('Free up 40% more time for strategic initiatives');
        points.push('Ensure consistency across all processes');
        break;
      case 'ai-transparency':
        points.push('Understand exactly how AI makes decisions');
        points.push('Build client trust with explainable automation');
        points.push('Maintain human oversight and control');
        break;
      case 'competitive-intel':
        points.push('Track competitor responses to market changes');
        points.push('Identify opportunities before competition');
        points.push('Make data-driven strategic decisions');
        break;
      default:
        points.push('Stay ahead of industry changes');
        points.push('Leverage technology for competitive advantage');
        points.push('Transform challenges into opportunities');
    }
    
    return points.slice(0, 3);
  }

  private calculateBridgeRelevance(ijArticle: any, pillar: AMSPillar): number {
    let score = 0;
    const content = `${ijArticle.title} ${ijArticle.excerpt}`.toLowerCase();
    
    // Keyword matching (40 points max)
    const keywordMatches = pillar.keywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    ).length;
    score += Math.min(keywordMatches * 10, 40);
    
    // Related topic matching (30 points max)
    const topicMatches = pillar.relatedTopics.filter(topic => 
      content.includes(topic.toLowerCase())
    ).length;
    score += Math.min(topicMatches * 10, 30);
    
    // Article relevance score inheritance (20 points max)
    if (ijArticle.relevanceScore) {
      score += (ijArticle.relevanceScore / 100) * 20;
    }
    
    // Recency bonus (10 points max)
    const articleAge = Date.now() - new Date(ijArticle.pubDate).getTime();
    const daysSincePublished = articleAge / (1000 * 60 * 60 * 24);
    if (daysSincePublished < 1) score += 10;
    else if (daysSincePublished < 7) score += 5;
    else if (daysSincePublished < 30) score += 2;
    
    return Math.min(score, 100);
  }

  async generateContentStrategy(bridges: TopicBridge[]): Promise<ContentTemplate[]> {
    const strategies: ContentTemplate[] = [];
    
    for (const bridge of bridges) {
      const template = this.selectContentTemplate(bridge);
      strategies.push(template);
    }
    
    return strategies;
  }

  private selectContentTemplate(bridge: TopicBridge): ContentTemplate {
    const templates: ContentTemplate[] = [
      {
        type: 'comparison',
        format: 'article',
        estimatedReadTime: 5,
        seoKeywords: this.generateSEOKeywords(bridge)
      },
      {
        type: 'solution',
        format: 'infographic',
        estimatedReadTime: 2,
        seoKeywords: this.generateSEOKeywords(bridge)
      },
      {
        type: 'insight',
        format: 'video',
        estimatedReadTime: 3,
        seoKeywords: this.generateSEOKeywords(bridge)
      },
      {
        type: 'tutorial',
        format: 'checklist',
        estimatedReadTime: 4,
        seoKeywords: this.generateSEOKeywords(bridge)
      }
    ];
    
    // Select based on relevance score and pillar type
    if (bridge.relevanceScore > 80) {
      return templates[0]; // High relevance = detailed comparison
    } else if (bridge.amsPillar.id === 'ai-transparency') {
      return templates[2]; // AI topics work well as videos
    } else if (bridge.amsPillar.id === 'automation') {
      return templates[3]; // Automation = practical tutorials
    }
    
    return templates[1]; // Default to infographic
  }

  private generateSEOKeywords(bridge: TopicBridge): string[] {
    const keywords: string[] = [];
    
    // Add pillar keywords
    keywords.push(...bridge.amsPillar.keywords.slice(0, 3));
    
    // Add topic-specific keywords
    keywords.push(bridge.insuranceJournalTopic);
    
    // Add competitive keywords
    keywords.push('AMS platform', 'insurance technology', 'agency management');
    
    // Add action keywords
    keywords.push('compare', 'vs', 'alternative', 'solution');
    
    return [...new Set(keywords)].slice(0, 8);
  }

  async generateAutomatedResponse(ijArticle: any): Promise<string> {
    const bridges = await this.generateBridgeContent(ijArticle);
    
    if (bridges.length === 0) {
      return this.generateGenericResponse(ijArticle);
    }
    
    const topBridge = bridges[0];
    
    return `
      <article class="quotely-response">
        <h2>${topBridge.bridgeContent.headline}</h2>
        <p class="connection">${topBridge.bridgeContent.connection}</p>
        <ul class="key-points">
          ${topBridge.bridgeContent.keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
        <div class="cta-section">
          <a href="${topBridge.bridgeContent.targetUrl}" class="cta-button">
            ${topBridge.bridgeContent.cta} →
          </a>
        </div>
        <footer class="meta">
          <span>Relevance Score: ${topBridge.relevanceScore}%</span>
          <span>Focus Area: ${topBridge.amsPillar.name}</span>
        </footer>
      </article>
    `;
  }

  private generateGenericResponse(ijArticle: any): string {
    return `
      <article class="quotely-response">
        <h2>Industry Insights: ${ijArticle.title}</h2>
        <p>This development highlights important trends in insurance technology. 
           Modern AMS platforms like Quotely help agencies stay ahead of these changes.</p>
        <div class="cta-section">
          <a href="/demo" class="cta-button">Learn How Quotely Can Help →</a>
        </div>
      </article>
    `;
  }
}

export default TopicBridgeGenerator;