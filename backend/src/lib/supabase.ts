import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import ws from 'ws'

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment'
    )
  }

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      // Node <22 has no native WebSocket; ws provides it for realtime.
      realtime: { transport: ws as never },
    })
  }

  return client
}