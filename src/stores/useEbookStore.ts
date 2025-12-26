import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Ebook } from '../features/ebooks/types';
import { MOCK_EBOOKS } from '../features/ebooks/api/mockData';

interface EbookState {
  ebooks: Ebook[];
  addEbook: (ebook: Omit<Ebook, 'id' | 'downloads' | 'publishDate'>) => void;
  updateEbook: (id: string, updatedData: Partial<Ebook>) => void;
  deleteEbook: (id: string) => void;
}

export const useEbookStore = create<EbookState>()(
  persist(
    (set) => ({
      ebooks: MOCK_EBOOKS,

      // ACTION: Create
      addEbook: (formData) => set((state) => {
        const newEbook: Ebook = {
          id: `eb-${Date.now()}`, 
          downloads: 0,
          publishDate: new Date().toISOString(),
          ...formData,
        };
        return { ebooks: [newEbook, ...state.ebooks] };
      }),

      // ACTION: Update
      updateEbook: (id, updatedData) => set((state) => ({
        ebooks: state.ebooks.map((item) => 
          item.id === id ? { ...item, ...updatedData } : item
        ),
      })),

      // ACTION: Delete
      deleteEbook: (id) => set((state) => ({
        ebooks: state.ebooks.filter((item) => item.id !== id),
      })),
    }),
    {
      name: 'sipit-ebook-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);