import { LayoutDashboard, BookOpen, Users, Shield, ShieldAlert } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';
import { useAuthStore, type UserRole } from '../../stores/useAuthStore';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const Sidebar = () => {
  const { isSidebarOpen } = useUIStore();
  const { user, login } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'E-Books', path: '/ebooks', icon: BookOpen },
    { name: 'Users', path: '/users', icon: Users },
  ];

  const handleSwitchRole = () => {
    const newRole: UserRole = user?.role === 'super_admin' ? 'viewer' : 'super_admin';
    login(newRole);
    toast.info(`Mode beralih ke: ${newRole === 'super_admin' ? 'Super Admin' : 'Viewer'}`);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-text-main text-slate-300 transition-all duration-300 ease-out border-r border-slate-800/50 flex flex-col shadow-xl",
        isSidebarOpen ? "w-72" : "w-20"
      )}
    >
      {/* BRANDING AREA */}
      <div className="flex h-20 items-center justify-center border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
            <BookOpen size={20} strokeWidth={2.5} />
          </div>
          
          <div className={cn("transition-all duration-300 overflow-hidden", !isSidebarOpen && "w-0 opacity-0 hidden")}>
            <h1 className="font-bold text-lg text-white tracking-tight">SIPIT 2.0</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-8 flex flex-col gap-2 px-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ease-in-out",
                // Active State: Gradient background & White Text
                isActive 
                  ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-900/20" 
                  : "hover:bg-slate-800/50 hover:text-white",
                !isSidebarOpen && "justify-center px-2"
              )
            }
          >
            <item.icon size={22} className={cn("transition-colors", !isSidebarOpen && "mx-auto")} />
            <span className={cn("transition-all duration-300 whitespace-nowrap", !isSidebarOpen && "hidden w-0 opacity-0")}>
              {item.name}
            </span>
            
            {/* Active Indicator Dot (Optional Candy) */}
            {!isSidebarOpen && (
               <div className={cn("absolute right-2 h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-text-main", ({ isActive }: any) => isActive ? "block" : "hidden")} />
            )}
          </NavLink>
        ))}
      </nav>

      {/* USER PROFILE & ROLE SWITCHER */}
      <div className="p-4 border-t border-slate-800/50 bg-[#0B1120]">
        <div className={cn("flex items-center gap-3 rounded-xl bg-slate-800/40 p-3 border border-slate-700/30", !isSidebarOpen && "justify-center p-2 bg-transparent border-0")}>
           <div className="relative">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-slate-700 to-slate-600 text-white font-bold shadow-inner">
                {user?.avatar}
             </div>
             {/* Status Dot */}
             <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-text-main"></span>
           </div>

           {isSidebarOpen && (
             <div className="flex-1 overflow-hidden">
               <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
               <button 
                 onClick={handleSwitchRole}
                 className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
               >
                 {user?.role === 'super_admin' ? <ShieldAlert size={12} /> : <Shield size={12} />}
                 <span>{user?.role === 'super_admin' ? 'Super Admin' : 'Viewer'}</span>
               </button>
             </div>
           )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;