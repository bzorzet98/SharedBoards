create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  board_id uuid references public.boards(id) on delete cascade not null,
  title text not null,
  status text check (status in ('pending', 'in_progress', 'done')) not null default 'pending',
  assigned_to uuid references auth.users(id) on delete set null,
  due_date date,
  created_by uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);