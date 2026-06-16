function LoginPage({ onGoogleSignIn, onGuestLogin }) {
    return (
      <div style={{
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
  
        {/* App name */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '36px', lineHeight: 1 }}>🌿</span>
            <p style={{
              fontFamily: "'Press Start 2P'",
              fontSize: '36px',
              color: '#00ff9f',
              margin: 0,
              lineHeight: 1,
            }}>
              PARSELY
            </p>
          </div>
          <p style={{
            fontFamily: "'Press Start 2P'",
            fontSize: '10px',
            color: '#888888',
            margin: 0,
          }}>
            your code. every personality.
          </p>
        </div>
  
        {/* Divider */}
        <p style={{
          color: '#333333',
          letterSpacing: '4px',
          marginBottom: '32px',
          fontFamily: 'Courier New',
          fontSize: '14px',
        }}>
          =-=-=-=-=-=-=-=-=-=-=-=-=
        </p>
  
        {/* Steps */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          {['> paste your code', '> pick a personality', '> watch it transform'].map((line) => (
            <p key={line} style={{
              fontFamily: 'Courier New',
              color: '#555555',
              fontSize: '14px',
              margin: '8px 0',
            }}>
              {line}
            </p>
          ))}
        </div>
  
        {/* Google sign in button */}
        <button
          onClick={onGoogleSignIn}
          style={{
            backgroundColor: '#00ff9f',
            color: '#0a0a0a',
            fontFamily: "'Press Start 2P'",
            fontSize: '11px',
            padding: '16px 32px',
            border: 'none',
            borderRadius: '0',
            boxShadow: '4px 4px 0px #007a4d',
            cursor: 'pointer',
            marginBottom: '16px',
            display: 'block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(2px)'
            e.currentTarget.style.boxShadow = '2px 2px 0px #007a4d'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '4px 4px 0px #007a4d'
          }}
        >
          SIGN IN WITH GOOGLE
        </button>
  
        {/* Guest button */}
        <button
          onClick={onGuestLogin}
          style={{
            backgroundColor: 'transparent',
            color: '#555555',
            fontFamily: "'Press Start 2P'",
            fontSize: '9px',
            padding: '12px 32px',
            border: '2px solid #333333',
            borderRadius: '0',
            boxShadow: '4px 4px 0px #222222',
            cursor: 'pointer',
            marginBottom: '60px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(2px)'
            e.currentTarget.style.boxShadow = '2px 2px 0px #222222'
            e.currentTarget.style.color = '#888888'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '4px 4px 0px #222222'
            e.currentTarget.style.color = '#555555'
          }}
        >
          CONTINUE AS GUEST
        </button>
  
        {/* Footer */}
        <p style={{
          fontFamily: "'Press Start 2P'",
          fontSize: '8px',
          color: '#333333',
          position: 'absolute',
          bottom: '20px',
        }}>
          v1.0.0 — built with 🌿
        </p>
  
      </div>
    )
  }
  
  export default LoginPage