# Missing States and Screens Analysis

## Overview
Based on the wireframe analysis, several key states and screens are missing from the current implementation that would be necessary for a complete application. This document identifies these gaps and provides specifications for implementing them.

## Missing Screens

### 1. Dashboard/Landing Page
**Route**: `/dashboard`
**Status**: Missing entirely

#### Requirements
- **Overview Cards**: Summary metrics for ongoing projects, pending approvals, recent activity
- **Quick Actions**: Shortcuts to common tasks (start new quote, view change orders, etc.)
- **Recent Projects**: List of recently accessed NGMR projects
- **Notifications Summary**: Important alerts and system messages
- **Activity Feed**: Recent system activity and updates

#### Layout
- Grid layout with metric cards
- Recent activity sidebar
- Quick navigation to major workflows

---

### 2. Change Orders Dashboard
**Route**: `/change-orders`
**Status**: Missing entirely

#### Requirements
- **Action Cards Section**:
  - "Start CO request" card with prominent button
  - "CO history" card with view access
- **Change Orders Table**:
  - Vendor, NGMR, Cost, Status columns
  - Search, sort, and filter functionality
  - Status color coding (Submitted: blue, Pending: orange)
- **Data from wireframes**:
  - HTI, AFL INTERNAL, TELSTAR, KETWORKS vendors
  - Various NGMR codes and New York City locations

#### Interactive Elements
- Clickable rows leading to change order details
- Status filtering
- Vendor-based filtering
- Date range selection

---

### 3. NGMR Budget Overview
**Route**: `/ngmr-budget/:ngmrId`
**Status**: Missing entirely

#### Requirements
- **Left Panel**:
  - NGMR input field (4847 example)
  - Units display (4)
  - Actual vs Planned cost comparison
  - Alert system (Overview/Alerts tabs)
- **Right Panel**:
  - Purchase Orders list with expandable details
  - Item-level breakdown with status tracking
  - Upload functionality for new POs

#### Key Features
- **Budget Tracking**: Visual comparison of actual vs planned costs
- **Alert System**: Critical and warning notifications
- **PO Management**: Detailed purchase order tracking
- **Status Management**: Paid, Pending, Rejected states
- **Vendor Analysis**: Performance metrics by vendor

---

### 4. NGMR Budget Entry
**Route**: `/ngmr-budget`
**Status**: Missing entirely

#### Requirements
- Clean, focused interface for NGMR lookup
- Large input field for NGMR entry
- Validation for NGMR format
- Direct navigation to budget details

#### Design
- Centered layout with minimal distractions
- Clear call-to-action
- Form validation and error handling

---

## Missing States

### 1. File Upload States
**Current Implementation**: Basic upload only
**Missing States**:

#### Upload Progress State
- **Visual**: Progress bar with percentage (65% shown in wireframes)
- **File Info**: File name, size, format validation
- **Status Text**: "Uploading..." or completion status
- **Error Handling**: Invalid file type, size limit exceeded

#### Upload Complete State
- **Success Indicator**: Green checkmark and success styling
- **File Metadata**: Name, upload time, file size
- **Action Options**: Remove file, replace file
- **Auto-progression**: Automatic navigation to next step

#### Upload Error State
- **Error Display**: Clear error message
- **Recovery Options**: Retry upload, select different file
- **Validation**: File type, size, format requirements

---

### 2. Quote Generation States

#### Loading/Processing State
- **After Upload**: Processing PDF and extracting items
- **Loading Indicator**: Spinner or skeleton loading
- **Status Text**: "Analyzing design..." or "Extracting items..."

#### Review State
- **Editable Items**: Quantity modification, item addition/removal
- **Validation**: Required fields, quantity limits
- **Auto-save**: Save changes as user modifies
- **Preview**: PDF viewer with extracted item highlights

#### Finalization State
- **Read-only View**: Locked items after submission
- **Summary**: Total cost breakdown by category
- **Export Options**: PDF download, print functionality

---

### 3. Change Order States

#### New CO Request State
- **Form**: Project selection, description, attachment upload
- **Item Selection**: Add items to change order
- **Cost Calculation**: Real-time total updates
- **Validation**: Required fields, business rules

#### CO Submission State
- **Review**: Final review before submission
- **Submission**: Processing and confirmation
- **Tracking**: Status updates and notifications

#### CO Approval Workflow
- **Pending Review**: Awaiting approvals
- **In Review**: Currently being reviewed
- **Approved**: Accepted and ready for implementation
- **Rejected**: Denied with reasons
- **Implemented**: Work completed

---

### 4. Error and Empty States

#### Network Error State
- **Offline Indicator**: No internet connection warning
- **Retry Options**: Manual retry buttons
- **Cached Data**: Show available offline data

#### Empty Data State
- **No Projects**: When user has no NGMR projects
- **No Change Orders**: When no COs exist
- **No Budget Data**: When budget information unavailable

#### Permission Error State
- **Access Denied**: Insufficient permissions message
- **Contact Info**: How to request access
- **Alternative Actions**: Available actions for user role

---

## Missing Interactive Elements

### 1. Search Functionality
**Requirements**:
- Global search in header (with Ctrl+F shortcut)
- Context-specific search in tables and lists
- Search filters and advanced options
- Search history and suggestions

### 2. Notification System
**Requirements**:
- Real-time notifications for status changes
- Notification history and management
- Email/system notification preferences
- Alert priorities (Critical, Warning, Info)

### 3. User Profile Management
**Requirements**:
- User profile dropdown from header
- Account settings and preferences
- Role and permission display
- Logout functionality

### 4. Help and Documentation
**Requirements**:
- Help Center access from header
- Context-sensitive help
- User guides and tutorials
- Support contact information

---

## Missing Data Management

### 1. Form Validation
**Requirements**:
- Real-time field validation
- Error message display
- Required field indicators
- Format validation (NGMR codes, etc.)

### 2. Data Persistence
**Requirements**:
- Auto-save functionality
- Draft state management
- Session recovery
- Offline data handling

### 3. Export and Reporting
**Requirements**:
- PDF generation for quotes
- Excel export for budget data
- Print-friendly views
- Email sharing functionality

---

## Implementation Priority

### High Priority (Core Functionality)
1. File upload states and error handling
2. Quote review and editing capabilities
3. Change orders list and detail views
4. Budget overview dashboard

### Medium Priority (Enhanced UX)
1. Search functionality
2. Notification system
3. Empty and error states
4. Loading states

### Low Priority (Polish)
1. Advanced filtering
2. Export functionality
3. User preferences
4. Help system

---

## Technical Considerations

### State Management
- **Upload Progress**: File upload progress tracking
- **Form State**: Draft management and validation
- **Navigation State**: Breadcrumbs and step tracking
- **Error State**: Global error handling and recovery

### API Integration
- **File Processing**: PDF upload and analysis endpoints
- **Data Synchronization**: Real-time updates for status changes
- **Offline Support**: Caching and offline functionality
- **Error Handling**: Network error recovery and retry logic

### Performance
- **Large File Handling**: Chunked upload for large PDFs
- **Table Pagination**: For large datasets in lists
- **Lazy Loading**: For detailed views and images
- **Caching**: For frequently accessed data
