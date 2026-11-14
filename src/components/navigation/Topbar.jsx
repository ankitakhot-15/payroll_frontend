import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/uiSlice'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Topbar() {
  const dispatch = useDispatch(), dark = useSelector(s=>s.ui.dark)
  const { profile, logout } = useAuth(), navigate = useNavigate()
  const toggle = () => { document.documentElement.classList.toggle('dark'); dispatch(toggleTheme()) }
  return <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-7">
    <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={20}/></button><div className="relative hidden sm:block"><Search className="absolute left-3 top-2.5 text-slate-400" size={17}/><input className="w-64 rounded-xl border-0 bg-slate-100 py-2 pl-9 pr-3 text-sm outline-none ring-brand-500 focus:ring-2 dark:bg-slate-800" placeholder="Search workspace…" /></div></div>
    <div className="flex items-center gap-3"><button onClick={toggle} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle theme">{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications"><Bell size={19}/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"/></button><div className="hidden h-8 w-px bg-slate-200 sm:block"/><div className="text-right"><div className="text-sm font-semibold">{profile?.fullName || profile?.name || 'Workspace user'}</div><div className="text-xs text-slate-400">{profile?.role || 'User'}</div></div><button onClick={async()=>{await logout();navigate('/login')}} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300">Sign out</button></div>
  </header>
}
