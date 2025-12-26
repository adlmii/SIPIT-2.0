export type UserRole = 'super_admin' | 'viewer';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  lastLogin: string;
}

// Untuk Form
export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}