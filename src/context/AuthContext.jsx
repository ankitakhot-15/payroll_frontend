import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { authService } from '../services/auth.service'
import { toast } from 'sonner'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const refreshProfile = async () => {
    try { const data = await authService.profile(); setProfile(data.user || data); return data }
    catch { setProfile(null); return null }
  }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      setFirebaseUser(user)
      if (user) await refreshProfile()
      else setProfile(null)
      setLoading(false)
    })
    const expired = () => { toast.error('Session expired. Please sign in again.'); authService.logout() }
    window.addEventListener('auth:expired', expired)
    return () => { unsub(); window.removeEventListener('auth:expired', expired) }
  }, [])
  const value = useMemo(() => ({
    user: firebaseUser,
    firebaseUser,
    profile,
    loading,
    refreshProfile,
    login: async (email, password) => {
      const data = await authService.login(email, password)
      setProfile(data.user || data)
      return data
    },
    logout: async () => {
      await authService.logout()
      setProfile(null)
    }
  }), [firebaseUser, profile, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
