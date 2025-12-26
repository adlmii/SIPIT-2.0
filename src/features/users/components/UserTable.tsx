import { Edit2, Trash2, Shield, ShieldAlert } from 'lucide-react';
import type { User } from '../types';
import { cn } from '../../../lib/utils';
import { useAuthStore } from '../../../stores/useAuthStore';

interface UserTableProps {
  data: User[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserTable = ({ data, isLoading, onEdit, onDelete }: UserTableProps) => {
  const { user: currentUser } = useAuthStore();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">User</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded bg-slate-200" />
                      <div className="h-3 w-24 rounded bg-slate-200" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><div className="h-6 w-20 rounded bg-slate-200" /></td>
                <td className="px-6 py-4"><div className="h-6 w-16 rounded bg-slate-200" /></td>
                <td className="px-6 py-4"><div className="mx-auto h-8 w-16 rounded bg-slate-200" /></td>
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">Tidak ada user ditemukan</td></tr>
          ) : (
            data.map((user) => (
              <tr key={user.id} className="group hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600 text-xs">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                   <div className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium border", 
                     user.role === 'super_admin' ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-slate-50 text-slate-600 border-slate-200"
                   )}>
                     {user.role === 'super_admin' ? <ShieldAlert size={12}/> : <Shield size={12}/>}
                     {user.role === 'super_admin' ? 'Super Admin' : 'Viewer'}
                   </div>
                </td>

                <td className="px-6 py-4">
                   <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", 
                     user.status === 'active' ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                   )}>
                     <span className={cn("h-1.5 w-1.5 rounded-full", user.status === 'active' ? "bg-green-500" : "bg-slate-400")} />
                     {user.status === 'active' ? 'Active' : 'Inactive'}
                   </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(user.id)} className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(user.id)} 
                      disabled={currentUser?.id === user.id}
                      className={cn("rounded-lg p-2 transition-all", 
                        currentUser?.id === user.id 
                          ? "text-slate-200 cursor-not-allowed" 
                          : "text-slate-400 hover:bg-red-50 hover:text-red-600"
                      )} 
                      title={currentUser?.id === user.id ? "Tidak bisa menghapus akun sendiri" : "Delete"}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};