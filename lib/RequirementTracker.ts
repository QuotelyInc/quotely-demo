/**
 * Requirement Tracking System for Quotely Platform
 * Ensures all business requirements are tracked, implemented, and verified
 */

interface Requirement {
  id: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'BLOCKED';
  implementer: string | null;
  verification: VerificationResult | null;
  category: RequirementCategory;
  dependencies?: string[];
  deadline?: string;
  businessImpact?: string;
  acceptanceCriteria?: string[];
}

interface VerificationResult {
  passed: boolean;
  timestamp: string;
  verifiedBy: string;
  details: string;
  metrics?: Record<string, any>;
  screenshots?: string[];
}

type RequirementCategory = 
  | 'SEO'
  | 'CONVERSION'
  | 'PERFORMANCE'
  | 'SECURITY'
  | 'COMPETITIVE'
  | 'USER_EXPERIENCE'
  | 'INFRASTRUCTURE'
  | 'COMPLIANCE';

class RequirementTracker {
  private requirements: Map<string, Requirement> = new Map();
  private webhookUrl = process.env.NEXT_PUBLIC_REQUIREMENT_WEBHOOK_URL;
  
  /**
   * Log a new requirement with automatic tracking
   */
  logRequirement(
    id: string,
    description: string,
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH',
    category: RequirementCategory = 'CONVERSION',
    additionalData?: Partial<Requirement>
  ): Requirement {
    const requirement: Requirement = {
      id,
      description,
      priority,
      category,
      timestamp: new Date().toISOString(),
      status: 'PENDING',
      implementer: null,
      verification: null,
      ...additionalData
    };
    
    // Store requirement
    this.saveRequirement(requirement);
    
    // Notify team
    this.notifyImplementationTeam(requirement);
    
    // Set up monitoring
    this.scheduleVerification(requirement);
    
    console.log(`[RequirementTracker] Logged: ${id} - ${description}`);
    
    return requirement;
  }
  
  /**
   * Update requirement status
   */
  updateStatus(
    requirementId: string,
    status: Requirement['status'],
    implementer?: string
  ): void {
    const requirement = this.getRequirement(requirementId);
    if (!requirement) {
      throw new Error(`Requirement ${requirementId} not found`);
    }
    
    requirement.status = status;
    if (implementer) {
      requirement.implementer = implementer;
    }
    
    this.saveRequirement(requirement);
    
    // Trigger workflows based on status
    if (status === 'COMPLETED') {
      this.triggerCompletionWorkflow(requirement);
    } else if (status === 'FAILED' || status === 'BLOCKED') {
      this.escalateFailure(requirement);
    }
  }
  
  /**
   * Verify implementation of a requirement
   */
  verifyImplementation(
    requirementId: string,
    verificationResult: VerificationResult
  ): void {
    const requirement = this.getRequirement(requirementId);
    if (!requirement) {
      throw new Error(`Requirement ${requirementId} not found`);
    }
    
    requirement.verification = verificationResult;
    requirement.status = verificationResult.passed ? 'COMPLETED' : 'FAILED';
    
    this.saveRequirement(requirement);
    
    if (!verificationResult.passed) {
      this.escalateFailure(requirement);
    } else {
      this.recordSuccess(requirement);
    }
    
    console.log(
      `[RequirementTracker] Verification ${verificationResult.passed ? 'PASSED' : 'FAILED'}: ${requirementId}`
    );
  }
  
  /**
   * Get a specific requirement
   */
  getRequirement(id: string): Requirement | undefined {
    return this.requirements.get(id);
  }
  
  /**
   * Get all requirements by status
   */
  getRequirementsByStatus(status: Requirement['status']): Requirement[] {
    return Array.from(this.requirements.values()).filter(
      req => req.status === status
    );
  }
  
  /**
   * Get requirements by category
   */
  getRequirementsByCategory(category: RequirementCategory): Requirement[] {
    return Array.from(this.requirements.values()).filter(
      req => req.category === category
    );
  }
  
  /**
   * Save requirement to storage
   */
  private saveRequirement(requirement: Requirement): void {
    this.requirements.set(requirement.id, requirement);
    
    // Persist to localStorage for client-side tracking
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quotely_requirements') || '{}';
      const requirements = JSON.parse(stored);
      requirements[requirement.id] = requirement;
      localStorage.setItem('quotely_requirements', JSON.stringify(requirements));
    }
    
