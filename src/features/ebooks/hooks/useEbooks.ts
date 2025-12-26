import { useState, useEffect, useCallback } from 'react';
import type { Ebook, EbookFilters } from '../types';
import { mockApi } from '../../../services/mockApi';
import { toast } from 'sonner';
import type { EbookFormData } from '../components/EbookForm';

export const useEbooks = (filters: EbookFilters) => {
  const [data, setData] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalData, setTotalData] = useState(0);

  // 1. Fetching Logic
  const fetchEbooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mockApi.ebooks.getAll();
      
      // Filter Logic
      let filtered = result;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
        );
      }
      if (filters.category && filters.category !== 'All') {
        filtered = filtered.filter(item => item.category === filters.category);
      }
      if (filters.status && filters.status !== 'All') {
        filtered = filtered.filter(item => item.status === filters.status);
      }

      // Pagination Logic
      setTotalData(filtered.length);
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedData = filtered.slice(startIndex, endIndex);

      setData(paginatedData);

    } catch (err) {
      setError("Gagal mengambil data ebook");
      toast.error("Terjadi kesalahan server");
    } finally {
      setIsLoading(false);
    }
  }, [filters]); 

  // Initial Load
  useEffect(() => {
    fetchEbooks();
  }, [fetchEbooks]);

  // --- 2. ACTIONS  ---
  
  const addEbook = async (formData: EbookFormData) => {
    try {
      await mockApi.ebooks.create(formData); 
      fetchEbooks();
      return true;
    } catch (e) {
      toast.error("Gagal menambah buku");
      return false;
    }
  };

  const updateEbook = async (id: string, formData: Partial<Ebook>) => {
    try {
      await mockApi.ebooks.update(id, formData);
      fetchEbooks();
      return true;
    } catch (e) {
      toast.error("Gagal update buku");
      return false;
    }
  };

  const deleteEbook = async (id: string) => {
    try {
      await mockApi.ebooks.delete(id);
      fetchEbooks();
      return true;
    } catch (e) {
      toast.error("Gagal menghapus buku");
      return false;
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    totalData, 
    addEbook,
    updateEbook,
    deleteEbook
  };
};