function CodeInput({ code, onChange }) {
    return (
      <div style={{ marginBottom: '24px' }}>
        <p style={{
          fontFamily: "'Press Start 2P'",
          fontSize: '10px',
          color: '#00ff9f',
          marginBottom: '12px',
        }}>
          // PASTE YOUR CODE
        </p>
        <textarea
          value={code}
          onChange={e => onChange(e.target.value)}
          placeholder="// paste your code here..."
          style={{
            width: '100%',
            minHeight: '200px',
            backgroundColor: '#111111',
            color: '#00ff9f',
            fontFamily: 'Courier New',
            fontSize: '13px',
            padding: '16px',
            border: '2px solid #555555',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
            lineHeight: '1.6',
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#00ff9f'}
          onBlur={e => e.currentTarget.style.borderColor = '#555555'}
        />
      </div>
    )
  }
  
  export default CodeInput