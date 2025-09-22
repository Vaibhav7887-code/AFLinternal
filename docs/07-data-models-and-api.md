# Data Models and API Specifications

## Core Data Models

### 1. Quote and Project Models
```typescript
// Base project information
interface Project {
  id: string;
  code: string;                 // e.g., "NGMR-12345"
  name?: string;
  location: string;             // e.g., "ELLE, North Vancouver, BC"
  units: number;                // e.g., 12
  totalBudget: number;          // Total project budget
  usedBudget: number;           // Amount already used
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';

// Quote item structure
interface QuoteItem {
  id: string;
  name: string;                 // e.g., "Place/Splice", "Hydrovac"
  quantity: number;
  type: ItemType;               // A32, A50, etc.
  unitCost: number;             // Cost per unit
  totalCost: number;            // quantity * unitCost
  category?: ItemCategory;      // GPON, Materials, Civil
  description?: string;
  extractedFromPDF?: boolean;   // Whether item was auto-extracted
}

type ItemType = 'A32' | 'A50' | 'A60' | 'custom';
type ItemCategory = 'GPON' | 'Materials' | 'Civil' | 'Labor' | 'Equipment';

// Complete quote structure
interface Quote {
  id: string;
  projectId: string;
  projectCode: string;          // Denormalized for display
  version: number;              // Quote version tracking
  items: QuoteItem[];
  subtotals: {
    gpon: number;
    materials: number;
    civil: number;
    labor: number;
  };
  totalCost: number;
  status: QuoteStatus;
  uploadedFile?: UploadedFile;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  approvedAt?: Date;
}

type QuoteStatus = 'draft' | 'review' | 'submitted' | 'approved' | 'rejected';
```

### 2. File Upload Models
```typescript
interface UploadedFile {
  id: string;
  filename: string;             // e.g., "CO #5.pdf"
  originalName: string;
  size: number;                 // File size in bytes
  mimeType: string;             // application/pdf
  uploadedAt: Date;
  processedAt?: Date;
  status: FileStatus;
  url?: string;                 // Download URL
  thumbnailUrl?: string;        // Preview thumbnail
  extractedItems?: number;      // Number of items extracted
  processingError?: string;
}

type FileStatus = 'uploading' | 'processing' | 'completed' | 'error';

interface UploadProgress {
  fileId: string;
  progress: number;             // 0-100
  status: FileStatus;
  error?: string;
}
```

### 3. Change Order Models
```typescript
interface ChangeOrder {
  id: string;
  coNumber: string;             // e.g., "CO #5"
  projectId: string;
  projectCode: string;          // e.g., "NGMR-12345"
  title: string;
  description?: string;
  items: QuoteItem[];
  totalCost: number;
  status: ChangeOrderStatus;
  submittedBy: string;          // User ID
  submittedAt?: Date;
  reviewedBy?: string;          // User ID
  reviewedAt?: Date;
  approvedBy?: string;          // User ID
  approvedAt?: Date;
  rejectionReason?: string;
  attachments: UploadedFile[];
  vendor?: string;              // HTI, AFL INTERNAL, etc.
  createdAt: Date;
  updatedAt: Date;
}

type ChangeOrderStatus = 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected' | 'implemented';

// Change order summary for list views
interface ChangeOrderSummary {
  id: string;
  coNumber: string;
  projectCode: string;
  vendor: string;
  location: string;
  totalCost: number;
  status: ChangeOrderStatus;
  submittedAt: Date;
}
```

