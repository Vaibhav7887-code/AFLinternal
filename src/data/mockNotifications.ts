export interface Notification {
  id: string;
  type: 'quote' | 'change_order' | 'budget' | 'system';
  severity: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  author?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'quote',
    severity: 'info',
    title: 'Quote Q-456 requires review',
    description: 'NGMR-12345 quote submitted for approval',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    actionUrl: '/quote/q-456',
    actionLabel: 'Review Quote',
    author: 'John Smith'
  },
  {
    id: 'notif-2',
    type: 'change_order',
    severity: 'warning',
    title: 'Change Order CO #7 pending approval',
    description: 'Awaiting manager approval for $2,450 change order',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false,
    actionUrl: '/change-orders/co-7',
    actionLabel: 'Approve CO',
    author: 'Sarah Johnson'
  },
  {
    id: 'notif-3',
    type: 'budget',
    severity: 'critical',
    title: 'Budget Alert: NGMR-4847 exceeds planned cost',
    description: 'Project budget exceeded by $2,500 - immediate attention required',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    actionUrl: '/ngmr-budget/4847',
    actionLabel: 'View Budget'
  },
  {
    id: 'notif-4',
    type: 'system',
    severity: 'success',
    title: 'File processing complete',
    description: 'NGMR-12345_A2.pdf processed successfully - 15 items extracted',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: true,
    actionUrl: '/quote/generate',
    actionLabel: 'View Quote'
  },
  {
    id: 'notif-5',
    type: 'change_order',
    severity: 'success',
    title: 'Change Order CO #6 approved',
    description: 'CO approved and ready for implementation',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    actionUrl: '/change-orders/co-6',
    actionLabel: 'View Details'
  },
  {
    id: 'notif-6',
    type: 'budget',
    severity: 'warning',
    title: 'PO missing for Handholes',
    description: 'Purchase order required for $150 handhole installation',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    actionUrl: '/ngmr-budget/4847',
    actionLabel: 'Request PO'
  },
  {
    id: 'notif-7',
    type: 'quote',
    severity: 'info',
    title: 'Quote Q-455 submitted',
    description: 'New quote submitted for NGMR-11234',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    actionUrl: '/quote/q-455',
    actionLabel: 'View Quote',
    author: 'Mike Davis'
  },
  {
    id: 'notif-8',
    type: 'system',
    severity: 'info',
    title: 'System maintenance completed',
    description: 'Scheduled maintenance window completed successfully',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    read: true
  }
];

export const getNotificationsByType = (type?: string) => {
  if (!type || type === 'all') return mockNotifications;
  return mockNotifications.filter(notification => notification.type === type);
};

export const getUnreadNotifications = () => {
  return mockNotifications.filter(notification => !notification.read);
};

export const getNotificationCounts = () => {
  const total = mockNotifications.length;
  const unread = getUnreadNotifications().length;
  const byType = mockNotifications.reduce((acc, notification) => {
    acc[notification.type] = (acc[notification.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return { total, unread, byType };
};
