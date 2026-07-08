import { supabaseAdmin } from '../../../../../lib/supabaseAdmin'

// POST /api/clientes/:id/canjear -> resetea las estrellas cuando el cliente canjea su premio
export async function POST(req, { params }) {
  const { id } = params

  const { data: actualizado, error } = await supabaseAdmin
    .from('clientes')
    .update({ estrellas: 0 })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  await supabaseAdmin.from('historial').insert({ cliente_id: id, accion: 'canje' })

  return Response.json(actualizado)
}
