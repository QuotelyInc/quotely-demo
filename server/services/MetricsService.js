class MetricsService {
  constructor() {
    this.metrics = {
      requests: {
        total: 0,
        successful: 0,
        failed: 0,
        cached: 0
      },
      quotes: {
        generated: 0,
        bound: 0,
        saved: 0
      },
      providers: {
        turboRater: { requests: 0, successes: 0, failures: 0, avgResponseTime: 0 },
        momentum: { requests: 0, successes: 0, failures: 0, avgResponseTime: 0 },
        gail: { requests: 0, successes: 0, failures: 0, avgResponseTime: 0 }
      },
      performance: {
        avgResponseTime: 0,
        responseTimes: [],
        slowestEndpoint: null,
        fastestEndpoint: null
      },
      errors: [],
      startTime: Date.now()
    };
    
    // Reset hourly metrics
    setInterval(() => this.resetHourlyMetrics(), 3600000);
  }

  recordQuoteGeneration({ responseTime, quoteCount, providersResponded }) {
    this.metrics.requests.total++;
    this.metrics.requests.successful++;
    this.metrics.quotes.generated += quoteCount;
    
    this.updateResponseTime(responseTime);
    
    console.log(`[MetricsService] Quote generation: ${quoteCount} quotes in ${responseTime}ms`);
  }

  recordCacheHit() {
    this.metrics.requests.cached++;
    console.log(`[MetricsService] Cache hit recorded`);
  }

  recordError(error) {
    this.metrics.requests.failed++;
    this.metrics.errors.push({
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack
    });
    
    // Keep only last 100 errors
    if (this.metrics.errors.length > 100) {
      this.metrics.errors = this.metrics.errors.slice(-100);
    }
    
    console.log(`[MetricsService] Error recorded: ${error.message}`);
  }

  recordProviderMetrics(provider, success, responseTime) {
    const providerMetrics = this.metrics.providers[provider];
    if (providerMetrics) {
      providerMetrics.requests++;
      if (success) {
        providerMetrics.successes++;
      } else {
        providerMetrics.failures++;
      }
      
      // Update average response time
      const currentAvg = providerMetrics.avgResponseTime;
      const totalRequests = providerMetrics.successes;
      providerMetrics.avgResponseTime = (currentAvg * (totalRequests - 1) + responseTime) / totalRequests;
    }
  }

  updateResponseTime(responseTime) {
    this.metrics.performance.responseTimes.push(responseTime);
    
    // Keep only last 1000 response times
    if (this.metrics.performance.responseTimes.length > 1000) {
      this.metrics.performance.responseTimes = this.metrics.performance.responseTimes.slice(-1000);
    }
    
    // Calculate average
    const sum = this.metrics.performance.responseTimes.reduce((a, b) => a + b, 0);
    this.metrics.performance.avgResponseTime = Math.round(sum / this.metrics.performance.responseTimes.length);
  }

  getMetrics() {
    const uptime = Date.now() - this.metrics.startTime;
    const successRate = this.metrics.requests.total > 0 
      ? (this.metrics.requests.successful / this.metrics.requests.total * 100).toFixed(2)
      : 0;
    
    const cacheHitRate = this.metrics.requests.total > 0
      ? (this.metrics.requests.cached / this.metrics.requests.total * 100).toFixed(2)
      : 0;
    
    return {
      uptime: this.formatUptime(uptime),
      requests: {
        ...this.metrics.requests,
        successRate: `${successRate}%`,
        cacheHitRate: `${cacheHitRate}%`
      },
      quotes: this.metrics.quotes,
      providers: this.metrics.providers,
      performance: {
        ...this.metrics.performance,
        p50: this.calculatePercentile(50),
        p95: this.calculatePercentile(95),
        p99: this.calculatePercentile(99)
      },
      recentErrors: this.metrics.errors.slice(-10),
      timestamp: new Date().toISOString()
    };
  }

  calculatePercentile(percentile) {
    const times = [...this.metrics.performance.responseTimes].sort((a, b) => a - b);
    if (times.length === 0) return 0;
    
    const index = Math.ceil((percentile / 100) * times.length) - 1;
    return times[index];
  }

  formatUptime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  resetHourlyMetrics() {
    // Reset response times but keep other metrics
    this.metrics.performance.responseTimes = [];
    console.log('[MetricsService] Hourly metrics reset');
  }

  getHealthStatus() {
    const errorRate = this.metrics.requests.total > 0
      ? (this.metrics.requests.failed / this.metrics.requests.total)
      : 0;
    
    const avgResponseTime = this.metrics.performance.avgResponseTime;
    
    let status = 'healthy';
    let issues = [];
    
    if (errorRate > 0.1) {
      status = 'degraded';
      issues.push(`High error rate: ${(errorRate * 100).toFixed(2)}%`);
    }
    
    if (avgResponseTime > 5000) {
      status = 'degraded';
      issues.push(`Slow response time: ${avgResponseTime}ms`);
    }
    
    if (this.metrics.errors.length > 50) {
      status = 'degraded';
      issues.push(`High error count: ${this.metrics.errors.length} recent errors`);
    }
    
    return {
      status,
      issues,
      metrics: this.getMetrics()
    };
  }
}

module.exports = new MetricsService();