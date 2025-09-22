export interface DashboardMetrics {
  activeProjects: number;
  pendingApprovals: number;
  monthlyQuotes: number;
  avgQuoteValue: number;
}

export interface QuickAction {
  title: string;
  description: string;
  actionUrl: string;
  iconName: string;
  variant: 'primary' | 'secondary';
}

export interface ActivityItem {
  id: string;
  type: 'quote' | 'change_order' | 'budget' | 'file';
  title: string;
  description: string;
  timestamp: Date;
  url?: string;
}

export interface DashboardAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  actionUrl?: string;
  actionLabel?: string;
}

export const mockDashboardMetrics: DashboardMetrics = {
  activeProjects: 15,
  pendingApprovals: 7,
  monthlyQuotes: 23,
  avgQuoteValue: 32500
};

export const mockQuickActions: QuickAction[] = [
  {
    title: 'Start New Quote',
    description: 'Upload design and generate cost estimate',
    actionUrl: '/quote/upload',
    iconName: 'Upload',
    variant: 'primary'
  }
];

export const mockRecentActivity: ActivityItem[] = [
  {
    id: 'activity-1',
    type: 'quote',
    title: 'Quote Q-456 submitted for review',
    description: 'NGMR-12345 submitted by John Smith',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    url: '/quote/q-456'
  },
  {
    id: 'activity-2',
    type: 'change_order',
    title: 'Change Order CO #7 approved',
    description: 'Approved by Sarah Johnson for $2,450',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    url: '/change-orders/co-7'
  },
  {
    id: 'activity-3',
    type: 'budget',
    title: 'Budget updated for NGMR-4847',
    description: 'New PO added for $1,200',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    url: '/ngmr-budget/4847'
  },
  {
    id: 'activity-4',
    type: 'file',
    title: 'File processing complete',
    description: 'NGMR-12345_A2.pdf - 15 items extracted',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    url: '/quote/upload'
  }
];

export const mockDashboardAlerts: DashboardAlert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    title: 'PO missing for Handholes',
    description: 'Required purchase order for $150 handhole installation',
    actionUrl: '/ngmr-budget/4847',
    actionLabel: 'Request PO'
  },
  {
    id: 'alert-2',
    severity: 'warning',
    title: 'Budget Alert: NGMR-4847',
    description: 'Project exceeds planned budget by $2,500',
    actionUrl: '/ngmr-budget/4847',
    actionLabel: 'Review Budget'
  },
  {
    id: 'alert-3',
    severity: 'info',
    title: 'System Maintenance',
    description: 'Scheduled maintenance window this weekend',
    actionLabel: 'Learn More'
  }
];

// Chart Data Interfaces for Dashboard Analytics
export interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  sitesToRelease: number;
  sitesQuoted: number;
  quotesSubmitted: number;
  pendingQuotes: number;
}

// Time-based Site Release and Quote Data
export const mockDailyData: MonthlyData[] = [
  { month: 'Mon', sitesToRelease: 8, sitesQuoted: 7, quotesSubmitted: 6, pendingQuotes: 2 },
  { month: 'Tue', sitesToRelease: 12, sitesQuoted: 11, quotesSubmitted: 10, pendingQuotes: 1 },
  { month: 'Wed', sitesToRelease: 6, sitesQuoted: 5, quotesSubmitted: 5, pendingQuotes: 1 },
  { month: 'Thu', sitesToRelease: 15, sitesQuoted: 14, quotesSubmitted: 12, pendingQuotes: 3 },
  { month: 'Fri', sitesToRelease: 9, sitesQuoted: 8, quotesSubmitted: 7, pendingQuotes: 2 },
  { month: 'Sat', sitesToRelease: 3, sitesQuoted: 3, quotesSubmitted: 3, pendingQuotes: 0 },
  { month: 'Sun', sitesToRelease: 2, sitesQuoted: 2, quotesSubmitted: 1, pendingQuotes: 1 }
];

