-- ============ EXTENSIONES ============
create extension if not exists "pgcrypto";

-- ============ ENUMS ============
create type subscription_status as enum
  ('trialing','active','past_due','canceled','paused','incomplete','incomplete_expired','unpaid');
create type plan_tier as enum ('starter','growth','scale');
create type brief_status as enum ('draft','submitted','in_production','delivered','archived');
create type deliverable_status as enum ('rendering','in_review','revision_requested','approved','published');

-- ============ USERS (perfil ligado a auth.users) ============
create table public.users (
  id                 uuid primary key references auth.users(id) on delete cascade,
  email              text not null unique,
  full_name          text,
  company            text,
  stripe_customer_id text unique,
  credits_balance    int not null default 0,   -- creativos acumulados sin usar
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ============ SUBSCRIPTIONS ============
create table public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references public.users(id) on delete cascade,
  stripe_subscription_id text not null unique,
  stripe_price_id        text not null,
  plan                   plan_tier not null,
  videos_per_cycle       int not null,            -- 4 / 8 / 16
  status                 subscription_status not null,
  current_period_start   timestamptz,
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  canceled_at            timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index on public.subscriptions (user_id);
create index on public.subscriptions (status);

-- ============ BRIEFS ============
create table public.briefs (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  title           text not null,
  product_url     text,
  target_audience text,
  angles          jsonb not null default '[]'::jsonb,   -- lista de hooks/ángulos
  tone            text,
  niche           text,
  assets_url      text,                                  -- carpeta Storage
  status          brief_status not null default 'draft',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on public.briefs (user_id, status);

-- ============ VIDEO DELIVERABLES ============
create table public.video_deliverables (
  id               uuid primary key default gen_random_uuid(),
  brief_id         uuid not null references public.briefs(id) on delete cascade,
  user_id          uuid not null references public.users(id) on delete cascade,
  creator_handle   text,
  creator_verified boolean not null default false,
  niche            text,
  mux_playback_id  text,                 -- HLS
  poster_url       text,
  duration_sec     int,
  status           deliverable_status not null default 'rendering',
  revision_round   int not null default 0,
  consumes_credit  boolean not null default true,
  -- métricas de rendimiento
  ctr              numeric(5,2),
  hook_rate        numeric(5,2),
  thumbstop_ratio  numeric(5,2),
  roas             numeric(6,2),
  views            bigint,
  delivered_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index on public.video_deliverables (user_id, status);
create index on public.video_deliverables (brief_id);

-- ============ trigger updated_at ============
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['users','subscriptions','briefs','video_deliverables'] loop
    execute format(
      'create trigger trg_touch_%1$s before update on public.%1$s
       for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ============ crear perfil al registrarse ============
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ RLS ============
alter table public.users              enable row level security;
alter table public.subscriptions      enable row level security;
alter table public.briefs             enable row level security;
alter table public.video_deliverables enable row level security;

-- el usuario ve/edita solo lo suyo; el service_role (webhooks) omite RLS
create policy "own profile select" on public.users
  for select using (auth.uid() = id);
create policy "own profile update" on public.users
  for update using (auth.uid() = id);

create policy "own subs select" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "own briefs all" on public.briefs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own videos select" on public.video_deliverables
  for select using (auth.uid() = user_id);
