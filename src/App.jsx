import { useMemo, useState } from 'react'
import {
  ChevronDownIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import data from './data/updates.json'

const HEALTH_ORDER = { good: 0, watch: 1, critical: 2 }

const ORG_META = {
  'Business Process Re-Engineering': {
    short: 'BPR',
    color: 'from-emerald-500/40 to-emerald-300/10',
    ring: 'ring-emerald-400/40',
  },
  IT: {
    short: 'IT',
    color: 'from-sky-500/40 to-blue-300/10',
    ring: 'ring-sky-400/40',
  },
  Procurement: {
    short: 'PROC',
    color: 'from-violet-500/40 to-fuchsia-300/10',
    ring: 'ring-violet-400/40',
  },
  Security: {
    short: 'SEC',
    color: 'from-rose-500/40 to-red-300/10',
    ring: 'ring-rose-400/40',
  },
  'Supply Chain': {
    short: 'SC',
    color: 'from-amber-500/40 to-yellow-300/10',
    ring: 'ring-amber-400/40',
  },
  'Test Engineering': {
    short: 'TE',
    color: 'from-indigo-500/40 to-purple-300/10',
    ring: 'ring-indigo-400/40',
  },
}

function healthFromCounts(watchCount) {
  if (watchCount >= 2) return 'critical'
  if (watchCount === 1) return 'watch'
  return 'good'
}

function healthTone(health) {
  if (health === 'critical') {
    return {
      label: 'Critical',
      text: 'text-rose-300',
      chip: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
      icon: ArrowTrendingDownIcon,
    }
  }
  if (health === 'watch') {
    return {
      label: 'Watch',
      text: 'text-amber-300',
      chip: 'bg-amber-500/20 text-amber-100 border-amber-300/40',
      icon: ExclamationTriangleIcon,
    }
  }
  return {
    label: 'Healthy',
    text: 'text-emerald-300',
    chip: 'bg-emerald-500/20 text-emerald-100 border-emerald-300/40',
    icon: ArrowTrendingUpIcon,
  }
}

function buildOrgView() {
  const orgMap = new Map()

  data.organizations.forEach((org) => {
    orgMap.set(org, {
      org,
      launches: [],
      inFlight: [],
      watchList: [],
    })
  })

  data.columns.launches.forEach((item) => orgMap.get(item.org)?.launches.push(item))
  data.columns.inFlight.forEach((item) => orgMap.get(item.org)?.inFlight.push(item))
  data.columns.watchList.forEach((item) => orgMap.get(item.org)?.watchList.push(item))

  return Array.from(orgMap.values())
    .map((orgData) => ({
      ...orgData,
      health: healthFromCounts(orgData.watchList.length),
    }))
    .sort((a, b) => HEALTH_ORDER[a.health] - HEALTH_ORDER[b.health])
}

function ExecutiveKpiStrip({ orgRows }) {
  const totalLaunches = orgRows.reduce((acc, row) => acc + row.launches.length, 0)
  const totalInFlight = orgRows.reduce((acc, row) => acc + row.inFlight.length, 0)
  const totalWatch = orgRows.reduce((acc, row) => acc + row.watchList.length, 0)

  const kpis = [
    { label: 'Launches', value: totalLaunches, tone: 'text-emerald-300' },
    { label: 'In Flight', value: totalInFlight, tone: 'text-sky-300' },
    { label: 'Watch Items', value: totalWatch, tone: 'text-rose-300' },
    { label: 'Functions', value: orgRows.length, tone: 'text-violet-300' },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="glass-card p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-300/80">{kpi.label}</p>
          <p className={`mt-2 text-3xl font-semibold ${kpi.tone}`}>{kpi.value}</p>
        </div>
      ))}
    </section>
  )
}

