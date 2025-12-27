import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    // Simpan judul asli sebelumnya (cleanup function)
    const prevTitle = document.title;
    
    // Set judul baru
    document.title = `${title} | SIPIT 2.0`;

    // Kembalikan ke judul asli saat komponen di-unmount (opsional)
    return () => {
      document.title = prevTitle;
    };
  }, [title]); // Jalankan ulang jika title berubah
};