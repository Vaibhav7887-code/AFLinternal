# Missing Screens Design Specifications

Since Dashboard, Notifications, and Design Edits wireframes were not provided, this document specifies the design and functionality for these missing screens to complete the prototype.

---

## Dashboard Screen
**Route**: `/dashboard` (landing page)

### Layout Structure
- **Sidebar**: Standard AFL Internal navigation with "Dashboard" highlighted
- **Header**: Standard global header with search and user profile
- **Main Content**: Grid layout with overview cards and activity sections

### Content Layout

#### Top Section - Key Metrics (4-column grid)
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Active      │ Pending     │ This Month  │ Avg Quote   │
│ Projects    │ Approvals   │ Quotes      │ Value       │
│    15       │     7       │    23       │  $32,500    │
│             │             │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

#### Middle Section - Quick Actions (2-column grid)
```
┌─────────────────────────┬─────────────────────────┐
│ Start New Quote         │ View Change Orders      │
│                         │                         │
│ [Upload Design] Button  │ [View All COs] Button   │
│                         │                         │
│ Quick access to quote   │ Access to CO dashboard  │
│ generation workflow     │ and history             │
└─────────────────────────┴─────────────────────────┘
```

#### Bottom Section - Recent Activity & Alerts (2-column grid)
```
┌─────────────────────────┬─────────────────────────┐
│ Recent Activity         │ System Alerts           │
│                         │                         │
│ • Quote Q-123 submitted │ ⚠️ PO missing: $150     │
│ • CO #5 approved        │ ⚠️ Budget alert: NGMR-  │
│ • Budget updated: 4847  │    4847 over budget     │
│ • File processed: A2.pdf│ ✅ All systems normal   │
│                         │                         │
│ [View All Activity]     │ [View All Alerts]       │
└─────────────────────────┴─────────────────────────┘
```

### Interactive Elements
- **Metric Cards**: Clickable cards leading to relevant sections
- **Quick Action Buttons**: Direct navigation to workflows
- **Activity Items**: Clickable items with navigation to details
- **Alert Items**: Actionable alerts with resolution links

### Data to Display
```typescript
interface DashboardData {
  metrics: {
    activeProjects: 15,
    pendingApprovals: 7,
    monthlyQuotes: 23,
    avgQuoteValue: 32500
  },
  quickActions: [
    { title: "Start New Quote", action: "/quote/upload", icon: "Upload" },
    { title: "View Change Orders", action: "/change-orders", icon: "FileText" }
  ],
  recentActivity: [
    { type: "quote", title: "Quote Q-123 submitted", time: "2 hours ago", url: "/quote/q-123" },
    { type: "co", title: "CO #5 approved", time: "4 hours ago", url: "/change-orders/co-5" },
    { type: "budget", title: "Budget updated: NGMR-4847", time: "1 day ago", url: "/ngmr-budget/4847" }
  ],
  alerts: [
    { severity: "warning", title: "PO missing: Handholes $150", action: "Request PO" },
    { severity: "critical", title: "Budget alert: NGMR-4847 over budget", action: "Review Budget" }
  ]
}
```

---

## Notifications Screen
**Route**: `/notifications`

### Layout Structure
- **Sidebar**: Standard navigation with "Notifications" highlighted
- **Header**: Standard header with notification count in title
- **Main Content**: List view with filtering and management options

### Content Layout

#### Header Section
```
┌─────────────────────────────────────────────────────────┐
│ Notifications (12 unread)                    [Mark All Read] │
│                                                         │
│ [All] [Unread] [Quotes] [Change Orders] [Budget] [System] │
└─────────────────────────────────────────────────────────┘
```

#### Notification List
```
┌─────────────────────────────────────────────────────────┐
│ 🔵 Quote Q-456 requires review                          │
│    Submitted 2 hours ago by John Smith                  │
│    [Review Quote] [Mark as Read]              [×]       │
├─────────────────────────────────────────────────────────┤
│ 🟠 Change Order CO #7 pending approval                  │
│    Submitted 4 hours ago by Sarah Johnson               │
│    [Approve CO] [Mark as Read]                [×]       │
├─────────────────────────────────────────────────────────┤
│ 🔴 Budget Alert: NGMR-4847 exceeds planned cost         │
│    Budget exceeded by $2,500                            │
│    [View Budget] [Mark as Read]               [×]       │
├─────────────────────────────────────────────────────────┤
│ ✅ File processing complete: NGMR-12345_A2.pdf          │
│    15 items extracted successfully                      │
│    [View Quote] [Mark as Read]                [×]       │
└─────────────────────────────────────────────────────────┘
```

### Features
- **Filter Tabs**: All, Unread, by category (Quotes, Change Orders, Budget, System)
- **Bulk Actions**: Mark all read, delete selected
- **Individual Actions**: Mark as read, delete, quick actions
- **Real-time Updates**: New notifications appear at top
- **Priority Indicators**: Color-coded by urgency (red=critical, orange=warning, blue=info, green=success)

### Notification Types
```typescript
interface Notification {
  id: string;
  type: 'quote' | 'change_order' | 'budget' | 'system';
  severity: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "quote",
    severity: "info", 
    title: "Quote Q-456 requires review",
    description: "Submitted 2 hours ago by John Smith",
    timestamp: new Date(),
    read: false,
    actionUrl: "/quote/q-456",
    actionLabel: "Review Quote"
  }
  // ... more notifications
];
```

---

## Design Edits Screen
**Route**: `/design-edits`

