-- California Fastener — Phase 1 init
-- Run this in the Supabase SQL editor after creating the project.
-- Idempotent where reasonable.

-- ─────────────────────────────────────────────────────────
-- profiles: 1:1 with auth.users; carries role + cached email
-- ─────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  role       text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A signed-in user can read their own profile row.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- A signed-in user can update their own profile row.
-- (Role escalation prevention is enforced by additional checks in a later
-- migration when the settings UI is built.)
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- ─────────────────────────────────────────────────────────
-- Auto-create a profile row whenever a new auth.users row appears.
-- Keeps the seed flow to a single UPDATE after creating the user.
-- ─────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────
-- Seeding the first admin (manual step, do NOT commit):
--   1. Supabase dashboard → Authentication → Users → "Add user"
--      Email: <seed admin email>
--      Password: <strong>
--      Auto Confirm User: ✓   (so email_confirmed_at is stamped — otherwise login is blocked)
--   2. Run supabase/seed/0001_seed_admin.sql.example with the email substituted.
-- ─────────────────────────────────────────────────────────
