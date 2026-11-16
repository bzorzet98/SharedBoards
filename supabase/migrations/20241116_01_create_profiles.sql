create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc', now())
);