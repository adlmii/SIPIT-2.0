// Define User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  VIEWER: 'viewer',
} as const;

// Define User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

// Define Ebook Status
export const EBOOK_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

// Define Ebook Categories
export const EBOOK_CATEGORIES = {
  DEVELOPMENT: 'Development',
  DESIGN: 'Design',
  SOFTWARE_ENGINEERING: 'Software Engineering',
} as const;