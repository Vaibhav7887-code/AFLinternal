# Wireframe Breakdown - AFL Internal Design Quoting Tool

## Screen 1: Change Order Summary Dashboard
**File Reference**: First wireframe image
**Route**: `/change-orders` or `/dashboard`

### Layout Structure
- **Sidebar**: Standard AFL Internal navigation with current section highlighted
- **Header**: Search bar (420px width) with Ctrl+F shortcut, Help Center link, and user profile (Khushboo with avatar)
- **Main Content**: Project summary with change order details

### Content Elements

#### Project Header Section
- **Back Navigation**: Arrow button to return to previous screen
- **Project Code**: NGMR-12345 (read-only input field)
- **Units**: 12 (read-only input field)

#### Project Information Card
- **Location**: ELLE, North Vancouver, BC
- **Cost Summary**:
  - Used: $34,350.00
  - Left: $15,000.00
  - Progress bar showing budget utilization (approximately 70% filled)

#### Quote Summary
- **Initial Quote Total**: $30,350
- **New Change Order (CO #5)**: "upload and generate quote" link
- **Change Order Statistics**:
  - Number of change orders: 04 Approved, 01 Rejected
  - Status: N/A

#### File Upload Section
- **Upload Area**: Dotted border container with:
  - Cloud upload icon
  - "Click to upload or drag and drop" text
  - File type specification: "Change Order PDF"
  - "OR" divider
  - "Upload from computer" button

### Interactive Elements
- Upload area supports drag and drop
- Upload from computer button opens file dialog
- Project code and units are read-only
- Navigation arrows and links are clickable

### State Indicators
- Budget progress bar with visual completion percentage
- Change order status with color coding (green for approved, red for rejected)

---

## Screen 2: Change Orders List View
**File Reference**: Second wireframe image
**Route**: `/change-orders/list`

### Layout Structure
- **Sidebar**: Same as previous screen
- **Header**: Same global header structure
- **Main Content**: Two-column layout with action cards and data table

### Action Cards Section (Left Column)
#### Start CO Request Card
- **Title**: "Start CO request"
- **Button**: "Start" (primary button styling)

#### CO History Card
- **Title**: "CO history"
- **Button**: "View" (secondary button styling)

### Change Orders Table Section
#### Table Header
- **Title**: "CO" with dropdown arrow
- **Controls**:
  - Search input with magnifying glass icon and Ctrl+F shortcut
  - "Sort By" button with sort icon
  - "Filter" button with filter icon

#### Table Structure
- **Columns**:
  - Vendor (sortable)
  - NGMRs (sortable)
  - Cost (sortable with location pin icon)
  - Status (sortable)

#### Table Data Rows
1. **HTI**: NGMR-11234, New York City, NY, Status: Submitted (blue)
2. **AFL INTERNAL**: NGMR-5658, New York City, NY, Status: Submitted (blue)
3. **TELSTAR**: NGMR-4846, New York City, NY, Status: Submitted (blue)
4. **HTI**: NGMR-47181, New York City, NY, Status: Pending (orange)
5. **KETWORKS**: NGMR-73390, New York City, NY, Status: Pending (orange)

### Interactive Elements
- Start and View buttons in action cards
- Table sorting on all columns
- Search functionality
- Filter options
- Status indicators are clickable (likely for details)

### Status Color Coding
- **Blue**: Submitted status
- **Orange**: Pending status
- **Location icons**: Consistent pin icons for geographic reference

---

## Screen 3: Quote Generation - Upload Step
**File Reference**: Third wireframe image
**Route**: `/quote/upload`

### Layout Structure
- **Sidebar**: Standard navigation with "Quote Generation" highlighted
- **Header**: Standard global header
- **Progress Stepper**: Three-step workflow indicator
  - Step 1: "Upload Design" (active/current - green circle with checkmark)
  - Step 2: "Generate Quote" (inactive - outlined circle with "2")
  - Step 3: "Submit" (inactive - outlined circle with "3")

### Content Elements

#### Project Information
- **Project Code**: NGMR-12345 (read-only input)
- **Units**: 12 (read-only input)

#### Upload Area
- **Large Upload Zone**: Dotted border container with:
  - Progress indicator showing "65%" completion
  - "PDF (max. 800×400px)" text
  - File identifier: "N#1123344"
  - Green progress bar indicating upload in progress

### Upload States
This screen shows the **uploading** state with:
- Visual progress indicator (65% complete)
- Green accent color indicating successful upload initiation
- File size and format validation text

### Interactive Elements
- Upload area accepts files via drag and drop
- Progress indicator updates in real-time
- File format validation (PDF only, specific size limits)

---

## Screen 4: Budget Overview Dashboard
**File Reference**: Fourth wireframe image
**Route**: `/ngmr-budget/4847`

### Layout Structure
- **Sidebar**: Modified navigation showing "AI" branding instead of "AFL Internal"
- **Header**: Standard header with user "Khushboo" (green avatar with "K")
- **Main Content**: Split layout with budget summary and detailed breakdown

### Budget Summary Section (Left)
#### NGMR Input
- **Label**: "Enter NGMR"
- **Value**: "4847"
- **Units**: "4"
- **Action**: "View Budget Update" link with arrow

#### Cost Overview
- **Actual Cost**: $25,000 (blue, large display)
- **Planned Cost**: $20,000 (orange, large display)

#### Alerts Section
- **Overview Tab**: Currently selected
- **Alerts Tab**: Shows "5" alert count
- **Alert Items**:
  - **Critical**: "PO missing - Handholes $150" with "Request" link
  - **Warning**: "LOA rejected." with "Open" link

### Purchase Orders Section (Right)
#### Header
- **Title**: "All POs"
- **Action**: "Upload" button (top right)

#### PO 076767 - HTI - $12000 (Expandable)
**Items Table**:
- **Columns**: Items, Units, Unit/per, Total, Status, Reclass, CO
- **Rows**:
  1. Place/Splice: 4 units, $500.00, $2000.00, Paid (blue), Reclass, Submit CO
  2. ISW works: 4 units, $1000.00, $4000.00, Paid (blue), Reclass, Submit CO
  3. Hydrovac: 10 units, $355.00, $3550.00, Pending (orange), Reclass, Submit CO
  4. LOA: 4 units, $100.00, $400.00, Rejected (red), Reclass, Submit CO
  5. Water Dispose: 1 unit, $2050.00, $2050.00, Pending (orange), Reclass, Submit CO

#### Additional POs (Collapsed)
- **PO 45515**: Keyworks, $5000
- **PO 45516**: Keyworks, $2000
- **PO 00AFL**: Materials, $4000
- **PO 01AFL**: Materials TVC, $2000

### Interactive Elements
- Expandable/collapsible PO sections
- Clickable status badges and action buttons
- Tab navigation between Overview and Alerts
- Upload functionality for new POs
- Links for budget updates and alerts

### Status Color Coding
- **Blue**: Paid status
- **Orange**: Pending status
- **Red**: Rejected status
- **Green**: Successful states and primary actions

---

## Screen 5: Budget Overview - Alerts Tab
**File Reference**: Fifth wireframe image
**Route**: `/ngmr-budget/4847?tab=alerts`

### Layout Changes from Previous Screen
- **Alerts Tab**: Now active (showing "5" alerts)
- **Overview Tab**: Inactive

### Vendor Summary Table
**New Section Added**:
- **Columns**: Vendor, Planned, Actual, Paid, Outstanding
- **Rows**:
  1. **HTI**: $10,000.00 planned, $12,000.00 actual, $8,500.00 paid, $3,500.00 outstanding
  2. **Keyworks**: $5,000.00 planned, $7,000.00 actual, $6,000.00 paid, $1,000.00 outstanding
  3. **Materials**: $5,000.00 planned, $6,000.00 actual, $5,500.00 paid, $500.00 outstanding

### Maintained Elements
- Same budget summary on left
- Same PO details on right
- Same alert items (Critical and Warning)

### Data Insights
This view provides vendor-level budget analysis showing:
- Budget variances (actual vs planned)
- Payment status and outstanding amounts
- Performance across different vendors

---

## Screen 6: NGMR Budget Entry Point
**File Reference**: Sixth wireframe image
**Route**: `/ngmr-budget`

### Layout Structure
- **Sidebar**: Clean navigation with highlighted "NGMR Budget update"
- **Header**: Standard global header
- **Main Content**: Centered entry form

### Content Elements
#### NGMR Entry Form
- **Label**: "Enter NGMR"
- **Input Field**: Large display showing "4847"
- **Action Link**: "View Budget Update" with right arrow icon

### Design Notes
- Clean, focused interface for NGMR lookup
- Large, prominent input field for easy data entry
- Single call-to-action for proceeding to budget details

---

## Screen 7: Quote Generation - File Upload Complete
**File Reference**: Seventh wireframe image
**Route**: `/quote/upload` (upload complete state)

### Layout Structure
- **Sidebar**: Standard navigation
- **Header**: Standard header with upload button
- **Progress Stepper**: 
  - Step 1: "Upload Design" (completed - green with checkmark)
  - Step 2: "Generate Quote" (current/next)
  - Step 3: "Submit" (inactive)

### Upload Complete State
#### File Display
- **File Icon**: PDF indicator with checkmark
- **File Info**: "CO #5.pdf"
- **Timestamp**: "11 Jan, 2025 12:24pm • 13MB"
- **Actions**: Delete icon (trash can)

#### Quote Items Table
- **Header**: "CO" with search and filter controls
- **Add Items**: Black button with plus icon
- **Columns**: Name, Quantity, Type, Per/cost, Total, Actions (delete)

#### Item Rows
1. **Place/Splice**: 1 qty, A32 type, $540 per/cost, $540 total
2. **Hydrovac**: 2 qty, A32 type, $335 per/cost, $670 total
3. **2143887**: 1 qty, A50 type, $0.87 per/cost, $0.87 total
4. **72FIB CTP**: 1 qty, A50 type, $335 per/cost, $335 total

### Interactive Elements
- File deletion capability
- Item quantity editing (inline inputs)
- Add new items functionality
- Individual item deletion
- Search and filter for items

### State Progression
This shows the transition from upload to quote generation, with:
- Successful file processing indicated
- Extracted items ready for review
- Ability to modify quantities and add/remove items

---

## Screen 8: Quote Generation - Complete Quote View
**File Reference**: Eighth wireframe image
**Route**: `/quote/generate` or `/quote/review`

### Layout Structure
- **Sidebar**: Standard navigation
- **Header**: Standard header
- **Main Content**: Split view with quote table and PDF preview

### Quote Management Section (Left)
#### Project Header
- **Project Code**: NGMR-12345
- **Units**: 12

#### Quote Table
- **Search**: Full-width search bar with filter and sort controls
- **Add Items**: Black button with plus icon
- **Columns**: Name, Quantity, Type, Per/cost, Total, Actions

#### Comprehensive Item List
1. **Place/Splice**: 12 qty, A32, $540, $6480
2. **FIP**: 12 qty, A32, $104.50, $1254
3. **MDU**: 30 qty, A32, $17.50, $525
4. **Civil design**: 1 qty, A32, $1500, $1500
5. **Gpon design**: 1 qty, A32, $1750, $1750
6. **UG. Cable**: 120 qty, A32, $11.50, $1380
7. **New splice**: 1 qty, A32, $850, $850
8. **Splitters**: 4 qty, A32, $1100, $4400
9. **1890444**: 4 qty, A50, $575, $2300
10. **2376061**: 1 qty, A50, $635, $635
11. **2143887**: 143 qty, A50, $0.87, $124.41
12. **2030938**: 3 qty, A50, $1350, $4050
13. **2381385**: 7 qty, A50, $1275, $8925
14. **72FIB CTP**: 1 qty, A50, $335, $335

### PDF Preview Section (Right)
- **Engineering Drawing**: Full-scale technical drawing display
- **Drawing Details**: Shows AFL technical specifications and construction details
- **Navigation**: Previous/next arrows, zoom controls
- **Drawing ID**: Sheet identification and revision information

### Quote Summary (Bottom Right)
- **Breakdown**:
  - GPON: $18139.00
  - Materials: $7600.76
  - Civil: $20083.24
- **Total Quote**: $45,823
- **Actions**: Download and Submit buttons

### Interactive Elements
- Full quote item management with editing capabilities
- PDF navigation and zoom controls
- Item search and filtering
- Quote finalization actions

---

## Screen 9: Quote Generation - Upload Initial State  
**File Reference**: Ninth wireframe image
**Route**: `/quote/upload` (initial empty state)

### Layout Structure
- **Progress Stepper**: 
  - Step 1: "Upload Design" (current - green with "1")
  - Step 2: "Generate Quote" (inactive - gray with "2")  
  - Step 3: "Download" (inactive - gray with "3")

### Content Elements
#### Project Information
- **Project Code**: NGMR-12345 (read-only)
- **Units**: 12 (read-only)

#### Upload Zone (Empty State)
- **Visual**: Cloud upload icon
- **Primary Text**: "Click to upload or drag and drop"
- **Format Info**: "PDF (max. 800×400px)"
- **Separator**: "OR" divider line
- **Action Button**: "Upload from computer"

### State Characteristics
- Clean, empty state ready for file upload
- Clear instructions and constraints
- Multiple upload methods supported (drag/drop and click)

---

## Screen 10: Change Order Detail View - Submitted State
**File Reference**: Tenth wireframe image  
**Route**: `/change-orders/co-5` or similar

### Layout Structure
- **Header**: Standard with upload button
- **Project Context**: Shows project code, location, budget status
- **Progress Indicator**: Shows change order processing progress

### Content Elements
#### Project Summary (Left Side)
- **Cost Summary**: Used/Left amounts with progress bar
- **Initial Quote Total**: $30,350
- **New Change Order**: CO #5 with cost $1,545.87
- **Status**: "Submitted" (blue indicator)

#### Change Order Items (Right Side)
- **File Reference**: "CO #5.pdf" with file info and delete option
- **Items Table**: Same structure as previous with:
  - Place/Splice: 1 qty, A32, $540
  - Hydrovac: 2 qty, A32, $335, $670  
  - 2143887: 1 qty, A50, $0.87
  - 72FIB CTP: 1 qty, A50, $335

### State Indicators
- **Submitted Status**: Blue badge/text indicating CO has been submitted
- **File Upload Complete**: Shows uploaded file with metadata
- **Processing State**: Items are locked for editing, showing final submitted state

### Key Differences from Previous States
- Status changed from "N/A" to "Submitted"
- Items are no longer editable (locked state)
- Submit button likely replaced with status indicator
- File shows as processed and submitted
