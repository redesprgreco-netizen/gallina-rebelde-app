import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

// GET /api/clientes/:id -> consulta cuántas estrellas tiene
export async function GET(req, { params }) {
  const { id } = params

  const { data, error } = await supabaseAdmin
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 404 })
  }

  return Response.json(data)
}
