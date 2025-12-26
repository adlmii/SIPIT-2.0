import { useState, useEffect, useCallback } from 'react';
import type { User, UserFormData } from '../types';
import { mockApi } from '../../../services/mockApi';
import { toast } from 'sonner';

export const useUsers = (searchTerm: string, filterRole: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await mockApi.users.getAll();
      
      // Client-side Filtering
      let filtered = result;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
      }
      if (filterRole !== 'All') {
        filtered = filtered.filter(u => u.role === filterRole);
      }
      setUsers(filtered);
    } catch (error) {
      toast.error("Gagal mengambil data user");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (data: UserFormData) => {
    await mockApi.users.create(data);
    fetchUsers();
  };

  const updateUser = async (id: string, data: Partial<User>) => {
    await mockApi.users.update(id, data);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await mockApi.users.delete(id);
    fetchUsers();
  };

  return { users, isLoading, addUser, updateUser, deleteUser };
};