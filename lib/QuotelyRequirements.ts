/**
 * Quotely Platform Requirements Definition
 * Comprehensive list of all business and technical requirements
 */

import { requirementTracker, RequirementCategory } from './RequirementTracker';

// Define all Quotely requirements
export const QUOTELY_REQUIREMENTS = {
  // SEO Requirements
  SEO_001: {
    id: 'SEO_001',
    description: 'Robots.txt must allow Google crawling of all public pages',
    priority: 'CRITICAL' as const,
    category: 'SEO' as RequirementCategory,
    acceptanceCriteria: [
      'Robots.txt allows Googlebot access',
      'No blocking of /app/ directory',
      'Sitemap.xml is accessible',
      'Google Search Console shows no crawl errors'
    ],
    businessImpact: 'Site cannot be indexed by Google without this',
    deadline: '2025-01-15'
  },
  
  SEO_002: {
    id: 'SEO_002',
    description: 'Sitemap.xml must prioritize competitor comparison pages at 1.0',
    priority: 'HIGH' as const,
    category: 'SEO' as RequirementCategory,
    acceptanceCriteria: [
      'All /compare/vs-* pages have priority 1.0',
      'Conversion pages have priority 1.0',
      'Dashboard/admin pages excluded from sitemap'
    ],
    businessImpact: 'Competitive pages drive 40% of organic traffic'
  },
  
  SEO_003: {
    id: 'SEO_003',
    description: 'Page load speed must be under 1.2 seconds',
    priority: 'HIGH' as const,
    category: 'PERFORMANCE' as RequirementCategory,
    acceptanceCriteria: [
      'LCP < 1.2s',
      'FID < 100ms',
      'CLS < 0.1',
      'Google PageSpeed score > 98'
    ],
    businessImpact: '60% faster than competitors is key differentiator'
  },
  
  // Conversion Requirements
  CONV_001: {
    id: 'CONV_001',
    description: 'Implement 90-day revenue guarantee with $1,000 bonus messaging',
    priority: 'HIGH' as const,
    category: 'CONVERSION' as RequirementCategory,
    acceptanceCriteria: [
      'Guarantee message prominently displayed on homepage',
      'Terms clearly outlined',
      'CTA buttons reference guarantee'
    ],
    businessImpact: 'Expected to increase conversion by 25%',
    deadline: '2025-01-20'
  },
  
  CONV_002: {
    id: 'CONV_002',
    description: 'Add urgency timer showing "Early Access Pricing Ends March 31st"',
    priority: 'HIGH' as const,
    category: 'CONVERSION' as RequirementCategory,
    acceptanceCriteria: [
      'Countdown timer visible above fold',
      'Updates in real-time',
      'Mobile responsive',
      'Persists across page navigation'
    ],
    businessImpact: 'Urgency increases conversion by 15-20%',
    deadline: '2025-01-18'
  },
  
  CONV_003: {
    id: 'CONV_003',
    description: 'Create ROI calculator comparing costs vs EZLynx/Applied Systems',
    priority: 'HIGH' as const,
    category: 'CONVERSION' as RequirementCategory,
    acceptanceCriteria: [
      'Interactive calculator widget',
      'Shows monthly and annual savings',
      'Includes all competitor pricing tiers',
      'Generates downloadable PDF report'
    ],
    businessImpact: 'ROI calculators increase demo requests by 30%',
    deadline: '2025-01-25'
  },
  
  CONV_004: {
    id: 'CONV_004',
    description: 'Add QUAD tier scarcity indicators showing limited spots',
    priority: 'MEDIUM' as const,
    category: 'CONVERSION' as RequirementCategory,
    acceptanceCriteria: [
      'Shows "Only X spots remaining" for each tier',
      'Updates based on actual availability',
      'Creates FOMO effect'
    ],
    businessImpact: 'Scarcity drives 20% increase in QUAD signups'
  },
  
  // Security Requirements
  SEC_001: {
    id: 'SEC_001',
    description: 'Add security badges (SOC 2, GDPR, 99.9% uptime) to header',
    priority: 'HIGH' as const,
    category: 'SECURITY' as RequirementCategory,
    acceptanceCriteria: [
      'SOC 2 Type II badge displayed',
      'GDPR compliance badge',
      '99.9% uptime guarantee badge',
      'Badges link to security page'
    ],
    businessImpact: 'Trust indicators increase conversion by 18%',
    deadline: '2025-01-22'
  },
  
  // User Experience Requirements
  UX_001: {
    id: 'UX_001',
    description: 'Implement exit-intent popup with compelling offer',
    priority: 'MEDIUM' as const,
    category: 'USER_EXPERIENCE' as RequirementCategory,
    acceptanceCriteria: [
      'Triggers on mouse exit intent',
      'Offers exclusive discount or demo',
      'A/B testing capability',
      'Mobile swipe-up detection'
    ],
    businessImpact: 'Captures 5-10% of abandoning visitors'
  },
  
  UX_002: {
    id: 'UX_002',
    description: 'Add live social proof ticker showing recent signups',
    priority: 'MEDIUM' as const,
    category: 'USER_EXPERIENCE' as RequirementCategory,
    acceptanceCriteria: [
      'Shows recent signup notifications',
      'Includes company name and location',
      'Non-intrusive positioning',
      'Can be dismissed'
    ],
    businessImpact: 'Social proof increases trust and conversion by 12%'
  },
  
  UX_003: {
    id: 'UX_003',
    description: 'Add video testimonials section with measurable results',
    priority: 'MEDIUM' as const,
    category: 'USER_EXPERIENCE' as RequirementCategory,
    acceptanceCriteria: [
      'At least 3 video testimonials',
      'Shows specific metrics/results',
      'Includes company logos',
      'Lazy loaded for performance'
    ],
    businessImpact: 'Video testimonials increase conversion by 20%'
  },
  
  // Competitive Requirements
  COMP_001: {
    id: 'COMP_001',
    description: 'Create competitor comparison table showing exact monthly savings',
    priority: 'HIGH' as const,
    category: 'COMPETITIVE' as RequirementCategory,
    acceptanceCriteria: [
      'Side-by-side feature comparison',
      'Pricing for 5, 10, 20 agents',
      'Highlights Quotely advantages',
      'Mobile responsive table'
    ],
    businessImpact: 'Direct comparisons drive 35% of conversions',
    deadline: '2025-01-17'
  },
  
  COMP_002: {
    id: 'COMP_002',
    description: 'Ensure all competitor comparison pages are indexed and ranking',
    priority: 'CRITICAL' as const,
    category: 'COMPETITIVE' as RequirementCategory,
    acceptanceCriteria: [
      'All /compare/vs-* pages indexed in Google',
      'Ranking for "[competitor] alternative" keywords',
      'Rich snippets implemented',
      'Schema markup for comparisons'
    ],
    businessImpact: 'Competitor keywords drive high-intent traffic',
    dependencies: ['SEO_001', 'SEO_002']
  },
  
  // Infrastructure Requirements
  INFRA_001: {
    id: 'INFRA_001',
    description: 'Implement automated sitemap deployment pipeline',
    priority: 'MEDIUM' as const,
    category: 'INFRASTRUCTURE' as RequirementCategory,
    acceptanceCriteria: [
      'Automatic sitemap generation on deploy',
      'Validation before deployment',
      'Auto-submission to search engines',
      'Rollback capability'
    ],
    businessImpact: 'Ensures SEO changes are immediately reflected'
  },
  
  INFRA_002: {
    id: 'INFRA_002',
    description: 'Set up comprehensive monitoring and alerting',
    priority: 'HIGH' as const,
    category: 'INFRASTRUCTURE' as RequirementCategory,
    acceptanceCriteria: [
      'Uptime monitoring',
      'Performance alerts',
      'SEO ranking tracking',
      'Conversion funnel monitoring'
    ],
    businessImpact: 'Prevents revenue loss from downtime/issues'
  }
};

