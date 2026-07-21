import { supabase } from '@/lib/supabase'

const FAKE_EMAIL_DOMAIN = 'pasok.local'

const DASHBOARD_PATHS = {
  produsen: '/produsen',
  koperasi: '/koperasi',
}

export async function signIn(identifier, password) {
  const email = identifier.includes('@')
    ? identifier
    : `${identifier.toLowerCase()}@${FAKE_EMAIL_DOMAIN}`

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export function getRole(user) {
  return user?.user_metadata?.role ?? null
}

export function getDashboardPath(role) {
  return DASHBOARD_PATHS[role] ?? '/login'
}
