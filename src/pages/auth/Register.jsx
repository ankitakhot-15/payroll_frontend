import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { toast } from 'sonner'
export default function Register(){
 const [form,setForm]=useState({companyName:'',fullName:'',email:'',password:'',phone:''}),[busy,setBusy]=useState(false),nav=useNavigate()
 const change=e=>setForm({...form,[e.target.name]:e.target.value})
 const submit=async e=>{e.preventDefault();setBusy(true);try{await authService.registerCompany(form);toast.success('Registration submitted. Verify your email.');nav('/pending-approval')}catch(err){toast.error(err.userMessage||err.message)}finally{setBusy(false)}}
 return <div className="grid min-h-screen place-items-center bg-slate-50 p-5"><form onSubmit={submit} className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-soft"><div className="mb-6 text-xl font-bold text-brand-700">✦ PeoplePilot</div><h1 className="text-2xl font-bold">Create your company workspace</h1><p className="mb-6 mt-1 text-sm text-slate-500">Your company may require platform approval before access.</p><div className="grid gap-4 sm:grid-cols-2">{[['companyName','Company name'],['fullName','Your full name'],['email','Work email'],['phone','Phone'],['password','Password']].map(([name,label])=><label key={name} className="text-sm font-medium text-slate-700">{label}<input required name={name} type={name==='password'?'password':name==='email'?'email':'text'} value={form[name]} onChange={change} className="auth-input mt-2"/></label>)}</div><button disabled={busy} className="primary-btn mt-6 w-full">{busy?'Creating…':'Create workspace'}</button><p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-brand-600">Sign in</Link></p></form></div>
}
