import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function AdminLayout({ children, currentPage, onNavigate }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', id: 'dashboard' },
    { label: 'Acessos', path: '/acessos', id: 'acessos' },
    { label: 'Operação', path: '/operacao', id: 'operacao' },
    { label: 'Chat BIA', path: '/chat', id: 'chat' },
    { label: 'Configurações', path: '/configuracoes', id: 'configuracoes' },
  ];

  const handleNavigate = (path: string, id: string) => {
    onNavigate(id);
    setLocation(path);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar Colapsável */}
      <div
        className={`fixed left-0 top-0 h-screen w-56 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-48`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">Bradesco</h1>
              <p className="text-slate-400 text-xs">Admin</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path, item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-all ${
                currentPage === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-800">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
            <LogOut className="h-4 w-4" />
            <span className="font-medium">Sair</span>
          </button>
        </div>

        {/* Status */}
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <span className="text-white font-bold text-sm">Bradesco Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
