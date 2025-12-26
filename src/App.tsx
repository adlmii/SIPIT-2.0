import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; // 1. Import Toaster
import Layout from './components/layout/Layout';

import DashboardPage from './features/dashboard';
import EbooksPage from './features/ebooks';

// --- Placeholders ---
const UsersPage = () => (
  <div className="flex h-[60vh] flex-col items-center justify-center text-center">
    <div className="rounded-full bg-slate-100 p-6"><span className="text-4xl">🚧</span></div>
    <h2 className="mt-4 text-xl font-bold text-slate-700">User Management</h2>
    <p className="text-slate-500">Fitur ini sedang dalam pengembangan.</p>
  </div>
);

const NotFoundPage = () => (
  <div className="flex h-[60vh] flex-col items-center justify-center text-center">
    <h1 className="text-9xl font-bold text-slate-200">404</h1>
    <h2 className="mt-4 text-xl font-semibold text-slate-700">Halaman Tidak Ditemukan</h2>
    <a href="/" className="mt-6 text-blue-600 hover:underline">Kembali ke Dashboard</a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {/* 2. Pasang Component Toaster Global disini */}
      {/* 'richColors' membuat notifikasi sukses jadi hijau, error jadi merah */}
      <Toaster position="top-right" richColors closeButton />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="ebooks" element={<EbooksPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;