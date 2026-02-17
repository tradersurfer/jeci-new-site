import { type ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { FileText, PenTool, MessageCircle, CircleDollarSign, User } from 'lucide-react';
import { usePortalAuth, portalFetch } from './PortalAuthContext';

const tabs = [
  { path: '/tax-portal/documents', label: 'Documents', icon: FileText },
  { path: '/tax-portal/sign', label: 'Sign', icon: PenTool },
  { path: '/tax-portal/chat', label: 'Chat', icon: MessageCircle },
  { path: '/tax-portal/crypto', label: 'Crypto', icon: CircleDollarSign },
  { path: '/tax-portal/profile', label: 'Profile', icon: User },
];

export default function PortalLayout({ children }: { children: ReactNode }) {
  const { user, loading } = usePortalAuth();
  const [location, setLocation] = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/tax-portal/login');
    }
  }, [user, loading, setLocation]);

  useEffect(() => {
    if (!user) return;
    const fetchUnread = async () => {
      try {
        const res = await portalFetch('/api/portal/messages/unread-count');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count || 0);
        }
      } catch {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 10000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <span className="font-bold text-lg" data-testid="portal-title">JECI Tax Portal</span>
        <span className="text-sm text-slate-300" data-testid="user-name">{user.fullName}</span>
      </header>

      <main className="flex-1 overflow-y-auto pb-20 px-4 py-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50" data-testid="bottom-nav">
        <div className="flex items-center justify-around py-1">
          {tabs.map((tab) => {
            const isActive = location === tab.path || (tab.path === '/tax-portal/documents' && location === '/tax-portal');
            const Icon = tab.icon;
            return (
              <button
                key={tab.path}
                onClick={() => setLocation(tab.path)}
                data-testid={`nav-${tab.label.toLowerCase()}`}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 rounded-lg transition-colors ${
                  isActive ? 'text-amber-600' : 'text-slate-500'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.label === 'Chat' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1" data-testid="unread-badge">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
