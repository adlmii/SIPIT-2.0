import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Bell } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { cn } from '../../lib/utils';

const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Sidebar />
      
      {/* Main Content */}
      <main 
        className={cn(
          "min-h-screen transition-all duration-300 ease-out",
          isSidebarOpen ? "ml-72" : "ml-20"
        )}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-md transition-all">
          
          {/* Left: Toggle & Breadcrumb (Simulasi) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:block">
              <h2 className="text-sm font-semibold text-slate-800">Overview</h2>
            </div>
          </div>
          
          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown Simulation */}
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-100 cursor-pointer hover:ring-indigo-100 transition-all">
                <div className="flex h-full w-full items-center justify-center bg-slate-800 text-white font-bold">
                  {user?.avatar}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;