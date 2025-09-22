# Component Specifications and Design System

## Design System Foundation

### Color Palette
```css
:root {
  /* Primary Colors */
  --color-primary: #16a34a;        /* Green - primary actions, success states */
  --color-primary-hover: #15803d;  /* Darker green for hover */
  --color-primary-light: #bbf7d0;  /* Light green for backgrounds */
  
  /* Secondary Colors */
  --color-blue: #2563eb;           /* Information, links, submitted status */
  --color-orange: #ea580c;         /* Pending status, warnings */
  --color-red: #dc2626;            /* Errors, rejected status */
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;        /* Background */
  --color-gray-100: #f3f4f6;       /* Light backgrounds */
  --color-gray-200: #e5e7eb;       /* Borders, dividers */
  --color-gray-400: #9ca3af;       /* Muted text, icons */
  --color-gray-500: #6b7280;       /* Secondary text */
  --color-gray-600: #4b5563;       /* Primary text */
  --color-gray-700: #374151;       /* Headings */
  --color-gray-900: #111827;       /* Dark text */
  
  /* Background Colors */
  --bg-sidebar: #ffffff;           /* Sidebar background */
  --bg-main: #f9fafb;             /* Main content background */
  --bg-card: #ffffff;             /* Card backgrounds */
  
  /* Border Colors */
  --border-primary: #e5e7eb;      /* Default borders */
  --border-focus: #2563eb;        /* Focus borders */
}
```

### Typography Scale
```css
/* Text Sizes */
.text-xs { font-size: 0.75rem; }      /* 12px - labels, helper text */
.text-sm { font-size: 0.875rem; }     /* 14px - body text */
.text-base { font-size: 1rem; }       /* 16px - default */
.text-lg { font-size: 1.125rem; }     /* 18px - headings */
.text-xl { font-size: 1.25rem; }      /* 20px - large headings */
.text-2xl { font-size: 1.5rem; }     /* 24px - page titles */
.text-3xl { font-size: 1.875rem; }   /* 30px - large numbers */
.text-4xl { font-size: 2.25rem; }    /* 36px - hero numbers */
```

---

## Core Layout Components

### 1. MainLayout Component
```typescript
interface MainLayoutProps {
  children: React.ReactNode;
}

// Features:
// - Sidebar with navigation
// - Top header with search and user menu  
// - Main content area with proper spacing
// - Responsive grid layout (256px sidebar + 1fr content)
```

**Layout Structure**:
```html
<div className="h-screen grid" style={{ gridTemplateColumns: '256px 1fr' }}>
  <Sidebar />
  <main className="flex flex-col min-w-0 bg-gray-50">
    <Header />
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </main>
</div>
```

### 2. Sidebar Component
```typescript
interface SidebarProps {
  activeSection?: string;
}

interface SidebarItemProps {
  to?: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  exact?: boolean;
}
```

**Features**:
- **Navigation Items**: Dashboard, Notifications, Quote Generation, Change Orders, Design Edits, NGMR Budget
- **Active State**: Highlight current section
- **Brand Area**: "AFL Internal" header
- **Footer**: User team info

### 3. Header Component
```typescript
interface HeaderProps {
  searchPlaceholder?: string;
  showSearch?: boolean;
}
```

**Features**:
- **Global Search**: 420px width input with Ctrl+F shortcut
- **Help Center**: Link to help documentation
- **User Menu**: Avatar, name, dropdown for profile/logout
- **Responsive**: Maintains layout across screen sizes

---

## Form Components

### 1. Input Components
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

// Base input styling
.ds-input {
  @apply px-3 py-2 border border-gray-200 rounded-md text-sm 
         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
         disabled:bg-gray-50 disabled:text-gray-500;
}
```

### 2. Button Components
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
}

// Button variants
.ds-btn {
  @apply px-4 py-2 rounded-md text-sm font-medium transition-colors;
}

.ds-btn-primary {
  @apply bg-green-600 text-white hover:bg-green-700;
}

.ds-btn-secondary {
  @apply bg-white border border-gray-200 text-gray-700 hover:bg-gray-50;
}
```

### 3. Upload Component
```typescript
interface UploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  dragAndDrop?: boolean;
}

// Upload states
interface UploadState {
  isDragging: boolean;
  isUploading: boolean;
  progress: number;
  error: string | null;
  uploadedFile: File | null;
}
```

**Features**:
- **Drag and Drop**: Visual feedback for drag operations
- **Progress**: Real-time upload progress (65% example from wireframes)
- **Validation**: File type, size, format validation
- **Error Handling**: Clear error messages and recovery options

---

## Data Display Components

### 1. Table Component
```typescript
interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
}

interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}
```

**Features**:
- **Search**: Global and column-specific search
- **Sorting**: Click column headers to sort
- **Filtering**: Dropdown filters for specific columns
- **Actions**: Row-level actions (edit, delete, view)

### 2. Status Badge Component
```typescript
interface StatusBadgeProps {
  status: 'submitted' | 'pending' | 'approved' | 'rejected' | 'paid';
  size?: 'sm' | 'md';
}

// Status color mapping
const statusColors = {
  submitted: 'bg-blue-100 text-blue-800',
  pending: 'bg-orange-100 text-orange-800', 
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  paid: 'bg-blue-100 text-blue-800'
};
```

### 3. Progress Bar Component
```typescript
interface ProgressBarProps {
  value: number;      // 0-100
  max?: number;
  color?: 'green' | 'blue' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
```

**Usage Examples**:
- Budget utilization (70% filled in wireframes)
- File upload progress (65% example)
- Project completion status

