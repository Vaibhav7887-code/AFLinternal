import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, FileText, TrendingUp, AlertTriangle, Clock, DollarSign, 
  BarChart3, Activity, ChevronDown 
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '../components/ui';
import { LineChart, BarChart, DoughnutChart } from '../components/charts';
import { 
  mockDashboardMetrics, 
  mockRecentActivity, 
  mockDashboardAlerts,
  mockDailyData,
  mockWeeklyData,
  mockMonthlyData,
  mockQuoteStatusData,
  mockProjectTypeData,
  mockBudgetData,
  mockProcessingTimeData,
  type ActivityItem,
  type DashboardAlert,
  type MonthlyData
} from '../data/mockDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'activity'>('analytics');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quote': return FileText;
      case 'change_order': return TrendingUp;
      case 'budget': return DollarSign;
      case 'file': return Upload;
      default: return Clock;
    }
  };

  const getAlertIcon = () => {
    return AlertTriangle;
  };

  // Get data based on selected timeframe
  const getTimeframeData = (): MonthlyData[] => {
    switch (timeframe) {
      case 'daily': return mockDailyData;
      case 'weekly': return mockWeeklyData;
      case 'monthly': return mockMonthlyData;
      default: return mockMonthlyData;
    }
  };

  const currentData = getTimeframeData();
  
  // Chart data configurations
  const siteReleaseTrendsData = {
    labels: currentData.map(d => timeframe === 'monthly' ? d.month.split(' ')[0] : d.month),
    datasets: [
      {
        label: 'Sites to Release',
        data: currentData.map(d => d.sitesToRelease),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Sites Quoted',
        data: currentData.map(d => d.sitesQuoted),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
      {
        label: 'Quotes Submitted',
        data: currentData.map(d => d.quotesSubmitted),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Pending Quotes',
        data: currentData.map(d => d.pendingQuotes),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
      },
    ],
  };

  const budgetComparisonData = {
    labels: mockBudgetData.labels.map(label => label.split(' ')[0]),
    datasets: [
      {
        label: 'Budgeted',
        data: mockBudgetData.budgeted,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
      },
      {
        label: 'Actual',
        data: mockBudgetData.actual,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
      },
    ],
  };

  const processingTimeData = {
    labels: mockProcessingTimeData.labels,
    datasets: [
      {
        label: 'Processing Time (Hours)',
        data: mockProcessingTimeData.averageHours,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your Telus projects.</p>
        </div>
        
        {/* Start New Quote CTA */}
        <Button 
          onClick={() => navigate('/quote/upload')}
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Start New Quote</span>
        </Button>
      </div>

      {/* Key Metrics - Removed Active Clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Active Projects</span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {mockDashboardMetrics.activeProjects}
            </div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Pending Approvals</span>
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {mockDashboardMetrics.pendingApprovals}
            </div>
            <p className="text-xs text-gray-500">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Avg Quote Value</span>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(mockDashboardMetrics.avgQuoteValue)}
            </div>
            <p className="text-xs text-gray-500">↑ 5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics & Insights</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activity'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Recent Activity & Alerts</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Main Chart with Timeframe Selector */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Site Release & Quote Trends</h3>
                    
                    {/* Timeframe Dropdown */}
                    <div className="relative">
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value as 'daily' | 'weekly' | 'monthly')}
                        className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div style={{ height: '300px' }}>
                    <LineChart
                      title=""
                      labels={siteReleaseTrendsData.labels}
                      datasets={siteReleaseTrendsData.datasets}
                      height={300}
                      yAxisLabel="Number of Sites"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <div style={{ height: '350px' }}>
                    <DoughnutChart
                      title="Quote Status Distribution"
                      data={mockQuoteStatusData}
                      height={350}
                      showTotal={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <BarChart
                  title="Budget vs Actual Spending"
                  labels={budgetComparisonData.labels}
                  datasets={budgetComparisonData.datasets}
                  height={300}
                  yAxisLabel="Amount ($)"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <LineChart
                  title="Quote Processing Time"
                  labels={processingTimeData.labels}
                  datasets={processingTimeData.datasets}
                  height={300}
                  yAxisLabel="Hours"
                />
              </CardContent>
            </Card>
          </div>

          {/* Project Types Chart & KPIs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <BarChart
                  title="Project Types Distribution"
                  labels={mockProjectTypeData.map(d => d.label)}
                  datasets={[{
                    label: 'Number of Projects',
                    data: mockProjectTypeData.map(d => d.value),
                    backgroundColor: mockProjectTypeData.map(d => d.color),
                    borderColor: mockProjectTypeData.map(d => d.color),
                  }]}
                  height={300}
                  yAxisLabel="Number of Projects"
                  horizontal={true}
                />
              </CardContent>
            </Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Quote Success Rate</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-green-600">87.3%</div>
                    <div className="text-xs text-gray-500">↑ 2.1% from last month</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Avg. Turnaround</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-blue-600">18.2h</div>
                    <div className="text-xs text-gray-500">↓ 1.2h from last month</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Revenue This Month</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-purple-600">$2.1M</div>
                    <div className="text-xs text-gray-500">↑ 8% from last month</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Efficiency Score</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-orange-600">94.1%</div>
                    <div className="text-xs text-gray-500">↑ 0.8% from last month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab Content */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <Button variant="secondary" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {mockRecentActivity.map((activity: ActivityItem) => {
                  const IconComponent = getActivityIcon(activity.type);
                  
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
                <Button variant="secondary" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {mockDashboardAlerts.map((alert: DashboardAlert) => {
                  const IconComponent = getAlertIcon();
                  
                  return (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                         onClick={() => alert.actionUrl && navigate(alert.actionUrl)}>
                      <div className={`p-1.5 rounded-full ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
                        alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                          <Badge status={alert.severity === 'critical' ? 'critical' : alert.severity} size="sm">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        {alert.actionLabel && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 mt-2">
                            {alert.actionLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;