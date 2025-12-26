export type EbookStatus = 'published' | 'draft' | 'archived';

export interface Ebook {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string; // ISO String
  status: EbookStatus;
  downloads: number;
}

// Tipe untuk Filter State
export interface EbookFilters {
  search: string;
  category: string;
  status: string;
  page: number;
  limit: number;
}