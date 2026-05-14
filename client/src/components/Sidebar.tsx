import { useLocation } from 'wouter';
import { LayoutDashboard, Users, Settings, MessageSquare, LogOut, LogIn } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [, setLocation] = useLocation();

  const handleNavigate = (path: string, page: string) => {
    onNavigate(page);
    setLocation(path);
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', id: 'dashboard' },
    { label: 'Acessos', icon: Users, path: '/acessos', id: 'acessos' },
    { label: 'Operação', icon: MessageSquare, path: '/operacao', id: 'operacao' },
    { label: 'Chat BIA', icon: MessageSquare, path: '/chat', id: 'chat' },
    { label: 'Configurações', icon: Settings, path: '/configuracoes', id: 'configuracoes' },
    { label: 'Login Bradesco', icon: LogIn, path: '/bradesco', id: 'bradesco' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Bradesco</h1>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path, item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-all">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Sistema Online</span>
        </div>
      </div>
    </div>
  );
}
