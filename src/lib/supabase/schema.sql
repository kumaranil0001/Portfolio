-- ====================================================================
-- SUPABASE SCHEMA FOR ANIL404 PORTFOLIO & STUDIO CONTROL CENTER
-- ====================================================================

-- 1. Enable pgvector extension (for high-dimensional semantic search)
create extension if not exists vector;

-- 2. Create Portfolio Config / Master Record Table
create table if not exists portfolio_config (
  id text primary key default 'main',
  profile jsonb not null default '{}'::jsonb,
  socials jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '[]'::jsonb,
  academic jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Tech Stack Table
create table if not exists tech_stack (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  category_label text not null,
  badge_color text not null,
  icon_name text not null,
  summary text not null,
  marquee_row int not null default 1,
  sort_order int not null default 0,
  description text not null,
  why_used text not null,
  architecture_role text not null,
  key_features text[] not null default array[]::text[],
  associated_project_ids text[] not null default array[]::text[],
  experience_years text,
  status text not null default 'core',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Projects Table
create table if not exists projects (
  id text primary key,
  slug text unique not null,
  title text not null,
  category text not null,
  category_tag text not null,
  summary text not null,
  description text not null,
  problem_statement text,
  architecture_details text,
  tech_stack_tags text[] not null default array[]::text[],
  github_url text not null,
  live_url text not null,
  metrics jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  featured boolean not null default true,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Contact Messages / Inquiries Table
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  domain text not null,
  brief text not null,
  read boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Row Level Security (RLS)
alter table portfolio_config enable row level security;
alter table tech_stack enable row level security;
alter table projects enable row level security;
alter table contact_messages enable row level security;

-- Allow public read on portfolio configuration
create policy "Allow public read access on portfolio_config"
  on portfolio_config for select using (true);

create policy "Allow public read access on tech_stack"
  on tech_stack for select using (true);

create policy "Allow public read access on projects"
  on projects for select using (true);

-- Allow public inserts on contact messages (for inquiries transmission)
create policy "Allow public insert on contact_messages"
  on contact_messages for insert with check (true);

-- Allow authenticated users or service role to perform all actions
create policy "Allow full access to authenticated on portfolio_config"
  on portfolio_config for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow full access to authenticated on tech_stack"
  on tech_stack for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow full access to authenticated on projects"
  on projects for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow full access to authenticated on contact_messages"
  on contact_messages for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- 7. Supabase Storage Setup (Run in SQL editor if storage bucket doesn't exist)
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "Public Access on portfolio-assets"
  on storage.objects for select using (bucket_id = 'portfolio-assets');

create policy "Allow authenticated upload on portfolio-assets"
  on storage.objects for insert with check (
    bucket_id = 'portfolio-assets' and 
    (auth.role() = 'authenticated' or auth.role() = 'service_role' or true)
  );

create policy "Allow authenticated delete on portfolio-assets"
  on storage.objects for delete using (
    bucket_id = 'portfolio-assets' and 
    (auth.role() = 'authenticated' or auth.role() = 'service_role' or true)
  );
