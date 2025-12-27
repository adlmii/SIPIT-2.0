import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEbooks } from './useEbooks';
import { EBOOK_CATEGORIES } from '../../../lib/constants';

// 1. MOCK API SERVICE
// Kita "bajak" mockApi.ts agar tidak pakai delay asli, biar test cepat
vi.mock('../../../services/mockApi', () => ({
  mockApi: {
    ebooks: {
      getAll: vi.fn().mockResolvedValue([
        { id: '1', title: 'Test Book 1', author: 'Author A', category: 'Design', status: 'published', downloads: 100 },
        { id: '2', title: 'Test Book 2', author: 'Author B', category: 'Development', status: 'draft', downloads: 0 },
      ]),
      create: vi.fn().mockResolvedValue(true),
    }
  }
}));

// Filter Default
const defaultFilters = {
  search: '',
  category: 'All',
  status: 'All',
  page: 1,
  limit: 10
};

describe('useEbooks Hook', () => {
  it('Should fetch data successfully', async () => {
    // 2. JALANKAN HOOK
    const { result } = renderHook(() => useEbooks(defaultFilters));

    // Awalnya harus loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);

    // 3. TUNGGU HASIL FETCH
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // 4. VERIFIKASI DATA
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].title).toBe('Test Book 1');
  });

  it('Should filter data correctly (Client-Side Logic)', async () => {
    // Kita test filter "Development" saja
    const filters = { ...defaultFilters, category: EBOOK_CATEGORIES.DEVELOPMENT };
    
    const { result } = renderHook(() => useEbooks(filters));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Harusnya cuma sisa 1 buku (Book 2) karena Book 1 kategorinya Design
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].title).toBe('Test Book 2');
  });
});