import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Search, Filter, CheckCircle } from 'lucide-react';
import { getChangeOrderById, mockCOProject } from '../data/mockChangeOrders';

export default function ChangeOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const changeOrder = getChangeOrderById(id || '');
  
  if (!changeOrder) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Change Order Not Found</h1>
          <p className="text-gray-600 mb-4">The requested change order could not be found.</p>
          <button 
            onClick={() => navigate('/change-orders')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Back to Change Orders
          </button>
        </div>
      </div>
    );
  }

  const isSubmitted = changeOrder.status === 'submitted';
  const items = changeOrder.items || [];
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const budgetUsedPercentage = (mockCOProject.usedBudget / (mockCOProject.usedBudget + mockCOProject.remainingBudget)) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Back Navigation */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/change-orders')}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{changeOrder.coNumber}</h1>
          <p className="text-gray-600">{changeOrder.projectCode} - {changeOrder.location}</p>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 inline mr-2" />
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Project Summary */}
        <div className="space-y-6">
          {/* Project Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Code</label>
                <input 
                  value={changeOrder.projectCode} 
                  readOnly 
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm w-full bg-gray-50" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Units</label>
                <input 
                  value="12" 
                  readOnly 
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm w-20 bg-gray-50" 
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Project</div>
                <div className="font-medium">{changeOrder.location}</div>
              </div>

              {/* Budget Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cost</span>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(mockCOProject.usedBudget)}</div>
                    <div className="text-xs text-gray-500">Used</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span></span>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(mockCOProject.remainingBudget)}</div>
                    <div className="text-xs text-gray-500">Left</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${budgetUsedPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Quote Information */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Initial Quote total</span>
                  <span className="font-medium">{formatCurrency(mockCOProject.initialQuoteTotal)}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">No. of change orders</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div><span className="font-medium">{mockCOProject.changeOrderCount.approved.toString().padStart(2, '0')}</span> <span className="text-green-600">Approved</span></div>
                    <div><span className="font-medium">{mockCOProject.changeOrderCount.rejected.toString().padStart(2, '0')}</span> <span className="text-red-600">Rejected</span></div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-gray-600 mb-1">New Change order ({changeOrder.coNumber})</div>
                  <div className="text-lg font-semibold text-blue-600">{formatCurrency(changeOrder.totalCost)}</div>
                  {isSubmitted && (
                    <div className="text-sm text-blue-600 font-medium mt-1">Submitted</div>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${isSubmitted ? 'text-blue-600' : 'text-gray-600'}`}>
                    {isSubmitted ? 'Submitted' : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Change Order Items */}
        <div className="space-y-6">
          {/* File Upload Status */}
          {isSubmitted && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{changeOrder.coNumber}.pdf</div>
                    <div className="text-xs text-gray-500">
                      {formatDate(changeOrder.submittedAt!)} • 13MB
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Items Table */}
          <div className="bg-white border border-gray-200 rounded-lg">
            {/* Table Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">CO</h3>
                {!isSubmitted && (
                  <button className="px-3 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
                    + Add Items
                  </button>
                )}
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm"
                    disabled={isSubmitted}
                  />
                </div>
                <button className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50" disabled={isSubmitted}>
                  <Filter className="w-4 h-4" />
                </button>
                <button 
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50" 
                  disabled={isSubmitted}
                >
                  Add Items
                </button>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-xs text-gray-600">
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3 w-20">Quantity</th>
                    <th className="text-left px-4 py-3 w-16">Type</th>
                    <th className="text-left px-4 py-3 w-20">Per/cost</th>
                    <th className="text-left px-4 py-3 w-20">Total</th>
                    {!isSubmitted && <th className="text-left px-4 py-3 w-12"></th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-3">
                        {isSubmitted ? (
                          <span className="text-sm text-gray-900">{item.quantity}</span>
                        ) : (
                          <input
                            type="number"
                            value={item.quantity}
                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                            min="1"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'A32' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(item.unitCost)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(item.totalCost)}</td>
                      {!isSubmitted && (
                        <td className="px-4 py-3">
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button (only show if not submitted) */}
            {!isSubmitted && items.length > 0 && (
              <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Total: {formatCurrency(changeOrder.totalCost)}
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
