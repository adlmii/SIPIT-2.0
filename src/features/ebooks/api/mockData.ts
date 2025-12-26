import type { Ebook } from "../types";

export const MOCK_EBOOKS: Ebook[] = [
  { id: '1', title: 'React for Beginners', author: 'Sarah Drasner', category: 'Development', status: 'published', downloads: 1250, publishDate: '2023-10-01' },
  { id: '2', title: 'Mastering Tailwind CSS', author: 'Adam Wathan', category: 'Design', status: 'published', downloads: 890, publishDate: '2023-09-15' },
  { id: '3', title: 'UI/UX Principles', author: 'Don Norman', category: 'Design', status: 'draft', downloads: 0, publishDate: '2023-11-20' },
  { id: '4', title: 'TypeScript Handbook', author: 'Microsoft', category: 'Development', status: 'published', downloads: 3400, publishDate: '2023-01-10' },
  { id: '5', title: 'Clean Architecture', author: 'Uncle Bob', category: 'Software Engineering', status: 'archived', downloads: 560, publishDate: '2022-05-12' },
  { id: '6', title: 'The Pragmatic Programmer', author: 'Andy Hunt', category: 'Software Engineering', status: 'published', downloads: 2100, publishDate: '2023-06-30' },
  { id: '7', title: 'Modern JavaScript', author: 'Kyle Simpson', category: 'Development', status: 'published', downloads: 1800, publishDate: '2023-08-05' },
  { id: '8', title: 'Refactoring UI', author: 'Steve Schoger', category: 'Design', status: 'published', downloads: 950, publishDate: '2023-07-22' },
];