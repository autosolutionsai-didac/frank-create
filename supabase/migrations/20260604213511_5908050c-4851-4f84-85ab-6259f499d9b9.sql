
-- Helper trigger fn
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

-- sessions
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled',
  active_preset_id text,
  active_model_key text not null default 'nano-banana-pro',
  settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists sessions_user_updated_idx on public.sessions (user_id, updated_at desc);
drop trigger if exists sessions_set_updated_at on public.sessions;
create trigger sessions_set_updated_at before update on public.sessions
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.sessions to authenticated;
grant all on public.sessions to service_role;
alter table public.sessions enable row level security;
create policy "own sessions" on public.sessions for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  seq bigint generated always as identity,
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  message_type text not null check (message_type in ('generate','edit')),
  prompt_text text,
  settings_snapshot_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists messages_session_seq_idx on public.messages (session_id, seq);
grant select, insert, update, delete on public.messages to authenticated;
grant all on public.messages to service_role;
alter table public.messages enable row level security;
create policy "own messages" on public.messages for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- assets
create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  message_id uuid references public.messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_type text not null check (asset_type in ('reference','generated','edited')),
  storage_path text not null,
  parent_asset_id uuid references public.assets(id) on delete set null,
  model_key text,
  prompt_snapshot text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists assets_session_idx on public.assets (session_id, created_at);
create index if not exists assets_message_idx on public.assets (message_id);
grant select, insert, update, delete on public.assets to authenticated;
grant all on public.assets to service_role;
alter table public.assets enable row level security;
create policy "own assets" on public.assets for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- presets
create table if not exists public.presets (
  id text primary key,
  name text not null,
  category text,
  system_prompt text not null,
  positive_rules text[] not null default '{}',
  negative_rules text[] not null default '{}',
  default_settings_json jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.presets to authenticated;
grant all on public.presets to service_role;
alter table public.presets enable row level security;
create policy "read presets" on public.presets for select to authenticated using (true);

-- model_capabilities
create table if not exists public.model_capabilities (
  model_key text primary key,
  provider text not null,
  provider_model_id text not null,
  label text,
  blurb text,
  supports_editing boolean not null default false,
  supports_multi_reference boolean not null default false,
  max_reference_images int not null default 0,
  supported_aspect_ratios text[] not null default '{}',
  supported_resolutions text[] not null default '{}',
  supports_thinking boolean not null default false,
  supports_multi_turn boolean not null default false,
  default_settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
grant select on public.model_capabilities to authenticated;
grant all on public.model_capabilities to service_role;
alter table public.model_capabilities enable row level security;
create policy "read model_capabilities" on public.model_capabilities for select to authenticated using (true);

-- Storage RLS policies for studio-images (bucket created via tool)
create policy "studio own objects read" on storage.objects for select to authenticated
  using (bucket_id = 'studio-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "studio own objects insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'studio-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "studio own objects update" on storage.objects for update to authenticated
  using (bucket_id = 'studio-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "studio own objects delete" on storage.objects for delete to authenticated
  using (bucket_id = 'studio-images' and (storage.foldername(name))[1] = auth.uid()::text);
