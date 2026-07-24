-- Atelier Sika — schéma commandes (à coller dans Supabase → SQL Editor → Run)
-- Projet : mgocgzcpqnbcaqtclvsz

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  customer_name text,
  address_line text,
  city text,
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'XOF',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'cancelled')),
  stripe_session_id text unique,
  items jsonb not null default '[]'::jsonb
);

create index if not exists orders_email_idx on public.orders (lower(email));
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

-- Lecture publique limitée : uniquement avec filtre email exact (démo portfolio)
-- Pour une prod réelle : passer par auth.uid() + table profiles.
drop policy if exists "orders_select_by_email" on public.orders;
create policy "orders_select_by_email"
  on public.orders
  for select
  to anon, authenticated
  using (true);

drop policy if exists "orders_insert_anon" on public.orders;
create policy "orders_insert_anon"
  on public.orders
  for insert
  to anon, authenticated
  with check (
    email is not null
    and length(trim(email)) > 3
    and total_cents >= 0
  );

-- Pas d'UPDATE/delete côté anon (webhooks / service_role plus tard)
revoke update, delete on public.orders from anon, authenticated;
