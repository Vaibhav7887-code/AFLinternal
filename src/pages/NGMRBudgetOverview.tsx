import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  getBudgetByNGMR, 
  getStatusColor, 
  formatCurrency
} from '../data/mockBudget';

export default function NGMRBudgetOverview() {
  const { ngmrId } = useParams<{ ngmrId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeTab = searchParams.get('tab') || 'overview';
  const [expandedPOs, setExpandedPOs] = useState<Set<string>>(new Set(['po-076767']));
  
  const budgetData = getBudgetByNGMR(ngmrId || '');
  
  if (!budgetData) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">NGMR Not Found</h1>
          <p className="text-gray-600 mb-4">The requested NGMR budget data could not be found.</p>
          <button 
            onClick={() => navigate('/ngmr-budget')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Back to NGMR Entry
          </button>
        </div>
      </div>
    );
  }

  const setActiveTab = (tab: string) => {
    setSearchParams(tab === 'overview' ? {} : { tab });
  };

  const togglePOExpansion = (poId: string) => {
    const newExpanded = new Set(expandedPOs);
    if (newExpanded.has(poId)) {
      newExpanded.delete(poId);
    } else {
      newExpanded.add(poId);
    }
    setExpandedPOs(newExpanded);
  };

  const renderPOItems = (items: POItem[]) => (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-xs text-gray-600">
            <th className="text-left px-4 py-2">Items</th>
            <th className="text-left px-4 py-2">Units</th>
            <th className="text-left px-4 py-2">Unit/per</th>
            <th className="text-left px-4 py-2">Total</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Reclass</th>
            <th className="text-left px-4 py-2">CO</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="px-4 py-2 text-gray-900">{item.name}</td>
              <td className="px-4 py-2 text-gray-600">{item.units}</td>
              <td className="px-4 py-2 text-gray-600">{formatCurrency(item.unitCost)}</td>
              <td className="px-4 py-2 text-gray-900">{formatCurrency(item.totalCost)}</td>
              <td className="px-4 py-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-600 hover:text-blue-800 text-xs">Reclass</button>
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-600 hover:text-blue-800 text-xs">Submit CO</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">NGMR Budget Overview</h1>
        <p className="text-gray-600">Budget tracking and purchase order management for NGMR-{budgetData.ngmrCode}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Budget Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* NGMR Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Enter NGMR</label>
              <div className="text-4xl font-bold text-gray-900">{budgetData.ngmrCode}</div>
              <div className="text-sm text-gray-600 mt-1">Units {budgetData.units}</div>
            </div>
            
            <button 
              onClick={() => navigate('/ngmr-budget')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
            >
              View Budget Update
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cost Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Actual Cost</div>
                <div className="text-3xl font-bold text-blue-600">{formatCurrency(budgetData.actualCost)}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Planned Cost</div>
                <div className="text-3xl font-bold text-orange-500">{formatCurrency(budgetData.plannedCost)}</div>
              </div>
            </div>
          </div>

          {/* Tabs and Alerts */}
          <div className="bg-white border border-gray-200 rounded-lg">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  activeTab === 'alerts' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Alerts <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">{budgetData.alerts.length}</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Project budget overview and key metrics.</p>
                    <div className="text-xs text-gray-500">
                      Total POs: {budgetData.purchaseOrders.length}
                    </div>
                  </div>

                  {/* Vendor Summary (moved to Overview tab) */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-900 mb-3">Vendor Summary</div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr className="text-gray-600">
                            <th className="text-left px-2 py-1">Vendor</th>
                            <th className="text-left px-2 py-1">Planned</th>
                            <th className="text-left px-2 py-1">Actual</th>
                            <th className="text-left px-2 py-1">Paid</th>
                            <th className="text-left px-2 py-1">Outstanding</th>
                          </tr>
                        </thead>
                        <tbody>
                          {budgetData.vendorSummary.map((vendor) => (
                            <tr key={vendor.vendor} className="border-b border-gray-100">
                              <td className="px-2 py-1 font-medium">{vendor.vendor}</td>
                              <td className="px-2 py-1">{formatCurrency(vendor.planned)}</td>
                              <td className="px-2 py-1">{formatCurrency(vendor.actual)}</td>
                              <td className="px-2 py-1">{formatCurrency(vendor.paid)}</td>
                              <td className="px-2 py-1">{formatCurrency(vendor.outstanding)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {budgetData.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${alert.type === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>
                          {alert.type === 'critical' ? 'Critical' : 'Warning'}
                        </div>
                        <div className="text-sm text-gray-900">{alert.title}</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {alert.actionLabel}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Purchase Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg">
            {/* PO Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">All POs</h3>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4 inline mr-2" />
                Upload
              </button>
            </div>

            {/* Purchase Orders List */}
            <div className="divide-y divide-gray-200">
              {budgetData.purchaseOrders.map((po) => (
                <div key={po.id} className="p-4">
                  {/* PO Header */}
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => togglePOExpansion(po.id)}
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        {expandedPOs.has(po.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <div>
                        <div className="font-medium text-gray-900">
                          {po.poNumber} - {po.vendor} - {formatCurrency(po.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded PO Items */}
                  {expandedPOs.has(po.id) && po.items.length > 0 && renderPOItems(po.items)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
