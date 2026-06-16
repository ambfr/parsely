const MODES = [
    { id: 'cinematic', emoji: '🎬', name: 'CINEMATIC', desc: 'Your code as a Hollywood epic' },
    { id: 'cooking', emoji: '🍳', name: 'COOKING', desc: 'Your code as a recipe' },
    { id: 'roast', emoji: '🔥', name: 'ROAST ME', desc: 'Brutally honest critique' },
    { id: 'grandma', emoji: '👴', name: 'GRANDMA', desc: 'Zero jargon explanation' },
    { id: 'medieval', emoji: '⚔️', name: 'MEDIEVAL', desc: 'Explained by a peasant' },
    { id: 'horoscope', emoji: '🔮', name: 'HOROSCOPE', desc: 'Your code\'s personality' },
  ]
  
  function ModeSelector({ selectedMode, onSelect }) {
    return (
      <div style={{ marginBottom: '24px' }}>
        <p style={{
          fontFamily: "'Press Start 2P'",
          fontSize: '10px',
          color: '#00ff9f',
          marginBottom: '12px',
        }}>
          // PICK A PERSONALITY
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {MODES.map(mode => (
            <div
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              style={{
                backgroundColor: selectedMode === mode.id ? '#0a1a0a' : '#111111',
                border: selectedMode === mode.id ? '2px solid #00ff9f' : '2px solid #555555',
                boxShadow: selectedMode === mode.id ? '4px 4px 0px #007a4d' : '4px 4px 0px #222222',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.1s',
                textAlign: 'center',
              }}
              onMouseEnter={e => {
                if (selectedMode !== mode.id) {
                  e.currentTarget.style.borderColor = '#00aa6f'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={e => {
                if (selectedMode !== mode.id) {
                  e.currentTarget.style.borderColor = '#555555'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{mode.emoji}</div>
              <p style={{
                fontFamily: "'Press Start 2P'",
                fontSize: '8px',
                color: selectedMode === mode.id ? '#00ff9f' : '#888888',
                margin: '0 0 6px 0',
              }}>
                {mode.name}
              </p>
              <p style={{
                fontFamily: 'Courier New',
                fontSize: '11px',
                color: '#888888',
                margin: 0,
              }}>
                {mode.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default ModeSelector