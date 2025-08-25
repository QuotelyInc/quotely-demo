export interface AMSArticle {
  id: string
  tier: 'hub' | 'pillar' | 'subtopic'
  title: string
  slug: string
  metaDescription: string
  wordCount: number
  readTime: number
  parentId?: string
  keywords: string[]
  relatedArticles: string[]
}

export const AMSContentMap: AMSArticle[] = [
  // Tier 1: Hub Page
  {
    id: 'hub',
    tier: 'hub',
    title: 'AMS Agency Management System: The Complete 2025 Guide',
    slug: 'ams-agency-management-system',
    metaDescription: 'Master Agency Management Systems with our comprehensive 5000-word guide. Learn selection, implementation, ROI calculation, and optimization strategies from 1000+ implementations.',
    wordCount: 5000,
    readTime: 25,
    keywords: ['AMS', 'agency management system', 'insurance AMS', 'AMS platform', 'AMS software'],
    relatedArticles: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8']
  },

  // Tier 2: Pillar Pages
  {
    id: 'p1',
    tier: 'pillar',
    title: 'AMS Customer Support & Experience Excellence Guide',
    slug: 'ams-customer-support-experience',
    metaDescription: 'Transform customer support with AMS. Learn how to achieve 67% ticket reduction, 2-minute response times, and 95% satisfaction scores. Based on 1000+ implementations.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS customer support', 'AMS customer experience', 'insurance customer service', 'AMS support'],
    relatedArticles: ['hub', 's1.1', 's1.2', 's1.3', 's1.4', 's1.5']
  },
  {
    id: 'p2',
    tier: 'pillar',
    title: 'Complete AMS Technical Support & Troubleshooting Guide',
    slug: 'ams-technical-support-troubleshooting',
    metaDescription: 'Master AMS technical support with our comprehensive troubleshooting guide. Learn system optimization, integration management, and issue resolution strategies.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS technical support', 'AMS troubleshooting', 'AMS system issues', 'AMS help'],
    relatedArticles: ['hub', 's2.1', 's2.2', 's2.3', 's2.4', 's2.5']
  },
  {
    id: 'p3',
    tier: 'pillar',
    title: 'AMS Pricing, Subscriptions & Cost Analysis Guide',
    slug: 'ams-pricing-subscription-costs',
    metaDescription: 'Understand AMS pricing models, calculate ROI, and optimize costs. Compare vendor pricing and learn strategies to maximize value from your AMS investment.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS pricing', 'AMS costs', 'AMS subscription', 'AMS ROI', 'AMS budget'],
    relatedArticles: ['hub', 's3.1', 's3.2', 's3.3', 's3.4', 's3.5']
  },
  {
    id: 'p4',
    tier: 'pillar',
    title: 'AMS Operational Efficiency & Workflow Automation',
    slug: 'ams-operational-efficiency-workflow',
    metaDescription: 'Achieve 45% efficiency gains with AMS workflow automation. Learn process optimization, automation strategies, and performance measurement techniques.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS efficiency', 'AMS workflow', 'AMS automation', 'AMS productivity', 'AMS operations'],
    relatedArticles: ['hub', 's4.1', 's4.2', 's4.3', 's4.4', 's4.5']
  },
  {
    id: 'p5',
    tier: 'pillar',
    title: 'AMS Client Relationship & Communication Management',
    slug: 'ams-client-relationship-communication',
    metaDescription: 'Build stronger client relationships with AMS communication tools. Master CRM integration, automated outreach, and personalized engagement strategies.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS CRM', 'AMS communication', 'AMS client management', 'AMS relationships'],
    relatedArticles: ['hub', 's5.1', 's5.2', 's5.3', 's5.4', 's5.5']
  },
  {
    id: 'p6',
    tier: 'pillar',
    title: 'AMS Integrations & Customization Complete Guide',
    slug: 'ams-integrations-customization',
    metaDescription: 'Master AMS integrations with carriers, rating engines, and third-party tools. Learn API connectivity, customization strategies, and integration best practices.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS integration', 'AMS API', 'AMS customization', 'AMS connectivity', 'carrier integration'],
    relatedArticles: ['hub', 's6.1', 's6.2', 's6.3', 's6.4', 's6.5']
  },
  {
    id: 'p7',
    tier: 'pillar',
    title: 'AMS Security, Compliance & Risk Management',
    slug: 'ams-security-compliance-risk',
    metaDescription: 'Ensure AMS security and compliance with industry regulations. Learn data protection, audit preparation, and risk management strategies for insurance agencies.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS security', 'AMS compliance', 'AMS data protection', 'AMS risk management', 'AMS audit'],
    relatedArticles: ['hub', 's7.1', 's7.2', 's7.3', 's7.4', 's7.5']
  },
  {
    id: 'p8',
    tier: 'pillar',
    title: 'AMS Features Comparison & Competitive Analysis',
    slug: 'ams-features-competitive-comparison',
    metaDescription: 'Compare leading AMS platforms feature-by-feature. Analyze Quotely vs Applied Epic vs competitor platforms vs AMS360 to make informed selection decisions.',
    wordCount: 3000,
    readTime: 12,
    parentId: 'hub',
    keywords: ['AMS comparison', 'AMS features', 'AMS vendors', 'best AMS platform', 'AMS selection'],
    relatedArticles: ['hub', 's8.1', 's8.2', 's8.3', 's8.4', 's8.5']
  },

  // Tier 3: Sub-Topic Articles
  // Customer Support Cluster (s1.x)
  {
    id: 's1.1',
    tier: 'subtopic',
    title: 'The Transformative Benefits of AMS Customer Support',
    slug: 'benefits-ams-customer-support',
    metaDescription: 'Discover 15 game-changing benefits of AMS customer support including 67% faster response times, 89% retention, and 300% ROI. Real case studies included.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p1',
    keywords: ['AMS support benefits', 'customer support ROI', 'AMS advantages'],
    relatedArticles: ['p1', 's1.2', 's1.3', 'hub']
  },
  {
    id: 's1.2',
    tier: 'subtopic',
    title: 'AMS vs Traditional Customer Support: Complete Comparison',
    slug: 'ams-vs-traditional-customer-support',
    metaDescription: 'Compare AMS-powered support to traditional methods. See why modern agencies achieve 89% first-contact resolution vs 45% with legacy systems.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p1',
    keywords: ['AMS vs traditional', 'support comparison', 'modern vs legacy'],
    relatedArticles: ['p1', 's1.1', 's1.3', 'hub']
  },
  {
    id: 's1.3',
    tier: 'subtopic',
    title: 'Setting Up 24/7 Customer Support with AMS',
    slug: 'setup-24-7-customer-support-ams',
    metaDescription: 'Learn how to implement round-the-clock support using AMS automation. Achieve 24/7 availability without 24/7 staffing through AI and workflows.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p1',
    keywords: ['24/7 support', 'always-on support', 'AMS automation'],
    relatedArticles: ['p1', 's1.1', 's1.4', 'hub']
  },
  {
    id: 's1.4',
    tier: 'subtopic',
    title: 'AMS Customer Service Best Practices & Standards',
    slug: 'ams-customer-service-best-practices',
    metaDescription: 'Master customer service excellence with proven AMS best practices. Learn strategies used by top-performing agencies to achieve 95% satisfaction.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p1',
    keywords: ['customer service best practices', 'AMS standards', 'service excellence'],
    relatedArticles: ['p1', 's1.3', 's1.5', 'hub']
  },
  {
    id: 's1.5',
    tier: 'subtopic',
    title: 'Measuring AMS Customer Support Performance & ROI',
    slug: 'measuring-ams-support-performance-roi',
    metaDescription: 'Track and optimize AMS support performance with KPIs, metrics, and ROI calculations. Learn what to measure and how to improve continuously.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p1',
    keywords: ['support metrics', 'AMS KPIs', 'support ROI', 'performance measurement'],
    relatedArticles: ['p1', 's1.4', 'p3', 'hub']
  },

  // Technical Support Cluster (s2.x)
  {
    id: 's2.1',
    tier: 'subtopic',
    title: 'Common AMS Technical Issues & Solutions',
    slug: 'common-ams-technical-issues-solutions',
    metaDescription: 'Troubleshoot common AMS technical problems with our comprehensive solution guide. Fix integration errors, performance issues, and data sync problems.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p2',
    keywords: ['AMS issues', 'technical problems', 'AMS solutions', 'troubleshooting'],
    relatedArticles: ['p2', 's2.2', 's2.3', 'hub']
  },
  {
    id: 's2.2',
    tier: 'subtopic',
    title: 'AMS System Performance Optimization Guide',
    slug: 'ams-system-performance-optimization',
    metaDescription: 'Optimize AMS performance for maximum speed and efficiency. Learn database tuning, caching strategies, and configuration best practices.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p2',
    keywords: ['AMS performance', 'system optimization', 'AMS speed', 'performance tuning'],
    relatedArticles: ['p2', 's2.1', 's2.3', 'hub']
  },
  {
    id: 's2.3',
    tier: 'subtopic',
    title: 'AMS Data Migration & Backup Strategies',
    slug: 'ams-data-migration-backup-strategies',
    metaDescription: 'Ensure successful AMS data migration and reliable backups. Learn proven strategies for data transfer, validation, and disaster recovery planning.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p2',
    keywords: ['data migration', 'AMS backup', 'data transfer', 'disaster recovery'],
    relatedArticles: ['p2', 's2.2', 's2.4', 'hub']
  },
  {
    id: 's2.4',
    tier: 'subtopic',
    title: 'AMS User Training & Onboarding Programs',
    slug: 'ams-user-training-onboarding',
    metaDescription: 'Develop effective AMS training programs for rapid user adoption. Learn onboarding best practices, certification paths, and continuous education strategies.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p2',
    keywords: ['AMS training', 'user onboarding', 'AMS education', 'adoption strategies'],
    relatedArticles: ['p2', 's2.3', 's2.5', 'hub']
  },
  {
    id: 's2.5',
    tier: 'subtopic',
    title: 'AMS Technical Support Ticket Management',
    slug: 'ams-technical-support-ticket-management',
    metaDescription: 'Master technical support ticket management in AMS. Learn prioritization, routing, escalation, and resolution tracking for optimal support delivery.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p2',
    keywords: ['ticket management', 'support tickets', 'issue tracking', 'ticket system'],
    relatedArticles: ['p2', 's2.4', 'p1', 'hub']
  },

  // Pricing & Costs Cluster (s3.x)
  {
    id: 's3.1',
    tier: 'subtopic',
    title: 'Understanding AMS Pricing Models & Structures',
    slug: 'understanding-ams-pricing-models',
    metaDescription: 'Decode AMS pricing models including per-user, transaction-based, and tiered structures. Learn how to evaluate and compare vendor pricing effectively.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p3',
    keywords: ['AMS pricing models', 'subscription types', 'pricing structures', 'cost models'],
    relatedArticles: ['p3', 's3.2', 's3.3', 'hub']
  },
  {
    id: 's3.2',
    tier: 'subtopic',
    title: 'Calculating AMS ROI: Complete Framework',
    slug: 'calculating-ams-roi-framework',
    metaDescription: 'Calculate precise AMS ROI with our proven framework. Include efficiency gains, cost savings, revenue growth, and intangible benefits in your analysis.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p3',
    keywords: ['AMS ROI', 'ROI calculation', 'investment return', 'cost benefit analysis'],
    relatedArticles: ['p3', 's3.1', 's3.3', 'hub']
  },
  {
    id: 's3.3',
    tier: 'subtopic',
    title: 'Hidden AMS Costs & How to Avoid Them',
    slug: 'hidden-ams-costs-avoid',
    metaDescription: 'Identify and avoid hidden AMS costs including implementation fees, customization charges, and integration expenses. Get complete cost transparency.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p3',
    keywords: ['hidden costs', 'AMS fees', 'unexpected expenses', 'cost transparency'],
    relatedArticles: ['p3', 's3.2', 's3.4', 'hub']
  },
  {
    id: 's3.4',
    tier: 'subtopic',
    title: 'AMS Budget Planning & Cost Optimization',
    slug: 'ams-budget-planning-optimization',
    metaDescription: 'Plan and optimize your AMS budget effectively. Learn cost reduction strategies, negotiation tactics, and value maximization techniques.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p3',
    keywords: ['AMS budget', 'cost optimization', 'budget planning', 'cost reduction'],
    relatedArticles: ['p3', 's3.3', 's3.5', 'hub']
  },
  {
    id: 's3.5',
    tier: 'subtopic',
    title: 'AMS Vendor Pricing Comparison 2025',
    slug: 'ams-vendor-pricing-comparison-2025',
    metaDescription: 'Compare 2025 pricing for Quotely, Applied Epic, competitor platforms, AMS360, and more. Get detailed cost breakdowns and value analysis for each platform.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p3',
    keywords: ['vendor pricing', 'AMS comparison', 'platform costs', '2025 pricing'],
    relatedArticles: ['p3', 's3.4', 'p8', 'hub']
  },

  // Operational Efficiency Cluster (s4.x)
  {
    id: 's4.1',
    tier: 'subtopic',
    title: 'AMS Workflow Automation Best Practices',
    slug: 'ams-workflow-automation-best-practices',
    metaDescription: 'Master workflow automation in AMS to achieve 45% efficiency gains. Learn process mapping, automation rules, and optimization strategies.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p4',
    keywords: ['workflow automation', 'process automation', 'AMS workflows', 'automation best practices'],
    relatedArticles: ['p4', 's4.2', 's4.3', 'hub']
  },
  {
    id: 's4.2',
    tier: 'subtopic',
    title: 'Streamlining Insurance Operations with AMS',
    slug: 'streamlining-insurance-operations-ams',
    metaDescription: 'Transform insurance operations with AMS streamlining techniques. Eliminate bottlenecks, reduce manual tasks, and accelerate processing times.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p4',
    keywords: ['streamline operations', 'operational efficiency', 'process improvement', 'AMS optimization'],
    relatedArticles: ['p4', 's4.1', 's4.3', 'hub']
  },
  {
    id: 's4.3',
    tier: 'subtopic',
    title: 'AMS Document Management & Automation',
    slug: 'ams-document-management-automation',
    metaDescription: 'Eliminate paper with AMS document management. Learn scanning, indexing, retrieval, and automated document processing strategies.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p4',
    keywords: ['document management', 'paperless office', 'document automation', 'digital documents'],
    relatedArticles: ['p4', 's4.2', 's4.4', 'hub']
  },
  {
    id: 's4.4',
    tier: 'subtopic',
    title: 'AMS Reporting & Analytics for Decision Making',
    slug: 'ams-reporting-analytics-decision-making',
    metaDescription: 'Leverage AMS reporting and analytics for data-driven decisions. Master dashboards, KPIs, predictive analytics, and business intelligence.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p4',
    keywords: ['AMS reporting', 'analytics', 'business intelligence', 'data insights'],
    relatedArticles: ['p4', 's4.3', 's4.5', 'hub']
  },
  {
    id: 's4.5',
    tier: 'subtopic',
    title: 'Scaling Agency Operations with AMS',
    slug: 'scaling-agency-operations-ams',
    metaDescription: 'Scale your agency efficiently with AMS capabilities. Handle 10x growth without proportional cost increases through automation and optimization.',
    wordCount: 1500,
    readTime: 6,
    parentId: 'p4',
    keywords: ['scale operations', 'agency growth', 'AMS scalability', 'expansion strategies'],
    relatedArticles: ['p4', 's4.4', 'p5', 'hub']
  },

  // Additional clusters would continue with similar patterns...
]

export function getArticleBySlug(slug: string): AMSArticle | undefined {
  return AMSContentMap.find(article => article.slug === slug)
}

export function getArticlesByTier(tier: 'hub' | 'pillar' | 'subtopic'): AMSArticle[] {
  return AMSContentMap.filter(article => article.tier === tier)
}

export function getRelatedArticles(articleId: string): AMSArticle[] {
  const article = AMSContentMap.find(a => a.id === articleId)
  if (!article) return []
  
  return article.relatedArticles
    .map(id => AMSContentMap.find(a => a.id === id))
    .filter(Boolean) as AMSArticle[]
}

export function getChildArticles(parentId: string): AMSArticle[] {
  return AMSContentMap.filter(article => article.parentId === parentId)
}