---

## Workflow Components

### 1. Stepper Component
```typescript
interface StepperProps {
  steps: StepConfig[];
  currentStep: number;
  completedSteps: number[];
}

interface StepConfig {
  key: string;
  label: string;
  num: number;
}

// Example from wireframes
const quoteSteps = [
  { key: 'upload', label: 'Upload Design', num: 1 },
  { key: 'generate', label: 'Generate Quote', num: 2 },
  { key: 'submit', label: 'Download', num: 3 }
];
```

**Visual States**:
- **Completed**: Green circle with checkmark
- **Current**: Green border circle with number
- **Pending**: Gray border circle with number
- **Connection Lines**: Gray lines between steps

### 2. Quote Items Table
```typescript
interface QuoteItemsTableProps {
  items: QuoteItem[];
  editable?: boolean;
  onItemChange?: (id: string, changes: Partial<QuoteItem>) => void;
  onItemDelete?: (id: string) => void;
  onItemAdd?: () => void;
}

interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  type: string;         // A32, A50
  unitCost: number;
  total: number;
}
```

**Features**:
- **Inline Editing**: Quantity fields editable
- **Add/Remove**: Add new items, delete existing
- **Calculations**: Auto-calculate totals
- **Validation**: Minimum quantities, required fields

---

## Page-Specific Components

### 1. Dashboard Cards
```typescript
interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    period: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### 2. Budget Overview Component
```typescript
interface BudgetOverviewProps {
  ngmrId: string;
  actualCost: number;
  plannedCost: number;
  alerts: AlertItem[];
  purchaseOrders: PurchaseOrder[];
}

interface AlertItem {
  type: 'critical' | 'warning';
  message: string;
  action?: string;
  actionUrl?: string;
}
```

**Layout**:
- **Left Panel**: NGMR info, costs, alerts
- **Right Panel**: Purchase orders with expandable details
- **Tabs**: Overview/Alerts tab switching

### 3. Change Order Detail Component
```typescript
interface ChangeOrderDetailProps {
  changeOrder: ChangeOrder;
  editable?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface ChangeOrder {
  id: string;
  projectCode: string;
  status: COStatus;
  items: QuoteItem[];
  totalCost: number;
  submittedAt?: Date;
  approvedAt?: Date;
}
```

---

## Interactive Components

### 1. Search Component
```typescript
interface SearchComponentProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  shortcuts?: KeyboardShortcut[];
  suggestions?: string[];
}
```

**Features**:
- **Keyboard Shortcuts**: Ctrl+F activation
- **Live Search**: Real-time filtering
- **Suggestions**: Auto-complete based on data
- **Clear Action**: Easy search reset

### 2. Filter Component
```typescript
interface FilterComponentProps {
  filters: FilterConfig[];
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'number';
  options?: FilterOption[];
}
```

### 3. PDF Viewer Component
```typescript
interface PDFViewerProps {
  url: string;
  annotations?: PDFAnnotation[];
  onPageChange?: (page: number) => void;
  controls?: boolean;
}
```

**Features**:
- **Navigation**: Previous/next page controls
- **Zoom**: Zoom in/out capabilities
- **Annotations**: Highlight extracted items
- **Download**: PDF download functionality

---

## Utility Components

### 1. Loading States
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}
```

### 2. Empty States
```typescript
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### 3. Error Boundaries
```typescript
interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}
```

---

## Component Styling Patterns

### Layout Classes
```css
/* Sidebar navigation */
.ds-sidebar-link {
  @apply flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100;
}

.ds-sidebar-link-active {
  @apply bg-green-50 text-green-700;
}

/* Card layouts */
.ds-card {
  @apply bg-white border border-gray-200 rounded-lg p-4;
}

/* Table styling */
.ds-table {
  @apply w-full border-collapse;
}

.ds-table th {
  @apply px-3 py-2 text-left text-xs font-medium text-gray-500 border-b;
}

.ds-table td {
  @apply px-3 py-2 text-sm text-gray-900 border-b border-gray-100;
}
```

### Interactive States
```css
/* Focus states */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

/* Hover effects */
.hover-lift {
  @apply transition-transform hover:transform hover:-translate-y-0.5;
}

/* Active states */
.active-scale {
  @apply active:transform active:scale-95;
}
```

---

## Responsive Design Patterns

### Breakpoints
```css
/* Mobile First Approach */
.container {
  @apply px-4;
}

@media (min-width: 768px) {
  .container {
    @apply px-6;
  }
}

@media (min-width: 1024px) {
  .container {
    @apply px-8;
  }
}
```

### Mobile Adaptations
- **Sidebar**: Collapse to hamburger menu on mobile
- **Tables**: Horizontal scroll or card layout on small screens
- **Search**: Full-width on mobile
- **Steppers**: Vertical layout on small screens

---

## Accessibility Considerations

### ARIA Labels
```typescript
// Screen reader support
<button aria-label="Upload file" onClick={handleUpload}>
  <Upload size={16} />
</button>

// Status announcements
<div aria-live="polite" aria-atomic="true">
  {status === 'uploading' && `Uploading file: ${progress}% complete`}
</div>
```

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through forms
- **Shortcuts**: Consistent keyboard shortcuts (Ctrl+F for search)
- **Focus Management**: Clear focus indicators
- **Modal Trapping**: Focus containment in dialogs

### Color Accessibility
- **Contrast**: Minimum 4.5:1 contrast ratio
- **Color Independence**: Don't rely solely on color for information
- **Status Indicators**: Use icons + color for status
- **Error States**: Clear error messaging with visual indicators
