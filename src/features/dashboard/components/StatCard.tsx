import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export const StatCard = ({ title, value, icon, trend, trendDirection }: StatCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.15)] border border-slate-100">
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
        </div>
        
        {/* Icon dengan Background Halus */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
          {icon}
        </div>
      </div>
      
      {/* Decorative Gradient Line at bottom */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-indigo-500 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100" />
      
      {trend && (
        <div className="mt-4 flex items-center text-sm font-medium">
          <span 
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
              trendDirection === 'up' 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            )}
          >
            {trendDirection === 'up' ? '↑' : '↓'} {trend}
          </span>
          <span className="ml-2 text-xs text-slate-400">vs bulan lalu</span>
        </div>
      )}
    </div>
  );
};