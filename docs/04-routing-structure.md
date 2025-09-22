# Routing Structure and Navigation Plan

## Current Routing Implementation

### Existing Routes
```typescript
// Current App.tsx routes
/                           → Navigate to /quote/upload
/quote/upload              → UploadStep component
/quote/generate            → GenerateStep component  
/quote/submit              → SubmitStep component
```

### Current Issues
1. **Limited Scope**: Only covers quote generation workflow
2. **Missing Core Features**: No routes for change orders, budget management, dashboard
3. **No Route Guards**: Missing authentication and permission checks
4. **Inconsistent Patterns**: Mixed route structures

---

## Proposed Complete Routing Structure

### 1. Dashboard and Main Navigation
```typescript
/                          → Dashboard (landing page)
/dashboard                 → Dashboard (explicit route)
/notifications             → Notifications center
/help                      → Help center
```

### 2. Quote Generation Workflow
```typescript
/quote                     → Quote dashboard/list
/quote/new                 → Start new quote workflow (redirects to upload)
/quote/upload              → Upload design step
/quote/generate            → Generate quote step  
/quote/review              → Review quote details
/quote/submit              → Submit/download step
/quote/:quoteId            → View existing quote
/quote/:quoteId/edit       → Edit existing quote
```

### 3. Change Orders Management
```typescript
/change-orders             → Change orders dashboard
/change-orders/new         → Start new change order
/change-orders/history     → Change order history/list
/change-orders/:coId       → View change order details
/change-orders/:coId/edit  → Edit change order
```

### 4. NGMR Budget Management
```typescript
/ngmr-budget               → NGMR entry/search page
/ngmr-budget/:ngmrId       → Budget overview for specific NGMR
/ngmr-budget/:ngmrId/alerts → Budget alerts view
/ngmr-budget/:ngmrId/pos   → Purchase orders for NGMR
/ngmr-budget/:ngmrId/po/:poId → Specific PO details
```

### 5. Design Management
```typescript
/design-edits              → Design edits dashboard
/design-edits/new          → Create new design edit
/design-edits/:editId      → View design edit details
```

### 6. User and System
```typescript
/profile                   → User profile and settings
/settings                  → Application settings
/admin                     → Admin panel (if applicable)
```

---

## Route Components and Layouts

### Layout Hierarchy
```
App
├── AuthLayout (if auth required)
│   ├── MainLayout (sidebar + header)
│   │   ├── Dashboard
│   │   ├── QuoteLayout (stepper + content)
│   │   │   ├── UploadStep
│   │   │   ├── GenerateStep
│   │   │   ├── ReviewStep
│   │   │   └── SubmitStep
│   │   ├── ChangeOrdersLayout
│   │   │   ├── ChangeOrdersDashboard
│   │   │   ├── ChangeOrdersList
│   │   │   └── ChangeOrderDetail
│   │   ├── BudgetLayout
│   │   │   ├── NGMREntry
│   │   │   ├── BudgetOverview
│   │   │   └── BudgetAlerts
│   │   └── DesignEditsLayout
│   └── ErrorBoundary
└── NotFound
```

### Route Guards and Protection
```typescript
// Route protection patterns
<ProtectedRoute permissions={['quote.create']}>
  <QuoteLayout />
</ProtectedRoute>

<ProtectedRoute permissions={['budget.view']}>
  <BudgetLayout />
</ProtectedRoute>
```

---

## Navigation State Management

### Active State Management
```typescript
// Sidebar navigation state
interface NavigationState {
  activeSection: 'dashboard' | 'quote' | 'change-orders' | 'budget' | 'design-edits'
  activeRoute: string
  breadcrumbs: BreadcrumbItem[]
}

// Stepper state for multi-step workflows
interface StepperState {
  currentStep: number
  completedSteps: number[]
  canProceed: boolean
  workflow: 'quote' | 'change-order' | 'design-edit'
}
```

### Breadcrumb Configuration
```typescript
const breadcrumbConfig = {
  '/quote/upload': [
    { label: 'Quote Generation', url: '/quote' },
    { label: 'Upload Design', url: '/quote/upload' }
  ],
  '/ngmr-budget/4847': [
    { label: 'NGMR Budget', url: '/ngmr-budget' },
    { label: 'NGMR-4847', url: '/ngmr-budget/4847' }
  ],
  '/change-orders/co-5': [
    { label: 'Change Orders', url: '/change-orders' },
    { label: 'CO #5', url: '/change-orders/co-5' }
  ]
}
```

---

## URL Parameter Patterns

### Quote Generation
```typescript
/quote/upload?project=NGMR-12345&units=12
/quote/generate?project=NGMR-12345&file=co5.pdf
/quote/review?quoteId=q-123&version=v2
```

