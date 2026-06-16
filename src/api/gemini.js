import { SYSTEM_PROMPTS } from '../prompts/modes'

export async function explainCode(code, mode) {
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPTS[mode]
          },
          {
            role: 'user',
            content: `Explain this code:\n\n${code}`
          }
        ]
      })
    }
  )

  const data = await response.json()

  if (!data.choices || !data.choices[0]) {
    throw new Error('No response from Groq')
  }

  return data.choices[0].message.content
}