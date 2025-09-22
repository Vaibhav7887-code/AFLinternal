import { useState } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react';
import { Badge } from './ui';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High Priority Quote Pending',
    message: 'Quote #Q-2024-0156 for Telus Calgary project requires urgent review',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    actionUrl: '/quote/generate'
  },
  {
    id: '2',
    type: 'info',
    title: 'Budget Update Available',
    message: 'NGMR-45821 budget has been updated with new purchase orders',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: false,
    actionUrl: '/ngmr-budget/45821'
  },
  {
    id: '3',
    type: 'error',
    title: 'Change Order Deadline',
    message: 'CO-2024-089 deadline is approaching (due in 2 days)',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    read: true,
    actionUrl: '/change-orders/89'
  },
  {
    id: '4',
    type: 'success',
    title: 'Quote Approved',
    message: 'Quote #Q-2024-0155 has been approved by Telus for $45,200',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance window this weekend from 2 AM - 6 AM EST',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true
  }
];

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible click area to close panel */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Panel with enhanced shadow instead of backdrop */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="danger" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No notifications</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.actionUrl) {
                        // Navigate to action URL
                        window.location.href = notification.actionUrl;
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-1.5 rounded-full ${iconColor}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimeAgo(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
