import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export async function POST(request) {
  const body = await request.json()
  const { username, password, koperasi_ref, name } = body

  const { data: authData, error: errAuth } = await supabase.auth.admin.createUser({
    email: `${username}@pasok.local`,
    password,
    email_confirm: true,
    user_metadata: { name, role: 'koperasi' }
  })
  if (errAuth) return Response.json({ error: errAuth.message }, { status: 400 })

  const { error: errProfile } = await supabase
    .from('profiles')
    .update({ koperasi_ref })
    .eq('id', authData.user.id)

  if (errProfile) {
    await supabase.auth.admin.deleteUser(authData.user.id)
    return Response.json({ error: errProfile.message }, { status: 400 })
  }

  return Response.json({ user_id: authData.user.id, username, koperasi_ref }, { status: 201 })
}