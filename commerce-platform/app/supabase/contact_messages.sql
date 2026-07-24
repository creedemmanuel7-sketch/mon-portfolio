-- Messages de contact (portfolio + Atelier Sika)
-- À coller dans Supabase → SQL Editor → Run
-- Projet : mgocgzcpqnbcaqtclvsz

create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null
    check (source in ('portfolio', 'atelier-sika')),
  name text not null,
  email text not null,
  reason text not null,
  message text not null,
  meta jsonb not null default '{}'::jsonb
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_source_idx
  on public.contact_messages (source);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_insert_anon" on public.contact_messages;
create policy "contact_insert_anon"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (
    email is not null
    and length(trim(email)) > 3
    and length(trim(message)) > 2
    and length(trim(name)) > 1
  );

-- Lecture : uniquement service_role / dashboard (pas d’anon select)
revoke select, update, delete on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