function HealthBars({ orgRows }) {
  const totals = orgRows.reduce(
    (acc, row) => {
      acc[row.health] += 1
      return acc
    },
    { good: 0, watch: 0, critical: 0 },
  )

  const total = Math.max(orgRows.length, 1)
  const segments = [
    { key: 'good', label: 'Healthy', className: 'bg-emerald-400/80', value: totals.good },
    { key: 'watch', label: 'Watch', className: 'bg-amber-400/80', value: totals.watch },
    { key: 'critical', label: 'Critical', className: 'bg-rose-400/80', value: totals.critical },
  ]

  return (
    <section className="glass-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Function Health Overview</h2>
          <p className="text-sm text-slate-300">Distribution of current organizational status</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheckIcon className="h-4 w-4" />
          Executive risk posture
        </div>
      </div>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-700/60">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={`float-left h-full transition-all duration-500 ${segment.className}`}
            style={{ width: `${(segment.value / total) * 100}%` }}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {segments.map((segment) => (
          <div key={segment.key} className="rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2">
            <p className="text-xs uppercase tracking-wider text-slate-400">{segment.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{segment.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function InitiativeRow({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/35 transition-all duration-300 hover:border-white/30 hover:bg-slate-900/50">
      <button
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white">{item.title}</span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-300 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden px-4 pb-3 text-sm text-slate-300">{item.description}</div>
      </div>
    </div>
  )
}

function FunctionCard({ row }) {
  const meta = ORG_META[row.org]
  const tone = healthTone(row.health)
  const Icon = tone.icon

  const sections = [
    { label: 'Launches', items: row.launches },
    { label: 'In Flight', items: row.inFlight },
    { label: 'Watch List', items: row.watchList },
  ]

  return (
    <article className={`glass-card ring-1 ${meta?.ring || 'ring-white/20'} p-5`}>
      <header className={`rounded-2xl bg-gradient-to-r ${meta?.color || 'from-slate-500/30 to-slate-300/10'} p-4`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-200/90">{meta?.short || 'ORG'}</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{row.org}</h3>
          </div>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${tone.chip}`}>
            <Icon className="h-3.5 w-3.5" />
            {tone.label}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-100">
          <span className="rounded-full bg-white/10 px-2.5 py-1">{row.launches.length} Launches</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1">{row.inFlight.length} In Flight</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1">{row.watchList.length} Watch</span>
        </div>
      </header>

      <div className="mt-4 space-y-4">
        {sections.map((section) => (
          <section key={section.label}>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-300">{section.label}</h4>
            <div className="space-y-2">
              {section.items.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-2 text-sm text-slate-400">No items</p>
              ) : (
                section.items.map((item) => <InitiativeRow key={item.title} item={item} />)
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

export default function App() {
  const [query, setQuery] = useState('')

  const orgRows = useMemo(() => {
    const rows = buildOrgView()
    if (!query.trim()) return rows

    const q = query.toLowerCase()
    return rows
      .map((row) => {
        const filterItems = (items) =>
          items.filter((item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))

        const launches = filterItems(row.launches)
        const inFlight = filterItems(row.inFlight)
        const watchList = filterItems(row.watchList)

        return {
          ...row,
          launches,
          inFlight,
          watchList,
          health: healthFromCounts(watchList.length),
        }
      })
      .filter((row) => row.launches.length || row.inFlight.length || row.watchList.length)
      .sort((a, b) => HEALTH_ORDER[a.health] - HEALTH_ORDER[b.health])
  }, [query])

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="glass-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Business Technology & Operations</p>
              <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Executive Mission Control</h1>
              <p className="mt-2 text-sm text-slate-300">Fortune 100-style status dashboard · May–June 2025</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200">
              <ShieldCheckIcon className="h-4 w-4" />
              Mission Status: Strong Execution
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2">
            <BuildingOffice2Icon className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search initiatives, risks, or functional areas..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 outline-none"
              aria-label="Search initiatives"
            />
          </div>
        </header>

        <ExecutiveKpiStrip orgRows={orgRows} />
        <HealthBars orgRows={orgRows} />

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {orgRows.map((row) => (
            <FunctionCard key={row.org} row={row} />
          ))}
        </section>
      </div>
    </main>
  )
}
