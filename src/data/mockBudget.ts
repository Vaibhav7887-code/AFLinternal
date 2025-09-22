// Mock data for NGMR Budget module matching wireframes exactly

export interface BudgetAlert {
  id: string;
  type: 'critical' | 'warning';
  title: string;
  description: string;
  amount?: number;
  actionLabel: string;
  actionUrl?: string;
}

export interface POItem {
  id: string;
  name: string;
  units: number;
  unitCost: number;
  totalCost: number;
  status: 'paid' | 'pending' | 'rejected';
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendor: string;
  totalAmount: number;
  items: POItem[];
  isExpanded?: boolean;
}

export interface VendorSummary {
  vendor: string;
  planned: number;
  actual: number;
  paid: number;
  outstanding: number;
}

export interface NGMRBudget {
  ngmrCode: string;
  units: number;
  actualCost: number;
  plannedCost: number;
  alerts: BudgetAlert[];
  purchaseOrders: PurchaseOrder[];
  vendorSummary: VendorSummary[];
}

// Budget data for NGMR-4847 from wireframes
export const mockBudgetData: NGMRBudget = {
  ngmrCode: '4847',
  units: 4,
  actualCost: 25000,
  plannedCost: 20000,
  alerts: [
    {
      id: 'alert-critical-1',
      type: 'critical',
      title: 'PO missing - Handholes $150',
      description: 'Purchase order required for handhole installation work',
      amount: 150,
      actionLabel: 'Request',
      actionUrl: '/purchase-orders/new'
    },
    {
      id: 'alert-warning-1', 
      type: 'warning',
      title: 'LOA rejected.',
      description: 'Letter of Authorization has been rejected and requires revision',
      actionLabel: 'Open',
      actionUrl: '/loa/rejected'
    }
  ],
  purchaseOrders: [
    {
      id: 'po-076767',
      poNumber: 'PO 076767',
      vendor: 'HTI',
      totalAmount: 12000,
      isExpanded: true,
      items: [
        {
          id: 'item-1',
          name: 'Place/Splice',
          units: 4,
          unitCost: 500.00,
          totalCost: 2000.00,
          status: 'paid'
        },
        {
          id: 'item-2',
          name: 'ISW works',
          units: 4,
          unitCost: 1000.00,
          totalCost: 4000.00,
          status: 'paid'
        },
        {
          id: 'item-3',
          name: 'Hydrovac',
          units: 10,
          unitCost: 355.00,
          totalCost: 3550.00,
          status: 'pending'
        },
        {
          id: 'item-4',
          name: 'LOA',
          units: 4,
          unitCost: 100.00,
          totalCost: 400.00,
          status: 'rejected'
        },
        {
          id: 'item-5',
          name: 'Water Dispose',
          units: 1,
          unitCost: 2050.00,
          totalCost: 2050.00,
          status: 'pending'
        }
      ]
    },
    {
      id: 'po-45515',
      poNumber: 'PO 45515',
      vendor: 'Keyworks',
      totalAmount: 5000,
      isExpanded: false,
      items: []
    },
    {
      id: 'po-45516',
      poNumber: 'PO 45516',
      vendor: 'Keyworks',
      totalAmount: 2000,
      isExpanded: false,
      items: []
    },
    {
      id: 'po-00afl',
      poNumber: 'PO 00AFL',
      vendor: 'Materials',
      totalAmount: 4000,
      isExpanded: false,
      items: []
    },
    {
      id: 'po-01afl',
      poNumber: 'PO 01AFL',
      vendor: 'Materials TVC',
      totalAmount: 2000,
      isExpanded: false,
      items: []
    }
  ],
  vendorSummary: [
    {
      vendor: 'HTI',
      planned: 10000.00,
      actual: 12000.00,
      paid: 8500.00,
      outstanding: 3500.00
    },
    {
      vendor: 'Keyworks',
      planned: 5000.00,
      actual: 7000.00,
      paid: 6000.00,
      outstanding: 1000.00
    },
    {
      vendor: 'Materials',
      planned: 5000.00,
      actual: 6000.00,
      paid: 5500.00,
      outstanding: 500.00
    }
  ]
};

// Get budget data by NGMR code
export const getBudgetByNGMR = (ngmrCode: string): NGMRBudget | null => {
  if (ngmrCode === '4847') {
    return mockBudgetData;
  }
  return null;
};

// Get status color for PO items
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-orange-100 text-orange-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Validate NGMR code format
export const isValidNGMR = (ngmrCode: string): boolean => {
  return /^\d{4,6}$/.test(ngmrCode);
};
