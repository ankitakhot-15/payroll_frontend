import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import PendingApproval from './pages/auth/PendingApproval'
import Dashboard from './pages/dashboard/Dashboard'
import ResourcePage from './pages/shared/ResourcePage'
import NotFound from './pages/NotFound'

export default function App() {
  const { user, loading } = useAuth()
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Loading PeoplePilot…</div>
  return <Routes>
    <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/pending-approval" element={<PendingApproval />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<ResourcePage module="employees" title="Employees" />} />
        <Route path="attendance" element={<ResourcePage module="attendance" title="Attendance" />} />
        <Route path="leave" element={<ResourcePage module="leaves" title="Leave management" />} />
        <Route path="payroll" element={<ResourcePage module="payroll" title="Payroll" />} />
        <Route path="payslips" element={<ResourcePage module="payslips" title="Payslips" />} />
        <Route path="overtime" element={<ResourcePage module="overtime" title="Overtime" />} />
        <Route path="performance" element={<ResourcePage module="performance" title="Performance" />} />
        <Route path="recruitment" element={<ResourcePage module="recruitment" title="Recruitment" />} />
        <Route path="documents" element={<ResourcePage module="documents" title="Documents" />} />
        <Route path="reports" element={<ResourcePage module="reports" title="Reports & analytics" />} />
        <Route path="settings" element={<ResourcePage module="settings" title="Settings" />} />
        <Route path="companies" element={<ResourcePage module="companies" title="Companies" />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
}
