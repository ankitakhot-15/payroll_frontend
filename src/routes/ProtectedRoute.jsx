import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function ProtectedRoute({ roles }) {
  const { firebaseUser, profile } = useAuth()
  if (!firebaseUser) return <Navigate to="/login" replace />
  if (profile?.status === 'PENDING') return <Navigate to="/pending-approval" replace />
  if (roles && !roles.includes(profile?.role)) return <Navigate to="/" replace />
  return <Outlet />
}
