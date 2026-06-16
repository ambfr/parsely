import { useState, useEffect } from 'react'
import { fetchHistory, deleteExplanation } from '../hooks/useHistory'

const MODE_EMOJIS = {
  cinematic: '🎬',
  cooking: '🍳',
  roast: '🔥',
  grandma: '👴',
  medieval: '⚔️',
  horoscope: '🔮',
}

function HistoryPanel({ userId, onClose }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    fetchHistory(userId).then(data => {
      setHistory(data)
      setLoading(false)
    })
  }, [userId])

  const handleDelete = async (id) => {
    await deleteExplanation(id)
    setHistory(history.filter(item => item.id !== id))
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: '#0f0f0f',
      borderLeft: '2px solid #00ff9f',
      overflowY: 'auto',
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <p style={{ fontFamily: "'Press Start 2P'", fontSize: '10px', color: '#00ff9f', margin: 0 }}>
          // HISTORY
        </p>
        <button
          onClick={onClose}
          style={{
            backgroundColor: 'transparent',
            color: '#ff4444',
            border: '2px solid #ff4444',
            fontFamily: "'Press Start 2P'",
            fontSize: '8px',
            padding: '6px 10px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #880000',
          }}
        >
          CLOSE
        </button>
      </div>

      {/* Divider */}
      <p style={{ color: '#555555', fontFamily: 'Courier New', marginBottom: '20px' }}>
        =-=-=-=-=-=-=-=-=-=-=-=-=
      </p>

      {/* Content */}
      {loading ? (
        <p style={{ fontFamily: "'Press Start 2P'", fontSize: '8px', color: '#555555' }}>
          LOADING...
        </p>
      ) : history.length === 0 ? (
        <p style={{ fontFamily: 'Courier New', fontSize: '13px', color: '#555555' }}>
          // no history yet. generate something!
        </p>
      ) : (
        history.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#111111',
              border: '2px solid #222222',
              padding: '14px',
              marginBottom: '12px',
              boxShadow: '3px 3px 0px #1a1a1a',
            }}
          >

            {/* Card header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px',
            }}>
              <div>
                <span style={{ fontSize: '18px' }}>{MODE_EMOJIS[item.mode]}</span>
                <span style={{
                  fontFamily: "'Press Start 2P'",
                  fontSize: '8px',
                  color: '#00ff9f',
                  marginLeft: '8px',
                }}>
                  {item.mode.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ff4444',
                  border: 'none',
                  fontFamily: 'Courier New',
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: '2px 6px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Timestamp */}
            <p style={{
              fontFamily: 'Courier New',
              fontSize: '11px',
              color: '#555555',
              margin: '0 0 8px 0',
            }}>
              {formatDate(item.created_at)}
            </p>

            {/* Code preview */}
            <p style={{
              fontFamily: 'Courier New',
              fontSize: '11px',
              color: '#888888',
              margin: '0 0 10px 0',
              backgroundColor: '#0a0a0a',
              padding: '8px',
              borderLeft: '2px solid #333333',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {item.code.slice(0, 80)}...
            </p>

            {/* Expand/collapse button */}
            <button
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              style={{
                backgroundColor: 'transparent',
                color: '#888888',
                border: '2px solid #333333',
                fontFamily: "'Press Start 2P'",
                fontSize: '7px',
                padding: '6px 10px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: expanded === item.id ? '10px' : '0',
              }}
            >
              {expanded === item.id ? 'HIDE ▲' : 'VIEW OUTPUT ▼'}
            </button>

            {/* Expanded content */}
            {expanded === item.id && (
              <div style={{ borderTop: '1px solid #222222', paddingTop: '10px' }}>
                <p style={{
                  fontFamily: "'Press Start 2P'",
                  fontSize: '7px',
                  color: '#555555',
                  margin: '0 0 6px 0',
                }}>
                  // CODE
                </p>
                <pre style={{
                  fontFamily: 'Courier New',
                  fontSize: '11px',
                  color: '#888888',
                  backgroundColor: '#0a0a0a',
                  padding: '10px',
                  borderLeft: '2px solid #333333',
                  margin: '0 0 12px 0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}>
                  {item.code}
                </pre>
                <p style={{
                  fontFamily: "'Press Start 2P'",
                  fontSize: '7px',
                  color: '#555555',
                  margin: '0 0 6px 0',
                }}>
                  // OUTPUT
                </p>
                <p style={{
                  fontFamily: 'Courier New',
                  fontSize: '12px',
                  color: '#cccccc',
                  lineHeight: '1.7',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}>
                  {item.output}
                </p>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  )
}

export default HistoryPanel