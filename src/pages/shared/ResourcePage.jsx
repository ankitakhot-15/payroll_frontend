import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, RefreshCw, Download, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '../../components/common/PageHeader'
import LoadingState from '../../components/common/LoadingState'
import api from '../../services/api'

const config = {
 employees:{endpoint:'/employees',columns:[['employeeId','Employee ID'],['fullName','Name'],['email','Email'],['department','Department'],['designation','Designation'],['status','Status']]},
 attendance:{endpoint:'/attendance',columns:[['employeeName','Employee'],['date','Date'],['checkIn','Check in'],['checkOut','Check out'],['status','Status']]},
 leaves:{endpoint:'/leaves',columns:[['employeeName','Employee'],['leaveType','Leave type'],['fromDate','From'],['toDate','To'],['status','Status']]},
 payroll:{endpoint:'/payroll',columns:[['employeeName','Employee'],['month','Period'],['grossSalary','Gross'],['deductions','Deductions'],['netPayable','Net payable'],['status','Status']]},
 payslips:{endpoint:'/payslips',columns:[['employeeName','Employee'],['month','Period'],['netPayable','Net payable'],['status','Status']]},
 overtime:{endpoint:'/overtime',columns:[['employeeName','Employee'],['date','Date'],['hours','Hours'],['amount','Amount'],['status','Status']]},
 performance:{endpoint:'/performance',columns:[['employeeName','Employee'],['reviewPeriod','Review period'],['rating','Rating'],['status','Status']]},
 recruitment:{endpoint:'/job-openings',columns:[['title','Position'],['department','Department'],['location','Location'],['status','Status']]},
 documents:{endpoint:'/employee-documents',columns:[['employeeName','Employee'],['name','Document'],['type','Type'],['status','Status']]},
 reports:{endpoint:'/reports',columns:[['name','Report'],['description','Description'],['updatedAt','Last updated']]},
 settings:{endpoint:'/company/settings',columns:[['key','Setting'],['value','Value']]},
 companies:{endpoint:'/companies',columns:[['name','Company'],['email','Contact'],['status','Status'],['subscriptionPlan','Plan']]}
}
export default function ResourcePage({module,title}){
 const cfg=config[module], [rows,setRows]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[search,setSearch]=useState(''),[page,setPage]=useState(1),[total,setTotal]=useState(0)
 const load=async()=>{setLoading(true);setError('');try{const {data}=await api.get(cfg.endpoint,{params:{page,limit:10,search:search||undefined}});const list=Array.isArray(data)?data:(data.items||data.data||[]);setRows(list);setTotal(data.total||data.pagination?.total||list.length)}catch(e){setError(e.userMessage||`Unable to load ${title.toLowerCase()}`)}finally{setLoading(false)}}
 useEffect(()=>{load()},[module,page,search])
 const pages=Math.max(1,Math.ceil(total/10))
 const action=module==='employees'||module==='leaves'||module==='overtime'||module==='recruitment'?<button onClick={()=>toast.info('Connect this action to the matching create form endpoint.')} className="primary-btn"><Plus size={16}/> Add new</button>:<button onClick={load} className="secondary-btn"><RefreshCw size={15}/> Refresh</button>
 return <div><PageHeader title={title} subtitle={`Manage and review ${title.toLowerCase()} for your organization.`} action={action}/>
 <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-sm"><Search size={17} className="absolute left-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>{setPage(1);setSearch(e.target.value)}} placeholder={`Search ${title.toLowerCase()}…`} className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"/></div><button onClick={()=>toast.info('Export endpoint can be enabled for this module.')} className="secondary-btn"><Download size={15}/> Export</button></div>
 <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">{error&&<div className="border-b border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}{loading?<div className="p-5"><LoadingState/></div>:<><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr>{cfg.columns.map(([key,label])=><th key={key} className="px-5 py-4 font-semibold">{label}</th>)}<th className="px-5 py-4"> </th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row,i)=><tr key={row.id||row.employeeId||i} className="hover:bg-slate-50/70">{cfg.columns.map(([key])=><td key={key} className="px-5 py-4 text-slate-600">{key==='status'?<Status value={row[key]}/>:format(row[key])}</td>)}<td className="px-5 py-4 text-right"><button onClick={()=>toast.info('Record actions depend on your role and backend permissions.')} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>{!rows.length&&<div className="p-12 text-center"><div className="font-semibold text-slate-700">No records found</div><p className="mt-1 text-sm text-slate-400">Try changing your search or filters.</p></div>}<div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500"><span>Showing {rows.length} of {total} records</span><div className="flex items-center gap-2"><button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="page-btn">Previous</button><span>Page {page} of {pages}</span><button disabled={page>=pages} onClick={()=>setPage(p=>p+1)} className="page-btn">Next</button></div></div></>}</div></div>
}
function format(v){if(v==null||v==='')return '—';if(typeof v==='object')return JSON.stringify(v);return String(v)}
function Status({value}){const v=String(value||'unknown').toLowerCase();const tone=['approved','active','paid','present','processed','selected'].includes(v)?'bg-emerald-50 text-emerald-700':['rejected','inactive','failed','absent'].includes(v)?'bg-rose-50 text-rose-700':'bg-amber-50 text-amber-700';return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{value||'Unknown'}</span>}
