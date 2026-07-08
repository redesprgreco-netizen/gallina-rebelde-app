-- Ejecuta esto en Supabase: Dashboard -> SQL Editor -> New query -> pegar y RUN

create table if not exists clientes (
  id uuid default gen_random_uuid() primary key,
  codigo text unique,
  nombre text,
  telefono text,
  estrellas int default 0,
  meta_estrellas int default 6,
  created_at timestamp with time zone default now()
);

create table if not exists historial (
  id uuid default gen_random_uuid() primary key,
  cliente_id uuid references clientes(id) on delete cascade,
  accion text not null, -- 'suma' o 'canje'
  premio text, -- descripción del premio ganado en esa compra, si hubo
  fecha timestamp with time zone default now()
);

-- Tabla para el banner de avisos/ofertas que se muestra en la página de clientes.
-- Solo tiene una fila (id = 1) que el dueño edita desde /admin.
create table if not exists configuracion (
  id int primary key default 1,
  banner_texto text default '',
  banner_activo boolean default false,
  updated_at timestamp with time zone default now()
);

insert into configuracion (id, banner_texto, banner_activo)
values (1, '', false)
on conflict (id) do nothing;

-- Seguridad: activamos RLS y solo permitimos acceso vía el backend (service role),
-- que siempre se salta RLS. Así nadie puede leer/editar la tabla directo desde el navegador.
alter table clientes enable row level security;
alter table historial enable row level security;
alter table configuracion enable row level security;
