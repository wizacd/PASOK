import { getAnggotaFromRequest } from '@/lib/server-auth'

export async function GET(request) {
  const result = await getAnggotaFromRequest(request)
  if (result.error) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  return Response.json(result.anggota, { status: 200 })
}
