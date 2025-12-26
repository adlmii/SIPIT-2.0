import { useState, useEffect } from 'react';
import { Plus, Search, Layers, CheckCircle2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useEbooks } from './hooks/useEbooks';
import { useDebounce } from '../../hooks/useDebounce';
import { EbookTable } from './components/EbookTable';
import { Modal } from '../../components/ui/Modal';
import { EbookForm, type EbookFormData } from './components/EbookForm'; 
import type { Ebook } from './types';
import { useEbookStore } from '../../stores/useEbookStore';

const EbooksPage = () => {
  // --- STATE ---
  const { addEbook, updateEbook, deleteEbook } = useEbookStore();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    status: 'All',
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useEbooks(filters);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);


  // --- HANDLERS ---

  const handleFormSubmit = async (formData: EbookFormData) => {
    const savePromise = new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.promise(savePromise, {
      loading: 'Menyimpan perubahan...',
      success: () => {
        if (selectedEbook) {
          // MODE EDIT: Update data yang ada
          updateEbook(selectedEbook.id, formData);
          return `Berhasil memperbarui "${formData.title}"`;
        } else {
          // MODE CREATE: Tambah data baru
          addEbook(formData);
          return `Berhasil menambahkan "${formData.title}"`;
        }
        setIsModalOpen(false);
      },
      error: 'Gagal menyimpan data.',
    });

    await savePromise;
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    toast("Apakah Anda yakin ingin menghapus?", {
      description: "Data ini tidak dapat dikembalikan.",
      action: {
        label: "Hapus",
        onClick: () => {
          // PANGGIL ACTION DELETE DARI STORE
          deleteEbook(id); 
          toast.success("Data berhasil dihapus.");
        },
      },
      cancel: { label: "Batal", onClick: () => {} },
    });
  };
  
  const handleEdit = (id: string) => {
    const ebookToEdit = data.find((item) => item.id === id);
    if (!ebookToEdit) {
      toast.error("Data buku tidak ditemukan.");
      return;
    }
    setSelectedEbook(ebookToEdit);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => { setSelectedEbook(null); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedEbook(null); };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilters(prev => ({...prev, category: e.target.value, page: 1}));
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilters(prev => ({...prev, status: e.target.value, page: 1}));

  // Styles Helpers
  const filterWrapperClass = "relative min-w-[180px]";
  const selectClass = "w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-600 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer";
  const iconLeftClass = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none";
  const iconChevronClass = "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manajemen E-Book</h1>
          <p className="mt-1 text-slate-500">Kelola katalog buku digital dan status publikasi Anda.</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          Tambah Buku
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className={iconLeftClass} size={18} />
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              value={searchTerm}
              onChange={handleSearchInput}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className={filterWrapperClass}>
              <Layers className={iconLeftClass} size={16} />
              <select className={selectClass} value={filters.category} onChange={handleCategoryChange}>
                <option value="All">Semua Kategori</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Software Engineering">Software Engineering</option>
              </select>
              <ChevronDown className={iconChevronClass} size={14} />
            </div>
            <div className={filterWrapperClass}>
              <CheckCircle2 className={iconLeftClass} size={16} />
              <select className={selectClass} value={filters.status} onChange={handleStatusChange}>
                <option value="All">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown className={iconChevronClass} size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <EbookTable 
        data={data} 
        isLoading={isLoading} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* PAGINATION */}
      {!isLoading && (
        <div className="flex items-center justify-between text-sm text-slate-500 px-1">
          <span>Menampilkan {data.length} data</span>
          <div className="flex gap-2">
            <button 
              disabled={filters.page === 1}
              onClick={() => setFilters(prev => ({...prev, page: prev.page - 1}))}
              className="rounded-lg px-3 py-1.5 border border-slate-200 hover:bg-white hover:text-indigo-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              Previous
            </button>
            <span className="rounded-lg bg-indigo-50 px-3 py-1.5 font-medium text-indigo-700">Page {filters.page}</span>
            <button 
              onClick={() => setFilters(prev => ({...prev, page: prev.page + 1}))}
              className="rounded-lg px-3 py-1.5 border border-slate-200 hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEbook ? "Edit Data Buku" : "Tambah Buku Baru"}
      >
        <EbookForm 
          initialData={selectedEbook}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default EbooksPage;