### Layout Structure  
- **Sidebar**: Standard navigation with "Design edits" highlighted
- **Header**: Standard header with upload and action buttons
- **Main Content**: Split view with design list and preview/editor

### Content Layout

#### Left Panel - Design Files List (30% width)
```
┌─────────────────────────────────┐
│ Design Files                    │
│ [+ Upload New Design]           │
│                                 │
│ 📄 NGMR-12345_Rev_A.png        │
│    Floor Plan - Main Building   │
│    Modified: 2 days ago         │
│    [Edit] [Download]            │
│                                 │
│ 📄 NGMR-12345_Rev_B.png        │
│    Electrical Layout            │
│    Modified: 1 week ago         │
│    [Edit] [Download]            │
│                                 │
│ 📄 Site_Survey_Photo.png       │
│    Site Survey Documentation    │
│    Modified: 2 weeks ago        │
│    [Edit] [Download]            │
└─────────────────────────────────┘
```

#### Right Panel - Design Viewer/Editor (70% width)
```
┌─────────────────────────────────────────────────────────┐
│ NGMR-12345_Rev_A.png                        [🔍 Zoom Controls] │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                                     │ │
│ │         [PLACEHOLDER DESIGN IMAGE]                  │ │
│ │                                                     │ │
│ │    - Pan and zoom functionality                     │ │
│ │    - Annotation tools                               │ │
│ │    - Measurement tools                              │ │
│ │    - Layer controls                                 │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [📏 Measure] [📝 Annotate] [📐 Grid] [🔄 Reset View]     │
│                                                         │
│ Comments & Annotations:                                 │
│ • Cable run needs 15ft extension - J.Smith             │
│ • Verify handhole location - M.Johnson                 │
│ [+ Add Comment]                                         │
└─────────────────────────────────────────────────────────┘
```

### Interactive Features

#### Design Viewer Controls
- **Zoom**: Mouse wheel zoom, zoom in/out buttons, fit to screen
- **Pan**: Click and drag to pan around large designs
- **Grid Toggle**: Show/hide measurement grid overlay
- **Reset View**: Return to original view and zoom level

#### Annotation Tools
- **Comments**: Click to add comments at specific locations
- **Measurements**: Click and drag to measure distances
- **Markup**: Draw lines, circles, arrows for highlighting
- **Layers**: Toggle visibility of different design elements

#### File Management
- **Upload**: Drag and drop or browse for PNG/JPG design files
- **Version Control**: Track design revisions and changes
- **Download**: Export designs with annotations
- **Share**: Generate shareable links for collaboration

### Mock Data Structure
```typescript
interface DesignFile {
  id: string;
  filename: string;
  title: string;
  description: string;
  fileUrl: string;           // Placeholder PNG URL
  thumbnailUrl: string;
  uploadedAt: Date;
  modifiedAt: Date;
  version: string;
  annotations: Annotation[];
  size: { width: number; height: number };
}

interface Annotation {
  id: string;
  type: 'comment' | 'measurement' | 'markup';
  position: { x: number; y: number };
  content: string;
  author: string;
  createdAt: Date;
}

const mockDesignFiles: DesignFile[] = [
  {
    id: "design-1",
    filename: "NGMR-12345_Rev_A.png",
    title: "Floor Plan - Main Building", 
    description: "Primary floor plan with cable routing",
    fileUrl: "/placeholder-design-1.png",
    thumbnailUrl: "/placeholder-thumb-1.png",
    uploadedAt: new Date('2025-01-09'),
    modifiedAt: new Date('2025-01-09'),
    version: "Rev A",
    annotations: [
      {
        id: "ann-1",
        type: "comment",
        position: { x: 150, y: 200 },
        content: "Cable run needs 15ft extension",
        author: "J.Smith",
        createdAt: new Date('2025-01-09')
      }
    ],
    size: { width: 1200, height: 800 }
  }
  // ... more design files
];
```

### Technical Implementation Notes

#### Image Viewer Component
- Use libraries like `react-image-pan-zoom-rotate` or `react-zoom-pan-pinch`
- Support touch gestures for mobile/tablet use
- Maintain aspect ratio and prevent image distortion
- Lazy loading for large design files

#### Annotation System
- SVG overlay for annotations and markup tools
- Click handlers for adding comments at cursor position
- Draggable annotations for repositioning
- Export annotations as separate data layer

#### File Upload
- Drag and drop interface similar to quote upload
- Image format validation (PNG, JPG, SVG)
- Preview generation and thumbnail creation
- Progress indication for large image files

---

## Implementation Notes for Demo

### Hardcoded Data Strategy
1. **Static JSON files** in `/src/data/` for each screen's mock data
2. **Placeholder images** in `/public/placeholders/` for design files
3. **Simulated delays** for file uploads and processing to show loading states
4. **Local state management** using Zustand for demo data persistence

### Demo Flow Considerations
- **File uploads**: Show progress bars but don't actually store files
- **Navigation**: Ensure all menu items lead to functional screens
- **Data consistency**: Use same project codes (NGMR-12345, etc.) across screens
- **Interactive elements**: All buttons and links should be functional
- **Responsive design**: Ensure all screens work on different device sizes

### Creative Freedom Areas
- **Design file content**: Use architectural/engineering placeholder images
- **Notification content**: Create realistic but varied notification scenarios  
- **Dashboard metrics**: Use believable but impressive numbers for demo
- **Activity feeds**: Show dynamic, time-based content that feels real
