/**
 * Google Analytics Access Reporter
 * Monitors and reports on data access patterns for security and compliance
 */

interface AccessReportRequest {
  propertyId: string;
  startDate: string;
  endDate: string;
  dimensions?: string[];
  metrics?: string[];
  filters?: Record<string, any>;
}

interface AccessReportRow {
  userEmail: string;
  accessTime: Date;
  accessCount: number;
  accessMechanism?: string;
  userIP?: string;
  propertyAccessed?: string;
  reportType?: string;
  costDataReturned?: boolean;
  revenueDataReturned?: boolean;
}

export class AccessReporter {
  private apiEndpoint = '/api/analytics/access-report';
  
  /**
   * Run an access report for the specified property
   */
  async runAccessReport(request: AccessReportRequest): Promise<AccessReportRow[]> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Access report failed: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseAccessReport(data);
    } catch (error) {
      console.error('Error running access report:', error);
      throw error;
    }
  }

  /**
   * Get most recent access by users
   */
  async getMostRecentAccess(propertyId: string, days: number = 7): Promise<AccessReportRow[]> {
    return this.runAccessReport({
      propertyId,
      startDate: `${days}daysAgo`,
      endDate: 'today',
      dimensions: ['mostRecentAccessEpochTimeMicros', 'userEmail'],
      metrics: ['accessCount']
    });
  }

  /**
   * Get access breakdown by mechanism
   */
  async getAccessByMechanism(propertyId: string, days: number = 7): Promise<AccessReportRow[]> {
    return this.runAccessReport({
      propertyId,
      startDate: `${days}daysAgo`,
      endDate: 'today',
      dimensions: ['userEmail', 'accessMechanism', 'mostRecentAccessEpochTimeMicros'],
      metrics: ['accessCount']
    });
  }

  /**
   * Get property access overview
   */
  async getPropertyOverview(propertyId: string, days: number = 30): Promise<AccessReportRow[]> {
    return this.runAccessReport({
      propertyId,
      startDate: `${days}daysAgo`,
      endDate: 'today',
      dimensions: ['accessedPropertyId', 'accessedPropertyName', 'accessMechanism'],
      metrics: ['accessCount']
    });
  }

  /**
   * Get individual access records
   */
  async getIndividualAccess(propertyId: string, userEmail?: string): Promise<AccessReportRow[]> {
    const request: AccessReportRequest = {
      propertyId,
      startDate: '7daysAgo',
      endDate: 'today',
      dimensions: [
        'epochTimeMicros',
        'userEmail',
        'userIP',
        'accessMechanism',
        'costDataReturned',
        'revenueDataReturned'
      ]
    };

    if (userEmail) {
      request.filters = {
        userEmail: {
          matchType: 'EXACT',
          value: userEmail
        }
      };
    }

    return this.runAccessReport(request);
  }

  /**
   * Get high-frequency users (potential security concern)
   */
  async getHighFrequencyUsers(propertyId: string, threshold: number = 100): Promise<AccessReportRow[]> {
    return this.runAccessReport({
      propertyId,
      startDate: '7daysAgo',
      endDate: 'today',
      dimensions: ['userEmail'],
      metrics: ['accessCount'],
      filters: {
        accessCount: {
          operation: 'GREATER_THAN',
          value: threshold
        }
      }
    });
  }

  /**
   * Parse the raw access report response
   */
  private parseAccessReport(response: any): AccessReportRow[] {
    const rows: AccessReportRow[] = [];
    
    if (!response.rows) return rows;

    for (const row of response.rows) {
      const parsed: any = {
        accessCount: 0
      };

      // Parse dimensions
      row.dimensionValues?.forEach((value: any, index: number) => {
        const dimensionName = response.dimensionHeaders[index].dimensionName;
        
        if (dimensionName.endsWith('Micros')) {
          // Convert microseconds to Date
          parsed.accessTime = new Date(parseInt(value.value) / 1000);
        } else {
          switch (dimensionName) {
            case 'userEmail':
              parsed.userEmail = value.value;
              break;
            case 'accessMechanism':
              parsed.accessMechanism = value.value;
              break;
            case 'userIP':
              parsed.userIP = value.value;
              break;
            case 'accessedPropertyId':
            case 'accessedPropertyName':
              parsed.propertyAccessed = value.value;
              break;
            case 'reportType':
              parsed.reportType = value.value;
              break;
            case 'costDataReturned':
              parsed.costDataReturned = value.value === 'true';
              break;
            case 'revenueDataReturned':
              parsed.revenueDataReturned = value.value === 'true';
              break;
          }
        }
      });

      // Parse metrics
      row.metricValues?.forEach((value: any, index: number) => {
        const metricName = response.metricHeaders[index].metricName;
        if (metricName === 'accessCount') {
          parsed.accessCount = parseInt(value.value);
        }
      });

      rows.push(parsed as AccessReportRow);
    }

    return rows;
  }

  /**
   * Format access report for display
   */
  formatAccessReport(rows: AccessReportRow[]): string {
    let output = `Access Report - ${rows.length} records\n`;
    output += '='.repeat(50) + '\n\n';

    rows.forEach((row, index) => {
      output += `Record ${index + 1}:\n`;
      output += `  User: ${row.userEmail}\n`;
      output += `  Time: ${row.accessTime?.toLocaleString()}\n`;
      output += `  Access Count: ${row.accessCount}\n`;
      if (row.accessMechanism) output += `  Mechanism: ${row.accessMechanism}\n`;
      if (row.userIP) output += `  IP: ${row.userIP}\n`;
      if (row.reportType) output += `  Report Type: ${row.reportType}\n`;
      output += '\n';
    });

    return output;
  }
}

export default AccessReporter;