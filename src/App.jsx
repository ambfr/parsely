import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LoginPage from './components/Auth/LoginPage'
import CodeInput from './components/CodeInput'
import ModeSelector from './components/ModeSelector'
import OutputPanel from './components/OutputPanel'
import { explainCode } from './api/gemini'
import { saveExplanation } from './hooks/useHistory'
import HistoryPanel from './components/HistoryPanel'

function App() {
  const [user, setUser] = useState(null)
  const [guest, setGuest] = useState(false)
  const [code, setCode] = useState('')
  const [selectedMode, setSelectedMode] = useState(null)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
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

  const handleGenerate = async () => {
    setLoading(true)
    setOutput('')
    try {
      const result = await explainCode(code, selectedMode)
      setOutput(result)
      if (user) {
        await saveExplanation({
          userId: user.id,
          code,
          mode: selectedMode,
          output: result,
        })
      }
    } catch (error) {
      setOutput('// ERROR: Something went wrong. Try again.')
    }
    setLoading(false)
  }

  if (!user && !guest) {
    return (
      <LoginPage
        onGoogleSignIn={handleGoogleSignIn}
        onGuestLogin={() => setGuest(true)}
      />
    )
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

      {/* Navbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '2px solid #1a1a1a',
      }}>
        <p style={{ fontFamily: "'Press Start 2P'", fontSize: '14px', color: '#00ff9f', margin: 0 }}>
          🌿 PARSELY
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'Courier New', fontSize: '12px', color: '#888888' }}>
            {user ? user.email : '[ guest mode ]'}
          </span>
          {user && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                backgroundColor: 'transparent',
                color: '#00ff9f',
                border: '2px solid #00ff9f',
                fontFamily: "'Press Start 2P'",
                fontSize: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #007a4d',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              HISTORY
            </button>
          )}
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
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {user ? 'SIGN OUT' : 'EXIT'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <CodeInput code={code} onChange={setCode} />
        <ModeSelector selectedMode={selectedMode} onSelect={setSelectedMode} />

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!code || !selectedMode}
          style={{
            backgroundColor: code && selectedMode ? '#00ff9f' : '#1a1a1a',
            color: code && selectedMode ? '#0a0a0a' : '#555555',
            fontFamily: "'Press Start 2P'",
            fontSize: '12px',
            padding: '16px 32px',
            border: 'none',
            cursor: code && selectedMode ? 'pointer' : 'not-allowed',
            boxShadow: code && selectedMode ? '4px 4px 0px #007a4d' : 'none',
            width: '100%',
            marginBottom: '24px',
            transition: 'all 0.1s',
          }}
          onMouseEnter={e => {
            if (code && selectedMode) e.currentTarget.style.transform = 'translateY(2px)'
          }}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          GENERATE ▶
        </button>

        <OutputPanel output={output} loading={loading} mode={selectedMode} code={code} />
      </div>

      {/* History Panel */}
      {showHistory && user && (
        <HistoryPanel
          userId={user.id}
          onClose={() => setShowHistory(false)}
        />
      )}

    </div>
  )
}

export default App