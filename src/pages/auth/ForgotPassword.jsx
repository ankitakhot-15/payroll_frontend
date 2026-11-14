import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { toast } from 'sonner'
export default function ForgotPassword(){
 const [email,setEmail]=useState(''),[busy,setBusy]=useState(false)
 const submit=async e=>{e.preventDefault();setBusy(true);try{await authService.forgotPassword(email);toast.success('If the account exists, a reset email has been sent.')}catch(err){toast.error(err.message)}finally{setBusy(false)}}
 return <div className="grid min-h-screen place-items-center bg-slate-50 p-5"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft"><h1 className="text-2xl font-bold">Reset your password</h1><p className="my-3 text-sm text-slate-500">Enter your account email and Firebase will send a reset link.</p><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="auth-input"/><button className="primary-btn mt-4 w-full" disabled={busy}>{busy?'Sending…':'Send reset link'}</button><Link to="/login" className="mt-5 block text-center text-sm font-semibold text-brand-600">Back to sign in</Link></form></div>
}
