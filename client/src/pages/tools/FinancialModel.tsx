import React, { useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, SlidersHorizontal, FileText, Waves, Database,
  Download, Plus, Trash2, Sparkles, UploadCloud, ChevronLeft, Info,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocation } from 'wouter'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const NAVY = '#1B365D'
const GOLD = '#D4AF37'
const STREAM_COLORS = ['#D4AF37', '#5BB8D6', '#46C08F', '#9D85D6', '#E0A458', '#D66A8A', '#7FD0C4', '#C7CF6B']
const SEASONAL_MONTHS = [1, 2, 3, 4]
const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Stream {
  name: string
  start: number
  growth: number
  cogs: number
  seasonal: boolean
  seasonalMult: number
}
interface OpexItem { name: string; monthly: number }
interface ModelMeta { businessName: string; startMonth: string; startingCash: number }
interface Model {
  meta: ModelMeta
  streams: Stream[]
  opex: OpexItem[]
  ownerDraw: number
  taxReservePct: number
}
interface MonthRow {
  label: string; ym: string; cal: number
  streamRev: number[]; streamCogs: number[]
  income: number; cogs: number; gross: number
  opexItems: number[]; opex: number
  noi: number; tax: number; draw: number; retained: number
  beginCash: number; endCash: number
}
interface FY {
  income: number; cogs: number; gross: number; opex: number
  noi: number; tax: number; draw: number; retained: number
  streamRev: number[]; streamCogs: number[]; opexItems: number[]
  grossMargin: number; opMargin: number
}
interface KPIs {
  income: number; gross: number; gm: number; om: number
  noi: number; retained: number; exitRunRate: number; endCash: number
}
interface Computed { months: MonthRow[]; fy: FY; kpis: KPIs; lowCash: MonthRow }

type ScenarioKey = 'conservative' | 'base' | 'aggressive'
type TabKey = 'dashboard' | 'assumptions' | 'pnl' | 'cash' | 'ai'

const SCENARIOS: Record<ScenarioKey, { label: string; growthX: number; startX: number }> = {
  conservative: { label: 'Conservative', growthX: 0.5, startX: 0.92 },
  base:         { label: 'Base',         growthX: 1.0, startX: 1.00 },
  aggressive:   { label: 'Aggressive',   growthX: 1.4, startX: 1.08 },
}

function defaultModel(): Model {
  return {
    meta: { businessName: 'Meridian Growth Co.', startMonth: '2026-01', startingCash: 18500 },
    streams: [
      { name: 'E-commerce Store',      start: 4200, growth: 6,   cogs: 35, seasonal: false, seasonalMult: 1   },
      { name: 'Online Courses',        start: 1800, growth: 9,   cogs: 8,  seasonal: false, seasonalMult: 1   },
      { name: 'Freelance Design',      start: 2500, growth: 4,   cogs: 5,  seasonal: false, seasonalMult: 1   },
      { name: 'Holiday Pop-up Sales',  start: 800,  growth: 2,   cogs: 40, seasonal: true,  seasonalMult: 4.2 },
      { name: 'Affiliate Marketing',   start: 950,  growth: 7,   cogs: 2,  seasonal: false, seasonalMult: 1   },
    ],
    opex: [
      { name: 'Hosting & SaaS',        monthly: 320 },
      { name: 'Paid advertising',      monthly: 750 },
      { name: 'Contractor fees',       monthly: 400 },
      { name: 'Shipping & fulfillment',monthly: 280 },
      { name: 'Accounting',            monthly: 175 },
      { name: 'Utilities & misc',      monthly: 140 },
    ],
    ownerDraw: 3500,
    taxReservePct: 28,
  }
}

