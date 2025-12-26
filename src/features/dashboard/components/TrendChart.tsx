import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', downloads: 400 },
  { name: 'Feb', downloads: 300 },
  { name: 'Mar', downloads: 550 },
  { name: 'Apr', downloads: 480 },
  { name: 'May', downloads: 800 },
  { name: 'Jun', downloads: 1200 },
  { name: 'Jul', downloads: 1450 },
];

export const TrendChart = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Statistik Download</h3>
          <p className="text-sm text-slate-500">Performa 7 bulan terakhir</p>
        </div>
        <select className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option>Tahun Ini</option>
          <option>Tahun Lalu</option>
        </select>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Gradient Indigo Keren */}
              <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }} 
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              itemStyle={{ color: '#1e293b', fontWeight: 600 }}
              cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="downloads" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorDownloads)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};