'use client'

import { useEffect, useState } from 'react'
import TarjetaCliente from '../components/TarjetaCliente'
import BannerAvisos from '../components/BannerAvisos'

const DORADO = '#F5A623'
const NEGRO = '#0d0d0d'

export default function HomePage() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [cliente, setCliente] = useState(null)
  const [error, setError] = useState(null)
  const [revisandoSesion, setRevisandoSesion] = useState(true)
  const [banner, setBanner] = useState('')

  // Si el navegador ya tiene un código guardado de una visita anterior, mostramos
  // su tarjeta directo en vez del formulario de registro.
  useEffect(() => {
    const guardado = window.localStorage.getItem('gr_codigo')
    if (!guardado) {
      setRevisandoSesion(false)
      return
    }
    fetch(`/api/clientes/${guardado}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setCliente(data)
        else window.localStorage.removeItem('gr_codigo')
      })
      .finally(() => setRevisandoSesion(false))
  }, [])

  // Cargamos el banner de avisos/ofertas que el dueño configura desde /admin.
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.banner_activo && data.banner_texto) setBanner(data.banner_texto)
      })
      .catch(() => {})
  }, [])

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
      window.localStorage.setItem('gr_codigo', data.codigo)
    } catch (err) {
      setError('Error de conexión')
    }
  }

  function salir() {
    window.localStorage.removeItem('gr_codigo')
    setCliente(null)
  }

  const contenedorEstilo = {
    minHeight: '100vh',
    background: NEGRO,
    color: 'white',
    fontFamily: 'system-ui, sans-serif',
  }

  if (revisandoSesion) {
    return <div style={contenedorEstilo} />
  }

  if (cliente) {
    return (
      <div style={contenedorEstilo}>
        <BannerAvisos texto={banner} />
        <TarjetaCliente cliente={cliente} onSalir={salir} />
      </div>
    )
  }

  return (
    <div style={contenedorEstilo}>
      <BannerAvisos texto={banner} />
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

        <a
          href="/mi-tarjeta"
          style={{
            display: 'block', marginTop: 20, textAlign: 'center', padding: 12,
            borderRadius: 8, border: `1px solid ${DORADO}`, color: DORADO,
            fontSize: 13, textDecoration: 'none', fontWeight: 700,
          }}
        >
          Ya me registré, ver mis estrellas →
        </a>

        <a
          href="/scan"
          style={{
            display: 'block', marginTop: 10, textAlign: 'center', padding: 12,
            borderRadius: 8, border: `1px solid #444`, color: '#888',
            fontSize: 13, textDecoration: 'none',
          }}
        >
          Acceso empleados →
        </a>
      </div>
    </div>
  )
}
