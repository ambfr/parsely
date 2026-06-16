import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LoginPage from './components/Auth/LoginPage'

function App() {
  const [user, setUser] = useState(null)
  const [guest, setGuest] = useState(false)

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setGuest(false)
  }

  // Not logged in and not a guest — show login page
  if (!user && !guest) {
    return (
      <LoginPage
        onGoogleSignIn={handleGoogleSignIn}
        onGuestLogin={() => setGuest(true)}
      />
    )
  }

  // Logged in or guest — show main app (placeholder for now)
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      color: '#00ff9f',
      fontFamily: 'Courier New',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: "'Press Start 2P'", fontSize: '16px', margin: 0 }}>🌿 PARSELY</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: '#555555' }}>
            {user ? user.email : 'guest mode'}
          </span>
          <button
            onClick={handleSignOut}
            style={{
              backgroundColor: 'transparent',
              color: '#ff4444',
              border: '2px solid #ff4444',
              fontFamily: "'Press Start 2P'",
              fontSize: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #880000',
            }}
          >
            {user ? 'SIGN OUT' : 'EXIT'}
          </button>
        </div>
      </div>
      <p style={{ color: '#555555', marginTop: '40px' }}>Main app coming soon...</p>
    </div>
  )
}

export default App