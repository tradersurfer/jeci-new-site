import { useState, useEffect } from 'react';
import { CircleDollarSign, TrendingUp, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/portal/AdminLayout';
import { portalFetch } from '@/components/portal/PortalAuthContext';

interface CryptoTransaction {
  id: string;
  userId: string;
  clientName?: string;
  date?: string;
  cryptoType?: string;
  transactionType?: string;
  amount?: number;
  usdValue?: number;
  exchange?: string;
  createdAt?: string;
}

export default function AdminCrypto() {
  const [transactions, setTransactions] = useState<CryptoTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientFilter, setClientFilter] = useState('');
  const [cryptoFilter, setCryptoFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await portalFetch('/api/portal/admin/crypto');
        if (res.ok) setTransactions(await res.json());
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const uniqueClients = Array.from(new Set(transactions.map((t) => t.clientName || t.userId)));
  const totalTransactions = transactions.length;

  const filtered = transactions.filter((t) => {
    const matchClient = !clientFilter || (t.clientName || t.userId).toLowerCase().includes(clientFilter.toLowerCase());
    const matchCrypto = !cryptoFilter || (t.cryptoType || '').toLowerCase().includes(cryptoFilter.toLowerCase());
    return matchClient && matchCrypto;
  });

  return (
    <AdminLayout title="Crypto Hub">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card data-testid="stat-crypto-clients">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Crypto Clients</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{loading ? '—' : uniqueClients.length}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <CircleDollarSign size={22} className="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="stat-total-transactions">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Transactions</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{loading ? '—' : totalTransactions}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <TrendingUp size={22} className="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Filter by client..."
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="pl-9 w-48"
            data-testid="filter-client"
          />
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Filter by crypto..."
            value={cryptoFilter}
            onChange={(e) => setCryptoFilter(e.target.value)}
            className="pl-9 w-48"
            data-testid="filter-crypto"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="crypto-table">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Client</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Crypto Type</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">TX Type</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">USD Value</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Exchange</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">No transactions found</td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-slate-50" data-testid={`crypto-row-${tx.id}`}>
                    <td className="px-4 py-3 text-slate-800">{tx.clientName || tx.userId}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                      {(tx.date || tx.createdAt) ? new Date(tx.date || tx.createdAt!).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{tx.cryptoType || '—'}</td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{tx.transactionType || '—'}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{tx.amount ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-800">{tx.usdValue != null ? `$${tx.usdValue.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{tx.exchange || '—'}</td>
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
