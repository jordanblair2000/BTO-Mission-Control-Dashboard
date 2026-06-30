import { useMemo, useState } from 'react'
import {
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import data from './data/updates.json'

const orgColors = {
  'Business Process Re-Engineering': 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  IT: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  Procurement: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
  Security: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
  'Supply Chain': 'bg-amber-500/20 text-amber-200 border-amber-400/40',
  'Test Engineering': 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
}

const sections = [
  { key: 'launches', title: '🚀 Launches', accent: 'from-emerald-600 to-emerald-400', icon: RocketLaunchIcon },
  { key: 'inFlight', title: '✈️ In Flight', accent: 'from-sky-600 to-blue-400', icon: PaperAirplaneIcon },
  { key: 'watchList', title: '🔴 Watch List', accent: 'from-rose-600 to-red-400', icon: ExclamationTriangleIcon },
]

function Header({ dark, toggle }) {
  return (
    <header className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 shadow-executive">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Business Technology & Operations</p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Mission Control</h1>
          <p className="mt-1 text-slate-300">May–June 2025 Organization Update</p>
        </div>
        <button
          onClick={toggle}
          className="rounded-xl border border-slate-600 bg-slate-800/60 p-2 text-slate-200 transition hover:scale-105"
          aria-label="Toggle theme"
        >
          {dark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  )
}

function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {data.kpis.map((kpi) => (
        <div key={kpi.label} className="rounded-2xl bg-white p-4 shadow-executive transition hover:-translate-y-0.5 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</p>
          <p className="mt-2 text-3xl font-bold">{kpi.value}</p>
        </div>
      ))}
    </div>
  )
}

function StatusBanner() {
  return (
    <div className="rounded-2xl border border-emerald-300 bg-emerald-500/20 p-4 text-emerald-100 shadow-executive dark:border-emerald-700">
      <p className="font-semibold text-emerald-700 dark:text-emerald-200">Mission Status:</p>
      <p className="mt-1 text-emerald-800 dark:text-emerald-100">
        Strong execution across Business Technology & Operations with continued momentum in automation, AI adoption, supply resilience, and enterprise modernization.
      </p>
    </div>
  )
}

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search initiatives..."
        className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm shadow-executive outline-none focus:ring-2 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  )
}

function FilterChips({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setActive('All')}
        className={`rounded-full px-3 py-1 text-sm border transition hover:scale-105 ${
          active === 'All' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-transparent'
        }`}
      >
        All
      </button>
      {data.organizations.map((org) => (
        <button
          key={org}
          onClick={() => setActive(org)}
          className={`rounded-full px-3 py-1 text-sm border transition hover:scale-105 ${
            active === org ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-transparent'
          }`}
        >
          {org}
        </button>
      ))}
    </div>
  )
}

function AccordionCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition hover:shadow-executive">
      <button className="flex w-full items-center justify-between gap-3 text-left" onClick={() => setOpen(!open)}>
        <div>
          <p className="font-semibold">{item.title}</p>
          <span className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-xs ${orgColors[item.org]}`}>
            {item.org}
          </span>
        </div>
        <ChevronDownIcon className={`h-5 w-5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-3 animate-fade-in text-sm text-slate-700 dark:text-slate-200">{item.description}</p>}
    </div>
  )
}

function Timeline() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-executive dark:bg-slate-900">
      <h3 className="mb-4 text-xl font-bold">Timeline</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(data.timeline).map(([month, items]) => (
          <div key={month} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <h4 className="font-semibold text-lg">{month}</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="rounded-xl bg-white p-4 text-center text-sm text-slate-500 shadow-executive dark:bg-slate-900 dark:text-slate-400">
      Business Technology & Operations Mission Control • Executive Dashboard
    </footer>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)
  const [search, setSearch] = useState('')
  const [activeOrg, setActiveOrg] = useState('All')

  const filtered = useMemo(() => {
    const match = (item) => {
      const textMatch = item.title.toLowerCase().includes(search.toLowerCase())
      const orgMatch = activeOrg === 'All' || item.org === activeOrg
      return textMatch && orgMatch
    }
    return {
      launches: data.columns.launches.filter(match),
      inFlight: data.columns.inFlight.filter(match),
      watchList: data.columns.watchList.filter(match),
    }
  }, [search, activeOrg])

  return (
    <div className={dark ? 'dark' : ''}>
      <main className="min-h-screen bg-slate-100 p-4 md:p-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header dark={dark} toggle={() => setDark(!dark)} />
          <StatusBanner />
          <KpiCards />
          <SearchBar value={search} onChange={setSearch} />
          <FilterChips active={activeOrg} setActive={setActiveOrg} />

          <section className="grid gap-4 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.key} className={`rounded-2xl bg-gradient-to-b ${section.accent} p-4 text-white shadow-executive`}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>
                  <div className="space-y-3">
                    {filtered[section.key].map((item) => (
                      <AccordionCard key={item.title} item={item} />
                    ))}
                  </div>
                </div>
              )
            })}
          </section>

          <Timeline />
          <Footer />
        </div>
      </main>
    </div>
  )
}
