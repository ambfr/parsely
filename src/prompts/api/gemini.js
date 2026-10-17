import { SYSTEM_PROMPTS } from '../prompts/modes'

export async function explainCode(code, mode) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPTS[mode] }]
        },
        contents: [{
          parts: [{ text: `Explain this code:\n\n${code}` }]
        }]
      })
    }
  )

  const data = await response.json()

  if (!data.candidates || !data.candidates[0]) {
    throw new Error('No response from Gemini')
  }

  return data.candidates[0].content.parts[0].text
}