import { useEffect, useState } from 'react'
import { Users, UserCheck, CalendarX, Wallet, Clock3, ArrowUpRight } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import LoadingState from '../../components/common/LoadingState'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard(){
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('')
 const {profile}=useAuth()
 useEffect(()=>{let live=true;api.get('/reports/dashboard').then(r=>{if(live)setData(r.data)}).catch(e=>{if(live)setError(e.userMessage||'Unable to load dashboard data')}).finally(()=>live&&setLoading(false));return()=>{live=false}},[])
 const stats=data?.stats||{}
 const chart=data?.attendanceTrend||[]
 const payroll=data?.payrollTrend||[]
 if(loading)return <><PageHeader title="Dashboard" subtitle="Your workforce at a glance"/><LoadingState/></>
 return <div><PageHeader title={`Good day${profile?.fullName?'':' 👋'}`} subtitle="Here’s what’s happening across your workspace." action={<span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">Live workspace data</span>}/>
 {error&&<div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
 <StatCard label="Total employees" value={stats.totalEmployees} icon={Users} change="Across all departments"/>
 <StatCard label="Present today" value={stats.presentToday} icon={UserCheck} tone="green" change="Attendance records"/>
 <StatCard label="On leave" value={stats.onLeave} icon={CalendarX} tone="amber" change="Approved leave today"/>
 <StatCard label="Monthly payroll" value={stats.monthlyPayroll!=null?new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(stats.monthlyPayroll):'—'} icon={Wallet} tone="violet" change="Current payroll period"/>
 </div>
 <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Attendance overview</h2><p className="mt-1 text-xs text-slate-400">Monthly attendance trend</p></div><ArrowUpRight className="text-slate-400" size={18}/></div><div className="h-72">{chart.length?<ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={.22}/><stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7"/><XAxis dataKey="label" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="present" stroke="#2563eb" strokeWidth={2.5} fill="url(#attendanceFill)"/></AreaChart></ResponsiveContainer>:<EmptyChart/>}</div></section>
 <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><h2 className="font-semibold">Payroll expense</h2><p className="mt-1 text-xs text-slate-400">Monthly net payable</p><div className="mt-5 h-72">{payroll.length?<ResponsiveContainer width="100%" height="100%"><BarChart data={payroll}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7"/><XAxis dataKey="label" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="amount" fill="#2563eb" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer>:<EmptyChart/>}</div></section>
 </div>
 <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="mb-4 flex items-center gap-2"><Clock3 size={18} className="text-brand-600"/><h2 className="font-semibold">Recent activity</h2></div>{data?.recentActivities?.length?<div className="divide-y divide-slate-100">{data.recentActivities.map((item,i)=><div key={item.id||i} className="flex items-center justify-between py-3 text-sm"><div><div className="font-medium">{item.title}</div><div className="mt-1 text-xs text-slate-400">{item.description}</div></div><span className="text-xs text-slate-400">{item.createdAt?new Date(item.createdAt).toLocaleString():''}</span></div>)}</div>:<p className="py-8 text-center text-sm text-slate-400">No recent activity available.</p>}</section>
 </div>
}
function EmptyChart(){return <div className="grid h-full place-items-center text-sm text-slate-400">No chart data available yet.</div>}
