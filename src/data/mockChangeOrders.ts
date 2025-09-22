// Mock data for Change Orders matching the wireframes exactly

export interface ChangeOrder {
  id: string;
  coNumber: string;
  projectCode: string;
  vendor: string;
  location: string;
  totalCost: number;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  items?: COItem[];
  projectName?: string;
  description?: string;
}

export interface COItem {
  id: string;
  name: string;
  quantity: number;
  type: 'A32' | 'A50';
  unitCost: number;
  totalCost: number;
}

export interface COProject {
  code: string;
  location: string;
  usedBudget: number;
  remainingBudget: number;
  initialQuoteTotal: number;
  changeOrderCount: {
    approved: number;
    rejected: number;
  };
}

// Change Orders data from wireframes
export const mockChangeOrders: ChangeOrder[] = [
  {
    id: 'co-hti-11234',
    coNumber: 'CO #1',
    projectCode: 'NGMR-11234',
    vendor: 'HTI',
    location: 'New York City, NY',
    totalCost: 12000,
    status: 'submitted',
    submittedAt: new Date('2025-01-10T10:30:00'),
    items: [
      {
        id: 'co1-item-1',
        name: 'Fiber Splice',
        quantity: 3,
        type: 'A32',
        unitCost: 450,
        totalCost: 1350
      },
      {
        id: 'co1-item-2',
        name: 'Cable Installation',
        quantity: 1,
        type: 'A32',
        unitCost: 2800,
        totalCost: 2800
      },
      {
        id: 'co1-item-3',
        name: 'Equipment Mount',
        quantity: 2,
        type: 'A50',
        unitCost: 425,
        totalCost: 850
      }
    ]
  },
  {
    id: 'co-afl-5658',
    coNumber: 'CO #2',
    projectCode: 'NGMR-5658',
    vendor: 'AFL INTERNAL',
    location: 'New York City, NY',
    totalCost: 8500,
    status: 'submitted',
    submittedAt: new Date('2025-01-10T14:15:00'),
    items: [
      {
        id: 'co2-item-1',
        name: 'Fiber Optic Cable',
        quantity: 2,
        type: 'A50',
        unitCost: 1200,
        totalCost: 2400
      },
      {
        id: 'co2-item-2',
        name: 'Splice Enclosure',
        quantity: 4,
        type: 'A32',
        unitCost: 890,
        totalCost: 3560
      },
      {
        id: 'co2-item-3',
        name: 'Cable Tray',
        quantity: 1,
        type: 'A32',
        unitCost: 1250,
        totalCost: 1250
      },
      {
        id: 'co2-item-4',
        name: 'Patch Panels',
        quantity: 3,
        type: 'A50',
        unitCost: 430,
        totalCost: 1290
      }
    ]
  },
  {
    id: 'co-telstar-4846',
    coNumber: 'CO #3',
    projectCode: 'NGMR-4846',
    vendor: 'TELSTAR',
    location: 'New York City, NY',
    totalCost: 15000,
    status: 'submitted',
    submittedAt: new Date('2025-01-09T16:45:00'),
    items: [
      {
        id: 'co3-item-1',
        name: 'Network Switch',
        quantity: 2,
        type: 'A50',
        unitCost: 3200,
        totalCost: 6400
      },
      {
        id: 'co3-item-2',
        name: 'UPS System',
        quantity: 1,
        type: 'A50',
        unitCost: 4800,
        totalCost: 4800
      },
      {
        id: 'co3-item-3',
        name: 'Cable Management',
        quantity: 6,
        type: 'A32',
        unitCost: 300,
        totalCost: 1800
      }
    ]
  },
  {
    id: 'co-hti-47181',
    coNumber: 'CO #4',
    projectCode: 'NGMR-47181',
    vendor: 'HTI',
    location: 'New York City, NY',
    totalCost: 22000,
    status: 'pending',
    submittedAt: new Date('2025-01-08T11:20:00'),
    items: [
      {
        id: 'co4-item-1',
        name: 'Excavation Work',
        quantity: 8,
        type: 'A32',
        unitCost: 850,
        totalCost: 6800
      },
      {
        id: 'co4-item-2',
        name: 'Conduit Installation',
        quantity: 12,
        type: 'A32',
        unitCost: 520,
        totalCost: 6240
      },
      {
        id: 'co4-item-3',
        name: 'Junction Box',
        quantity: 4,
        type: 'A50',
        unitCost: 740,
        totalCost: 2960
      }
    ]
  },
  {
    id: 'co-ketworks-73390',
    coNumber: 'CO #5',
    projectCode: 'NGMR-73390',
    vendor: 'KETWORKS',
    location: 'New York City, NY',
    totalCost: 18500,
    status: 'pending',
    submittedAt: new Date('2025-01-07T09:30:00'),
    items: [
      {
        id: 'co5-item-1',
        name: 'Antenna Installation',
        quantity: 3,
        type: 'A50',
        unitCost: 2800,
        totalCost: 8400
      },
      {
        id: 'co5-item-2',
        name: 'Coaxial Cable',
        quantity: 5,
        type: 'A32',
        unitCost: 680,
        totalCost: 3400
      },
      {
        id: 'co5-item-3',
        name: 'Signal Amplifier',
        quantity: 2,
        type: 'A50',
        unitCost: 1850,
        totalCost: 3700
      }
    ]
  }
];