function compute(model: Model, scenario: ScenarioKey, horizon: number): Computed {
  const sc = SCENARIOS[scenario]
  const parts = model.meta.startMonth.split('-').map(Number)
  const syear  = (parts[0] && !isNaN(parts[0])) ? parts[0] : new Date().getFullYear()
  const smonth = (parts[1] && !isNaN(parts[1])) ? parts[1] : 1

  const months: MonthRow[] = []
  let prevEndCash = model.meta.startingCash

  for (let i = 0; i < horizon; i++) {
    const d   = new Date(syear, smonth - 1 + i, 1)
    const cal = d.getMonth() + 1
    const label = `${MONTH_ABBR[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`
    const ym    = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

    const streamRev: number[] = model.streams.map(s => {
      let rev = s.start * sc.startX * Math.pow(1 + (s.growth / 100) * sc.growthX, i)
      if (s.seasonal && SEASONAL_MONTHS.includes(cal)) rev *= s.seasonalMult
      return rev
    })
    const streamCogs: number[] = model.streams.map((s, si) => streamRev[si] * (s.cogs / 100))

    const income = streamRev.reduce((a, b) => a + b, 0)
    const cogs   = streamCogs.reduce((a, b) => a + b, 0)
    const gross  = income - cogs

    const opexItems: number[] = model.opex.map(o => o.monthly)
    const opex = opexItems.reduce((a, b) => a + b, 0)

    const noi      = gross - opex
    const tax      = Math.max(0, noi) * (model.taxReservePct / 100)
    const draw     = model.ownerDraw
    const retained = noi - tax - draw

    const beginCash = prevEndCash
    const endCash   = beginCash + retained
    prevEndCash = endCash

    months.push({ label, ym, cal, streamRev, streamCogs, income, cogs, gross, opexItems, opex, noi, tax, draw, retained, beginCash, endCash })
  }

  const sumArr = (arr: number[][]): number[] => {
    if (!arr.length || !arr[0] || !arr[0].length) return []
    return arr[0].map((_, idx) => arr.reduce((s, row) => s + (row[idx] ?? 0), 0))
  }

  const fyIncome   = months.reduce((s, m) => s + m.income, 0)
  const fyCogs     = months.reduce((s, m) => s + m.cogs, 0)
  const fyGross    = months.reduce((s, m) => s + m.gross, 0)
  const fyOpex     = months.reduce((s, m) => s + m.opex, 0)
  const fyNoi      = months.reduce((s, m) => s + m.noi, 0)
  const fyTax      = months.reduce((s, m) => s + m.tax, 0)
  const fyDraw     = months.reduce((s, m) => s + m.draw, 0)
  const fyRetained = months.reduce((s, m) => s + m.retained, 0)

  const fy: FY = {
    income: fyIncome, cogs: fyCogs, gross: fyGross, opex: fyOpex,
    noi: fyNoi, tax: fyTax, draw: fyDraw, retained: fyRetained,
    streamRev:  sumArr(months.map(m => m.streamRev)),
    streamCogs: sumArr(months.map(m => m.streamCogs)),
    opexItems:  sumArr(months.map(m => m.opexItems)),
    grossMargin: fyIncome > 0 ? (fyGross / fyIncome) * 100 : 0,
    opMargin:    fyIncome > 0 ? (fyNoi   / fyIncome) * 100 : 0,
  }

  const lastMonth = months[months.length - 1] ?? months[0]
  const kpis: KPIs = {
    income: fyIncome, gross: fyGross, gm: fy.grossMargin, om: fy.opMargin,
    noi: fyNoi, retained: fyRetained,
    exitRunRate: lastMonth ? lastMonth.income * 12 : 0,
    endCash:     lastMonth ? lastMonth.endCash  : 0,
  }

  const emptyRow: MonthRow = {
    label: '—', ym: '', cal: 1, streamRev: [], streamCogs: [], income: 0, cogs: 0,
    gross: 0, opexItems: [], opex: 0, noi: 0, tax: 0, draw: 0, retained: 0, beginCash: 0, endCash: 0,
  }
  const lowCash = months.length
    ? months.reduce((low, m) => m.endCash < low.endCash ? m : low, months[0])
    : emptyRow

  return { months, fy, kpis, lowCash }
}

const usdFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const fmt$  = (v: number) => usdFmt.format(Math.round(v))
const fmtK  = (v: number) => Math.abs(v) >= 1000 ? '$' + (v / 1000).toFixed(Math.abs(v) >= 100000 ? 0 : 1) + 'K' : fmt$(v)
const fmtP  = (v: number) => v.toFixed(1) + '%'

function LedgerStrip({ months }: { months: MonthRow[] }) {
  const maxAbs = Math.max(...months.map(m => Math.abs(m.retained)), 1)
  const totalRetained = months.reduce((s, m) => s + m.retained, 0)
  return (
    <div className="flex items-end gap-1 bg-slate-900 rounded-xl px-4 pt-3 pb-2 mb-6 overflow-x-auto">
      {months.map(m => {
        const h = Math.max(4, (Math.abs(m.retained) / maxAbs) * 40)
        return (
          <div key={m.ym} className="group relative flex flex-col items-center gap-1 flex-shrink-0">
            <div style={{ height: h, width: 12, background: m.retained >= 0 ? GOLD : '#ef4444', borderRadius: 3 }} />
            <span className="text-[9px] text-slate-500 select-none">{m.label.slice(0, 3)}</span>
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] rounded px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10">
              {m.label}: {fmt$(m.retained)}
            </div>
          </div>
        )
      })}
      <div className="ml-auto flex-shrink-0 text-right pl-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Total Retained</p>
        <p className="font-mono font-bold" style={{ color: GOLD }}>{fmtK(totalRetained)}</p>
      </div>
    </div>
  )
}

function KpiCard({ label, value, sub, positive }: { label: string; value: string; sub?: string; positive?: boolean }) {
  const color = positive === undefined ? GOLD : positive ? '#059669' : '#ef4444'
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="font-mono text-2xl font-bold leading-none" style={{ color }}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

interface TooltipEntry { name: string; value: number | string; color: string }
function FinTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-300 mb-2 font-medium">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="text-white font-mono">{fmt$(Number(p.value))}</span>
        </div>
      ))}
    </div>
  )
}

