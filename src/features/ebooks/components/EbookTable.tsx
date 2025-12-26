import { Edit2, Trash2, Eye, Lock } from 'lucide-react';
import type { Ebook } from '../types';
import { cn } from '../../../lib/utils';
import { useAuthStore } from '../../../stores/useAuthStore';


interface EbookTableProps {
  data: Ebook[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EbookTable = ({ data, isLoading, onEdit, onDelete }: EbookTableProps) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'super_admin';

  // Badge Status
  const StatusBadge = ({ status }: { status: Ebook['status'] }) => {
    const config = {
      published: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
      draft: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", border: "border-amber-200" },
      archived: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-500", border: "border-slate-200" },
    };
    const style = config[status];

    return (
      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize", style.bg, style.text, style.border)}>
        <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
        {status}
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Header dengan background abu-abu sangat muda */}
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Judul Buku</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Kategori</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Downloads</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Aksi</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                   {/* ... (Skeleton sama seperti sebelumnya, sesuaikan padding) ... */}
                   <td className="px-6 py-4"><div className="h-4 w-48 rounded bg-slate-200" /></td>
                   <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-slate-200" /></td>
                   <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-slate-200" /></td>
                   <td className="px-6 py-4"><div className="ml-auto h-4 w-12 rounded bg-slate-200" /></td>
                   <td className="px-6 py-4"><div className="mx-auto h-4 w-20 rounded bg-slate-200" /></td>
                </tr>
              ))
            ) : data.length === 0 ? (
               <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">Data tidak ditemukan</td></tr>
            ) : (
              data.map((ebook) => (
                <tr key={ebook.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{ebook.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{ebook.author}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {ebook.category}
                    </span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={ebook.status} /></td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-slate-600">
                    {ebook.downloads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all" title="Preview">
                        <Eye size={18} />
                      </button>

                      {isAdmin ? (
                        <>
                          <button onClick={() => onEdit(ebook.id)} className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => onDelete(ebook.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <button className="rounded-lg p-2 text-slate-200 cursor-not-allowed">
                          <Lock size={18} />
                        </button>
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