### 4. Budget and Purchase Order Models
```typescript
interface NGMRBudget {
  id: string;
  ngmrCode: string;             // e.g., "4847"
  projectName?: string;
  units: number;
  plannedCost: number;
  actualCost: number;
  paidAmount: number;
  outstandingAmount: number;
  alerts: BudgetAlert[];
  purchaseOrders: PurchaseOrder[];
  vendors: VendorSummary[];
  lastUpdated: Date;
}

interface BudgetAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  amount?: number;
  actionRequired?: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

type AlertType = 'po_missing' | 'loa_rejected' | 'budget_overrun' | 'payment_overdue';
type AlertSeverity = 'critical' | 'warning' | 'info';

interface PurchaseOrder {
  id: string;
  poNumber: string;             // e.g., "PO 076767"
  vendor: string;               // HTI, Keyworks, Materials
  totalAmount: number;
  status: POStatus;
  items: POItem[];
  isExpanded?: boolean;         // UI state for expandable view
  createdAt: Date;
  updatedAt: Date;
}

type POStatus = 'draft' | 'submitted' | 'approved' | 'paid' | 'cancelled';

interface POItem {
  id: string;
  name: string;                 // Place/Splice, Hydrovac, etc.
  units: number;
  unitCost: number;
  totalCost: number;
  status: POItemStatus;
  type?: string;                // For categorization
}

type POItemStatus = 'pending' | 'paid' | 'rejected' | 'cancelled';

interface VendorSummary {
  vendor: string;
  plannedAmount: number;
  actualAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  performanceRating?: number;   // 1-5 scale
}
```

### 5. User and Authentication Models
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;          // e.g., "Khushboo"
  avatar?: string;              // Avatar URL or initials
  role: UserRole;
  permissions: Permission[];
  department?: string;          // Marketing Team, etc.
  lastLoginAt?: Date;
  createdAt: Date;
}

type UserRole = 'admin' | 'manager' | 'estimator' | 'viewer';

interface Permission {
  id: string;
  resource: string;             // 'quotes', 'budgets', 'change_orders'
  action: string;               // 'create', 'read', 'update', 'delete'
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
}
```

---

## API Specifications

### 1. Quote Management APIs

#### Quote Creation and Management
```typescript
// POST /api/quotes
interface CreateQuoteRequest {
  projectCode: string;
  units: number;
}

interface CreateQuoteResponse {
  quote: Quote;
  uploadUrl: string;            // Pre-signed URL for file upload
}

// PUT /api/quotes/:id/items
interface UpdateQuoteItemsRequest {
  items: Partial<QuoteItem>[];
}

// POST /api/quotes/:id/submit
interface SubmitQuoteRequest {
  finalReview: boolean;
}

// GET /api/quotes/:id/pdf
// Returns: PDF file download
```

#### File Upload and Processing
```typescript
// POST /api/files/upload
interface FileUploadRequest {
  file: File;
  projectCode: string;
  quoteId?: string;
}

interface FileUploadResponse {
  fileId: string;
  uploadUrl: string;            // For chunked uploads
  processingStatus: FileStatus;
}

// GET /api/files/:id/progress
interface FileProgressResponse {
  progress: number;
  status: FileStatus;
  extractedItems?: QuoteItem[];
  error?: string;
}

// Webhook: POST /api/webhooks/file-processed
interface FileProcessedWebhook {
  fileId: string;
  status: FileStatus;
  extractedItems?: QuoteItem[];
  error?: string;
}
```

### 2. Change Order APIs

#### Change Order Management
```typescript
// GET /api/change-orders
interface ListChangeOrdersRequest {
  page?: number;
  limit?: number;
  status?: ChangeOrderStatus[];
  vendor?: string[];
  projectCode?: string;
  sortBy?: 'submittedAt' | 'totalCost' | 'status';
  sortOrder?: 'asc' | 'desc';
}

interface ListChangeOrdersResponse {
  changeOrders: ChangeOrderSummary[];
  totalCount: number;
  page: number;
  totalPages: number;
}

// POST /api/change-orders
interface CreateChangeOrderRequest {
  projectCode: string;
  title: string;
  description?: string;
  items: Omit<QuoteItem, 'id'>[];
}

// PUT /api/change-orders/:id/submit
interface SubmitChangeOrderRequest {
  finalItems: QuoteItem[];
}

// PUT /api/change-orders/:id/approve
interface ApproveChangeOrderRequest {
  approvalNotes?: string;
}

