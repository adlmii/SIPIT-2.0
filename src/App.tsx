import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import DashboardPage from './features/dashboard';
import EbooksPage from './features/ebooks';
import UsersPage from './features/users';

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