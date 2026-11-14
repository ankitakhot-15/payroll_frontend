import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import Topbar from '../components/navigation/Topbar'
export default function AppLayout() {
  return <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
    <Sidebar />
    <div className="lg:pl-64"><Topbar /><main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8"><Outlet /></main></div>
  </div>
}
