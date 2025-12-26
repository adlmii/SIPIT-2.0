import { BookOpen, Download, Users, TrendingUp } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { TrendChart } from './components/TrendChart';

// Mock Data Activity
const recentActivities = [
  { id: 1, user: 'Budi Santoso', action: 'mendownload', target: 'Clean Code PDF', time: '2 menit yang lalu' },
  { id: 2, user: 'Siti Aminah', action: 'mendaftar sebagai', target: 'Member Baru', time: '15 menit yang lalu' },
  { id: 3, user: 'Admin', action: 'mengupdate', target: 'UX Design Handbook', time: '1 jam yang lalu' },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Selamat datang kembali, berikut ringkasan hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total E-Book" 
          value="1,240" 
          icon={<BookOpen size={24} />} 
          trend="+12%"
          trendDirection="up"
        />
        <StatCard 
          title="Total Download" 
          value="85.4k" 
          icon={<Download size={24} />} 
          trend="+5.2%"
          trendDirection="up"
        />
        <StatCard 
          title="User Aktif" 
          value="3,400" 
          icon={<Users size={24} />} 
          trend="-1.5%"
          trendDirection="down"
        />
        <StatCard 
          title="Conversion Rate" 
          value="2.4%" 
          icon={<TrendingUp size={24} />} 
        />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart (Takes 2 columns) */}
        <div className="lg:col-span-2">
          <TrendChart />
        </div>

        {/* Recent Activity (Takes 1 column) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-blue-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;