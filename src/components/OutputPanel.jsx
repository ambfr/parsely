import { useState } from 'react'

function OutputPanel({ output, loading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <p style={{
          fontFamily: "'Press Start 2P'",
          fontSize: '10px',
          color: '#00ff9f',
          margin: 0,
        }}>
          // OUTPUT
        </p>
        {output && (
          <button
            onClick={handleCopy}
            style={{
              backgroundColor: 'transparent',
              color: copied ? '#00ff9f' : '#888888',
              fontFamily: "'Press Start 2P'",
              fontSize: '8px',
              padding: '6px 12px',
              border: `2px solid ${copied ? '#00ff9f' : '#555555'}`,
              cursor: 'pointer',
              boxShadow: '2px 2px 0px #222222',
            }}
          >
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        )}
      </div>
      <div style={{
        backgroundColor: '#111111',
        border: '2px solid #555555',
        padding: '16px',
        minHeight: '150px',
        fontFamily: 'Courier New',
        fontSize: '13px',
        color: '#cccccc',
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
      }}>
        {loading ? (
          <p style={{ color: '#00ff9f', fontFamily: "'Press Start 2P'", fontSize: '10px', animation: 'pulse 1s infinite' }}>
            PARSING... ▌
          </p>
        ) : output ? (
          output
        ) : (
          <p style={{ color: '#555555', fontFamily: 'Courier New' }}>
            // your explanation will appear here...
          </p>
        )}
      </div>
    </div>
  )
}

export default OutputPanel