    // Send to analytics
    this.trackRequirement(requirement);
  }
  
  /**
   * Load requirements from storage
   */
  loadRequirements(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quotely_requirements');
      if (stored) {
        const requirements = JSON.parse(stored);
        Object.entries(requirements).forEach(([id, req]) => {
          this.requirements.set(id, req as Requirement);
        });
      }
    }
  }
  
  /**
   * Notify implementation team
   */
  private async notifyImplementationTeam(requirement: Requirement): Promise<void> {
    // Send webhook notification
    if (this.webhookUrl) {
      try {
        await fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'NEW_REQUIREMENT',
            requirement,
            urgency: this.calculateUrgency(requirement)
          })
        });
      } catch (error) {
        console.error('[RequirementTracker] Failed to send webhook:', error);
      }
    }
    
    // Log to console for development
    console.log(`[RequirementTracker] Team notified:`, requirement);
  }
  
  /**
   * Schedule automatic verification
   */
  private scheduleVerification(requirement: Requirement): void {
    // Schedule verification based on priority
    const delay = this.getVerificationDelay(requirement.priority);
    
    setTimeout(() => {
      this.performAutomaticVerification(requirement);
    }, delay);
  }
  
  /**
   * Perform automatic verification
   */
  private async performAutomaticVerification(requirement: Requirement): Promise<void> {
    // Check if requirement is still pending
    const current = this.getRequirement(requirement.id);
    if (!current || current.status !== 'PENDING') {
      return;
    }
    
    // Perform verification based on category
    const verificationResult = await this.runVerificationChecks(requirement);
    this.verifyImplementation(requirement.id, verificationResult);
  }
  
  /**
   * Run verification checks based on requirement category
   */
  private async runVerificationChecks(requirement: Requirement): Promise<VerificationResult> {
    const checks: Record<RequirementCategory, () => Promise<boolean>> = {
      SEO: async () => this.verifySEORequirement(requirement),
      CONVERSION: async () => this.verifyConversionRequirement(requirement),
      PERFORMANCE: async () => this.verifyPerformanceRequirement(requirement),
      SECURITY: async () => this.verifySecurityRequirement(requirement),
      COMPETITIVE: async () => this.verifyCompetitiveRequirement(requirement),
      USER_EXPERIENCE: async () => this.verifyUXRequirement(requirement),
      INFRASTRUCTURE: async () => this.verifyInfrastructureRequirement(requirement),
      COMPLIANCE: async () => this.verifyComplianceRequirement(requirement)
    };
    
    const passed = await checks[requirement.category]();
    
    return {
      passed,
      timestamp: new Date().toISOString(),
      verifiedBy: 'AUTOMATIC_VERIFICATION',
      details: `Automatic verification ${passed ? 'passed' : 'failed'} for ${requirement.category}`,
      metrics: await this.gatherMetrics(requirement)
    };
  }
  
  /**
   * Verify SEO requirements
   */
  private async verifySEORequirement(_requirement: Requirement): Promise<boolean> {
    // Check if sitemap exists and is accessible
    if (_requirement.id.includes('sitemap')) {
      try {
        const response = await fetch('/sitemap.xml');
        return response.ok;
      } catch {
        return false;
      }
    }
    
    // Check robots.txt
    if (_requirement.id.includes('robots')) {
      try {
        const response = await fetch('/robots.txt');
        const text = await response.text();
        return !text.includes('Disallow: /');
      } catch {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Verify conversion requirements
   */
  private async verifyConversionRequirement(_requirement: Requirement): Promise<boolean> {
    // Check if conversion elements exist on page
    if (typeof document !== 'undefined') {
      const conversionElements = document.querySelectorAll('[data-conversion]');
      return conversionElements.length > 0;
    }
    return false;
  }
  
  /**
   * Verify performance requirements
   */
  private async verifyPerformanceRequirement(_requirement: Requirement): Promise<boolean> {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = perfData.loadEventEnd - perfData.fetchStart;
      return loadTime < 3000; // Under 3 seconds
    }
    return false;
  }
  
  /**
   * Verify security requirements
   */
  private async verifySecurityRequirement(_requirement: Requirement): Promise<boolean> {
    if (typeof window !== 'undefined') {
      // Check for HTTPS
      return window.location.protocol === 'https:';
    }
    return false;
  }
  
  /**
   * Verify competitive requirements
   */
  private async verifyCompetitiveRequirement(_requirement: Requirement): Promise<boolean> {
    // Check if competitive comparison pages exist
    const competitorPages = [
      '/compare/vs-competitor',
      '/compare/vs-applied-systems'
    ];
    
    for (const page of competitorPages) {
      try {
        const response = await fetch(page);
        if (!response.ok) return false;
      } catch {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Verify UX requirements
   */
  private async verifyUXRequirement(_requirement: Requirement): Promise<boolean> {
    if (typeof document !== 'undefined') {
      // Check for responsive meta tag
      const viewport = document.querySelector('meta[name="viewport"]');
      return viewport !== null;
    }
    return false;
  }
  
  /**
   * Verify infrastructure requirements
   */
  private async verifyInfrastructureRequirement(_requirement: Requirement): Promise<boolean> {
    // Check if API is responding
    try {
      const response = await fetch('/api/health');
      return response.ok;
    } catch {
      return false;
    }
  }
  
  /**
   * Verify compliance requirements
   */
  private async verifyComplianceRequirement(_requirement: Requirement): Promise<boolean> {
    // Check for privacy policy and terms
    const compliancePages = ['/privacy', '/terms'];
    
    for (const page of compliancePages) {
      try {
        const response = await fetch(page);
        if (!response.ok) return false;
      } catch {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Gather metrics for verification
   */
  private async gatherMetrics(requirement: Requirement): Promise<Record<string, any>> {
    const metrics: Record<string, any> = {
      timestamp: new Date().toISOString(),
      category: requirement.category
    };
    
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      metrics.loadTime = perfData.loadEventEnd - perfData.fetchStart;
      metrics.domReady = perfData.domContentLoadedEventEnd - perfData.fetchStart;
    }
    
    return metrics;
  }
  
  /**
   * Escalate failed requirements
   */
  private escalateFailure(requirement: Requirement): void {
    console.error(`[RequirementTracker] ESCALATION: Requirement ${requirement.id} failed`);
    
    // Send high-priority notification
    if (this.webhookUrl) {
      fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'REQUIREMENT_FAILED',
          requirement,
          severity: 'HIGH',
          action: 'IMMEDIATE_ATTENTION_REQUIRED'
        })
      });
    }
  }
  
  /**
   * Record successful implementation
   */
  private recordSuccess(requirement: Requirement): void {
    console.log(`[RequirementTracker] SUCCESS: Requirement ${requirement.id} completed`);
    
    // Track success metrics
    this.trackRequirement({
      ...requirement,
      completionTime: this.calculateCompletionTime(requirement)
    });
  }
  
  /**
   * Trigger completion workflow
   */
  private triggerCompletionWorkflow(requirement: Requirement): void {
    // Notify stakeholders
    console.log(`[RequirementTracker] Completion workflow triggered for ${requirement.id}`);
    
    // Check for dependent requirements
    const dependents = this.findDependentRequirements(requirement.id);
    dependents.forEach(dep => {
      this.updateStatus(dep.id, 'IN_PROGRESS');
    });
  }
  
  /**
   * Find requirements that depend on the given requirement
   */
  private findDependentRequirements(requirementId: string): Requirement[] {
    return Array.from(this.requirements.values()).filter(
      req => req.dependencies?.includes(requirementId)
    );
  }
  
  /**
   * Calculate urgency score
   */
  private calculateUrgency(requirement: Requirement): number {
    const priorityScores = {
      CRITICAL: 100,
      HIGH: 75,
      MEDIUM: 50,
      LOW: 25
    };
    
    let score = priorityScores[requirement.priority];
    
    // Increase urgency if deadline is approaching
    if (requirement.deadline) {
      const daysUntilDeadline = Math.floor(
        (new Date(requirement.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilDeadline < 1) score += 50;
      else if (daysUntilDeadline < 3) score += 25;
      else if (daysUntilDeadline < 7) score += 10;
    }
    
    return Math.min(score, 150);
  }
  
  /**
   * Get verification delay based on priority
   */
  private getVerificationDelay(priority: Requirement['priority']): number {
    const delays = {
      CRITICAL: 5 * 60 * 1000,    // 5 minutes
      HIGH: 30 * 60 * 1000,        // 30 minutes
      MEDIUM: 2 * 60 * 60 * 1000,  // 2 hours
      LOW: 24 * 60 * 60 * 1000     // 24 hours
    };
    
    return delays[priority];
  }
  
  /**
   * Calculate completion time
   */
  private calculateCompletionTime(requirement: Requirement): number {
    const start = new Date(requirement.timestamp).getTime();
    const end = Date.now();
    return end - start;
  }
  
  /**
   * Track requirement in analytics
   */
  private trackRequirement(requirement: any): void {
    // Send to analytics platform
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'requirement_tracking', {
        requirement_id: requirement.id,
        category: requirement.category,
        status: requirement.status,
        priority: requirement.priority
      });
    }
  }
  
  /**
   * Generate requirement report
   */
  generateReport(): {
    total: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    completionRate: number;
    criticalPending: Requirement[];
  } {
    const requirements = Array.from(this.requirements.values());
    
    const byStatus: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    
    requirements.forEach(req => {
      byStatus[req.status] = (byStatus[req.status] || 0) + 1;
      byCategory[req.category] = (byCategory[req.category] || 0) + 1;
      byPriority[req.priority] = (byPriority[req.priority] || 0) + 1;
    });
    
    const completed = requirements.filter(r => r.status === 'COMPLETED').length;
    const completionRate = requirements.length > 0 ? (completed / requirements.length) * 100 : 0;
    
    const criticalPending = requirements.filter(
      r => r.priority === 'CRITICAL' && r.status === 'PENDING'
    );
    
    return {
      total: requirements.length,
      byStatus,
      byCategory,
      byPriority,
      completionRate,
      criticalPending
    };
  }
}

// Export singleton instance
export const requirementTracker = new RequirementTracker();

// Export types
export type { Requirement, VerificationResult, RequirementCategory };