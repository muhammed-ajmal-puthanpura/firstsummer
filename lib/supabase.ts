import { createClient } from "@supabase/supabase-js"

// Create a singleton instance for the browser client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const supabase = () => {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials")
    // Return a dummy client that will show appropriate errors
    return createClient("https://placeholder-url.supabase.co", "placeholder-key")
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

// Create a server-side supabase client (for server components and API routes)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase server credentials")
    // Return a dummy client that will show appropriate errors
    return createClient("https://placeholder-url.supabase.co", "placeholder-key", {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