// PUT /api/change-orders/:id/reject
interface RejectChangeOrderRequest {
  rejectionReason: string;
}
```

### 3. Budget Management APIs

#### NGMR Budget APIs
```typescript
// GET /api/ngmr-budget/:ngmrCode
interface GetBudgetResponse {
  budget: NGMRBudget;
}

// GET /api/ngmr-budget/:ngmrCode/alerts
interface GetBudgetAlertsRequest {
  severity?: AlertSeverity[];
  resolved?: boolean;
}

interface GetBudgetAlertsResponse {
  alerts: BudgetAlert[];
}

// POST /api/ngmr-budget/:ngmrCode/alerts/:alertId/resolve
interface ResolveAlertRequest {
  resolution: string;
}

// GET /api/ngmr-budget/:ngmrCode/purchase-orders
interface GetPurchaseOrdersResponse {
  purchaseOrders: PurchaseOrder[];
}

// POST /api/purchase-orders/:id/upload
interface UploadPORequest {
  file: File;
  vendor: string;
  poNumber: string;
}
```

### 4. Dashboard and Analytics APIs

#### Dashboard Data
```typescript
// GET /api/dashboard
interface DashboardResponse {
  metrics: {
    activeProjects: number;
    pendingApprovals: number;
    totalQuotesThisMonth: number;
    avgQuoteValue: number;
  };
  recentActivity: ActivityItem[];
  pendingTasks: TaskItem[];
  alerts: BudgetAlert[];
}

interface ActivityItem {
  id: string;
  type: 'quote_submitted' | 'co_approved' | 'budget_alert' | 'file_processed';
  title: string;
  description: string;
  timestamp: Date;
  relatedUrl?: string;
}

interface TaskItem {
  id: string;
  type: 'approve_co' | 'review_quote' | 'update_budget';
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  actionUrl: string;
}
```

### 5. Search and Filter APIs

#### Global Search
```typescript
// GET /api/search
interface SearchRequest {
  query: string;
  filters?: {
    type?: ('quotes' | 'change_orders' | 'projects' | 'pos')[];
    dateRange?: {
      start: Date;
      end: Date;
    };
    status?: string[];
  };
  limit?: number;
}

interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  facets: SearchFacets;
}

interface SearchResult {
  id: string;
  type: 'quote' | 'change_order' | 'project' | 'po';
  title: string;
  description: string;
  url: string;
  metadata: Record<string, any>;
  relevanceScore: number;
}

interface SearchFacets {
  types: { type: string; count: number }[];
  statuses: { status: string; count: number }[];
  vendors: { vendor: string; count: number }[];
}
```

---

## Mock Data Structure

### Sample Data for Development
```typescript
// Mock data for quotes
export const mockQuotes: Quote[] = [
  {
    id: 'quote-1',
    projectId: 'proj-1',
    projectCode: 'NGMR-12345',
    version: 1,
    items: [
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
      // ... more items
    ],
    subtotals: {
      gpon: 18139.00,
      materials: 7600.76,
      civil: 20083.24,
      labor: 0
    },
    totalCost: 45823,
    status: 'submitted',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-11'),
    submittedAt: new Date('2025-01-11')
  }
];

// Mock data for change orders
export const mockChangeOrders: ChangeOrderSummary[] = [
  {
    id: 'co-1',
    coNumber: 'CO #1',
    projectCode: 'NGMR-11234',
    vendor: 'HTI',
    location: 'New York City, NY',
    totalCost: 12000,
    status: 'submitted',
    submittedAt: new Date('2025-01-10')
  },
  // ... more change orders
];

