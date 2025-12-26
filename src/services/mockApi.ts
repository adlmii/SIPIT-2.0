import type { Ebook } from '../features/ebooks/types';
import type { User, UserFormData } from '../features/users/types';
import type { EbookFormData } from '../features/ebooks/components/EbookForm';
import { USER_ROLES, USER_STATUS, EBOOK_STATUS, EBOOK_CATEGORIES } from '../lib/constants';

let dbEbooks: Ebook[] = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin', category: EBOOK_CATEGORIES.SOFTWARE_ENGINEERING, status: EBOOK_STATUS.PUBLISHED, downloads: 1250, publishDate: '2023-01-01' },
  { id: '2', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: EBOOK_CATEGORIES.DEVELOPMENT, status: EBOOK_STATUS.PUBLISHED, downloads: 980, publishDate: '2023-02-15' },
  { id: '3', title: 'Refactoring UI', author: 'Adam Wathan', category: EBOOK_CATEGORIES.DESIGN, status: EBOOK_STATUS.PUBLISHED, downloads: 3400, publishDate: '2023-03-10' },
  { id: '4', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: EBOOK_CATEGORIES.DEVELOPMENT, status: EBOOK_STATUS.ARCHIVED, downloads: 500, publishDate: '2022-11-05' },
  { id: '5', title: 'Don\'t Make Me Think', author: 'Steve Krug', category: EBOOK_CATEGORIES.DESIGN, status: EBOOK_STATUS.PUBLISHED, downloads: 4500, publishDate: '2023-04-20' },
  { id: '6', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: EBOOK_CATEGORIES.SOFTWARE_ENGINEERING, status: EBOOK_STATUS.DRAFT, downloads: 0, publishDate: '2023-05-12' },
  { id: '7', title: 'Atomic Habits', author: 'James Clear', category: EBOOK_CATEGORIES.DEVELOPMENT, status: EBOOK_STATUS.PUBLISHED, downloads: 8900, publishDate: '2023-06-01' },
  { id: '8', title: 'Design Patterns', author: 'Erich Gamma', category: EBOOK_CATEGORIES.SOFTWARE_ENGINEERING, status: EBOOK_STATUS.PUBLISHED, downloads: 2100, publishDate: '2021-08-15' },
  { id: '9', title: 'You Don\'t Know JS', author: 'Kyle Simpson', category: EBOOK_CATEGORIES.DEVELOPMENT, status: EBOOK_STATUS.PUBLISHED, downloads: 3200, publishDate: '2022-01-20' },
  { id: '10', title: 'Sprint', author: 'Jake Knapp', category: EBOOK_CATEGORIES.DESIGN, status: EBOOK_STATUS.DRAFT, downloads: 0, publishDate: '2023-07-07' },
];

let dbUsers: User[] = [
  { id: 'u-1', name: 'Admin Ganteng', email: 'admin@sipit.com', role: USER_ROLES.SUPER_ADMIN, status: USER_STATUS.ACTIVE, avatar: 'AG', lastLogin: new Date().toISOString() },
  { id: 'u-2', name: 'Budi Santoso', email: 'budi@viewer.com', role: USER_ROLES.VIEWER, status: USER_STATUS.ACTIVE, avatar: 'BS', lastLogin: new Date().toISOString() },
];

// --- HELPER: SIMULASI NETWORK ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const randomError = () => {
  // 10% kemungkinan error (Simulasi server down/timeout)
  if (Math.random() < 0.1) throw new Error("Server busy. Please try again.");
};

// --- API SERVICES ---
export const mockApi = {
  // === EBOOKS ===
  ebooks: {
    getAll: async (): Promise<Ebook[]> => {
      await delay(800); // Simulate latency
      randomError();
      return [...dbEbooks];
    },
    create: async (data: EbookFormData): Promise<Ebook> => {
      await delay(1000);
      randomError();
      const newEbook: Ebook = {
        id: `eb-${Date.now()}`,
        downloads: 0,
        publishDate: new Date().toISOString(),
        ...data,
      };
      dbEbooks = [newEbook, ...dbEbooks];
      return newEbook;
    },
    update: async (id: string, data: Partial<Ebook>): Promise<Ebook> => {
      await delay(1000);
      const index = dbEbooks.findIndex(e => e.id === id);
      if (index === -1) throw new Error("Not Found");
      
      dbEbooks[index] = { ...dbEbooks[index], ...data };
      return dbEbooks[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(800);
      dbEbooks = dbEbooks.filter(e => e.id !== id);
    }
  },

  // === USERS ===
  users: {
    getAll: async (): Promise<User[]> => {
      await delay(600);
      return [...dbUsers];
    },
    create: async (data: UserFormData): Promise<User> => {
      await delay(800);
      const initials = data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const newUser: User = {
        id: `u-${Date.now()}`,
        avatar: initials,
        lastLogin: new Date().toISOString(),
        ...data,
      };
      dbUsers = [newUser, ...dbUsers];
      return newUser;
    },
    update: async (id: string, data: Partial<User>): Promise<User> => {
      await delay(800);
      const index = dbUsers.findIndex(u => u.id === id);
      if (index === -1) throw new Error("User Not Found");
      dbUsers[index] = { ...dbUsers[index], ...data };
      return dbUsers[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(800);
      dbUsers = dbUsers.filter(u => u.id !== id);
    }
  }
};