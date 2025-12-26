import { EBOOK_STATUS } from '../../lib/constants';

export type EbookStatus = (typeof EBOOK_STATUS)[keyof typeof EBOOK_STATUS];

export interface Ebook {
  id: string;
  title: string;
  author: string;
  category: string;
  status: EbookStatus;
  downloads: number;
  publishDate: string;
}

export interface EbookFilters {
  search: string;
  category: string;
  status: string;
  page: number;
  limit: number;
}