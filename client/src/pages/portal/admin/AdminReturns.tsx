import { useState, useEffect, useRef } from 'react';
import { Upload, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/portal/AdminLayout';
import { portalFetch } from '@/components/portal/PortalAuthContext';

interface Client {
  id: string;
  fullName: string;
}

interface TaxReturn {
  id: string;
  fileName: string;
  userId: string;
  taxYear?: string;
  status: string;
  createdAt?: string;
  signedAt?: string;
  adminNotes?: string;
}

export default function AdminReturns() {
  const [returns, setReturns] = useState<TaxReturn[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [taxYear, setTaxYear] = useState(new Date().getFullYear().toString());
  const [adminNotes, setAdminNotes] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.fullName]));

  const fetchData = async () => {
    try {
      const [returnsRes, clientsRes] = await Promise.all([
        portalFetch('/api/portal/admin/returns'),
        portalFetch('/api/portal/admin/clients'),
      ]);
      if (returnsRes.ok) setReturns(await returnsRes.json());
      if (clientsRes.ok) setClients(await clientsRes.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !selectedClientId) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', selectedClientId);
    formData.append('taxYear', taxYear);
    if (adminNotes) formData.append('adminNotes', adminNotes);

    try {
      await portalFetch('/api/portal/admin/returns', {
        method: 'POST',
        body: formData,
      });
      setSelectedClientId('');
      setTaxYear(new Date().getFullYear().toString());
      setAdminNotes('');
      if (fileRef.current) fileRef.current.value = '';
      fetchData();
    } catch {}
    setUploading(false);
  };

  return (
    <AdminLayout title="Tax Returns">
      <Card className="mb-6" data-testid="upload-return-form">
        <CardHeader>
          <CardTitle className="text-base">Upload New Return</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-slate-600 block mb-1">Client</label>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                data-testid="select-client"
                required
              >
                <option value="">Select client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600 block mb-1">Tax Year</label>
              <Input
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value)}
                data-testid="input-tax-year"
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 block mb-1">File</label>
              <input
                type="file"
                ref={fileRef}
                className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-slate-100 file:text-slate-700 file:text-sm"
                data-testid="input-file"
                required
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 block mb-1">Admin Notes</label>
              <Input
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Optional notes"
                data-testid="input-admin-notes"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <Button
                type="submit"
                disabled={uploading}
                data-testid="submit-return"
                className="bg-amber-600 text-white hover:bg-amber-700"
              >
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Upload Return'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="returns-table">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">File Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Client</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Tax Year</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Upload Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">Loading...</td>
                </tr>
              ) : returns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">No returns found</td>
                </tr>
              ) : (
                returns.map((ret) => (
                  <tr key={ret.id} className="border-b hover:bg-slate-50" data-testid={`return-row-${ret.id}`}>
                    <td className="px-4 py-3 font-medium text-slate-800 max-w-[200px] truncate">{ret.fileName}</td>
                    <td className="px-4 py-3 text-slate-600">{clientMap[ret.userId] || ret.userId}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{ret.taxYear || '—'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={ret.status === 'signed' ? 'default' : 'outline'} data-testid={`return-status-${ret.id}`}>
                        {ret.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                      {ret.createdAt ? new Date(ret.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => window.open(`/api/portal/returns/${ret.id}/download`, '_blank')}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-500"
                          data-testid={`download-return-${ret.id}`}
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        {ret.signedAt && (
                          <button
                            className="p-1.5 rounded hover:bg-slate-100 text-green-600"
                            data-testid={`view-signature-${ret.id}`}
                            title="View Signature"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
