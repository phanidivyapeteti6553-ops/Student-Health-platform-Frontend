import { createContext, useContext, useState, useEffect } from 'react'

/* ── Mock user database ──────────────────────────────────── */
export const MOCK_USERS = [
  {
    id: 'stu-001',
    name: 'Jordan Smith',
    email: 'student@vitality.edu',
    password: 'student123',
    role: 'student',
    avatar: 'JS',
    enrolled: ['prog-003'],          // pre-enrolled in Nutrition
    wellnessScore: 70,
    joinDate: '2024-09-01',
  },
  {
    id: 'adm-001',
    name: 'Dr. Admin Park',
    email: 'admin@vitality.edu',
    password: 'admin123',
    role: 'admin',
    avatar: 'AP',
    joinDate: '2023-01-15',
  },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vh_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [error, setError] = useState('')

  /* Persist to localStorage whenever user changes */
  useEffect(() => {
    if (user) localStorage.setItem('vh_user', JSON.stringify(user))
    else localStorage.removeItem('vh_user')
  }, [user])

  /* ── Login ── */
  const login = (email, password) => {
    setError('')
    const found = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      setError('Invalid email or password. Try student@vitality.edu / student123')
      return false
    }
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    return true
  }

  /* ── Register ── */
  const register = (name, email, password, role) => {
    setError('')
    const exists = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      setError('An account with this email already exists.')
      return false
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      enrolled: [],
      wellnessScore: 50,
      joinDate: new Date().toISOString().split('T')[0],
    }
    MOCK_USERS.push({ ...newUser, password })
    setUser(newUser)
    return true
  }

  /* ── Logout ── */
  const logout = () => setUser(null)

  /* ── Update enrolled programs ── */
  const updateEnrolled = (programId, action) => {
    setUser(prev => {
      const enrolled = prev.enrolled || []
      const updated = action === 'add'
        ? [...new Set([...enrolled, programId])]
        : enrolled.filter(id => id !== programId)
      const updatedUser = { ...prev, enrolled: updated }
      localStorage.setItem('vh_user', JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error, setError, updateEnrolled }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
