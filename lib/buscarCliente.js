import { supabaseAdmin } from './supabaseAdmin'

// Busca un cliente ya sea por su ID largo (uuid) o por su código corto.
// Así el escáner funciona sin importar cuál de los dos venga en el QR.
export async function buscarClientePorIdOCodigo(valor) {
  const esUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(valor)

  const query = supabaseAdmin.from('clientes').select('*')

  const { data, error } = esUUID
    ? await query.eq('id', valor).single()
    : await query.eq('codigo', valor.toUpperCase()).single()

  return { data, error }
}