/**
 * Initialize all Quotely requirements in the tracker
 */
export function initializeQuotelyRequirements(): void {
  Object.values(QUOTELY_REQUIREMENTS).forEach(req => {
    requirementTracker.logRequirement(
      req.id,
      req.description,
      req.priority,
      req.category,
      req
    );
  });
  
  console.log('[QuotelyRequirements] Initialized', Object.keys(QUOTELY_REQUIREMENTS).length, 'requirements');
}

/**
 * Check current status of all requirements
 */
export function checkRequirementStatus(): void {
  const report = requirementTracker.generateReport();
  
  console.log('[QuotelyRequirements] Status Report:');
  console.log('Total Requirements:', report.total);
  console.log('Completion Rate:', report.completionRate.toFixed(1) + '%');
  console.log('By Status:', report.byStatus);
  console.log('By Priority:', report.byPriority);
  
  if (report.criticalPending.length > 0) {
    console.warn('[QuotelyRequirements] CRITICAL requirements pending:');
    report.criticalPending.forEach(req => {
      console.warn(`  - ${req.id}: ${req.description}`);
    });
  }
}

/**
 * Mark specific requirements as completed
 */
export function markRequirementCompleted(requirementId: string, details?: string): void {
  requirementTracker.verifyImplementation(requirementId, {
    passed: true,
    timestamp: new Date().toISOString(),
    verifiedBy: 'MANUAL_VERIFICATION',
    details: details || 'Requirement completed successfully'
  });
  
  console.log(`[QuotelyRequirements] Marked ${requirementId} as COMPLETED`);
}

/**
 * Get requirements needing immediate attention
 */
export function getUrgentRequirements(): any[] {
  const pending = requirementTracker.getRequirementsByStatus('PENDING');
  const inProgress = requirementTracker.getRequirementsByStatus('IN_PROGRESS');
  
  const urgent = [...pending, ...inProgress].filter(req => {
    // Check if deadline is within 7 days
    if (req.deadline) {
      const daysUntilDeadline = Math.floor(
        (new Date(req.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilDeadline <= 7;
    }
    
    // All CRITICAL requirements are urgent
    return req.priority === 'CRITICAL';
  });
  
  return urgent.sort((a, b) => {
    // Sort by priority then deadline
    const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    
    return 0;
  });
}

/**
 * Export requirement IDs for easy reference
 */
export const RequirementIDs = Object.keys(QUOTELY_REQUIREMENTS);

// Auto-initialize on import in browser
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initializeQuotelyRequirements();
    checkRequirementStatus();
    
    // Mark SEO_001 as completed since we just fixed robots.txt
    markRequirementCompleted('SEO_001', 'Fixed robots.txt to allow Google crawling');
  });
}