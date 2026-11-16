create table public.board_members (
  board_id uuid references public.boards(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('owner', 'member')) not null default 'member',
  created_at timestamp with time zone default timezone('utc', now()),
  primary key (board_id, user_id)
);