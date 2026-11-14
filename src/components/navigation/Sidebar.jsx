import { NavLink } from 'react-router-dom'
import { Activity, BarChart3, BriefcaseBusiness, Building2, CalendarDays, CircleDollarSign, FileText, Gauge, Settings, Users, UserRoundCheck, ClipboardList, Clock3 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
const links = [
  ['Overview','/',Gauge],['Employees','/employees',Users],['Attendance','/attendance',CalendarDays],
  ['Leave','/leave',ClipboardList],['Payroll','/payroll',CircleDollarSign],['Payslips','/payslips',FileText],
  ['Overtime','/overtime',Clock3],['Performance','/performance',Activity],['Recruitment','/recruitment',BriefcaseBusiness],
  ['Documents','/documents',FileText],['Reports','/reports',BarChart3],['Companies','/companies',Building2],['Settings','/settings',Settings]
]
export default function Sidebar() {
  const { profile } = useAuth()
  const role = profile?.role || 'USER'
  const visible = links.filter(([label]) => {
    if (role === 'EMPLOYEE') return ['Overview','Attendance','Leave','Payslips','Overtime','Performance','Documents','Settings'].includes(label)
    if (role === 'MANAGER') return !['Companies'].includes(label)
    if (role === 'FINANCE_MANAGER') return ['Overview','Payroll','Payslips','Reports','Settings'].includes(label)
    return true
  })
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:flex">
    <div className="mb-9 flex items-center gap-3 px-2"><div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><UserRoundCheck size={22}/></div><div><div className="font-bold tracking-tight">PeoplePilot</div><div className="text-xs text-slate-400">HR & Payroll Suite</div></div></div>
    <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</div>
    <nav className="flex-1 space-y-1 overflow-y-auto">{visible.map(([label,path,Icon])=><NavLink key={path} to={path} end={path==='/'} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive?'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-blue-300':'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
    <div className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800"><div className="mb-1 font-semibold text-slate-700 dark:text-slate-200">Need help?</div>Contact your workspace administrator.</div>
  </aside>
}
