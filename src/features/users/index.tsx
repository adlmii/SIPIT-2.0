import { useState } from 'react';
import { Plus, Search, Shield } from 'lucide-react'; 
import { toast } from 'sonner';
import { useUsers } from './hooks/useUsers';
import { useDebounce } from '../../hooks/useDebounce';
import { UserTable } from './components/UserTable';
import { Modal } from '../../components/ui/Modal';
import { UserForm } from './components/UserForm';
import type { User, UserFormData } from './types';

const UsersPage = () => {
  // State UI
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500); // Debounce biar gak spam API
  const [filterRole, setFilterRole] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 2. GUNAKAN CUSTOM HOOK
  // Filter logic sudah terjadi di dalam hook ini (via Mock API)
  const { users, isLoading, addUser, updateUser, deleteUser } = useUsers(debouncedSearch, filterRole);

  // --- HANDLERS ---

  const handleFormSubmit = async (formData: UserFormData) => {
    const actionPromise = async () => {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData);
      } else {
        await addUser(formData);
      }
      return selectedUser ? `User "${formData.name}" diperbarui` : `User "${formData.name}" ditambahkan`;
    };

    toast.promise(actionPromise(), {
      loading: 'Menyimpan data user...',
      success: (msg) => {
        setIsModalOpen(false);
        return msg;
      },
      error: 'Terjadi kesalahan server',
    });
  };

  const handleDelete = (id: string) => {
    toast("Hapus user ini?", {
      description: "Aksi ini tidak dapat dibatalkan.",
      action: {
        label: "Hapus",
        onClick: async () => {
          await deleteUser(id);
          toast.success("User berhasil dihapus");
        }
      },
      cancel: { label: "Batal", onClick: () => {} }
    });
  };

  const handleEdit = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) { setSelectedUser(user); setIsModalOpen(true); }
  };
  const handleCreate = () => { setSelectedUser(null); setIsModalOpen(true); };
  const handleClose = () => { setIsModalOpen(false); setSelectedUser(null); };

  // Styling Helpers
  const wrapperClass = "relative min-w-[180px]";
  const selectClass = "w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-600 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="mt-1 text-slate-500">Kelola akses dan role pengguna sistem.</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95">
          <Plus size={18} strokeWidth={2.5} />
          Tambah User
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          <div className={wrapperClass}>
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select className={selectClass} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="All">Semua Role</option>
              <option value="super_admin">Super Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {/* isLoading diteruskan ke UserTable untuk menampilkan skeleton jika perlu (opsional) */}
      <UserTable 
        data={users} 
        isLoading={isLoading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={handleClose} title={selectedUser ? "Edit User" : "Tambah User Baru"}>
        <UserForm initialData={selectedUser} onSubmit={handleFormSubmit} onCancel={handleClose} />
      </Modal>
    </div>
  );
};

export default UsersPage;