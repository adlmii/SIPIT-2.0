import { Edit2, Trash2, Lock, FileText, Download } from 'lucide-react';
import type { Ebook } from '../types';
import { cn } from '../../../lib/utils';
import { useAuthStore } from '../../../stores/useAuthStore';
import { EBOOK_STATUS, USER_ROLES } from '../../../lib/constants';

interface EbookTableProps {
  data: Ebook[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EbookTable = ({ data, isLoading, onEdit, onDelete }: EbookTableProps) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === USER_ROLES.SUPER_ADMIN;

  // Helper Component: Status Badge
  const StatusBadge = ({ status }: { status: Ebook['status'] }) => {
    const config = {
      [EBOOK_STATUS.PUBLISHED]: { 
        bg: "bg-emerald-50", 
        text: "text-emerald-700", 
        dot: "bg-emerald-500", 
        border: "border-emerald-200" 
      },
      [EBOOK_STATUS.DRAFT]: { 
        bg: "bg-amber-50", 
        text: "text-amber-700", 
        dot: "bg-amber-500", 
        border: "border-amber-200" 
      },
      [EBOOK_STATUS.ARCHIVED]: { 
        bg: "bg-slate-100", 
        text: "text-slate-600", 
        dot: "bg-slate-500", 
        border: "border-slate-200" 
      },
    };
    
    // Fallback ke Draft jika status aneh-aneh (Defensive)
    const style = config[status] || config[EBOOK_STATUS.DRAFT];

    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize shadow-sm", 
        style.bg, style.text, style.border
      )}>
        <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
        {status}
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Judul Buku</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Kategori</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Downloads</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            
            {/* LOADING STATE (SKELETON) */}
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-48 rounded bg-slate-200" />
                      <div className="h-3 w-32 rounded bg-slate-200" />
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="h-6 w-24 rounded bg-slate-200" /></td>
                  <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-slate-200" /></td>
                  <td className="px-6 py-4"><div className="h-4 w-12 rounded bg-slate-200" /></td>
                  <td className="px-6 py-4"><div className="mx-auto h-8 w-20 rounded bg-slate-200" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
              // EMPTY STATE
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-sm font-medium text-slate-900">Belum ada buku</h3>
                  <p className="mt-1 text-sm text-slate-500">Coba ubah filter atau tambah buku baru.</p>
                </td>
              </tr>
            ) : (
              // DATA ROWS
              data.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                  {/* Title & Author */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 line-clamp-1" title={item.title}>
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        by {item.author}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm">
                      {item.category}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Downloads */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Download size={14} className="text-slate-400" />
                      {item.downloads.toLocaleString()}
                    </div>
                  </td>

                  {/* Actions (RBAC PROTECTED) */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      {isAdmin ? (
                        // Show Actions for ADMIN
                        <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                          <button 
                            onClick={() => onEdit(item.id)} 
                            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" 
                            title="Edit Data"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => onDelete(item.id)} 
                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors" 
                            title="Hapus Data"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ) : (
                        // Show Read-Only for VIEWER
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Lock size={12} />
                          <span>Read Only</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};