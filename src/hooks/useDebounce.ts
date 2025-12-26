import { useState, useEffect } from 'react';

// <T> artinya Generic Type (bisa string, number, dll)
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer untuk update value setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: dipanggil jika value berubah sebelum delay selesai
    // Ini yang membatalkan timer sebelumnya (kunci logikanya di sini!)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}