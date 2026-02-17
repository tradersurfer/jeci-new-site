import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/portal/AdminLayout';
import { portalFetch } from '@/components/portal/PortalAuthContext';

interface Client {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  filingStatus?: string;
  createdAt?: string;
  documentsCount?: number;
  returnsCount?: number;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await portalFetch('/api/portal/admin/clients');
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch {}
      setLoading(false);
    };
    fetchClients();
  }, []);

  const filtered = clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Clients">
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="search-clients"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="clients-table">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Filing Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Registered</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">No clients found</td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className="border-b hover:bg-slate-50 cursor-pointer transition-colors"
                    data-testid={`client-row-${client.id}`}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{client.fullName}</td>
                    <td className="px-4 py-3 text-slate-600">{client.email}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{client.phone || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {client.filingStatus ? (
                        <Badge variant="outline">{client.filingStatus}</Badge>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">
                      {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedClient(null)}>
          <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()} data-testid="client-detail-modal">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Client Details</CardTitle>
              <button onClick={() => setSelectedClient(null)} data-testid="close-client-modal">
                <X size={20} className="text-slate-400" />
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium" data-testid="detail-name">{selectedClient.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p data-testid="detail-email">{selectedClient.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p data-testid="detail-phone">{selectedClient.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Filing Status</p>
                <p data-testid="detail-filing-status">{selectedClient.filingStatus || 'Not set'}</p>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800" data-testid="detail-docs-count">{selectedClient.documentsCount ?? 0}</p>
                  <p className="text-xs text-slate-500">Documents</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800" data-testid="detail-returns-count">{selectedClient.returnsCount ?? 0}</p>
                  <p className="text-xs text-slate-500">Returns</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setSelectedClient(null)}
                data-testid="close-detail-btn"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLayout>
  );
}
