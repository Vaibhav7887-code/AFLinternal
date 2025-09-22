import { create } from 'zustand';
import { QuoteItem, getItemsByFilename, calculateSubtotals } from '../data/mockQuotes';

interface UploadState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  progress: number;
  file: File | null;
  fileName: string;
  error: string | null;
}

interface DemoState {
  // Upload state
  upload: UploadState;
  
  // Quote state
  currentProjectCode: string;
  currentUnits: number;
  extractedItems: QuoteItem[];
  
  // Actions
  startUpload: (file: File) => void;
  simulateUpload: () => Promise<void>;
  resetUpload: () => void;
  updateQuoteItem: (id: string, updates: Partial<QuoteItem>) => void;
  addQuoteItem: (item: Omit<QuoteItem, 'id'>) => void;
  removeQuoteItem: (id: string) => void;
}

const initialUploadState: UploadState = {
  status: 'idle',
  progress: 0,
  file: null,
  fileName: '',
  error: null
};

export const useDemoStore = create<DemoState>((set, get) => ({
  // Initial state
  upload: initialUploadState,
  currentProjectCode: 'NGMR-12345',
  currentUnits: 12,
  extractedItems: [],

  // Actions
  startUpload: (file: File) => {
    set({
      upload: {
        status: 'uploading',
        progress: 0,
        file,
        fileName: file.name,
        error: null
      }
    });
  },

  simulateUpload: async () => {
    const { upload } = get();
    if (!upload.file) return;

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      set(state => ({
        upload: { ...state.upload, progress }
      }));
    }

    // Simulate processing
    set(state => ({
      upload: { ...state.upload, status: 'processing' }
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Extract items based on filename
    const extractedItems = getItemsByFilename(upload.fileName);
    
    set(state => ({
      upload: { ...state.upload, status: 'success' },
      extractedItems
    }));
  },

  resetUpload: () => {
    set({ upload: initialUploadState, extractedItems: [] });
  },

  updateQuoteItem: (id: string, updates: Partial<QuoteItem>) => {
    set(state => ({
      extractedItems: state.extractedItems.map(item =>
        item.id === id
          ? { 
              ...item, 
              ...updates, 
              totalCost: (updates.quantity ?? item.quantity) * (updates.unitCost ?? item.unitCost)
            }
          : item
      )
    }));
  },

  addQuoteItem: (newItem: Omit<QuoteItem, 'id'>) => {
    const id = `item-${Date.now()}`;
    const item: QuoteItem = {
      ...newItem,
      id,
      totalCost: newItem.quantity * newItem.unitCost
    };
    
    set(state => ({
      extractedItems: [...state.extractedItems, item]
    }));
  },

  removeQuoteItem: (id: string) => {
    set(state => ({
      extractedItems: state.extractedItems.filter(item => item.id !== id)
    }));
  }
}));
