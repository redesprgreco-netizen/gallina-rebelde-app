export const metadata = {
  title: 'La Gallina Rebelde | Programa de Estrellas',
  description: 'App de fidelización con QR',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, background: '#0d0d0d' }}>
        {children}
      </body>
    </html>
  )
}