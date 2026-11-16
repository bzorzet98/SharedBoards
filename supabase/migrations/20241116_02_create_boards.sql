create table public.boards (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  owner_id uuid references auth.users(id) on delete cascade not null,
  is_shared boolean default false not null,
  invite_code text unique,
  created_at timestamp with time zone default timezone('utc', now())
);