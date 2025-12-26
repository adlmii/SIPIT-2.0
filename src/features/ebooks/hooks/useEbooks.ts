import { useState, useEffect } from 'react';
import type { Ebook, EbookFilters } from '../types';
import { useEbookStore } from '../../../stores/useEbookStore';

export const useEbooks = (filters: EbookFilters) => {
  // Ambil data 'real' dari Store
  const { ebooks: sourceData } = useEbookStore();
  
  const [data, setData] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    const fetchEbooks = async () => {
      setIsLoading(true);

      // 1. Simulasi Network Delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 2. Logika Filtering (Sekarang pakai sourceData dari store)
      let result = [...sourceData];

      // Filter Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.author.toLowerCase().includes(query)
        );
      }

      // Filter Category
      if (filters.category && filters.category !== 'All') {
        result = result.filter(item => item.category === filters.category);
      }

      // Filter Status
      if (filters.status && filters.status !== 'All') {
        result = result.filter(item => item.status === filters.status);
      }

      // 3. Pagination Logic
      setTotalData(result.length);
      const startIndex = (filters.page - 1) * filters.limit;
      const paginatedResult = result.slice(startIndex, startIndex + filters.limit);

      setData(paginatedResult);
      setIsLoading(false);
    };

    fetchEbooks();
    
    // Tambahkan dependency 'sourceData' agar saat data berubah (CRUD), tabel auto-refresh
  }, [filters, sourceData]); 

  return { data, isLoading, totalData };
};