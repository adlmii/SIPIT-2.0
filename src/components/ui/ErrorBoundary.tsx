import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 1. Tangkap error untuk update state UI
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 2. Log error ke console (atau service monitoring seperti Sentry)
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // 3. Reset error (untuk tombol "Try Again")
  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload(); // Hard reload untuk memastikan state bersih
  };

  render() {
    if (this.state.hasError) {
      // --- FALLBACK UI ---
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-4 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-sm">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="mb-2 text-2xl font-bold text-slate-800">
            Ups! Terjadi Kesalahan
          </h2>
          
          <p className="mb-6 max-w-md text-slate-500">
            Aplikasi mengalami crash. Jangan khawatir, ini bukan salah Anda. 
            Kami telah mencatat error ini.
          </p>

          <div className="mb-8 rounded-lg bg-white p-4 text-left text-sm text-red-500 shadow-sm border border-red-100 max-w-lg overflow-auto font-mono">
            {this.state.error?.toString()}
          </div>

          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <RefreshCw size={18} />
            Muat Ulang Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}