// Mock data for budget
export const mockBudgetData: NGMRBudget = {
  id: 'budget-4847',
  ngmrCode: '4847',
  units: 4,
  plannedCost: 20000,
  actualCost: 25000,
  paidAmount: 18500,
  outstandingAmount: 6500,
  alerts: [
    {
      id: 'alert-1',
      type: 'po_missing',
      severity: 'critical',
      title: 'PO missing - Handholes $150',
      description: 'Purchase order required for handhole installation',
      amount: 150,
      actionRequired: true,
      actionUrl: '/purchase-orders/new',
      actionLabel: 'Request',
      createdAt: new Date('2025-01-10')
    }
  ],
  purchaseOrders: [
    {
      id: 'po-076767',
      poNumber: 'PO 076767',
      vendor: 'HTI',
      totalAmount: 12000,
      status: 'approved',
      items: [
        {
          id: 'po-item-1',
          name: 'Place/Splice',
          units: 4,
          unitCost: 500,
          totalCost: 2000,
          status: 'paid'
        }
        // ... more items
      ],
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-08')
    }
  ],
  vendors: [
    {
      vendor: 'HTI',
      plannedAmount: 10000,
      actualAmount: 12000,
      paidAmount: 8500,
      outstandingAmount: 3500
    }
  ],
  lastUpdated: new Date('2025-01-11')
};
```

---

## API Error Handling

### Error Response Format
```typescript
interface APIError {
  error: {
    code: string;                // Machine-readable error code
    message: string;             // Human-readable error message
    details?: Record<string, any>; // Additional error context
    timestamp: string;           // ISO timestamp
    requestId: string;           // For tracking/debugging
  };
}

// Common error codes
type ErrorCode = 
  | 'VALIDATION_ERROR'           // Invalid request data
  | 'NOT_FOUND'                  // Resource not found
  | 'UNAUTHORIZED'               // Authentication required
  | 'FORBIDDEN'                  // Insufficient permissions
  | 'FILE_TOO_LARGE'            // File upload size limit
  | 'INVALID_FILE_TYPE'         // Unsupported file format
  | 'PROCESSING_FAILED'         // PDF processing error
  | 'BUDGET_EXCEEDED'           // Cost exceeds budget limits
  | 'DUPLICATE_CO'              // Change order already exists
  | 'INVALID_STATUS_TRANSITION' // Invalid status change
  | 'SERVER_ERROR';             // Internal server error
```

### Loading and Error States
```typescript
interface APIState<T> {
  data: T | null;
  loading: boolean;
  error: APIError | null;
  lastFetched?: Date;
}

// Usage in components
const useQuote = (quoteId: string) => {
  const [state, setState] = useState<APIState<Quote>>({
    data: null,
    loading: true,
    error: null
  });

  // ... fetch logic
  
  return state;
};
```

---

## Data Validation

### Client-Side Validation
```typescript
// Validation schemas using zod or similar
import { z } from 'zod';

const QuoteItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitCost: z.number().min(0, 'Unit cost must be positive'),
  type: z.enum(['A32', 'A50', 'A60', 'custom'])
});

const ProjectCodeSchema = z.string()
  .regex(/^NGMR-\d{4,6}$/, 'Invalid NGMR format (e.g., NGMR-12345)');

// Form validation
const validateQuoteItems = (items: QuoteItem[]) => {
  return items.map(item => QuoteItemSchema.safeParse(item));
};
```

### Business Rules Validation
```typescript
// Budget validation
const validateBudgetLimit = (quote: Quote, projectBudget: number) => {
  const remainingBudget = projectBudget - quote.totalCost;
  
  if (remainingBudget < 0) {
    throw new Error(`Quote exceeds budget by $${Math.abs(remainingBudget).toFixed(2)}`);
  }
  
  if (remainingBudget < projectBudget * 0.1) {
    console.warn(`Quote uses ${((quote.totalCost / projectBudget) * 100).toFixed(1)}% of budget`);
  }
};

// Change order validation
const validateChangeOrderItems = (items: QuoteItem[]) => {
  if (items.length === 0) {
    throw new Error('At least one item is required for change order');
  }
  
  const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
  
  if (totalCost > 50000) {
    throw new Error('Change orders over $50,000 require additional approval');
  }
};
```
