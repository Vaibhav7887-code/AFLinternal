// Mock data for Design Edits module

export interface Annotation {
  id: string;
  type: 'comment' | 'measurement' | 'markup';
  position: { x: number; y: number };
  content: string;
  author: string;
  createdAt: Date;
}

export interface DesignFile {
  id: string;
  filename: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string;
  uploadedAt: Date;
  modifiedAt: Date;
  version: string;
  annotations: Annotation[];
  size: { width: number; height: number };
  fileSize: string;
}

// Mock design files with placeholder data
export const mockDesignFiles: DesignFile[] = [
  {
    id: 'design-1',
    filename: 'NGMR-12345_Rev_A.png',
    title: 'Floor Plan - Main Building',
    description: 'Primary floor plan with cable routing and equipment layout',
    fileUrl: 'https://via.placeholder.com/1200x800/f3f4f6/374151?text=NGMR-12345+Floor+Plan+Rev+A',
    thumbnailUrl: 'https://via.placeholder.com/300x200/f3f4f6/374151?text=Floor+Plan',
    uploadedAt: new Date('2025-01-09T10:30:00'),
    modifiedAt: new Date('2025-01-09T14:15:00'),
    version: 'Rev A',
    size: { width: 1200, height: 800 },
    fileSize: '2.4 MB',
    annotations: [
      {
        id: 'ann-1',
        type: 'comment',
        position: { x: 300, y: 200 },
        content: 'Cable run needs 15ft extension',
        author: 'J. Smith',
        createdAt: new Date('2025-01-09T10:45:00')
      },
      {
        id: 'ann-2',
        type: 'comment',
        position: { x: 600, y: 400 },
        content: 'Verify handhole location',
        author: 'M. Johnson',
        createdAt: new Date('2025-01-09T11:20:00')
      }
    ]
  },
  {
    id: 'design-2',
    filename: 'NGMR-12345_Rev_B.png',
    title: 'Electrical Layout',
    description: 'Electrical systems and power distribution layout',
    fileUrl: 'https://via.placeholder.com/1400x900/e5e7eb/6b7280?text=NGMR-12345+Electrical+Layout+Rev+B',
    thumbnailUrl: 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Electrical',
    uploadedAt: new Date('2025-01-02T09:15:00'),
    modifiedAt: new Date('2025-01-02T16:30:00'),
    version: 'Rev B',
    size: { width: 1400, height: 900 },
    fileSize: '3.1 MB',
    annotations: [
      {
        id: 'ann-3',
        type: 'comment',
        position: { x: 400, y: 300 },
        content: 'Update panel specifications',
        author: 'R. Davis',
        createdAt: new Date('2025-01-02T11:00:00')
      }
    ]
  },
  {
    id: 'design-3',
    filename: 'Site_Survey_Photo.png', 
    title: 'Site Survey Documentation',
    description: 'On-site photography and measurements',
    fileUrl: 'https://via.placeholder.com/1000x750/d1fae5/065f46?text=Site+Survey+Photo',
    thumbnailUrl: 'https://via.placeholder.com/300x200/d1fae5/065f46?text=Site+Survey',
    uploadedAt: new Date('2024-12-28T14:20:00'),
    modifiedAt: new Date('2024-12-28T14:20:00'),
    version: 'Original',
    size: { width: 1000, height: 750 },
    fileSize: '4.2 MB',
    annotations: []
  },
  {
    id: 'design-4',
    filename: 'NGMR-12345_Cable_Routes.png',
    title: 'Cable Routing Diagram',
    description: 'Detailed cable paths and connection points',
    fileUrl: 'https://via.placeholder.com/1600x1000/fef3c7/d97706?text=Cable+Routing+Diagram',
    thumbnailUrl: 'https://via.placeholder.com/300x200/fef3c7/d97706?text=Cable+Routes',
    uploadedAt: new Date('2025-01-05T11:45:00'),
    modifiedAt: new Date('2025-01-06T09:30:00'),
    version: 'Rev 1',
    size: { width: 1600, height: 1000 },
    fileSize: '1.8 MB',
    annotations: [
      {
        id: 'ann-4',
        type: 'measurement',
        position: { x: 500, y: 400 },
        content: '120ft cable run',
        author: 'T. Wilson',
        createdAt: new Date('2025-01-05T12:00:00')
      }
    ]
  },
  {
    id: 'design-5',
    filename: 'Equipment_Layout.png',
    title: 'Equipment Placement',
    description: 'Network equipment positioning and clearances',
    fileUrl: 'https://via.placeholder.com/1300x850/ddd6fe/7c3aed?text=Equipment+Layout',
    thumbnailUrl: 'https://via.placeholder.com/300x200/ddd6fe/7c3aed?text=Equipment',
    uploadedAt: new Date('2025-01-08T08:30:00'),
    modifiedAt: new Date('2025-01-08T15:45:00'),
    version: 'Rev 2',
    size: { width: 1300, height: 850 },
    fileSize: '2.7 MB',
    annotations: [
      {
        id: 'ann-5',
        type: 'comment',
        position: { x: 650, y: 300 },
        content: 'Maintain 3ft clearance',
        author: 'A. Martinez',
        createdAt: new Date('2025-01-08T10:15:00')
      }
    ]
  }
];

// Get design file by ID
export const getDesignById = (id: string): DesignFile | undefined => {
  return mockDesignFiles.find(design => design.id === id);
};

// Get recent design files
export const getRecentDesigns = (limit: number = 5): DesignFile[] => {
  return [...mockDesignFiles]
    .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
    .slice(0, limit);
};

// Format file size
export const formatFileSize = (sizeStr: string): string => {
  return sizeStr;
};

// Format date
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
