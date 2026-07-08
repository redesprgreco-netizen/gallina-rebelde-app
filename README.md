# App de Estrellas — Guía de instalación

## 1. Base de datos (Supabase)

1. Entra a tu proyecto en supabase.com
2. Ve a **SQL Editor** → **New query**
3. Copia y pega el contenido de `supabase-schema.sql` → dale a **Run**
4. Ve a **Settings → API** y copia:
   - **Project URL**
   - **anon / publishable key**
   - **service_role key** (¡mantenla secreta, nunca la subas a GitHub!)

## 2. Probarlo localmente (opcional pero recomendado)

```bash
npm install
cp .env.local.example .env.local
# edita .env.local y pon tus 3 valores de Supabase
npm run dev
```

Abre http://localhost:3000 (registro de cliente) y http://localhost:3000/scan (escáner).

## 3. Subir a GitHub

```bash
git init
git add .
git commit -m "primera version app de estrellas"
```

Crea un repo en GitHub y súbelo (`git remote add origin ...` y `git push`).

## 4. Desplegar en Vercel

1. Entra a vercel.com → **Add New Project**
2. Selecciona tu repositorio de GitHub
3. En **Environment Variables**, agrega las 4 variables de tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` (contraseña para entrar a `/scan`)
4. Dale a **Deploy**

En 1-2 minutos tendrás una URL pública, por ejemplo `https://tu-app.vercel.app`.

- `https://tu-app.vercel.app` → página de registro para tus clientes
- `https://tu-app.vercel.app/scan` → pantalla que usas TÚ en la tienda para escanear y sumar estrellas

## 5. Cómo se usa en el día a día

1. Un cliente nuevo entra a tu URL principal, se registra (nombre + teléfono) y le aparece su ID/código.
2. En la tienda, abres `/scan` en una tablet o celular.
3. Cuando el cliente compra, escaneas su código → se suma 1 estrella automáticamente.
4. Cuando llega a la meta, usas el endpoint `/api/clientes/:id/canjear` para resetear sus estrellas al entregar el premio (esto lo podemos conectar a un botón en el `/scan` más adelante).

## Qué falta para la versión completa

- [ ] Generar el QR visual real en la página de bienvenida (ahora mismo se muestra el ID como texto)
- [ ] Botón "Agregar a Apple Wallet / Google Wallet" (integración con PassKit o PassSlot)
- [ ] Botón de canjear premio en la pantalla de escaneo
- [ ] Panel simple para ti, el dueño, para ver todos los clientes y su historial

Dile a Claude cuando quieras seguir con cualquiera de estos puntos.
