import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Users, FileText, PenTool, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/portal/AdminLayout';
import { portalFetch } from '@/components/portal/PortalAuthContext';

interface DashboardStats {
  totalClients: number;
  pendingDocuments: number;
  pendingSignatures: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    pendingDocuments: 0,
    pendingSignatures: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await portalFetch('/api/portal/admin/dashboard');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {}
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Clients', value: stats.totalClients, icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Documents', value: stats.pendingDocuments, icon: FileText, color: 'bg-amber-500' },
    { label: 'Pending Signatures', value: stats.pendingSignatures, icon: PenTool, color: 'bg-purple-500' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageCircle, color: 'bg-green-500' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} data-testid={`stat-${card.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{card.label}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                      {loading ? '—' : card.value}
                    </p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setLocation('/tax-portal/admin/documents')}
          data-testid="action-view-documents"
          className="bg-[#0f172a] text-white hover:bg-slate-800"
        >
          <FileText size={16} />
          View Documents
        </Button>
        <Button
          onClick={() => setLocation('/tax-portal/admin/returns')}
          data-testid="action-upload-return"
          className="bg-amber-600 text-white hover:bg-amber-700"
        >
          <PenTool size={16} />
          Upload Return
        </Button>
        <Button
          onClick={() => setLocation('/tax-portal/admin/messages')}
          data-testid="action-check-messages"
          variant="outline"
        >
          <MessageCircle size={16} />
          Check Messages
        </Button>
      </div>
    </AdminLayout>
  );
}