// Detailed CO #5 data from wireframes (the uploaded and submitted one)
export const mockCODetail: ChangeOrder = {
  id: 'co-5-detail',
  coNumber: 'CO #5',
  projectCode: 'NGMR-12345',
  vendor: 'AFL INTERNAL',
  location: 'ELLE, North Vancouver, BC',
  totalCost: 1545.87,
  status: 'submitted',
  submittedAt: new Date('2025-01-11T12:24:00'),
  items: [
    {
      id: 'co-item-1',
      name: 'Place/Splice',
      quantity: 1,
      type: 'A32',
      unitCost: 540,
      totalCost: 540
    },
    {
      id: 'co-item-2',
      name: 'Hydrovac',
      quantity: 2,
      type: 'A32',
      unitCost: 335,
      totalCost: 670
    },
    {
      id: 'co-item-3',
      name: '2143887',
      quantity: 1,
      type: 'A50',
      unitCost: 0.87,
      totalCost: 0.87
    },
    {
      id: 'co-item-4',
      name: '72FIB CTP',
      quantity: 1,
      type: 'A50',
      unitCost: 335,
      totalCost: 335
    }
  ],
  description: 'Additional items for project completion'
};

// Project data for CO context
export const mockCOProject: COProject = {
  code: 'NGMR-12345',
  location: 'ELLE, North Vancouver, BC',
  usedBudget: 34350,
  remainingBudget: 15000,
  initialQuoteTotal: 30350,
  changeOrderCount: {
    approved: 4,
    rejected: 1
  }
};

// Get change orders with optional filtering
export const getChangeOrders = (filters?: {
  status?: string;
  vendor?: string;
  search?: string;
}) => {
  let filtered = [...mockChangeOrders];
  
  if (filters?.status && filters.status !== 'all') {
    filtered = filtered.filter(co => co.status === filters.status);
  }
  
  if (filters?.vendor && filters.vendor !== 'all') {
    filtered = filtered.filter(co => co.vendor === filters.vendor);
  }
  
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(co => 
      co.projectCode.toLowerCase().includes(search) ||
      co.vendor.toLowerCase().includes(search) ||
      co.location.toLowerCase().includes(search)
    );
  }
  
  return filtered;
};

// Get unique vendors for filter dropdown
export const getVendors = () => {
  const vendors = [...new Set(mockChangeOrders.map(co => co.vendor))];
  return vendors.sort();
};

// Get CO by ID
export const getChangeOrderById = (id: string) => {
  if (id === 'co-5' || id === 'co-5-detail') {
    return mockCODetail;
  }
  return mockChangeOrders.find(co => co.id === id);
};
