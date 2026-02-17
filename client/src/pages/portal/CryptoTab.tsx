import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, TrendingUp, Hash, ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { portalFetch } from '@/components/portal/PortalAuthContext';
import PortalLayout from '@/components/portal/PortalLayout';

const CRYPTO_TYPES = ['Bitcoin', 'Ethereum', 'Solana', 'USDT', 'USDC', 'Other'];
const TX_TYPES = ['Buy', 'Sell', 'Trade', 'Mining', 'Staking', 'Airdrop'];

interface CryptoTx {
  id: string;
  date: string;
  cryptoType: string;
  transactionType: string;
  amount: string;
  usdValue: string | null;
  costBasis: string | null;
  fees: string | null;
  exchange: string | null;
  notes: string | null;
}

export default function CryptoTab() {
  const [txs, setTxs] = useState<CryptoTx[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    cryptoType: 'Bitcoin',
    transactionType: 'Buy',
    amount: '',
    usdValue: '',
    costBasis: '',
    fees: '',
    exchange: '',
    notes: '',
    userId: '',
  });
  const [saving, setSaving] = useState(false);

  const fetchTxs = useCallback(async () => {
    try {
      const res = await portalFetch('/api/portal/crypto');
      if (res.ok) setTxs(await res.json());
    } catch {}
  }, []);

  useEffect(() => { fetchTxs(); }, [fetchTxs]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await portalFetch('/api/portal/crypto', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          usdValue: form.usdValue || undefined,
          costBasis: form.costBasis || undefined,
          fees: form.fees || undefined,
          exchange: form.exchange || undefined,
          notes: form.notes || undefined,
        }),
      });
      setShowForm(false);
      setForm({ date: new Date().toISOString().split('T')[0], cryptoType: 'Bitcoin', transactionType: 'Buy', amount: '', usdValue: '', costBasis: '', fees: '', exchange: '', notes: '', userId: '' });
      await fetchTxs();
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await portalFetch(`/api/portal/crypto/${id}`, { method: 'DELETE' });
      await fetchTxs();
    } catch {}
  };

  const sorted = [...txs].sort((a, b) => {
    return sortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
  });

  const totalGainLoss = txs.reduce((sum, tx) => {
    if (tx.transactionType === 'Sell' && tx.usdValue && tx.costBasis) {
      return sum + (parseFloat(tx.usdValue) - parseFloat(tx.costBasis));
    }
    return sum;
  }, 0);

  return (
    <PortalLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-[#0f172a]" data-testid="crypto-title">Crypto Tax Records</h1>

        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Hash className="mx-auto text-amber-600 mb-1" size={24} />
              <p className="text-2xl font-bold text-[#0f172a]" data-testid="total-transactions">{txs.length}</p>
              <p className="text-xs text-slate-500">Total Transactions</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto text-amber-600 mb-1" size={24} />
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="total-gain-loss">
                ${totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500">Gains/Losses</p>
            </CardContent>
          </Card>
        </div>

        <Button onClick={() => setShowForm(!showForm)} className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white" data-testid="button-add-transaction">
          {showForm ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
          {showForm ? 'Cancel' : 'Add Transaction'}
        </Button>

        {showForm && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-11 mt-1" required data-testid="input-tx-date" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Crypto</label>
                    <select value={form.cryptoType} onChange={(e) => setForm({ ...form, cryptoType: e.target.value })} className="w-full h-11 rounded-md border border-slate-300 px-3 text-sm bg-white mt-1" data-testid="select-crypto-type">
                      {CRYPTO_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Type</label>
                    <select value={form.transactionType} onChange={(e) => setForm({ ...form, transactionType: e.target.value })} className="w-full h-11 rounded-md border border-slate-300 px-3 text-sm bg-white mt-1" data-testid="select-tx-type">
                      {TX_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Amount</label>
                    <Input type="number" step="any" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="h-11 mt-1" required data-testid="input-tx-amount" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">USD Value</label>
                    <Input type="number" step="any" value={form.usdValue} onChange={(e) => setForm({ ...form, usdValue: e.target.value })} className="h-11 mt-1" data-testid="input-tx-usd" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Cost Basis</label>
                    <Input type="number" step="any" value={form.costBasis} onChange={(e) => setForm({ ...form, costBasis: e.target.value })} className="h-11 mt-1" data-testid="input-tx-cost-basis" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Fees</label>
                    <Input type="number" step="any" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} className="h-11 mt-1" data-testid="input-tx-fees" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Exchange</label>
                  <Input value={form.exchange} onChange={(e) => setForm({ ...form, exchange: e.target.value })} className="h-11 mt-1" placeholder="e.g. Coinbase, Binance" data-testid="input-tx-exchange" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Notes</label>
                  <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="h-11 mt-1" placeholder="Optional notes" data-testid="input-tx-notes" />
                </div>
                <Button type="submit" disabled={saving} className="w-full h-11 bg-[#0f172a] hover:bg-slate-800 text-white" data-testid="button-save-tx">
                  {saving ? 'Saving...' : 'Save Transaction'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Transactions</h2>
          <button onClick={() => setSortAsc(!sortAsc)} className="flex items-center gap-1 text-sm text-slate-500 min-h-[44px]" data-testid="button-sort">
            Date {sortAsc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {sorted.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-8 text-center">
              <p className="text-slate-500">No transactions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {sorted.map((tx) => (
              <Card key={tx.id} className="border-0 shadow-sm" data-testid={`tx-item-${tx.id}`}>
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-slate-600">{tx.cryptoType.slice(0, 3).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{tx.transactionType} {tx.amount} {tx.cryptoType}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{tx.date}</span>
                      {tx.usdValue && <span className="text-xs text-slate-500">${parseFloat(tx.usdValue).toFixed(2)}</span>}
                      {tx.exchange && <span className="text-xs text-slate-400">{tx.exchange}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(tx.id)} className="p-2 text-red-400 hover:text-red-600 min-w-[44px] min-h-[44px] flex items-center justify-center" data-testid={`delete-tx-${tx.id}`}>
                    <Trash2 size={16} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Info size={18} className="text-amber-600" /> Crypto Tax Tips
          </h2>
          {[
            { title: 'What transactions are taxable?', content: 'Selling crypto for USD, trading one crypto for another, using crypto to buy goods/services, and receiving mining/staking rewards are all taxable events.' },
            { title: 'Capital gains vs income', content: 'Selling or trading crypto creates capital gains/losses. Mining, staking, and airdrops are treated as ordinary income at fair market value when received.' },
            { title: 'Record keeping requirements', content: 'Keep records of acquisition date, cost basis, sale date, sale price, and fees for every transaction. Hold records for at least 3 years after filing.' },
          ].map((tip) => (
            <Card key={tip.title} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-[#0f172a] mb-1">{tip.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
