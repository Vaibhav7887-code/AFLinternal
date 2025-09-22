export interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  type: 'A32' | 'A50' | 'A60';
  unitCost: number;
  totalCost: number;
  category?: 'GPON' | 'Materials' | 'Civil' | 'Labor';
  extractedFromPDF?: boolean;
}

export interface Quote {
  id: string;
  projectCode: string;
  projectLocation: string;
  units: number;
  items: QuoteItem[];
  subtotals: {
    gpon: number;
    materials: number;
    civil: number;
    labor: number;
  };
  totalCost: number;
  status: 'draft' | 'review' | 'submitted' | 'approved';
  uploadedFile?: {
    id: string;
    filename: string;
    size: number;
    uploadedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Hardcoded item extraction based on filename
export const getItemsByFilename = (filename: string): QuoteItem[] => {
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes('ngmr-12345') || lowerFilename.includes('a2')) {
    return [
      {
        id: 'item-1',
        name: 'Place/Splice',
        quantity: 12,
        type: 'A32',
        unitCost: 540,
        totalCost: 6480,
        category: 'GPON',
        extractedFromPDF: true
      },
      {
        id: 'item-2',
        name: 'FIP',
        quantity: 12,
        type: 'A32',
        unitCost: 104.50,
        totalCost: 1254,
        category: 'GPON',
        extractedFromPDF: true
      },
      {
        id: 'item-3',
        name: 'MDU',
        quantity: 30,
        type: 'A32',
        unitCost: 17.50,
        totalCost: 525,
        category: 'GPON',
        extractedFromPDF: true
      },
      {
        id: 'item-4',
        name: 'Civil design',
        quantity: 1,
        type: 'A32',
        unitCost: 1500,
        totalCost: 1500,
        category: 'Civil',
        extractedFromPDF: true
      },
      {
        id: 'item-5',
        name: 'UG. Cable',
        quantity: 120,
        type: 'A32',
        unitCost: 11.50,
        totalCost: 1380,
        category: 'Materials',
        extractedFromPDF: true
      }
    ];
  }
  
  if (lowerFilename.includes('a1') || lowerFilename.includes('splitter')) {
    return [
      {
        id: 'item-6',
        name: 'Splitters',
        quantity: 4,
        type: 'A32',
        unitCost: 1100,
        totalCost: 4400,
        category: 'GPON',
        extractedFromPDF: true
      },
      {
        id: 'item-7',
        name: 'New splice',
        quantity: 1,
        type: 'A32',
        unitCost: 850,
        totalCost: 850,
        category: 'GPON',
        extractedFromPDF: true
      }
    ];
  }
  
  // Default items for any other file
  return [
    {
      id: 'item-8',
      name: 'GPON design',
      quantity: 1,
      type: 'A32',
      unitCost: 1750,
      totalCost: 1750,
      category: 'GPON',
      extractedFromPDF: true
    },
    {
      id: 'item-9',
      name: 'Cable installation',
      quantity: 50,
      type: 'A50',
      unitCost: 25,
      totalCost: 1250,
      category: 'Labor',
      extractedFromPDF: true
    }
  ];
};

export const calculateSubtotals = (items: QuoteItem[]) => {
  return items.reduce((acc, item) => {
    const category = item.category || 'Materials';
    const key = category.toLowerCase() as keyof typeof acc;
    acc[key] = (acc[key] || 0) + item.totalCost;
    return acc;
  }, {
    gpon: 0,
    materials: 0,
    civil: 0,
    labor: 0
  });
};

export const mockCurrentQuote: Quote = {
  id: 'quote-current',
  projectCode: 'NGMR-12345',
  projectLocation: 'ELLE, North Vancouver, BC',
  units: 12,
  items: getItemsByFilename('NGMR-12345_A2.pdf'),
  subtotals: {
    gpon: 18139.00,
    materials: 7600.76,
    civil: 20083.24,
    labor: 0
  },
  totalCost: 45823,
  status: 'draft',
  createdAt: new Date('2025-01-11'),
  updatedAt: new Date('2025-01-11')
};
