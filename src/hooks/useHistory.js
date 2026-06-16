import { supabase } from '../lib/supabase'

export async function saveExplanation({ userId, code, mode, output }) {
  const { error } = await supabase
    .from('history')
    .insert({ user_id: userId, code, mode, output })

  if (error) console.error('Save failed:', error.message)
}

export async function fetchHistory(userId) {
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) console.error('Fetch failed:', error.message)
  return data ?? []
}

export async function deleteExplanation(id) {
  const { error } = await supabase
    .from('history')
    .delete()
    .eq('id', id)

  if (error) console.error('Delete failed:', error.message)
}