import { type ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  LayoutDashboard,
  Users,
  FileText,
  FileCheck,
  MessageCircle,
  CircleDollarSign,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { usePortalAuth } from './PortalAuthContext';

const navItems = [
  { path: '/tax-portal/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tax-portal/admin/clients', label: 'Clients', icon: Users },
  { path: '/tax-portal/admin/documents', label: 'Documents', icon: FileText },
  { path: '/tax-portal/admin/returns', label: 'Returns', icon: FileCheck },
  { path: '/tax-portal/admin/messages', label: 'Messages', icon: MessageCircle },
  { path: '/tax-portal/admin/crypto', label: 'Crypto Hub', icon: CircleDollarSign },
];

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, loading, logout } = usePortalAuth();
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      setLocation('/tax-portal/login');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') return null;

  const handleLogout = () => {
    logout();
    setLocation('/tax-portal/login');
  };

  const isActive = (path: string) => {
    if (path === '/tax-portal/admin') return location === path;
    return location.startsWith(path);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-lg font-bold text-white" data-testid="admin-branding">JECI Tax Portal</h1>
        <p className="text-amber-500 text-sm font-medium mt-1">Admin Panel</p>
        <p className="text-slate-400 text-xs mt-2 truncate" data-testid="admin-name">{user.fullName}</p>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-3" data-testid="admin-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => {
                setLocation(item.path);
                setSidebarOpen(false);
              }}
              data-testid={`nav-admin-${item.label.toLowerCase().replace(' ', '-')}`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-slate-800 text-amber-500 border-l-4 border-amber-500 pl-2'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-700">
        <button
          onClick={handleLogout}
          data-testid="admin-logout"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex w-[260px] bg-[#0f172a] flex-col fixed inset-y-0 left-0 z-40" data-testid="admin-sidebar">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-[#0f172a] flex flex-col" data-testid="admin-sidebar-mobile">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              data-testid="close-sidebar"
            >
              <X size={20} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600"
              data-testid="hamburger-menu"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800" data-testid="page-title">{title}</h2>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
