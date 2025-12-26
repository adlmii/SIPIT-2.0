import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { User, UserFormData } from '../types';
import { USER_ROLES, USER_STATUS } from '../../../lib/constants';

// 2. UPDATE ZOD SCHEMA DENGAN CONSTANTS
const userSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  role: z.enum([USER_ROLES.SUPER_ADMIN, USER_ROLES.VIEWER]),
  status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.INACTIVE]),
});

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const UserForm = ({ initialData, onSubmit, onCancel, isSubmitting }: UserFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      email: initialData.email,
      role: initialData.role,
      status: initialData.status,
    } : {
      name: '',
      email: '',
      role: USER_ROLES.VIEWER,
      status: USER_STATUS.ACTIVE,
    },
  });

  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
  const inputClass = "w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all";
  const selectClass = cn(inputClass, "appearance-none bg-white cursor-pointer");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Nama Lengkap</label>
        <input {...register('name')} className={inputClass} placeholder="Contoh: John Doe" autoFocus />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input {...register('email')} type="email" className={inputClass} placeholder="john@company.com" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Role Access</label>
          <div className="relative">
            {/* 3. UPDATE JSX OPTIONS */}
            <select {...register('role')} className={selectClass}>
              <option value={USER_ROLES.SUPER_ADMIN}>Super Admin</option>
              <option value={USER_ROLES.VIEWER}>Viewer</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Status Akun</label>
          <div className="relative">
            <select {...register('status')} className={selectClass}>
              <option value={USER_STATUS.ACTIVE}>Active</option>
              <option value={USER_STATUS.INACTIVE}>Inactive</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Batal</button>
        <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50">
          {isSubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Data' : 'Tambah User')}
        </button>
      </div>
    </form>
  );
};