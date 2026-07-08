'use client'

import { useState } from 'react'

const DORADO = '#F5A623'
const ROJO = '#C81D25'
const NEGRO = '#0d0d0d'

export default function HomePage() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [cliente, setCliente] = useState(null)
  const [error, setError] = useState(null)

  async function registrarse(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error al registrarse')
        return
      }
      setCliente(data)
    } catch (err) {
      setError('Error de conexión')
    }
  }

  const contenedorEstilo = {
    minHeight: '100vh',
    background: NEGRO,
    color: 'white',
    fontFamily: 'system-ui, sans-serif',
  }

  if (cliente) {
    return (
      <div style={contenedorEstilo}>
        <div style={{ maxWidth: 420, margin: '0 auto', padding: 24, textAlign: 'center' }}>
          <img src="/logo-circular.png" alt="La Gallina Rebelde" style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 20 }} />
          <h1 style={{ fontSize: 22, marginTop: 16, color: DORADO }}>¡Bienvenido/a, {cliente.nombre || 'cliente'}!</h1>
          <p style={{ marginTop: 8, color: '#bbb' }}>Muestra este código en cada compra para sumar estrellas.</p>

          <div style={{ marginTop: 24, padding: 20, background: '#1a1a1a', borderRadius: 12, border: `2px solid ${DORADO}` }}>
            <p style={{ fontSize: 13, color: '#888' }}>Tu ID de cliente:</p>
            <p style={{ fontFamily: 'monospace', fontSize: 13, wordBreak: 'break-all', color: DORADO }}>{cliente.id}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, margin: '20px 0' }}>
            {Array.from({ length: cliente.meta_estrellas }).map((_, i) => (
              <span key={i} style={{ fontSize: 28, color: i < cliente.estrellas ? DORADO : '#333' }}>★</span>
            ))}
          </div>

          <p style={{ color: '#ccc' }}>Compra {cliente.estrellas} de {cliente.meta_estrellas}</p>

          <p style={{ marginTop: 32, fontSize: 13, color: '#666' }}>
            (Próximamente: botón para agregar esta tarjeta a Apple/Google Wallet)
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={contenedorEstilo}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logo-banner.png" alt="La Gallina Rebelde" style={{ width: '100%', borderRadius: 12, marginTop: 20 }} />
        </div>

        <h1 style={{ fontSize: 20, marginBottom: 16, color: DORADO, textAlign: 'center' }}>
          ÚNETE AL PROGRAMA DE ESTRELLAS
        </h1>

        <form onSubmit={registrarse}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: '100%', padding: 12, marginBottom: 12, borderRadius: 8,
              border: `1px solid #444`, background: '#1a1a1a', color: 'white',
            }}
          />
          <input
            type="tel"
            placeholder="Tu teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={{
              width: '100%', padding: 12, marginBottom: 16, borderRadius: 8,
              border: `1px solid #444`, background: '#1a1a1a', color: 'white',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%', padding: 14, borderRadius: 8, border: 'none',
              background: DORADO, color: '#000', fontWeight: 700, cursor: 'pointer',
              letterSpacing: 1,
            }}
          >
            REGISTRARME
          </button>
        </form>

        {error && <p style={{ color: '#ff8a8a', marginTop: 12, textAlign: 'center' }}>{error}</p>}

        <div style={{ marginTop: 32, padding: 16, background: '#1a1a1a', borderRadius: 8, fontSize: 13, color: '#999' }}>
          <p style={{ color: DORADO, fontWeight: 700, marginBottom: 6 }}>Cómo funciona:</p>
          <p>Compra 2 → 10% de descuento</p>
          <p>Compra 4 → 25% de descuento en tu compra total</p>
          <p>Compra 6 → ¡Papas gratis!</p>
        </div>
      </div>
    </div>
  )
}
