import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Search, Filter, ChevronDown, SortAsc, MapPin } from 'lucide-react';
import { getChangeOrders, getVendors, mockCOProject, mockChangeOrders } from '../data/mockChangeOrders';
import { Badge } from '../components/ui';

export default function ChangeOrders() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'submittedAt' | 'totalCost' | 'vendor'>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Get filtered and sorted data
  const filteredCOs = getChangeOrders({ 
    status: statusFilter, 
    vendor: vendorFilter, 
    search: searchTerm 
  });

  const sortedCOs = [...filteredCOs].sort((a, b) => {
    let aVal: any = a[sortBy];
    let bVal: any = b[sortBy];
    
    if (sortBy === 'submittedAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const vendors = getVendors();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Change Orders</h1>
        <p className="text-gray-600">Manage and track change order requests across projects.</p>
      </div>

      {/* Action Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Start CO Request Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Start CO request</h3>
          <button 
            onClick={() => navigate('/change-orders/new')}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Start
          </button>
        </div>

        {/* CO History Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">CO history</h3>
          <button 
            onClick={() => navigate('/change-orders/history')}
            className="w-full px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            View
          </button>
        </div>
      </div>

      {/* Change Orders Table Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-gray-900">CO</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">⌘F</span>
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [col, order] = e.target.value.split('-');
                  setSortBy(col as typeof sortBy);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="appearance-none px-3 py-2 border border-gray-200 rounded-md text-sm bg-white pr-8"
              >
                <option value="submittedAt-desc">Latest First</option>
                <option value="submittedAt-asc">Oldest First</option>
                <option value="totalCost-desc">Highest Cost</option>
                <option value="totalCost-asc">Lowest Cost</option>
                <option value="vendor-asc">Vendor A-Z</option>
              </select>
              <SortAsc className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Vendor Filter */}
              <select
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Vendors</option>
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-600">
                <th 
                  className="text-left px-6 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('vendor')}
                >
                  <div className="flex items-center gap-1">
                    Vendor
                    {sortBy === 'vendor' && (
                      <span className="text-green-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="text-left px-6 py-3">NGMRs</th>
                <th 
                  className="text-left px-6 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('totalCost')}
                >
                  <div className="flex items-center gap-1">
                    Cost
                    <MapPin className="w-3 h-3" />
                    {sortBy === 'totalCost' && (
                      <span className="text-green-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="text-left px-6 py-3">Status</th>
                <th 
                  className="text-left px-6 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('submittedAt')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortBy === 'submittedAt' && (
                      <span className="text-green-600">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCOs.map((co) => (
                <tr 
                  key={co.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/change-orders/${co.id}`)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {co.vendor}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {co.projectCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{co.location}</span>
                    </div>
                    <div className="font-medium">{formatCurrency(co.totalCost)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(co.status)}`}>
                      {co.status.charAt(0).toUpperCase() + co.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(co.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {sortedCOs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No change orders found matching your criteria.</p>
          </div>
        )}

        {sortedCOs.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {sortedCOs.length} of {mockChangeOrders.length} change orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
