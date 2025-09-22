# AFL Internal Design Quoting Tool - Application Overview

## Project Purpose
AFL Internal Design Quoting Tool is a **frontend-only demo prototype** that showcases the complete workflow for internal AFL staff to upload construction design documents and generate cost quotes for network infrastructure projects. This is a demonstration application with hardcoded data and no backend functionality - designed to show the complete user experience and interface capabilities.

## Technology Stack
- **Frontend Framework**: React 19.1.1 with TypeScript
- **Routing**: React Router DOM 7.9.1
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand 5.0.8
- **Icons**: Lucide React
- **Build Tool**: Vite

## Application Architecture

### Main Application Flow
The application follows a three-step wizard pattern for quote generation:

1. **Upload Design** - Upload PDF design documents
2. **Generate Quote** - Review extracted items and pricing
3. **Download/Submit** - Finalize and download the quote

### Key Application Areas

#### 1. Navigation & Layout
- **Sidebar Navigation**: Persistent navigation with sections for Dashboard, Notifications, Quote Generation, Change Orders, Design Edits, and NGMR Budget Updates
- **Top Header**: Global search, help center access, and user profile
- **Step Progress**: Visual stepper showing current progress through quote generation

#### 2. Quote Generation Workflow
- **Upload Step**: File upload with drag-and-drop support for PDF documents
- **Generate Step**: Automated item extraction from designs with pricing calculations
- **Submit Step**: Final review and quote download

#### 3. Change Order Management
- **CO Requests**: Interface for starting new change order requests
- **CO History**: View and manage existing change orders
- **CO Details**: Detailed view of change order items and pricing

#### 4. Budget Management
- **NGMR Overview**: Project budget tracking with actual vs planned costs
- **Budget Alerts**: System for tracking budget overruns and issues
- **Purchase Order Management**: Detailed PO tracking with vendor information

## Design System Elements

### Color Scheme
- **Primary Green**: Used for completed states, success indicators, and primary actions
- **Secondary Colors**: Blue for links and information states, Orange/Yellow for pending states
- **Status Colors**: Red for rejected/error states, Gray for neutral/disabled states

### Typography
- **Headers**: Various sizes for different hierarchy levels
- **Body Text**: 14px base size for most content
- **Small Text**: 12px for labels and metadata
- **Micro Text**: 11px for helper text and shortcuts

### Component Patterns
- **Cards**: White background with subtle borders for content grouping
- **Tables**: Striped rows with clear column headers
- **Forms**: Consistent input styling with labels and validation
- **Buttons**: Primary (green), secondary (white with border), and danger (red) variants
- **Status Badges**: Rounded badges with appropriate colors for different states

## User Interface Patterns

### Data Display
- **Progress Indicators**: Circular progress for file uploads, linear progress for budget utilization
- **Status Indicators**: Color-coded badges and text for various states
- **Tabular Data**: Consistent table layouts with sorting and filtering capabilities
- **Summary Cards**: High-level metrics and totals displayed prominently

### Interaction Patterns
- **Drag and Drop**: File upload areas with visual feedback
- **Modal Dialogs**: For detailed views and confirmations
- **Expandable Sections**: Collapsible content areas for detailed information
- **Search and Filter**: Global search and context-specific filtering

### Navigation Patterns
- **Breadcrumbs**: Clear path indication for nested content
- **Step Navigation**: Linear progression through multi-step processes
- **Tab Navigation**: For switching between related content areas

## State Management Requirements

### Application State
- **Current User**: User profile and permissions
- **Navigation State**: Current route and step progression
- **Upload State**: File upload progress and validation
- **Quote Data**: Generated quote items and calculations
- **Project Context**: Current NGMR project information

### Persistent Data
- **Project Information**: NGMR codes, units, locations
- **Quote Items**: Extracted items from design documents
- **Change Orders**: CO history and current requests
- **Budget Data**: Planned vs actual costs and PO information

## Integration Points

### Demo Data Flow
- **File Upload**: Simulated upload with progress indication
- **Quote Generation**: Hardcoded item extraction based on filename
- **Project Data**: Static NGMR project information and budgets
- **Change Orders**: Pre-populated CO data for demonstration
- **User Experience**: Complete workflow simulation without backend

### Demo Flow
1. User uploads design document (file not actually stored)
2. Frontend simulates processing and shows hardcoded extracted items
3. User can explore quote generation, change orders, and budget screens
4. All data is pre-populated for demonstration purposes
5. Complete application navigation and state management demonstrated
