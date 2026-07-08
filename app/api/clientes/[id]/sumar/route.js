import { supabaseAdmin } from '../../../../../lib/supabaseAdmin'
import { premioParaCompra, META_ESTRELLAS } from '../../../../../lib/premios'

// POST /api/clientes/:id/sumar -> suma 1 estrella cuando el cliente compra
export async function POST(req, { params }) {
  const { id } = params

  const { data: cliente, error: errorBusqueda } = await supabaseAdmin
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (errorBusqueda || !cliente) {
    return Response.json({ error: 'Cliente no encontrado' }, { status: 404 })
  }

  const nuevasEstrellas = cliente.estrellas + 1
  const premio = premioParaCompra(nuevasEstrellas)
  const cicloCompleto = nuevasEstrellas >= META_ESTRELLAS

  const { data: actualizado, error: errorUpdate } = await supabaseAdmin
    .from('clientes')
    .update({ estrellas: nuevasEstrellas })
    .eq('id', id)
    .select()
    .single()

  if (errorUpdate) {
    return Response.json({ error: errorUpdate.message }, { status: 400 })
  }

  await supabaseAdmin.from('historial').insert({
    cliente_id: id,
    accion: 'suma',
    premio: premio ? premio.texto : null,
  })

  // Aquí, más adelante, llamaremos a PassKit/PassSlot para actualizar
  // el pase de Apple/Google Wallet del cliente con su nuevo número de estrellas.
  // await actualizarPaseWallet(actualizado)

  return Response.json({
    ...actualizado,
    premio,
    ciclo_completo: cicloCompleto,
  })
}
