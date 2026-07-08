import { supabaseAdmin } from '../../../lib/supabaseAdmin'

// POST /api/clientes  -> crea un cliente nuevo (primera vez que escanea tu QR de bienvenida)
// body: { nombre, telefono }
export async function POST(req) {
  const body = await req.json()

  const { data, error } = await supabaseAdmin
    .from('clientes')
    .insert({ nombre: body.nombre || null, telefono: body.telefono || null })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data)
}
