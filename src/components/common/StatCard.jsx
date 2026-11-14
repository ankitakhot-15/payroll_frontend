export default function StatCard({ label, value, change, icon: Icon, tone='blue' }) {
  const tones = {blue:'bg-blue-50 text-blue-600',green:'bg-emerald-50 text-emerald-600',amber:'bg-amber-50 text-amber-600',violet:'bg-violet-50 text-violet-600'}
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{label}</p><div className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value ?? '—'}</div></div>{Icon&&<div className={`rounded-xl p-3 ${tones[tone]}`}><Icon size={20}/></div>}</div>{change&&<p className="mt-3 text-xs text-slate-400">{change}</p>}</div>
}