export const mockWeeklyData: MonthlyData[] = [
  { month: 'Week 1', sitesToRelease: 45, sitesQuoted: 42, quotesSubmitted: 38, pendingQuotes: 7 },
  { month: 'Week 2', sitesToRelease: 52, sitesQuoted: 48, quotesSubmitted: 45, pendingQuotes: 9 },
  { month: 'Week 3', sitesToRelease: 38, sitesQuoted: 35, quotesSubmitted: 32, pendingQuotes: 6 },
  { month: 'Week 4', sitesToRelease: 41, sitesQuoted: 38, quotesSubmitted: 34, pendingQuotes: 7 },
  { month: 'Week 5', sitesToRelease: 47, sitesQuoted: 44, quotesSubmitted: 41, pendingQuotes: 8 },
  { month: 'Week 6', sitesToRelease: 55, sitesQuoted: 52, quotesSubmitted: 48, pendingQuotes: 11 },
  { month: 'Week 7', sitesToRelease: 43, sitesQuoted: 40, quotesSubmitted: 37, pendingQuotes: 6 },
  { month: 'Week 8', sitesToRelease: 48, sitesQuoted: 45, quotesSubmitted: 41, pendingQuotes: 9 }
];

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Jan 2024', sitesToRelease: 45, sitesQuoted: 42, quotesSubmitted: 38, pendingQuotes: 7 },
  { month: 'Feb 2024', sitesToRelease: 52, sitesQuoted: 48, quotesSubmitted: 45, pendingQuotes: 9 },
  { month: 'Mar 2024', sitesToRelease: 38, sitesQuoted: 35, quotesSubmitted: 32, pendingQuotes: 6 },
  { month: 'Apr 2024', sitesToRelease: 61, sitesQuoted: 58, quotesSubmitted: 54, pendingQuotes: 12 },
  { month: 'May 2024', sitesToRelease: 47, sitesQuoted: 44, quotesSubmitted: 41, pendingQuotes: 8 },
  { month: 'Jun 2024', sitesToRelease: 55, sitesQuoted: 52, quotesSubmitted: 48, pendingQuotes: 11 },
  { month: 'Jul 2024', sitesToRelease: 43, sitesQuoted: 40, quotesSubmitted: 37, pendingQuotes: 6 },
  { month: 'Aug 2024', sitesToRelease: 58, sitesQuoted: 55, quotesSubmitted: 51, pendingQuotes: 10 },
  { month: 'Sep 2024', sitesToRelease: 49, sitesQuoted: 46, quotesSubmitted: 43, pendingQuotes: 8 },
  { month: 'Oct 2024', sitesToRelease: 64, sitesQuoted: 61, quotesSubmitted: 57, pendingQuotes: 13 },
  { month: 'Nov 2024', sitesToRelease: 51, sitesQuoted: 48, quotesSubmitted: 44, pendingQuotes: 9 },
  { month: 'Dec 2024', sitesToRelease: 42, sitesQuoted: 39, quotesSubmitted: 35, pendingQuotes: 7 }
];

// Quote Status Distribution
export const mockQuoteStatusData: ChartDataPoint[] = [
  { label: 'Approved', value: 156, color: '#22c55e' },
  { label: 'Pending Review', value: 43, color: '#f59e0b' },
  { label: 'Revisions Required', value: 28, color: '#ef4444' },
  { label: 'Under Development', value: 67, color: '#3b82f6' },
  { label: 'Submitted', value: 89, color: '#8b5cf6' }
];

// Removed Regional Performance Data - AFL only works with Telus

// Project Type Distribution
export const mockProjectTypeData: ChartDataPoint[] = [
  { label: 'New Site Build', value: 145, color: '#dc2626' },
  { label: 'Site Upgrade', value: 98, color: '#ea580c' },
  { label: 'Equipment Replacement', value: 76, color: '#d97706' },
  { label: 'Emergency Repair', value: 34, color: '#65a30d' },
  { label: 'Maintenance', value: 58, color: '#16a34a' }
];

// Budget vs Actual Spending (Last 6 months)
export const mockBudgetData = {
  labels: ['Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'],
  budgeted: [1200000, 1350000, 1180000, 1420000, 1290000, 1380000],
  actual: [1150000, 1380000, 1160000, 1445000, 1310000, 1360000]
};

// Weekly Quote Processing Time (Last 8 weeks)
export const mockProcessingTimeData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
  averageHours: [18.5, 16.2, 22.1, 19.8, 15.6, 17.9, 21.3, 16.8]
};