function DashboardView({ computed, model, scenario }: { computed: Computed; model: Model; scenario: ScenarioKey }) {
  const { kpis, months, fy } = computed

  const barData = months.map(m => {
    const obj: Record<string, number | string> = { month: m.label }
    model.streams.forEach((s, i) => { obj[s.name] = Math.round(m.streamRev[i] ?? 0) })
    return obj
  })

  const pieData = model.streams.map((s, i) => ({ name: s.name, value: Math.round(fy.streamRev[i] ?? 0) }))

  const marginData = months.map(m => ({
    month: m.label,
    'Gross %':     m.income > 0 ? parseFloat((m.gross / m.income * 100).toFixed(1)) : 0,
    'Operating %': m.income > 0 ? parseFloat((m.noi   / m.income * 100).toFixed(1)) : 0,
  }))

  const maxStreamRev = Math.max(...(fy.streamRev.length ? fy.streamRev : [0]))
  const topIdx  = fy.streamRev.indexOf(maxStreamRev)
  const topStream = model.streams[topIdx]
  const topPct  = (topIdx >= 0 && fy.income > 0 && fy.streamRev[topIdx] != null)
    ? (fy.streamRev[topIdx]! / fy.income * 100).toFixed(1) : '0'
  const seasonalStream = model.streams.find(s => s.seasonal)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard label="Total Income"        value={fmtK(kpis.income)} />
        <KpiCard label="Gross Margin"        value={fmtP(kpis.gm)}         positive={kpis.gm >= 60} />
        <KpiCard label="Operating Margin"    value={fmtP(kpis.om)}         positive={kpis.om >= 25} />
        <KpiCard label="Retained Net Income" value={fmtK(kpis.retained)}   positive={kpis.retained > 0} />
        <KpiCard label="Exit Run-Rate"       value={fmtK(kpis.exitRunRate)} />
        <KpiCard label="Ending Cash"         value={fmtK(kpis.endCash)}    positive={kpis.endCash > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm font-semibold text-slate-700 mb-4">Monthly Revenue by Stream</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tickFormatter={v => fmtK(Number(v))} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<FinTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              {model.streams.map((s, i) => (
                <Bar key={s.name} dataKey={s.name} stackId="a" fill={STREAM_COLORS[i % STREAM_COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm font-semibold text-slate-700 mb-4">FY Revenue Mix</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                {pieData.map((_, i) => <Cell key={i} fill={STREAM_COLORS[i % STREAM_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number | string) => fmt$(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {pieData.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] text-slate-600">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STREAM_COLORS[i % STREAM_COLORS.length] }} />
                <span className="truncate flex-1">{p.name}</span>
                <span className="font-mono">{fy.income > 0 ? fmtP(p.value / fy.income * 100) : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <p className="text-sm font-semibold text-slate-700 mb-4">Margin Trends</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={marginData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tickFormatter={v => fmtP(Number(v))} tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip formatter={(v: number | string) => fmtP(Number(v))} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="Gross %"     stroke="#46C08F" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Operating %" stroke={GOLD}    strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 text-sm text-slate-600 leading-relaxed">
        <p className="font-semibold text-slate-800 mb-2">Executive Summary</p>
        <p>
          Under the <span style={{ color: GOLD }} className="font-semibold">{SCENARIOS[scenario].label}</span> scenario,{' '}
          {model.meta.businessName} projects <span className="font-semibold">{fmt$(kpis.income)}</span> in total income
          over the period, delivering a gross margin of{' '}
          <span className="font-semibold">{fmtP(kpis.gm)}</span> and an operating margin of{' '}
          <span className="font-semibold">{fmtP(kpis.om)}</span>.{' '}
          Retained net income totals <span className="font-semibold">{fmt$(kpis.retained)}</span>,
          with an exit run-rate of <span className="font-semibold">{fmt$(kpis.exitRunRate)}</span> annually.{' '}
          {topStream && <><em>{topStream.name}</em> leads at {topPct}% of income. </>}
          {seasonalStream && <><em>{seasonalStream.name}</em> carries a {seasonalStream.seasonalMult}× seasonal multiplier in Q1 months.</>}
        </p>
      </div>
    </div>
  )
}

function AssumptionsView({ model, setModel }: { model: Model; setModel: React.Dispatch<React.SetStateAction<Model>> }) {
  const updateMeta = useCallback((key: keyof ModelMeta, value: string | number) => {
    setModel(m => ({ ...m, meta: { ...m.meta, [key]: value } }))
  }, [setModel])

  const updateStream = useCallback((idx: number, key: keyof Stream, value: string | number | boolean) => {
    setModel(m => ({ ...m, streams: m.streams.map((s, i) => i === idx ? { ...s, [key]: value } : s) }))
  }, [setModel])

  const addStream = useCallback(() => {
    setModel(m => {
      if (m.streams.length >= 8) return m
      return { ...m, streams: [...m.streams, { name: 'New Stream', start: 500, growth: 3, cogs: 10, seasonal: false, seasonalMult: 1 }] }
    })
  }, [setModel])

  const removeStream = useCallback((idx: number) => {
    setModel(m => m.streams.length <= 1 ? m : { ...m, streams: m.streams.filter((_, i) => i !== idx) })
  }, [setModel])

  const updateOpex = useCallback((idx: number, key: keyof OpexItem, value: string | number) => {
    setModel(m => ({ ...m, opex: m.opex.map((o, i) => i === idx ? { ...o, [key]: value } : o) }))
  }, [setModel])

  const addOpex = useCallback(() => {
    setModel(m => ({ ...m, opex: [...m.opex, { name: 'New item', monthly: 100 }] }))
  }, [setModel])

  const removeOpex = useCallback((idx: number) => {
    setModel(m => ({ ...m, opex: m.opex.filter((_, i) => i !== idx) }))
  }, [setModel])

  const totalMonthlyOpex = model.opex.reduce((s, o) => s + o.monthly, 0)
  const inp = 'border border-slate-200 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-yellow-400'

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Business Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">Business Name</span>
            <input className={inp} value={model.meta.businessName}
              onChange={e => updateMeta('businessName', e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">Start Month</span>
            <input className={inp} type="month" value={model.meta.startMonth}
              onChange={e => updateMeta('startMonth', e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">Starting Cash ($)</span>
            <input className={inp} type="number" value={model.meta.startingCash}
              onChange={e => updateMeta('startingCash', parseFloat(e.target.value) || 0)} />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Below the Line</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">Owner Draw ($/mo)</span>
            <input className={inp} type="number" value={model.ownerDraw}
              onChange={e => setModel(m => ({ ...m, ownerDraw: parseFloat(e.target.value) || 0 }))} />
          </label>
          <label className="block">
            <span className="text-xs text-slate-500 mb-1 block">Tax Reserve % (0–60)</span>
            <input className={inp} type="number" min={0} max={60} value={model.taxReservePct}
              onChange={e => setModel(m => ({ ...m, taxReservePct: Math.min(60, Math.max(0, parseFloat(e.target.value) || 0)) }))} />
          </label>
        </div>
        <p className="text-xs text-slate-400 mt-3">Tax reserve is set aside from positive NOI monthly.</p>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Revenue Streams</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase tracking-wide">
                <th className="text-left pb-2 w-6" />
                <th className="text-left pb-2 min-w-[140px]">Name</th>
                <th className="text-left pb-2 min-w-[100px]">Start $/mo</th>
                <th className="text-left pb-2 min-w-[90px]">Growth %/mo</th>
                <th className="text-left pb-2 min-w-[80px]">COGS %</th>
                <th className="text-center pb-2 min-w-[70px]">Seasonal</th>
                <th className="text-left pb-2 min-w-[70px]">Mult</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {model.streams.map((s, i) => (
                <tr key={i}>
                  <td className="py-2 pr-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: STREAM_COLORS[i % STREAM_COLORS.length] }} />
                  </td>
                  <td className="py-2 pr-2">
                    <input className={inp} value={s.name} onChange={e => updateStream(i, 'name', e.target.value)} />
                  </td>
                  <td className="py-2 pr-2">
                    <input className={inp} type="number" value={s.start}
                      onChange={e => updateStream(i, 'start', parseFloat(e.target.value) || 0)} />
                  </td>
                  <td className="py-2 pr-2">
                    <input className={inp} type="number" step="0.5" value={s.growth}
                      onChange={e => updateStream(i, 'growth', parseFloat(e.target.value) || 0)} />
                  </td>
                  <td className="py-2 pr-2">
                    <input className={inp} type="number" step="1" value={s.cogs}
                      onChange={e => updateStream(i, 'cogs', parseFloat(e.target.value) || 0)} />
                  </td>
                  <td className="py-2 pr-2 text-center">
                    <input type="checkbox" checked={s.seasonal}
                      onChange={e => updateStream(i, 'seasonal', e.target.checked)}
                      className="accent-yellow-500 w-4 h-4" />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      className={cn(inp, !s.seasonal && 'opacity-40 cursor-not-allowed')}
                      type="number" step="0.5" value={s.seasonalMult}
                      disabled={!s.seasonal}
                      onChange={e => updateStream(i, 'seasonalMult', parseFloat(e.target.value) || 1)}
                    />
                  </td>
                  <td className="py-2">
                    <button onClick={() => removeStream(i)} disabled={model.streams.length <= 1}
                      className="text-slate-300 hover:text-red-400 disabled:opacity-20 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {model.streams.length < 8 && (
          <button onClick={addStream}
            className="mt-4 flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-700 transition-colors">
            <Plus size={14} /> Add stream
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Fixed Operating Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {model.opex.map((o, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-500 mb-1 block">Name</span>
                <input className={inp} value={o.name} onChange={e => updateOpex(i, 'name', e.target.value)} />
              </div>
              <div className="w-24 flex-shrink-0">
                <span className="text-xs text-slate-500 mb-1 block">$/mo</span>
                <input className={inp} type="number" value={o.monthly}
                  onChange={e => updateOpex(i, 'monthly', parseFloat(e.target.value) || 0)} />
              </div>
              <button onClick={() => removeOpex(i)} className="text-slate-300 hover:text-red-400 transition-colors mb-0.5">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addOpex}
          className="mt-4 flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-700 transition-colors">
          <Plus size={14} /> Add expense
        </button>
        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-6 text-sm text-slate-600">
          <span>Monthly total: <strong className="text-slate-800">{fmt$(totalMonthlyOpex)}</strong></span>
          <span>Annual total: <strong className="text-slate-800">{fmt$(totalMonthlyOpex * 12)}</strong></span>
        </div>
      </div>
    </div>
  )
}

function PnLView({ computed, model }: { computed: Computed; model: Model }) {
  const { months, fy } = computed
  const cell   = 'px-3 py-2 text-right font-mono text-xs whitespace-nowrap'
  const sticky = 'sticky left-0 bg-white z-10 border-r border-slate-100 px-3 py-2 text-xs text-slate-600 min-w-[200px]'
  const pctInc = (v: number) => fy.income > 0 ? fmtP(v / fy.income * 100) : '—'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="text-xs" style={{ minWidth: 900 + months.length * 70 }}>
          <thead>
            <tr style={{ background: NAVY, color: 'white' }}>
              <th className="px-3 py-3 text-left sticky left-0 z-20 min-w-[200px]" style={{ background: NAVY }}>Line Item</th>
              {months.map(m => <th key={m.ym} className="px-3 py-3 text-right font-mono whitespace-nowrap">{m.label}</th>)}
              <th className="px-3 py-3 text-right font-mono whitespace-nowrap" style={{ color: GOLD }}>FY Total</th>
              <th className="px-3 py-3 text-right font-mono">% Inc</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-yellow-50">
              <td colSpan={months.length + 3} className={cn(sticky, 'font-bold text-slate-700 uppercase tracking-wide bg-yellow-50')}>INCOME</td>
            </tr>
            {model.streams.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50 border-b border-slate-50">
                <td className={sticky}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STREAM_COLORS[i % STREAM_COLORS.length] }} />
                    {s.name}{s.seasonal ? ' *' : ''}
                  </div>
                </td>
                {months.map(m => (
                  <td key={m.ym} className={cn(cell, (m.streamRev[i] ?? 0) < 0 ? 'text-red-500' : '')}>{fmt$(m.streamRev[i] ?? 0)}</td>
                ))}
                <td className={cn(cell, 'font-semibold')} style={{ color: GOLD }}>{fmt$(fy.streamRev[i] ?? 0)}</td>
                <td className={cell}>{pctInc(fy.streamRev[i] ?? 0)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-yellow-400 font-bold">
              <td className={cn(sticky, 'font-bold text-slate-800')}>Total Income</td>
              {months.map(m => <td key={m.ym} className={cn(cell, 'font-bold')}>{fmt$(m.income)}</td>)}
              <td className={cn(cell, 'font-bold')} style={{ color: GOLD }}>{fmt$(fy.income)}</td>
              <td className={cell}>100%</td>
            </tr>

            <tr className="bg-red-50">
              <td colSpan={months.length + 3} className={cn(sticky, 'font-bold text-red-700 uppercase tracking-wide bg-red-50')}>COGS</td>
            </tr>
            {model.streams.filter(s => s.cogs > 0).map(s => {
              const i = model.streams.indexOf(s)
              return (
                <tr key={i} className="hover:bg-slate-50 border-b border-slate-50">
                  <td className={sticky}>COGS — {s.name} ({s.cogs}%)</td>
                  {months.map(m => <td key={m.ym} className={cn(cell, 'text-red-500')}>({fmt$(m.streamCogs[i] ?? 0)})</td>)}
                  <td className={cn(cell, 'text-red-500')}>({fmt$(fy.streamCogs[i] ?? 0)})</td>
                  <td className={cell}>{pctInc(fy.streamCogs[i] ?? 0)}</td>
                </tr>
              )
            })}
            <tr className="border-t-2 border-green-400 font-bold">
              <td className={cn(sticky, 'font-bold text-slate-800')}>Gross Profit</td>
              {months.map(m => <td key={m.ym} className={cn(cell, 'font-bold text-emerald-600')}>{fmt$(m.gross)}</td>)}
              <td className={cn(cell, 'font-bold text-emerald-600')}>{fmt$(fy.gross)}</td>
              <td className={cell}>{pctInc(fy.gross)}</td>
            </tr>
            <tr>
              <td className={cn(sticky, 'text-slate-400 italic')}>Gross Margin %</td>
              {months.map(m => (
                <td key={m.ym} className={cn(cell, 'text-slate-400')}>
                  {m.income > 0 ? fmtP(m.gross / m.income * 100) : '—'}
                </td>
              ))}
              <td className={cn(cell, 'text-slate-400')}>{fmtP(fy.grossMargin)}</td>
              <td className={cell}>—</td>
            </tr>

            <tr className="bg-blue-50">
              <td colSpan={months.length + 3} className={cn(sticky, 'font-bold text-blue-700 uppercase tracking-wide bg-blue-50')}>OPERATING EXPENSES</td>
            </tr>
            {model.opex.map((o, i) => (
              <tr key={i} className="hover:bg-slate-50 border-b border-slate-50">
                <td className={sticky}>{o.name}</td>
                {months.map(m => <td key={m.ym} className={cn(cell, 'text-slate-600')}>({fmt$(m.opexItems[i] ?? 0)})</td>)}
                <td className={cn(cell, 'text-slate-600')}>({fmt$(fy.opexItems[i] ?? 0)})</td>
                <td className={cell}>{pctInc(fy.opexItems[i] ?? 0)}</td>
              </tr>
            ))}
            <tr className="border-t border-slate-200 font-bold">
              <td className={cn(sticky, 'font-bold text-slate-800')}>Total Opex</td>
              {months.map(m => <td key={m.ym} className={cn(cell, 'font-bold')}>{fmt$(m.opex)}</td>)}
              <td className={cn(cell, 'font-bold')}>{fmt$(fy.opex)}</td>
              <td className={cell}>{pctInc(fy.opex)}</td>
            </tr>

            <tr style={{ background: NAVY, color: 'white' }}>
              <td className="px-3 py-2 text-xs font-bold sticky left-0 z-10 min-w-[200px]" style={{ background: NAVY, color: GOLD }}>
                Net Operating Income
              </td>
              {months.map(m => (
                <td key={m.ym} className={cn(cell, 'font-bold', m.noi < 0 ? 'text-red-400' : '')}
                  style={{ color: m.noi >= 0 ? GOLD : undefined }}>
                  {fmt$(m.noi)}
                </td>
              ))}
              <td className={cn(cell, 'font-bold')} style={{ color: GOLD }}>{fmt$(fy.noi)}</td>
              <td className={cell} style={{ color: '#94a3b8' }}>{fmtP(fy.opMargin)}</td>
            </tr>
            <tr className="text-slate-400">
              <td className={sticky}>Owner Draw</td>
              {months.map(m => <td key={m.ym} className={cell}>({fmt$(m.draw)})</td>)}
              <td className={cell}>({fmt$(fy.draw)})</td>
              <td className={cell}>{pctInc(fy.draw)}</td>
            </tr>
            <tr className="text-slate-400">
              <td className={sticky}>Tax Reserve ({model.taxReservePct}%)</td>
              {months.map(m => (
                <td key={m.ym} className={cn(cell, m.tax > 0 ? 'text-red-400' : '')}>({fmt$(m.tax)})</td>
              ))}
              <td className={cn(cell, 'text-red-400')}>({fmt$(fy.tax)})</td>
              <td className={cell}>{pctInc(fy.tax)}</td>
            </tr>
            <tr style={{ background: '#fffbeb' }}>
              <td className="px-3 py-2 text-xs font-black sticky left-0 z-10 min-w-[200px]"
                style={{ background: '#fffbeb', color: GOLD }}>
                Retained Net Income
              </td>
              {months.map(m => (
                <td key={m.ym} className={cn(cell, 'font-black', m.retained < 0 ? 'text-red-500' : '')}
                  style={{ color: m.retained >= 0 ? GOLD : undefined }}>
                  {fmt$(m.retained)}
                </td>
              ))}
              <td className={cn(cell, 'font-black')} style={{ color: fy.retained >= 0 ? GOLD : '#ef4444' }}>
                {fmt$(fy.retained)}
              </td>
              <td className={cell}>{pctInc(fy.retained)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CashView({ computed }: { computed: Computed }) {
  const { months, lowCash } = computed
  const negativeCashMonths = months.filter(m => m.endCash < 0).length
  const areaData = months.map(m => ({ month: m.label, Cash: Math.round(m.endCash) }))

  const cashRows = [
    { label: 'Beginning Cash', fn: (m: MonthRow) => m.beginCash },
    { label: '+ Income',       fn: (m: MonthRow) => m.income },
    { label: '− COGS',         fn: (m: MonthRow) => -m.cogs },
    { label: '− Opex',         fn: (m: MonthRow) => -m.opex },
    { label: '− Owner Draw',   fn: (m: MonthRow) => -m.draw },
    { label: '− Tax Reserve',  fn: (m: MonthRow) => -m.tax },
  ] as const

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <p className="text-sm font-semibold text-slate-700 mb-4">Cash Balance Over Time</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={areaData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={GOLD} stopOpacity={0.3} />
                <stop offset="95%" stopColor={GOLD} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tickFormatter={v => fmtK(Number(v))} tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip formatter={(v: number | string) => fmt$(Number(v))} />
            <Area type="monotone" dataKey="Cash" stroke={GOLD} strokeWidth={2} fill="url(#goldGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Info size={14} className="text-slate-400" /> Liquidity Snapshot
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-400 mb-1">Lowest Cash Point</p>
            <p className={cn('text-xl font-mono font-bold', lowCash.endCash < 0 ? 'text-red-500' : 'text-emerald-600')}>
              {fmt$(lowCash.endCash)}
              <span className="text-xs text-slate-400 font-normal ml-2">({lowCash.label})</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Cash-Negative Months</p>
            <p className={cn('text-xl font-mono font-bold', negativeCashMonths > 0 ? 'text-red-500' : 'text-emerald-600')}>
              {negativeCashMonths}
              {negativeCashMonths > 0 && (
                <span className="text-xs font-normal text-red-400 ml-2">— Consider tightening draws or securing credit</span>
              )}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">Cash view reflects operating cash only — excludes financing inflows or capital raises.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ minWidth: 700 + months.length * 70 }}>
            <thead>
              <tr style={{ background: NAVY, color: 'white' }}>
                <th className="px-3 py-3 text-left sticky left-0 z-10 min-w-[160px]" style={{ background: NAVY }}>Line Item</th>
                {months.map(m => <th key={m.ym} className="px-3 py-3 text-right font-mono whitespace-nowrap">{m.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {cashRows.map(row => (
                <tr key={row.label} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="sticky left-0 bg-white z-10 border-r border-slate-100 px-3 py-2 text-slate-500 min-w-[160px]">
                    {row.label}
                  </td>
                  {months.map(m => {
                    const v = row.fn(m)
                    return (
                      <td key={m.ym} className={cn('px-3 py-2 text-right font-mono whitespace-nowrap', v < 0 ? 'text-red-500' : 'text-slate-700')}>
                        {fmt$(v)}
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr className="border-t border-slate-200 font-bold bg-slate-50">
                <td className="sticky left-0 bg-slate-50 z-10 border-r border-slate-100 px-3 py-2 text-slate-800 min-w-[160px]">Net Change</td>
                {months.map(m => (
                  <td key={m.ym} className={cn('px-3 py-2 text-right font-mono font-bold whitespace-nowrap', m.retained < 0 ? 'text-red-500' : 'text-slate-800')}>
                    {fmt$(m.retained)}
                  </td>
                ))}
              </tr>
              <tr className="font-bold" style={{ background: NAVY, color: 'white' }}>
                <td className="sticky left-0 z-10 px-3 py-2 min-w-[160px]" style={{ background: NAVY, color: GOLD }}>Ending Cash</td>
                {months.map(m => (
                  <td key={m.ym} className={cn('px-3 py-2 text-right font-mono font-bold whitespace-nowrap', m.endCash < 0 ? 'text-red-400' : '')}
                    style={{ color: m.endCash >= 0 ? GOLD : undefined }}>
                    {fmt$(m.endCash)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function DataAIView({ model, setModel, computed, scenario }: {
  model: Model
  setModel: React.Dispatch<React.SetStateAction<Model>>
  computed: Computed
  scenario: ScenarioKey
}) {
  const { kpis, fy, months, lowCash } = computed
  const [aiText, setAiText]       = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [csvMonths, setCsvMonths] = useState<string[]>([])
  const [csvStream, setCsvStream] = useState(0)
  const [csvAvg, setCsvAvg]       = useState<number | null>(null)
  const jsonInputRef = useRef<HTMLInputElement>(null)
  const csvInputRef  = useRef<HTMLInputElement>(null)

  const maxStreamRev = Math.max(...(fy.streamRev.length ? fy.streamRev : [0]))
  const topIdx = fy.streamRev.indexOf(maxStreamRev)

  const buildFallback = () => {
    const topStream = model.streams[topIdx]
    const topShare  = (topIdx >= 0 && fy.income > 0 && fy.streamRev[topIdx] != null)
      ? fmtP(fy.streamRev[topIdx]! / fy.income * 100) : '—'
    return [
      `${model.meta.businessName} projects ${fmt$(kpis.income)} in total income under the ${SCENARIOS[scenario].label} scenario.`,
      `Gross margin stands at ${fmtP(kpis.gm)} with an operating margin of ${fmtP(kpis.om)}, reflecting the current cost structure.`,
      `Retained net income totals ${fmt$(kpis.retained)}, yielding an annualized exit run-rate of ${fmt$(kpis.exitRunRate)}.`,
      topStream ? `The leading revenue driver is ${topStream.name}, contributing ${topShare} of total income.` : '',
    ].filter(Boolean).join('\n')
  }

  const handleAnalyze = async () => {
    setAiLoading(true); setAiText(null)
    const payload = {
      businessName:       model.meta.businessName,
      scenario:           SCENARIOS[scenario].label,
      totalIncomeFmt:     fmt$(kpis.income),
      grossMarginPct:     fmtP(kpis.gm),
      operatingMarginPct: fmtP(kpis.om),
      noiFmt:             fmt$(fy.noi),
      drawsFmt:           fmt$(fy.draw),
      taxReserveFmt:      fmt$(fy.tax),
      retainedFmt:        fmt$(kpis.retained),
      exitRunRateFmt:     fmt$(kpis.exitRunRate),
      lowestCashMonth:    lowCash.label,
      lowestCashFmt:      fmt$(lowCash.endCash),
      topStreamName:      model.streams[topIdx]?.name ?? '—',
      topStreamSharePct:  (topIdx >= 0 && fy.income > 0 && fy.streamRev[topIdx] != null)
        ? fmtP(fy.streamRev[topIdx]! / fy.income * 100) : '—',
    }
    try {
      const res  = await fetch('/api/ai-summary', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('API error')
      const data = await res.json() as { summary?: string }
      setAiText(data.summary ?? buildFallback())
    } catch { setAiText(buildFallback()) }
    finally  { setAiLoading(false) }
  }

  const triggerDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const handlePnlCsv = () => {
    const header = ['Line Item', ...months.map(m => m.label), 'FY Total']
    const rows: string[][] = [header]
    model.streams.forEach((s, i) => {
      rows.push([s.name, ...months.map(m => String(Math.round(m.streamRev[i] ?? 0))), String(Math.round(fy.streamRev[i] ?? 0))])
    })
    rows.push(['Total Income', ...months.map(m => String(Math.round(m.income))), String(Math.round(fy.income))])
    rows.push(['Gross Profit', ...months.map(m => String(Math.round(m.gross))),  String(Math.round(fy.gross))])
    rows.push(['Total Opex',   ...months.map(m => String(Math.round(m.opex))),   String(Math.round(fy.opex))])
    rows.push(['NOI',          ...months.map(m => String(Math.round(m.noi))),    String(Math.round(fy.noi))])
    rows.push(['Owner Draw',   ...months.map(m => String(Math.round(m.draw))),   String(Math.round(fy.draw))])
    rows.push(['Tax Reserve',  ...months.map(m => String(Math.round(m.tax))),    String(Math.round(fy.tax))])
    rows.push(['Retained',     ...months.map(m => String(Math.round(m.retained))), String(Math.round(fy.retained))])
    triggerDownload(rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n'), 'pnl.csv', 'text/csv')
  }

  const handleModelJson = () => triggerDownload(JSON.stringify(model, null, 2), 'model.json', 'application/json')

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Partial<Model>
        if (!parsed.streams || !Array.isArray(parsed.streams) || !parsed.meta) throw new Error('Invalid')
        setModel(parsed as Model)
      } catch { alert('Invalid model JSON file.') }
    }
    reader.readAsText(file); e.target.value = ''
  }

  const handleImportCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const fd = new FormData(); fd.append('file', file)
    try {
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json() as { months?: string[] }
      setCsvMonths(data.months ?? [])
    } catch { alert('CSV upload failed. Please try again.') }
    e.target.value = ''
  }

  const handleApplyCsv = () => {
    if (!csvMonths.length) return
    const last3 = csvMonths.slice(-3).map(v => parseFloat(v) || 0)
    const avg   = last3.reduce((s, v) => s + v, 0) / (last3.length || 1)
    setCsvAvg(avg)
    setModel(m => ({ ...m, streams: m.streams.map((s, i) => i === csvStream ? { ...s, start: Math.round(avg) } : s) }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles size={16} style={{ color: GOLD }} /> AI CFO Analysis
        </h3>
        <Button onClick={handleAnalyze} disabled={aiLoading} className="mb-4">
          {aiLoading ? 'Analyzing…' : 'Analyze this model'}
        </Button>
        {aiText && (
          <div className="bg-slate-50 rounded-xl p-4 text-xs font-mono whitespace-pre-wrap text-slate-700 leading-relaxed">{aiText}</div>
        )}
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Download size={16} className="text-slate-500" /> Export
        </h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="outline" onClick={handlePnlCsv}>P&amp;L CSV</Button>
          <Button variant="outline" onClick={handleModelJson}>Model JSON</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <UploadCloud size={16} className="text-slate-500" /> Import Model
        </h3>
        <p className="text-xs text-slate-400 mb-3">Load a previously exported model.json to restore all assumptions.</p>
        <input ref={jsonInputRef} type="file" accept=".json" className="hidden" onChange={handleImportJson} />
        <Button variant="outline" onClick={() => jsonInputRef.current?.click()}>Choose .json file</Button>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <UploadCloud size={16} className="text-slate-500" /> Import Revenue CSV
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          Upload a CSV of monthly revenue. The average of the last 3 months will be applied as the starting revenue for the chosen stream.
        </p>
        <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={handleImportCsv} />
        <Button variant="outline" onClick={() => csvInputRef.current?.click()} className="mb-4">Choose .csv file</Button>
        {csvMonths.length > 0 && (
          <div className="mt-3 space-y-3">
            <p className="text-xs text-slate-500">{csvMonths.length} months loaded.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-xs text-slate-600">Apply to stream:</label>
              <select className="border border-slate-200 rounded-lg px-2 py-1 text-sm" value={csvStream}
                onChange={e => setCsvStream(parseInt(e.target.value))}>
                {model.streams.map((s, i) => <option key={i} value={i}>{s.name}</option>)}
              </select>
              <Button size="sm" onClick={handleApplyCsv}>Apply avg of last 3 months as start $/mo</Button>
            </div>
            {csvAvg !== null && (
              <p className="text-xs text-emerald-600">Applied: {fmt$(csvAvg)} / mo to {model.streams[csvStream]?.name ?? '—'}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const TABS = [
  { key: 'dashboard'   as const, label: 'Dashboard',     icon: <LayoutDashboard size={14} /> },
  { key: 'assumptions' as const, label: 'Assumptions',   icon: <SlidersHorizontal size={14} /> },
  { key: 'pnl'         as const, label: 'P&L Statement', icon: <FileText size={14} /> },
  { key: 'cash'        as const, label: 'Cash Flow',     icon: <Waves size={14} /> },
  { key: 'ai'          as const, label: 'Data & AI',     icon: <Database size={14} /> },
]

const FinancialModel = () => {
  const [, setLocation] = useLocation()
  const [model, setModel]       = useState<Model>(defaultModel)
  const [scenario, setScenario] = useState<ScenarioKey>('base')
  const [horizon, setHorizon]   = useState<number>(12)
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')
  const computed = useMemo(() => compute(model, scenario, horizon), [model, scenario, horizon])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <header
        className="text-white pt-32 pb-12 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d1f38 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(212,175,55,.15) 0 1px, transparent 0 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="container mx-auto px-4 max-w-[1400px] relative">
          <button
            onClick={() => setLocation('/resources')}
            className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Resources
          </button>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: GOLD }}>
                THE FINANCIAL DASHBOARD
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">The Financial Dashboard</h1>
              <p className="text-slate-400 max-w-xl text-sm">
                Assumptions-driven projections — change one input, every number recalculates.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Scenario</p>
                <div className="flex gap-1">
                  {(Object.keys(SCENARIOS) as ScenarioKey[]).map(k => (
                    <button key={k} onClick={() => setScenario(k)}
                      className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                        scenario === k ? 'text-slate-900' : 'text-slate-400 hover:text-white')}
                      style={scenario === k ? { background: GOLD } : { background: 'transparent', border: '1px solid #334155' }}>
                      {SCENARIOS[k].label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Horizon</p>
                <div className="flex gap-1">
                  {[12, 24].map(h => (
                    <button key={h} onClick={() => setHorizon(h)}
                      className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                        horizon === h ? 'text-slate-900' : 'text-slate-400 hover:text-white')}
                      style={horizon === h ? { background: GOLD } : { background: 'transparent', border: '1px solid #334155' }}>
                      {h}mo
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-30 overflow-x-auto" style={{ background: NAVY }}>
        <div className="container mx-auto px-4 max-w-[1400px] flex">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={cn('flex items-center gap-2 px-4 py-4 text-xs font-medium whitespace-nowrap transition-colors border-b-2',
                activeTab === t.key ? '' : 'border-transparent text-slate-400 hover:text-white')}
              style={activeTab === t.key ? { borderBottomColor: GOLD, color: GOLD } : {}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        <LedgerStrip months={computed.months} />
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
            {activeTab === 'dashboard'   && <DashboardView computed={computed} model={model} scenario={scenario} />}
            {activeTab === 'assumptions' && <AssumptionsView model={model} setModel={setModel} />}
            {activeTab === 'pnl'         && <PnLView computed={computed} model={model} />}
            {activeTab === 'cash'        && <CashView computed={computed} />}
            {activeTab === 'ai'          && <DataAIView model={model} setModel={setModel} computed={computed} scenario={scenario} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default FinancialModel
