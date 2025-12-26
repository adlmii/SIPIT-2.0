import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Ebook } from '../types';
import { cn } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';

// 1. Definisikan Schema Validasi
const ebookSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  author: z.string().min(2, "Nama penulis wajib diisi"),
  category: z.string().min(1, "Pilih salah satu kategori"),
  status: z.enum(['published', 'draft', 'archived']),
});

// 2. EXPORT Tipe Data ini agar bisa dipakai di Index (Type Safety)
export type EbookFormData = z.infer<typeof ebookSchema>;

interface EbookFormProps {
  initialData?: Ebook | null;
  onSubmit: (data: EbookFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const EbookForm = ({ initialData, onSubmit, onCancel, isSubmitting }: EbookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EbookFormData>({
    resolver: zodResolver(ebookSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      author: initialData.author,
      category: initialData.category,
      status: initialData.status,
    } : {
      title: '',
      author: '',
      category: 'Development',
      status: 'draft',
    },
  });

  // Helper Styles untuk Input & Label (Clean Code)
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
  const inputClass = "w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all";
  const selectClass = cn(inputClass, "appearance-none bg-white cursor-pointer");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      {/* Field: Title */}
      <div>
        <label className={labelClass}>Judul Buku</label>
        <input
          {...register('title')}
          className={inputClass}
          placeholder="Contoh: Clean Code"
          autoFocus // UX: Otomatis fokus saat modal dibuka
        />
        {errors.title && <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>}
      </div>

      {/* Field: Author */}
      <div>
        <label className={labelClass}>Penulis</label>
        <input
          {...register('author')}
          className={inputClass}
          placeholder="Nama penulis..."
        />
        {errors.author && <p className="mt-1 text-xs text-red-500 font-medium">{errors.author.message}</p>}
      </div>

      {/* Group: Category & Status */}
      <div className="grid grid-cols-2 gap-5">
        
        {/* Category Select */}
        <div>
          <label className={labelClass}>Kategori</label>
          <div className="relative">
             <select {...register('category')} className={selectClass}>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
            {/* Custom Chevron Icon */}
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          {errors.category && <p className="mt-1 text-xs text-red-500 font-medium">{errors.category.message}</p>}
        </div>

        {/* Status Select */}
        <div>
          <label className={labelClass}>Status</label>
          <div className="relative">
            <select {...register('status')} className={selectClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* Actions / Footer */}
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:shadow-none active:scale-95"
        >
          {isSubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Tambah Buku')}
        </button>
      </div>
    </form>
  );
};