### Budget Management
```typescript
/ngmr-budget/4847?tab=overview
/ngmr-budget/4847?tab=alerts&severity=critical
/ngmr-budget/4847/po/076767?expanded=true
```

### Change Orders
```typescript
/change-orders?status=pending&vendor=HTI
/change-orders/co-5?view=items&edit=true
/change-orders/history?date=2025-01&vendor=all
```

---

## Router Configuration

### React Router Setup
```typescript
// New App.tsx structure
export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Quote Generation */}
          <Route path="/quote" element={<QuoteDashboard />} />
          <Route element={<QuoteLayout />}>
            <Route path="/quote/upload" element={<UploadStep />} />
            <Route path="/quote/generate" element={<GenerateStep />} />
            <Route path="/quote/review" element={<ReviewStep />} />
            <Route path="/quote/submit" element={<SubmitStep />} />
          </Route>
          <Route path="/quote/:quoteId" element={<QuoteDetail />} />
          
          {/* Change Orders */}
          <Route path="/change-orders" element={<ChangeOrdersDashboard />} />
          <Route path="/change-orders/history" element={<ChangeOrdersList />} />
          <Route path="/change-orders/:coId" element={<ChangeOrderDetail />} />
          
          {/* NGMR Budget */}
          <Route path="/ngmr-budget" element={<NGMREntry />} />
          <Route path="/ngmr-budget/:ngmrId" element={<BudgetOverview />} />
          
          {/* Design Edits */}
          <Route path="/design-edits" element={<DesignEditsDashboard />} />
          
          {/* User */}
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### Navigation Hook
```typescript
// Custom hook for navigation
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigateToQuote = (projectCode?: string) => {
    const params = projectCode ? `?project=${projectCode}` : '';
    navigate(`/quote/upload${params}`);
  };
  
  const navigateToBudget = (ngmrId: string) => {
    navigate(`/ngmr-budget/${ngmrId}`);
  };
  
  const navigateToChangeOrder = (coId?: string) => {
    navigate(coId ? `/change-orders/${coId}` : '/change-orders');
  };
  
  return {
    navigateToQuote,
    navigateToBudget,
    navigateToChangeOrder,
    currentPath: location.pathname,
    currentParams: new URLSearchParams(location.search)
  };
};
```

---

## Route-Specific Features

### 1. Quote Generation Routes
**Features**:
- Step progression with validation
- Auto-save form data
- File upload state persistence
- Project context maintenance

**State Management**:
```typescript
interface QuoteState {
  projectCode: string
  units: number
  uploadedFile: File | null
  extractedItems: QuoteItem[]
  currentStep: 'upload' | 'generate' | 'review' | 'submit'
  isDirty: boolean
}
```

### 2. Change Order Routes
**Features**:
- Status filtering and search
- Real-time status updates
- Vendor-based organization
- Approval workflow tracking

**State Management**:
```typescript
interface ChangeOrderState {
  activeFilters: FilterState
  sortOrder: SortConfig
  selectedOrders: string[]
  currentView: 'dashboard' | 'history' | 'detail'
}
```

### 3. Budget Management Routes
**Features**:
- NGMR lookup and validation
- Tab-based content switching
- Expandable PO sections
- Alert notifications

**State Management**:
```typescript
interface BudgetState {
  ngmrId: string
  activeTab: 'overview' | 'alerts'
  expandedPOs: string[]
  alertFilters: AlertFilter[]
}
```

---

## Error Handling and Fallbacks

### Route Error Boundaries
```typescript
<Route path="/quote/*" element={
  <ErrorBoundary fallback={<QuoteErrorFallback />}>
    <QuoteLayout />
  </ErrorBoundary>
} />
```

### Not Found Handling
- **Unknown Routes**: Redirect to dashboard with message
- **Invalid Parameters**: Show error page with navigation options
- **Permission Denied**: Show access denied page with contact info

### Navigation Validation
- **Step Validation**: Prevent navigation to incomplete steps
- **Unsaved Changes**: Warn before leaving with unsaved data
- **Session Timeout**: Redirect to login with return URL

---

## Performance Considerations

### Lazy Loading
```typescript
// Code splitting for large sections
const ChangeOrdersModule = lazy(() => import('./change-orders/ChangeOrdersModule'));
const BudgetModule = lazy(() => import('./budget/BudgetModule'));
```

### Route Preloading
- **Prefetch**: Next likely routes based on current page
- **Background**: Load common data for anticipated navigation
- **Caching**: Cache route data to prevent re-fetching

### URL State Management
- **Minimal URLs**: Keep URLs clean and bookmarkable
- **State Sync**: Sync important state with URL parameters
- **History Management**: Handle browser back/forward properly
