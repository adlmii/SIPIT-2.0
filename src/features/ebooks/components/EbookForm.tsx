import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Loader2 } from 'lucide-react';
import type { Ebook } from '../types';
import { cn } from '../../../lib/utils';
import { EBOOK_STATUS, EBOOK_CATEGORIES } from '../../../lib/constants';

// 1. Schema Validasi (Menggunakan Constants)
const ebookSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  author: z.string().min(2, "Nama penulis wajib diisi"),
  category: z.string().min(1, "Pilih salah satu kategori"),
  status: z.enum([EBOOK_STATUS.PUBLISHED, EBOOK_STATUS.DRAFT, EBOOK_STATUS.ARCHIVED]),
});

export type EbookFormData = z.infer<typeof ebookSchema>;

interface EbookFormProps {
  initialData?: Ebook | null;
  // Penting: Return Promise agar React Hook Form tahu kapan loading selesai
  onSubmit: (data: EbookFormData) => Promise<void>; 
  onCancel: () => void;
}

export const EbookForm = ({ initialData, onSubmit, onCancel }: EbookFormProps) => {
  const {
    register,
    handleSubmit,
    // 2. Ambil state 'isSubmitting' dari React Hook Form
    formState: { errors, isSubmitting },
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
      category: EBOOK_CATEGORIES.DEVELOPMENT,
      status: EBOOK_STATUS.DRAFT,
    },
  });

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
          autoFocus 
          disabled={isSubmitting} // Disable input saat loading
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
          disabled={isSubmitting}
        />
        {errors.author && <p className="mt-1 text-xs text-red-500 font-medium">{errors.author.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Category Select */}
        <div>
          <label className={labelClass}>Kategori</label>
          <div className="relative">
             <select {...register('category')} className={selectClass} disabled={isSubmitting}>
              <option value={EBOOK_CATEGORIES.DEVELOPMENT}>Development</option>
              <option value={EBOOK_CATEGORIES.DESIGN}>Design</option>
              <option value={EBOOK_CATEGORIES.SOFTWARE_ENGINEERING}>Software Engineering</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          {errors.category && <p className="mt-1 text-xs text-red-500 font-medium">{errors.category.message}</p>}
        </div>

        {/* Status Select */}
        <div>
          <label className={labelClass}>Status</label>
          <div className="relative">
            <select {...register('status')} className={selectClass} disabled={isSubmitting}>
              <option value={EBOOK_STATUS.DRAFT}>Draft</option>
              <option value={EBOOK_STATUS.PUBLISHED}>Published</option>
              <option value={EBOOK_STATUS.ARCHIVED}>Archived</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        
        <button
          type="submit"
          // 3. FIX UTAMA: Disable tombol jika sedang submitting
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none active:scale-95"
        >
          {/* Visual Feedback Loading Spinner */}
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Tambah Buku')}
        </button>
      </div>
    </form>
  );
};